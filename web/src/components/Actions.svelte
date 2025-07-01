<script>
    import { shell } from "../main";
</script>

<h2>Actions</h2>
<button
    onclick={() => {
        window.open("/?mini=true", "Free42 Web", "popup width=340p height=617");
    }}>Pop Out</button
>
<button onclick={() => shell?.free42.reset()}>Reset</button>
