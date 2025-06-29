#pragma once

#include <emscripten/bind.h>
#include <emscripten/val.h>

using namespace emscripten;

inline val callbacks;

extern "C" {
    void init(val callbacks_ref);
    void keydown(int key);
    void keyup();
}
