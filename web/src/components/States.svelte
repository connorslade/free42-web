<script lang="ts">
    import { shell, states } from "../main";

    let stateName: string = $state("");
    let selected: string[] = $state([]);

    $effect(() => {
        console.log(selected);
    });
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
