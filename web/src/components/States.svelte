<script lang="ts">
    import { downloadFile } from "../lib/misc";
    import { shell, states } from "../main";

    let stateName: string = $state("");
    let selected: string[] = $state([]);

    async function uploadState(event: any) {
        const target = event.target as HTMLInputElement | null;
        if (!target || !target.files || target.files.length <= 0) return;

        for (let file of target.files) {
            if (file.name == "active") continue;
            let bytes = new Uint8Array(await file.arrayBuffer());
            shell?.free42.FS.writeFile(`/states/${file.name}`, bytes, {});
        }

        shell?.states.refresh();
    }
</script>

<h2>States</h2>

<div>
    <input type="text" placeholder="State Name" bind:value={stateName} />
    <button
        onclick={() => {
            shell?.states.save(stateName.trim() + ".f42");
            stateName = "";
        }}>Save State</button
    >

    <button>
        <label for="uploadState">Upload State</label>
    </button>
    <input
        type="file"
        id="uploadState"
        style="display:none"
        onchange={uploadState}
    />
</div>

<div class="buttons">
    <button
        disabled={selected.length != 1}
        onclick={() => shell?.states.load(selected[0])}>Load</button
    >
    <button
        disabled={selected.length != 1}
        onclick={() => shell?.states.save(selected[0])}>Save</button
    >
    <button
        disabled={selected.length < 1}
        onclick={() => {
            for (let state of selected) {
                let bytes = shell?.free42.FS.readFile(`/states/${state}`);
                if (bytes != undefined) downloadFile(bytes, "f42", state);
            }
        }}>Download</button
    >
    <button
        disabled={selected.length < 1}
        onclick={() => {
            for (let state of selected) shell?.states.delete(state);
        }}>Delete</button
    >
</div>

<select multiple bind:value={selected}>
    {#each $states as state}
        <option value={state}>{state}</option>
    {/each}
</select>

<style>
    select {
        margin-top: 12px;
        width: 240px;
    }

    .buttons {
        margin-top: 12px;
    }
</style>
