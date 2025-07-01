<script>
    import { settings } from "../lib/settings";
    import Toggle from "./Toggle.svelte";

    // this is so painful :sob:
</script>

<h2>Settings</h2>

{#key settings}
    <Toggle
        base={$settings.matrixSingularmatrix}
        onCheck={(c) => settings.update((s) => s.setMatrixSingularmatrix(c))}
        name="Inverting or solving a singular matrix yields 'Singular Matrix' error"
    />
    <Toggle
        base={$settings.matrixOutOfRange}
        onCheck={(c) => settings.update((s) => s.setMatrixOutOfRange(c))}
        name="Overflows during matrix operations yield 'Out of Range' error"
    />
    <Toggle
        base={$settings.autoRepeat}
        onCheck={(c) => settings.update((s) => s.setAutoRepeat(c))}
        name="Auto-repeat for number entry and ALPHA mode"
    />
    <Toggle
        base={$settings.allowBigStack}
        onCheck={(c) => settings.update((s) => s.setAllowBigStack(c))}
        name="Allow Big Stack (NSTK) mode"
    />
    <Toggle
        base={$settings.localizedCopyPaste}
        onCheck={(c) => settings.update((s) => s.setLocalizedCopyPaste(c))}
        name="Localized Copy & Paste"
    />
{/key}
