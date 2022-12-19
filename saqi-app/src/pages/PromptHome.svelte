<script lang="ts">
    import { scale } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { link } from "svelte-spa-router";
    import { Constants, GlobalLanguage } from "../store";
    import {
        faq_prompt_data,
        aqi_prompt_data,
        sparql_prompt_data,
    } from "../data/prompts";
    import type { Prompt } from "../data/prompts";
    import { onMount } from "svelte";
    import { SpeakText, getRandomInt, stripHtml } from "../utils";
    import SparqlEndpointButton from "../components/SparqlEndpointButton.svelte";

    onMount(async () => {
        console.log("Loaded Language Selection");
        SpeakText("nextPromptTitle");
    });
    let nextLink = "/prompt";
    let homeLink = "/";

    let faq_choice_1 = getRandomInt(faq_prompt_data.length);
    let faq_choice_2 = getRandomInt(faq_prompt_data.length);
    let faq_choice_3 = getRandomInt(faq_prompt_data.length);

    let sparql_choice = getRandomInt(sparql_prompt_data.length);

    let aqi_choice = getRandomInt(aqi_prompt_data.length);
    while (faq_choice_2 == faq_choice_1)
        faq_choice_2 = getRandomInt(faq_prompt_data.length);
    while (faq_choice_3 == faq_choice_2 && faq_choice_3 == faq_choice_1)
        faq_choice_3 = getRandomInt(faq_prompt_data.length);

    let current_prompts: Prompt[] = [
        aqi_prompt_data[aqi_choice],
        faq_prompt_data[faq_choice_1],
        faq_prompt_data[faq_choice_2],
        faq_prompt_data[faq_choice_3],
        // sparql_prompt_data[sparql_choice],
    ];
    type PromptData = {
        id: string;
        title: string;
        description: string;
        url: string;
    };
</script>

<div
    transition:scale={{ delay: 50, duration: 200, easing: cubicOut }}
    class="flex h-screen w-screen "
>
    <SparqlEndpointButton />
    <div class="w-3/4 m-auto flex flex-col mt-32 mb-32 ">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            use:link={homeLink}
            class="decoration-black no-underline hover:text-black"
            ><h2 class="text-4xl mb-8">SAQI</h2></a
        >
        <div class="flex-1 flow-root">
            <!-- <h2 class="text-2xl mb-8">{$Constants["nextPromptTitle"]}</h2> -->
            <!-- svelte-ignore a11y-no-redundant-roles -->
            <ul
                role="list"
                class="divide-y space-y-2 divide-gray-200 dark:divide-gray-700"
            >
                <!-- <li>
                    <h2 class="text-2xl text-left mb-4">
                        {$Constants["nextPromptTitle"]}
                    </h2>
                </li> -->
                {#each current_prompts as { id, title, description, url }}
                    <li class="text-xl text-left py-3 sm:py-4">
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <a
                            use:link={url}
                            class="shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <div class="flex items-center space-x-4">
                                <div class="min-w-0">
                                    <p
                                        class="text-xl text-gray-900 truncate dark:text-white"
                                    >
                                        {title[$GlobalLanguage]}
                                    </p>
                                    <p
                                        class="text-xl text-gray-500 truncate dark:text-gray-400"
                                    >
                                        {stripHtml(
                                            description[$GlobalLanguage]
                                        )}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a use:link={homeLink}>
            <button
                class="text-xl mt-16 p-4 text-center content-center m-auto rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none bg-sky-900 bg-opacity-75 text-white"
                >{$Constants["GoBack"]}
            </button>
        </a>
    </div>
</div>
