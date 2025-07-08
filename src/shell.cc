#include "emscripten.h"
#include <chrono>
#include <cstdio>
#include <cstdlib>
#include <stdint.h>
#include <thread>

#include "../free42/common/shell.h"

#include "lib.h"

const char *shell_platform() { return "WebAssembly 0.1.0"; }

void shell_blitter(const char *bits, int bytes_per_line, int x, int y,
                   int width, int height) {
  auto total_bytes = height * bytes_per_line;
  auto data = val::global("Uint8Array")
                  .new_(typed_memory_view(total_bytes, (const uint8_t *)bits));

  callbacks.call<void>("blit", data);
}

void shell_beeper(int tone) { callbacks.call<void>("beep", tone); }

void shell_annunciators(int updn, int shf, int prt, int run, int g, int rad) {
  callbacks.call<void>("annunciators", updn, shf, prt, run, g, rad);
}

bool shell_wants_cpu() {
  return std::chrono::duration_cast<std::chrono::milliseconds>(
             last_keydown.time_since_epoch())
             .count() > 20;
}

void shell_delay(int duration) {
  std::this_thread::sleep_for(std::chrono::milliseconds(duration));
}

void shell_request_timeout3(int delay) {
  callbacks.call<void>("requestTimeout", delay);
}

uint8 shell_get_mem() { return 16000; }

bool shell_low_battery() { return false; }

void shell_powerdown() { callbacks.call<void>("powerdown"); }

int8 shell_random_seed() { return std::rand(); }

uint4 shell_milliseconds() {
  auto now = std::chrono::system_clock::now();
  auto epoch = now.time_since_epoch();
  auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(epoch);

  return ms.count();
}

const char *shell_number_format() { return ".,33"; }

int shell_date_format() { return 1; }

bool shell_clk24() { return 1; }

void shell_print(const char *text, int length, const char *bits,
                 int bytes_per_line, int x, int y, int width, int height) {}

void shell_get_time_date(uint4 *time, uint4 *date, int *weekday) {
  auto now = std::chrono::system_clock::now();
  auto time_t_now = std::chrono::system_clock::to_time_t(now);
  auto now_ms = std::chrono::duration_cast<std::chrono::milliseconds>(
                    now.time_since_epoch()) %
                1000;
  std::tm tms = *std::localtime(&time_t_now);

  *time = ((tms.tm_hour * 100 + tms.tm_min) * 100 + tms.tm_sec) * 100 +
          now_ms.count() / 10;
  *date = ((tms.tm_year + 1900) * 100 + tms.tm_mon + 1) * 100 + tms.tm_mday;
  *weekday = tms.tm_wday;
}

void shell_message(const char *message) { EM_ASM(alert(message)); }

void shell_log(const char *message) { printf("Free42: %s", message); }
