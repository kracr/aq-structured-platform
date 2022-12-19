<script lang="ts">
    import { scale } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { link } from "svelte-spa-router";
    import { Constants, GlobalLanguage } from "../store";
    let nextLink = "/prompt";
    let homeLink = "/";
    export let params;
    import { faq_prompt_data } from "../data/prompts";
    let currentPrompt = faq_prompt_data.find((o) => o.id == params.id);
    console.log(currentPrompt, params);
</script>

<div
    transition:scale={{ delay: 50, duration: 200, easing: cubicOut }}
    class="flex h-screen w-screen "
>
    <div class="w-3/4 m-auto flex flex-col mt-16 mb-32 space-y-4">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            use:link={homeLink}
            class="decoration-black no-underline hover:text-black"
            ><h2 class="text-4xl mb-4">SAQI</h2></a
        >
        <div
            class="flex-1 text-center bg-slate-100 rounded-lg border border-slate-400 shadow-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
            <!-- <h4 class="text-center mb-4 pt-3 text-xl">Select date range</h4> -->
            <h2 class="text-center mb-4 pt-3 text-4xl">
                {currentPrompt.title[$GlobalLanguage]}
            </h2>

            <h2 class="text-center mb-4 pt-3 text-2xl">
                {@html currentPrompt.description[$GlobalLanguage]}
            </h2>
        </div>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a use:link={nextLink}>
            <button
                class="text-xl mt-16 p-4 text-center content-center m-auto rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none bg-sky-900 bg-opacity-75 text-white"
                >{$Constants["Next"]}
            </button>
        </a>
    </div>
</div>
