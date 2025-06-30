#include <emscripten/bind.h>
#include <emscripten/val.h>

#include "../free42/common/core_main.h"

using namespace emscripten;

val callbacks = val::undefined();

extern "C" {
    void init(val callbacks_ref) {
        callbacks = callbacks_ref;
        callbacks.call<void>("init");

        core_init(0, 0, "", 0);
        core_powercycle();
    }

    int keydown(int key) {
        bool enqueued;
        int repeat;
        core_keydown(key, &enqueued, &repeat);

        return repeat;
    }

    void updateSettings(val settings) {
        core_settings.matrix_singularmatrix = settings["matrixSingularmatrix"].as<bool>();
        core_settings.matrix_outofrange = settings["matrixOutOfRange"].as<bool>();
        core_settings.auto_repeat = settings["autoRepeat"].as<bool>();
        core_settings.allow_big_stack = settings["allowBigStack"].as<bool>();
        core_settings.localized_copy_paste = settings["localizedCopyPaste"].as<bool>();
    }
}

EMSCRIPTEN_BINDINGS(free42) {
    function("init", &init);
    function("updateSettings", &updateSettings);

    function("keydown", &keydown);
    function("keyup", &core_keyup);
    function("notify1", &core_keytimeout1);
    function("notify2", &core_keytimeout2);
    function("notify3", &core_timeout3);
    function("repaint", &core_repaint_display);
}
