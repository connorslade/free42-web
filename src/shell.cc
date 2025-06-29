#include <stdint.h>
#include <cstdio>

#include "../free42/common/shell.h"

const char *shell_platform() {
    return "WebAssembly";
}

void shell_blitter(const char *bits, int bytesperline, int x, int y, int width, int height) {
    puts("Called shell_blitter\n");
}

void shell_beeper(int tone) {
    printf("Called shell_beeper with tone %d\n", tone);
}

void shell_annunciators(int updn, int shf, int prt, int run, int g, int rad) {
    printf("Called shell_annunciators with updn %d, shf %d, prt %d, run %d, g %d, rad %d\n", updn, shf, prt, run, g, rad);
}

bool shell_wants_cpu() {
    return false;
}

void shell_delay(int duration) {}

void shell_request_timeout3(int delay) {}

uint8 shell_get_mem() {
    return 100;
}

bool shell_low_battery() {
    return false;
}

void shell_powerdown() {
    printf("Called shell_powerdown\n");
}

int8 shell_random_seed() {
    return 0;
}

uint4 shell_milliseconds() {
    return 0;
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
                 const char *bits, int bytesperline,
                 int x, int y, int width, int height) {
    printf("PRINTER: %s\n", text);
}

void shell_get_time_date(uint4 *time, uint4 *date, int *weekday) {
    *time = 0;
    *date = 0;
    *weekday = 0;
}

void shell_message(const char *message) {
    printf("Called shell_message with message %s\n", message);
}

void shell_log(const char *message) {
    printf("Called shell_log with message %s\n", message);
}
