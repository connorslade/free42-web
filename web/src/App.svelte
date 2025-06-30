<script lang="ts">
    import { Shell } from "./lib/shell";
    import { Layout } from "./lib/layout";
    import { Keymap } from "./lib/keymap";

    window.addEventListener("load", async () => {
        let skin = await loadImage("skin.gif");
        let layout = new Layout(await (await fetch("skin.layout")).text());
        let keymap = new Keymap(await (await fetch("keymap.txt")).text());
        let module = await Free42();

        (window as any).shell = new Shell(module, skin, layout, keymap);
    });

    async function loadImage(path: string): Promise<HTMLImageElement> {
        let skin = new Image();
        skin.src = path;
        return new Promise((resolve) => {
            skin.onload = () => resolve(skin);
        });
    }
</script>

<h1>Free42 Online</h1>
<p>
    An online
    <span title="Front end for the Free42 core library">shell</span> for
    <a href="https://thomasokken.com/free42/">Free42</a>, . Created by
    <a href="https://connorcode.com">Connor Slade</a>,
    <a href="https://github.com/connorslade/free42-web">source code</a>
    is available on GitHub.
</p>

<canvas
    id="screen"
    width="340px"
    height="617px"
    style="image-rendering: pixelated"
></canvas>

<h2>States</h2>
<input type="text" placeholder="State Name" />
<button>Save State</button>

<div id="states"></div>
