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

- [ ] Get program execution working
- [ ] Cleanup interface
- [x] Popout calculator
- [ ] Upload and downloads states and programs
- [ ] Printer??
- [ ] Shift the buttons when you click it?
- [ ] Fix keymap
- [ ] Allow loading custom skins
- [x] Settings menu
- [ ] Key repeating
- [ ] Offline support (PWA)
- [ ] Power off
- [ ] Different keyboard handing when in alphanumeric input
