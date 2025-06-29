#include "../free42/common/core_main.h"

extern "C" {
    void init() {
        core_init(0, 0, "", 0);
    }

    void keydown(int key) {
        bool enqueued;
        int repeat;
        core_keydown(key, &enqueued, &repeat);
    }
}
