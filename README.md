# free42-web

A web based shell for [Free42](https://thomasokken.com/free42), the HP-42S simulator.

![Screenshot 2025-07-08 at 15-40-41 Free42 Web](https://github.com/user-attachments/assets/bfd411b8-1014-431f-a361-0cfed376b7bc)

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
- [x] Mobile support
- [x] Power off
- [x] Different keyboard handing when in alphanumeric input
- [ ] Offline support (PWA)
- [ ] Allow loading custom skins
- [ ] Shift the buttons when you click it?
- [ ] look into memory leaks?
- [ ] Printer??
