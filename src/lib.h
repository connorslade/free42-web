#pragma once

#include <emscripten/val.h>

using namespace emscripten;

inline val callbacks;

enum class Keyboard { DEFAULT, MENU, ALPHA, HEX };
enum class SpecialKey { LEFT, RIGHT, DELETE };

class KeydownResult {
public:
  bool keep_running;
  int repeat;
  bool enqueued;
};
