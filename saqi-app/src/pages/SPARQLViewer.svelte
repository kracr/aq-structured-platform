<script lang="ts">
    import { scale } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { queries } from "../data/queryViewerData";
    import {
        Listbox,
        ListboxButton,
        ListboxOption,
        ListboxOptions,
    } from "@rgossiaux/svelte-headlessui";
    import { link } from "svelte-spa-router";
    import { IsSparql } from "./../store";
    let nextLink = "/prompt";
    function classNames(
        ...classes: (false | null | undefined | string)[]
    ): string {
        return classes.filter(Boolean).join(" ");
    }
    let queryList = queries;
    let selectedQuery = queries[0];

    let frame;
    const onload = (_) => {
        IsSparql.set(true);
        console.log("Loaded sparql", queries);
    };
</script>

<div
    use:onload
    transition:scale={{ delay: 50, duration: 200, easing: cubicOut }}
    class="flex h-screen w-screen bg-white"
>
    <div class="flex w-screen flex-col justify-center items-center">
        <div
            class="px-4 flex flex-auto w-screen flex-row gap-x-4 justify-evenly items-start content-center"
        >
            <div class="flex-none self-center">
                <h2 class="font-bold">Select Query</h2>
            </div>

            <div class="w-full my-2 mx-auto grow self-center">
                <div class="space-y-1">
                    <Listbox
                        value={selectedQuery}
                        on:change={(event) => {
                            selectedQuery = event.detail;
                            // const CodeMirrorRoot =
                            //     frame.contentDocument.querySelector(
                            //         ".CodeMirror"
                            //     );
                            console.log("Sending Data", selectedQuery);
                            frame.contentWindow.postMessage(
                                selectedQuery,
                                "https://XXXXX.XXXXX.XXX.XX"
                            );
                            // CodeMirrorRoot.CodeMirror.setValue("VALUE");
                            // console.log(frame);
                        }}
                    >
                        <!-- <ListboxLabel
                    class="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Lang
                  </ListboxLabel> -->

                        <div class="relative">
                            <span
                                class="inline-block w-full rounded-md shadow-sm"
                            >
                                <ListboxButton
                                    class="relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                >
                                    <span class="block truncate text-lg"
                                        >{selectedQuery.title}</span
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
                                    {#each queryList as query (query)}
                                        <ListboxOption
                                            value={query}
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
                                                    "block truncate text-left",
                                                    selected
                                                        ? "font-semibold"
                                                        : "font-normal"
                                                )}
                                            >
                                                {query.title}
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

            <div class="flex-none self-center m-auto">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a use:link={nextLink}>
                    <button
                        class=" text-xl p-2 content-center rounded-lg shadow-md cursor-pointer flex focus:outline-none bg-sky-900 bg-opacity-75 text-white"
                        >Go Back
                    </button></a
                >
            </div>
        </div>
        <iframe
            bind:this={frame}
            src={"https://saqi-er24.netlify.app/saqi/sparql/#/dataset/aq-store/query"}
            frameborder="0"
            allowtransparency
            style="width:100%;height: calc(100vh + 15px);"
            title="dashboard"
        />
    </div>
</div>
