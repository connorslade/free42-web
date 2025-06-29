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
    }

    void keydown(int key) {
        bool enqueued;
        int repeat;
        core_keydown(key, &enqueued, &repeat);
    }

    void keyup() {
        core_keyup();
    }
}

EMSCRIPTEN_BINDINGS(free42) {
    function("init", &init);
    function("keydown", &keydown);
    function("keyup", &keydown);
}
