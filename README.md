# free42-web

A work in progress web based shell for [Free42](https://thomasokken.com/free42), the HP-42S simulator.

![Screenshot from 2025-06-30 at 22_50_10 260384511](https://github.com/user-attachments/assets/773875f2-d527-470f-9f3e-f0a37a45ee2d)

## Building

You first need to build the Free42 based WASM library.
For this you will need to be on linux, have cloned the submodule, and installed make + emscripten.
Running `make build` in the root directory should make a new `out` folder with the needed binding files.

To build the front end, you will need pnpm installed.
In the `web` directory run `pnpm i` then `pnpm build`, which will generated all the needed files to host the site in `web/dist`.

## Todo

- [x] Get program execution working
- [x] Popout calculator
- [x] Upload and downloads states and programs
- [x] Settings menu
- [x] Fix keymap
- [x] Key repeating
- [ ] Offline support (PWA)
- [ ] Mobile support
- [ ] Power off
- [ ] Different keyboard handing when in alphanumeric input
- [ ] Allow loading custom skins
- [ ] Shift the buttons when you click it?
- [ ] look into memory leaks?
- [ ] Printer??
