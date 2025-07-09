#include <cstdio>
#include <cstdlib>
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <string>

#include "../free42/common/core_globals.h"
#include "../free42/common/core_main.h"

#include "lib.h"

using namespace emscripten;

// Commit hash of the free42 version
std::string free42_version() { return "27e8300"; }

void reset() {
  core_init(0, 0, "", 0);
  core_powercycle();
}

void init(val callbacks_ref) {
  callbacks = callbacks_ref;
  callbacks.call<void>("init");
  reset();
}

KeydownResult keydown(int key) {
  last_keydown = std::chrono::system_clock::now();
  KeydownResult out;
  out.keep_running = core_keydown(key, &out.enqueued, &out.repeat);
  return out;
}

void updateSettings(val settings) {
  core_settings.matrix_singularmatrix =
      settings["matrixSingularmatrix"].as<bool>();
  core_settings.matrix_outofrange = settings["matrixOutOfRange"].as<bool>();
  core_settings.auto_repeat = settings["autoRepeat"].as<bool>();
  core_settings.allow_big_stack = settings["allowBigStack"].as<bool>();
  core_settings.localized_copy_paste =
      settings["localizedCopyPaste"].as<bool>();
  core_update_allow_big_stack();
}

std::string copy() {
  auto c_str = core_copy();
  auto string = std::string(c_str);
  free(c_str);
  return string;
}

void paste(std::string str) { core_paste(str.c_str()); }

// A custom save impl is used here over core_save_state because the default
// implementation stops program execution and has other side effects that are
// undesirable when calling this all the time. Since we might not get a heads-up
// that the page is closing, the state is just saved automatically quite
// frequently.
void save_state_passive(std::string filename) {
  auto path = ("/states/" + filename);

  gfile = fopen(path.c_str(), "wb");
  if (gfile != NULL) {
    bool success;
    save_state(&success);
    fclose(gfile);
  }
}

void load_state_wrapper(std::string filename) {
  auto path = "/states/" + filename;
  core_cleanup();
  core_init(1, 26, path.c_str(), 0);
}

Keyboard keyboard() {
  if (core_alpha_menu())
    return Keyboard::ALPHA;
  if (core_hex_menu())
    return Keyboard::HEX;
  if (core_menu())
    return Keyboard::MENU;
  return Keyboard::DEFAULT;
}

int special_key(SpecialKey key, bool shift) {
  int code = -1;

  if (key == SpecialKey::LEFT)
    code = 1 + shift;
  else if (key == SpecialKey::RIGHT)
    code = 3 + shift;
  else if (key == SpecialKey::DELETE)
    code = 5;

  if (code == -1)
    return 0;
  return core_special_menu_key(code);
}

void load_program(std::string data) {
  gfile = fmemopen(data.data(), data.size(), "rb");
  core_import_programs(0, nullptr);
}

val export_program() {
  if (current_prgm == -1)
    return val::undefined();

  auto size = core_program_size(current_prgm) + 3;
  auto buffer = malloc(size);

  gfile = fmemopen(buffer, size, "wb");
  if (gfile == nullptr)
    return val::undefined();

  export_hp42s(current_prgm);
  fclose(gfile);

  return emscripten::val::global("Uint8Array")
      .new_(emscripten::typed_memory_view(size, (uint8_t *)buffer));
}

EMSCRIPTEN_BINDINGS(free42) {
  function("free42Version", &free42_version);
  function("init", &init);
  function("reset", &reset);
  function("updateSettings", &updateSettings);
  function("keydown", &keydown);
  function("keyup", &core_keyup);
  function("repeat", &core_repeat);
  function("notify1", &core_keytimeout1);
  function("notify2", &core_keytimeout2);
  function("notify3", &core_timeout3);
  function("repaint", &core_repaint_display);
  function("copy", &copy);
  function("paste", &paste);
  function("saveState", &save_state_passive);
  function("loadState", &load_state_wrapper);
  function("keyboard", &keyboard);
  function("specialKey", &special_key);
  function("loadProgram", &load_program);
  function("exportProgram", &export_program);
  function("powerCycle", &core_powercycle);

  enum_<Keyboard>("Keyboard")
      .value("DEFAULT", Keyboard::DEFAULT)
      .value("ALPHA", Keyboard::ALPHA)
      .value("HEX", Keyboard::HEX)
      .value("MENU", Keyboard::MENU);
  enum_<SpecialKey>("SpecialKey")
      .value("LEFT", SpecialKey::LEFT)
      .value("RIGHT", SpecialKey::RIGHT)
      .value("DELETE", SpecialKey::DELETE);

  class_<KeydownResult>("KeydownResult")
      .property("keepRunning", &KeydownResult::keep_running)
      .property("repeat", &KeydownResult::repeat)
      .property("enqueued", &KeydownResult::enqueued);
}
