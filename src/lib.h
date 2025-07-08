#pragma once

#include <chrono>
#include <ctime>
#include <emscripten/val.h>

using namespace emscripten;

inline val callbacks;
inline std::chrono::time_point<std::chrono::system_clock> last_keydown;

enum class Keyboard { DEFAULT, MENU, ALPHA, HEX };
enum class SpecialKey { LEFT, RIGHT, DELETE };

class KeydownResult {
public:
  bool keep_running;
  int repeat;
  bool enqueued;
};
