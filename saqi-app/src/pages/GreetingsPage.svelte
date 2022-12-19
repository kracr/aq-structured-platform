<script>
    import { link } from "svelte-spa-router";
    let nextLink = "/options/lang";
    import { Constants } from "../store";
    import { fade, scale } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { onMount } from "svelte";
    import { SpeakText, sleep } from "../utils";

    onMount(async () => {
        console.log("Loaded greetings");
        // await sleep(1000);
        // SpeakText("SplashMessage");
    });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a class="" use:link={nextLink}>
    <div
        transition:scale={{ delay: 50, duration: 200, easing: cubicOut }}
        class="flex justify-center h-screen w-screen mb-12 splash-bg"
    >
        <button class="text-xl click-anywhere"
            >{$Constants["SplashText"]}</button
        >
    </div>
</a>

<style>
    .click-anywhere {
        position: absolute;
        bottom: 100px;
    }
    .splash-bg {
        background-image: url("saqi.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>
