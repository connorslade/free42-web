# free42-web

A work in progress web shell for Free42.

![Screen Shot 2025-06-30 at 01 17 18](https://github.com/user-attachments/assets/fc99d0ba-39da-4b2f-8415-b927d3e63878)

## Building

You first need to build the Free42 based WASM library.
For this you will need to be on linux, have cloned the submodule, and installed make + emscripten.
Running `make build` in the root directory should make a new `out` folder with the needed binging files.

To build the front end, you will need pnpm installed.
Then in the `web` directory run `pnpm i` then `pnpm build`.
