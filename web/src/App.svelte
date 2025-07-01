<script lang="ts">
    import States from "./components/States.svelte";
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

<div style="display: flex; gap: 16px">
    <canvas
        id="screen"
        width="340px"
        height="617px"
        style="image-rendering: pixelated"
    ></canvas>

    <div>
        <States />
    </div>
</div>
