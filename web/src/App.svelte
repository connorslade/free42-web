<script lang="ts">
    import Settings from "./components/Settings.svelte";
    import States from "./components/States.svelte";
    import Actions from "./components/Actions.svelte";
    import { version, status } from "./main";

    let params = new URLSearchParams(window.location.search);
    let popup = params.get("mini") != undefined;
</script>

{#if popup}
    <div>
        <canvas id="screen" width="340px" height="617px" class="pixelated">
        </canvas>
    </div>

    <style>
        body {
            margin: 0;
            overflow: hidden;
        }

        div {
            height: 100vh;
            width: 100vw;
        }

        canvas {
            position: relative;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
        }
    </style>
{:else}
    <div class="container">
        <h1>Free42 Web</h1>
        <p class="preamble">
            A web based
            <span title="Front end for the Free42 core library">shell</span> for
            <a href="https://thomasokken.com/free42/">Free42</a>. Created by
            <a href="https://connorcode.com">Connor Slade</a>,
            <a href="https://github.com/connorslade/free42-web">source code</a>
            is available on GitHub. I built a simple wrapper over the Free42 core
            library{#if $version != null}
                &nbsp;(<a
                    href="https://codeberg.org/thomasokken/free42/commit/{$version}"
                >
                    {$version}
                </a>)
            {/if}, compiled it to
            <a href="https://webassembly.org/">Web Assembly</a>, and implemented
            a custom front end for it with web technologies.
        </p>

        <div class="calculator">
            <div>
                <p>{$status}</p>
                <canvas
                    id="screen"
                    width="340px"
                    height="617px"
                    class="pixelated"
                >
                </canvas>
            </div>

            <div>
                <Actions />
                <hr />
                <States />
                <hr />
                <Settings />
            </div>
        </div>
    </div>
{/if}

<style>
    a:visited {
        color: rgb(0, 0, 238);
    }

    canvas {
        user-select: none;
    }

    .preamble {
        text-align: justify;
    }

    .container {
        max-width: 900px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .calculator {
        display: flex;
        gap: 16px;
    }

    .pixelated {
        image-rendering: pixelated;
    }

    @media (max-width: 800px) {
        .calculator {
            flex-direction: column;
            align-items: center;
        }
    }
</style>
