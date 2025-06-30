#include <chrono>
#include <cstdlib>
#include <stdint.h>
#include <cstdio>
#include <sys/select.h>
#include <sys/time.h>
#include "emscripten.h"

#include "../free42/common/shell.h"

#include "lib.h"

const char *shell_platform() {
    return "WebAssembly 0.1.0";
}

void shell_blitter(const char *bits, int bytes_per_line, int x, int y, int width, int height) {
    auto total_bytes = height * bytes_per_line;
    auto data = val::global("Uint8Array").new_(typed_memory_view(total_bytes, (const uint8_t*)bits));

    callbacks.call<void>("blit", data);
}

void shell_beeper(int tone) {
    callbacks.call<void>("beep", tone);
}

void shell_annunciators(int updn, int shf, int prt, int run, int g, int rad) {
    callbacks.call<void>("annunciators", updn, shf, prt, run, g, rad);
}

bool shell_wants_cpu() {
    return false;
}

void shell_delay(int duration) {}

void shell_request_timeout3(int delay) {
    callbacks.call<void>("requestTimeout", delay);
}

uint8 shell_get_mem() {
    return 16000;
}

bool shell_low_battery() {
    return false;
}

void shell_powerdown() {
    callbacks.call<void>("powerdown");
}

int8 shell_random_seed() {
    return std::rand();
}

uint4 shell_milliseconds() {
    auto now = std::chrono::system_clock::now();
    auto epoch = now.time_since_epoch();
    auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(epoch);

    return ms.count();
}

const char *shell_number_format() {
    return ".,33";
}

int shell_date_format() {
    return 1;
}

bool shell_clk24() {
    return 1;
}

void shell_print(const char *text, int length,
                 const char *bits, int bytes_per_line,
                 int x, int y, int width, int height) {}

// stolen from gtk impl
void shell_get_time_date(uint4 *time, uint4 *date, int *weekday) {
    struct timeval tv;
    gettimeofday(&tv, NULL);
    struct tm tms;
    localtime_r(&tv.tv_sec, &tms);
    if (time != NULL)
        *time = ((tms.tm_hour * 100 + tms.tm_min) * 100 + tms.tm_sec) * 100 + tv.tv_usec / 10000;
    if (date != NULL)
        *date = ((tms.tm_year + 1900) * 100 + tms.tm_mon + 1) * 100 + tms.tm_mday;
    if (weekday != NULL)
        *weekday = tms.tm_wday;
}


void shell_message(const char *message) {
    EM_ASM(alert(message));
}

void shell_log(const char *message) {
    printf("Free42: %s", message);
}
