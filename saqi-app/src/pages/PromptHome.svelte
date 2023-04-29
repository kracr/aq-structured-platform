<script lang="ts">
    import { scale } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { link } from "svelte-spa-router";
    import { get } from "svelte/store";
    import { Constants, GlobalLanguage, SocialCohort } from "../store";
    import {
        faq_prompt_data,
        aqi_prompt_data,
        sparql_prompt_data,
        cohorts_prompt_data,
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
    let reloadLink = "/prompt";
    let selectedSocialCohort = get(SocialCohort);

    let faq_choice_1 = getRandomInt(faq_prompt_data.length);
    let faq_choice_2 = getRandomInt(faq_prompt_data.length);
    let faq_choice_3 = getRandomInt(faq_prompt_data.length);

    let sparql_choice = getRandomInt(sparql_prompt_data.length);

    let aqi_choice = getRandomInt(aqi_prompt_data.length);
    while (faq_choice_2 == faq_choice_1)
        faq_choice_2 = getRandomInt(faq_prompt_data.length);
    while (faq_choice_3 == faq_choice_2 && faq_choice_3 == faq_choice_1)
        faq_choice_3 = getRandomInt(faq_prompt_data.length);

    let faq_prompt_1 = faq_prompt_data[faq_choice_1];
    let faq_prompt_2 = faq_prompt_data[faq_choice_2];
    let faq_prompt_3 = faq_prompt_data[faq_choice_3];

    console.log("Selected Cohort", selectedSocialCohort);
    if (selectedSocialCohort !== "Academy") {
        faq_prompt_3 = cohorts_prompt_data[selectedSocialCohort];
    }
    let current_prompts: Prompt[] = [
        aqi_prompt_data[aqi_choice],
        faq_prompt_1,
        faq_prompt_2,
        faq_prompt_3,
        // sparql_prompt_data[sparql_choice],
    ];
    type PromptData = {
        id: string;
        title: string;
        description: string;
        url: string;
    };

    function handleClick() {
        faq_choice_1 = getRandomInt(faq_prompt_data.length);
        faq_choice_2 = getRandomInt(faq_prompt_data.length);
        faq_choice_3 = getRandomInt(faq_prompt_data.length);

        sparql_choice = getRandomInt(sparql_prompt_data.length);

        aqi_choice = getRandomInt(aqi_prompt_data.length);
        while (faq_choice_2 == faq_choice_1)
            faq_choice_2 = getRandomInt(faq_prompt_data.length);
        while (faq_choice_3 == faq_choice_2 && faq_choice_3 == faq_choice_1)
            faq_choice_3 = getRandomInt(faq_prompt_data.length);

        faq_prompt_1 = faq_prompt_data[faq_choice_1];
        faq_prompt_2 = faq_prompt_data[faq_choice_2];
        faq_prompt_3 = faq_prompt_data[faq_choice_3];

        console.log("Selected Cohort", selectedSocialCohort);
        if (selectedSocialCohort !== "Academy") {
            faq_prompt_3 = cohorts_prompt_data[selectedSocialCohort];
        }
        current_prompts = [
            aqi_prompt_data[aqi_choice],
            faq_prompt_1,
            faq_prompt_2,
            faq_prompt_3,
            // sparql_prompt_data[sparql_choice],
        ];
    }
</script>

<div
    transition:scale={{ delay: 50, duration: 200, easing: cubicOut }}
    class="flex h-screen w-screen bg-white"
>
    <!-- <SparqlEndpointButton /> -->
    <div class="w-3/4 m-auto flex flex-col mt-32 mb-32">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            use:link={homeLink}
            class="decoration-black no-underline hover:text-black"
            ><h2 class="text-4xl mb-8 text-black">SAQI</h2></a
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
                                    <p class="text-lg text-black truncate">
                                        {title[$GlobalLanguage]}
                                    </p>
                                    <p class="text-base text-gray-700 truncate">
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
            <!-- svelte-ignore a11y-missing-attribute -->
            <button
                on:click={handleClick}
                class="text-md mt-2 p-4 text-center content-center m-auto rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none bg-opacity-75 text-black"
                >{$Constants["Next"]}
            </button>
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
