<script lang="ts">
    import { downloadFile } from "../lib/misc";
    import { shell } from "../main";

    async function importProgram(event: any) {
        const target = event.target as HTMLInputElement | null;
        if (!target || !target.files || target.files.length <= 0) return;

        for (let file of target.files) {
            let bytes = new Uint8Array(await file.arrayBuffer());
            shell?.free42.loadProgram(bytes);
        }
    }
</script>

<h2>Actions</h2>
<p>Use the 'Pop Out' button to open a popup window with just the calculator.</p>

<button
    onclick={() => {
        window.open("/?mini=true", "Free42 Web", "popup width=340p height=615");
    }}>Pop Out</button
>

<button>
    <label for="importProgram">Import Program</label>
</button>
<input
    type="file"
    id="importProgram"
    style="display:none"
    onchange={importProgram}
/>

<button
    onclick={() => {
        let bytes = shell?.free42.exportProgram();
        downloadFile(bytes, "raw", "program.raw");
    }}>Export Program</button
>

<button onclick={() => shell?.free42.reset()}>Reset</button>
