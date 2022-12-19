<script lang="ts">
    import { RadioGroup, RadioGroupOption } from "@rgossiaux/svelte-headlessui";
    import { GlobalLanguage, Constants } from "../store";
    import { fade, scale } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { onMount } from "svelte";
    import { SpeakText } from "../utils";

    onMount(async () => {
        console.log("Loaded Language Selection");
        SpeakText("ChooseLanguage");
    });

    function classNames(...classes: (string | false | null | undefined)[]) {
        return classes.filter(Boolean).join(" ");
    }
    let access = [
        {
            id: "Eng",
            name: "English",
        },
        {
            id: "Hin",
            name: "हिन्दी",
        },
    ];
    let active = "Eng";

    import { link } from "svelte-spa-router";
    let nextLink = "/options/location";
    let homeLink = "/";
</script>

<div
    transition:scale={{ delay: 50, duration: 200, easing: cubicOut }}
    class="flex h-screen w-screen "
>
    <div class="w-3/4 m-auto">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            use:link={homeLink}
            class="decoration-black no-underline hover:text-black"
            ><h2 class="text-4xl">SAQI</h2></a
        >
        <RadioGroup
            value={active}
            on:change={(event) => {
                active = event.detail;
                GlobalLanguage.set(event.detail);
                SpeakText("lang");
                console.log("Setting Language", active);
            }}
        >
            <fieldset class="space-y-4 content-center">
                <legend class="mb-4">
                    <h2 class="text-3xl m-5">
                        Choose Language <br />भाषा चुनें
                    </h2>
                </legend>

                <div class="space-y-1 m-auto w-32">
                    {#each access as { id, name }, i (id)}
                        <RadioGroupOption
                            value={id}
                            class={({ checked }) =>
                                classNames(
                                    "h-16 mb-4 relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none border-slate-100 border-2  border-solid",
                                    checked
                                        ? "bg-sky-900 bg-opacity-75 text-white"
                                        : "bg-white"
                                )}
                            let:active
                            let:checked
                        >
                            <div
                                class="flex justify-between items-center w-full"
                            >
                                <div class="flex items-center">
                                    <div class="text-sm">
                                        <p
                                            id="headlessui-label-4"
                                            class={classNames(
                                                "text-xl text-left",
                                                checked
                                                    ? "text-white"
                                                    : "text-gray-900"
                                            )}
                                        >
                                            {name}
                                        </p>
                                        <!-- <span
                                            id="headlessui-description-5"
                                            class={classNames(
                                                active
                                                    ? "inline text-sky-100"
                                                    : "inline text-gray-500"
                                            )}
                                        >
                                            {description}
                                        </span> -->
                                    </div>
                                </div>
                                <div>
                                    {#if checked}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="#EEEEEE"
                                            class="h-5 w-5 text-indigo-500"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    {/if}
                                </div>
                            </div>
                        </RadioGroupOption>
                    {/each}
                </div>
            </fieldset>
        </RadioGroup>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a use:link={nextLink}>
            <button
                class="text-xl mt-32 p-4 text-center content-center m-auto rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none bg-sky-900 bg-opacity-75 text-white"
                >{$Constants["NextPage"]}
            </button>
        </a>
    </div>
</div>
