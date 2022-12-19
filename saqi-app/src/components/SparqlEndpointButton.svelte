<script lang="ts">
    import { Icon } from "@steeze-ui/svelte-icon";
    import { CircleStack } from "@steeze-ui/heroicons";
    import { link } from "svelte-spa-router";
    let sparql_link = "/sparql";
</script>

<div class="flex justify-center mute-selector">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a use:link={sparql_link}>
        <button
            class="mute-button"
            on:click={() => {
                console.log("Is muted");
            }}
        >
            <Icon src={CircleStack} theme="outline" class="icon-small" />
        </button>
    </a>
</div>

<style>
    .mute-selector {
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 20px;
        text-decoration: none;
    }
    .mute-button {
        padding: 15px;
        border-radius: 10px;
        border: 1px solid gray;
    }
    :global(.icon-small) {
        width: 1.6rem;
    }
</style>
