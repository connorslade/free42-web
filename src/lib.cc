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

    void keydown(int key) {
        bool enqueued;
        int repeat;
        core_keydown(key, &enqueued, &repeat);
    }

    void keyup() { core_keyup(); }
    void notify1() { core_keytimeout1(); }
    void notify2() { core_keytimeout2(); }
    void notify3(bool interrupted) { core_timeout3(interrupted); }
}

EMSCRIPTEN_BINDINGS(free42) {
    function("init", &init);
    function("keydown", &keydown);
    function("keyup", &keydown);
    function("notify1", &notify1);
    function("notify2", &notify2);
    function("notify3", &notify3);
}
