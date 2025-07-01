<script lang="ts">
    import { shell, states } from "../main";

    let stateName: string = $state("");
</script>

<h2>States</h2>
<button onclick={() => shell?.free42.reset()}>Reset</button>

<br />
<input type="text" placeholder="State Name" bind:value={stateName} />
<button
    onclick={() => {
        shell?.states.save(stateName.trim() + ".f42");
        stateName = "";
    }}>Save State</button
>

<ul>
    {#each $states as state}
        <li>
            {state}
            <button onclick={() => shell?.states.load(state)}>Load</button>
            <button onclick={() => shell?.states.save(state)}>Save</button>
            <button onclick={() => shell?.states.delete(state)}>Delete</button>
        </li>
    {/each}
</ul>
