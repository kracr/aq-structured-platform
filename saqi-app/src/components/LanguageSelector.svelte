<script lang="ts">
    import { GlobalLanguage } from "../store";
    import {
        Listbox,
        ListboxButton,
        // ListboxLabel,
        ListboxOption,
        ListboxOptions,
    } from "@rgossiaux/svelte-headlessui";
    import { SpeakText } from "../utils";
    function classNames(
        ...classes: (false | null | undefined | string)[]
    ): string {
        return classes.filter(Boolean).join(" ");
    }
    let languageList = ["Eng", "Hin"];
    let selectedLanguage = "Eng";
</script>

<div class="flex justify-center  bg-gray-50 lang-selector">
    <div class="w-full max-w-xs mx-auto">
        <div class="space-y-1">
            <Listbox
                value={$GlobalLanguage}
                on:change={(event) => {
                    GlobalLanguage.set(event.detail);
                    console.log(GlobalLanguage);
                    SpeakText("lang");
                }}
            >
                <!-- <ListboxLabel
            class="block text-sm font-medium leading-5 text-gray-700"
          >
            Lang
          </ListboxLabel> -->

                <div class="relative">
                    <span class="inline-block w-full rounded-md shadow-sm">
                        <ListboxButton
                            class="relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                        >
                            <span class="block truncate text-lg"
                                >{$GlobalLanguage}</span
                            >
                            <span
                                class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                            >
                                <svg
                                    class="w-5 h-5 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </span>
                        </ListboxButton>
                    </span>

                    <div
                        class="absolute w-full mt-1 bg-white rounded-md shadow-lg"
                    >
                        <ListboxOptions
                            class="py-1 overflow-auto text-lg leading-6 rounded-md shadow-xs max-h-60 focus:outline-none sm:text-sm sm:leading-5"
                        >
                            {#each languageList as lang (lang)}
                                <ListboxOption
                                    value={lang}
                                    class={({ active }) => {
                                        return classNames(
                                            "relative py-4 pl-3 cursor-default select-none pr-9 focus:outline-none",
                                            active
                                                ? "text-white bg-sky-900"
                                                : "text-gray-900"
                                        );
                                    }}
                                    let:active
                                    let:selected
                                >
                                    <span
                                        class={classNames(
                                            "block truncate",
                                            selected
                                                ? "font-semibold"
                                                : "font-normal"
                                        )}
                                    >
                                        {lang}
                                    </span>
                                    {#if selected}
                                        <span
                                            class={classNames(
                                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                                active
                                                    ? "text-white"
                                                    : "text-indigo-600"
                                            )}
                                        >
                                            <svg
                                                class="w-5 h-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    {/if}
                                </ListboxOption>
                            {/each}
                        </ListboxOptions>
                    </div>
                </div>
            </Listbox>
        </div>
    </div>
</div>

<style>
    .lang-selector {
        position: fixed;
        top: 25px;
        right: 20px;
        font-size: 1.3rem !important;
    }
</style>
