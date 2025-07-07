<script>
    import { shell } from "../main";
</script>

<h2>Actions</h2>
<p>Use the 'Pop Out' button to open a popup window with just the calculator.</p>

<button
    onclick={() => {
        window.open("/?mini=true", "Free42 Web", "popup width=340p height=615");
    }}>Pop Out</button
>
<button onclick={() => shell?.free42.reset()}>Reset</button>
