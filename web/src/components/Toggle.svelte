<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import { kebabCase } from "../lib/misc";

    interface CheckCallback {
      (checked: boolean): void;
    }

    let {
        onCheck,
        base,
        name,
    }: {
        onCheck: CheckCallback,
        base: boolean | undefined,
        name: string
    } = $props();
    let id = kebabCase(name);
</script>

<div>
    <input
        type="checkbox"
        {id}
        checked={base ?? false}
        oninput={(event) => {
            onCheck((event.target as HTMLInputElement).checked);
        }}
    />
    <label for={id}>{name}</label>
</div>
