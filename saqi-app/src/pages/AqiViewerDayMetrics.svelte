<script lang="ts">
    import { scale } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { link } from "svelte-spa-router";
    import { Constants, GlobalLanguage } from "../store";
    import { get } from "svelte/store";
    // import { DatePicker } from "attractions";
    import { SpeakText, SpeakTextDirectMessage, getAQIIndex, runSPARQL, sleep } from "../utils";
    import { aqi_sparql_day } from "../data/sparql";
    import { Datepicker } from "svelte-calendar";
    import { Loading } from "attractions";
    import { onMount } from "svelte";

    let nextLink = "/prompt";
    let homeLink = "/";
    let pickedRange;
    type PMbyTimeofDay = {
        pm25: number;
        timeofday: string;
        class: string;
    };
    let aqi_data: PMbyTimeofDay[] = [
        {
            pm25: 0.0,
            timeofday: "Morning",
            class: "Good",
        },
        {
            pm25: 0.0,
            timeofday: "Afternoon",
            class: "Good",
        },
        {
            pm25: 0.0,
            timeofday: "Evening",
            class: "Good",
        },
        {
            pm25: 0.0,
            timeofday: "Night",
            class: "Good",
        },
    ];
    let max_min_timeofday = ["", ""];
    const theme = {
        calendar: {
            // width: "700px",
            // maxWidth: "100vw",
            // legend: {
            //     height: "45px",
            // },
            shadow: "0px 10px 26px rgba(0, 0, 0, 0.25)",
            colors: {
                text: {
                    primary: "#1e5a5c",
                    highlight: "#fff",
                },
                background: {
                    primary: "#fff",
                    highlight: "#5F9EA0",
                    hover: "#eee",
                },
                border: "#aaa",
            },
            // font: {
            //     regular: "1.5em",
            //     large: "37em",
            // },
            grid: {
                disabledOpacity: ".35",
                outsiderOpacity: ".6",
            },
        },
    };

    // Calendar
    const start_date = new Date(2021, 10, 1);
    const end_date = new Date(2022, 1, 28);
    let format = "dddd, MMMM D, YYYY";
    let selected_start = new Date(2021, 11, 1);
    let selected_end = new Date(2021, 11, 10);
    let is_loading_aqi = false;
    $: {
        date_changed(selected_start);
    }
    $: {
        date_changed(selected_end);
    }
    async function date_changed(newValue) {
        is_loading_aqi = true;
        sleep(2000);
        console.log("start date", selected_start);
        console.log("end date", selected_end);
        let query = await aqi_sparql_day(
            Constants["SpatialLocation"],
            selected_start,
            selected_end
        );
        console.log("Sending");
        let data = await runSPARQL(query);
        console.log("got data");
        console.log(data);
        type order_dict = {
            sort_key: number;
            index: number;
        };
        let order_dict_list: order_dict[] = [];
        for (var i = 0; i < 4; i++) {
            aqi_data[i].pm25 = Math.round(
                data["results"]["bindings"][i]["pm_25"]["value"]
            );
            order_dict_list.push({ sort_key: aqi_data[i].pm25, index: i });
        }
        order_dict_list.sort(function (a, b) {
            return a.sort_key - b.sort_key;
        });
        for (var i = 0; i < 4; i++) {
            switch (i) {
                case 0:
                    aqi_data[order_dict_list[i].index].class = "Good";
                    max_min_timeofday[0] =
                        aqi_data[order_dict_list[i].index].timeofday;
                    break;
                case 1:
                    aqi_data[order_dict_list[i].index].class = "Moderate";
                    break;
                case 2:
                    aqi_data[order_dict_list[i].index].class = "Poor";
                    break;
                case 3:
                    aqi_data[order_dict_list[i].index].class = "VeryPoor";
                    max_min_timeofday[1] =
                        aqi_data[order_dict_list[i].index].timeofday;
                    break;
            }
        }
        console.log(aqi_data,max_min_timeofday);
        // SpeakTextDirectMessage()
        // aqi_data.pm10 = Math.round(
        //     data["results"]["bindings"][1]["pm_10"]["value"]
        // );
        // aqi_data.pm25 = Math.round(
        //     data["results"]["bindings"][1]["pm_25"]["value"]
        // );
        is_loading_aqi = false;
    }
    let aqi_class: string[] = ["Good", "Good", "Good", "Good"];
</script>

<div
    transition:scale={{ delay: 50, duration: 200, easing: cubicOut }}
    class="flex h-screen w-screen bg-white"
>
    <div class="w-3/4 m-auto flex flex-col mt-16 mb-32 space-y-4">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            use:link={homeLink}
            class="decoration-black no-underline hover:text-black"
            ><h2 class="text-4xl mb-4 text-black">SAQI</h2></a
        >
        <div
            class="flex-1 text-center bg-slate-100 rounded-lg border border-slate-400 shadow-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
            <!-- <h4 class="text-center mb-4 pt-3 text-xl">Select date range</h4> -->
            <!-- <DatePicker
                bind:value={date_selected}
                on:change={update_aqi}
                range
            /> -->

            <div>
                <h3 class="flex flex-col mb-4">Select Date Range</h3>
                <Datepicker
                    {theme}
                    {format}
                    bind:selected={selected_start}
                    start={start_date}
                    end={end_date}
                /><span class="mx-2 font-bold align-middle">-</span><Datepicker
                    {theme}
                    {format}
                    bind:selected={selected_end}
                    start={start_date}
                    end={end_date}
                />
            </div>

            <div
                class="p-8 rounded-lg dark:bg-gray-800"
                id="stats"
                role="tabpanel"
                aria-labelledby="stats-tab"
            >
                <dl
                    class="mt-2 grid grid-cols-3 gap-2 p-2 mx-auto max-w-screen-xl text-gray-900 sm:grid-cols-2 xl:grid-cols-2 dark:text-white sm:p-8"
                >
                    <div class="flex flex-col justify-center items-center mb-4">
                        {#if is_loading_aqi}
                            <Loading />
                        {:else}
                            <dt
                                class="mb-2 text-4xl font-extrabold {aqi_data[0]
                                    .class}"
                            >
                                {aqi_data[0].pm25}
                            </dt>
                        {/if}
                        <dd class="font-xl text-gray-500 dark:text-gray-400">
                            {$Constants["Morning"]} (PM 2.5)
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center mb-4">
                        {#if is_loading_aqi}
                            <Loading />
                        {:else}
                            <dt
                                class="mb-2 text-4xl font-extrabold {aqi_data[1]
                                    .class}"
                            >
                                <span>{aqi_data[1].pm25}</span>
                            </dt>
                        {/if}
                        <dd class="font-xl text-gray-500 dark:text-gray-400">
                            {$Constants["Afternoon"]} (PM 2.5)
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        {#if is_loading_aqi}
                            <Loading />
                        {:else}
                            <dt
                                class="mb-2 text-4xl font-extrabold {aqi_data[2]
                                    .class}"
                            >
                                {aqi_data[2].pm25}
                            </dt>
                            <dd
                                class="font-xl text-gray-500 dark:text-gray-400"
                            >
                                {$Constants["Evening"]} (PM 2.5)
                            </dd>
                        {/if}
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        {#if is_loading_aqi}
                            <Loading />
                        {:else}
                            <dt
                                class="mb-2 text-4xl font-extrabold {aqi_data[3]
                                    .class}"
                            >
                                {aqi_data[3].pm25}
                            </dt>
                            <dd
                                class="font-xl text-gray-500 dark:text-gray-400"
                            >
                                {$Constants["Night"]} (PM 2.5)
                            </dd>
                        {/if}
                    </div>
                    <!-- <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-4xl font-extrabold {aqi_class}">
                            {aqi_data2.pm25}
                        </dt>
                        <dd class="font-xl text-gray-500 dark:text-gray-400">
                            PM 2.5 CPCB
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-4xl font-extrabold {aqi_class}">
                            <span>{aqi_data2.pm10}</span>
                        </dt>
                        <dd class="font-xl text-gray-500 dark:text-gray-400">
                            PM 10 CPCB
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-4xl font-extrabold {aqi_class}">
                            {aqi_value}
                        </dt>
                        <dd class="font-xl text-gray-500 dark:text-gray-400">
                            AQI CPCB
                        </dd>
                    </div> -->
                    <!-- <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-3xl font-extrabold">35°C</dt>
                        <dd class="font-lg text-gray-500 dark:text-gray-400">
                            Temprature
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-3xl font-extrabold">53.24%</dt>
                        <dd class="font-lg text-gray-500 dark:text-gray-400">
                            Humidity
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-3xl font-extrabold">29.96 "Hg</dt>
                        <dd class="font-light text-gray-500 dark:text-gray-400">
                            Pressure
                        </dd>
                    </div> -->
                </dl>
            </div>
            {#if $GlobalLanguage == "Eng"}
                <h2 class="text-center mb-4 pt-3 text-2xl {aqi_class}">
                    {$Constants["MaxPollutionIn"]}<span class="Good"
                        >{$Constants[max_min_timeofday[0]]}</span
                    >
                </h2>
                <h2 class="text-center mb-4 pt-3 text-2xl {aqi_class}">
                    {$Constants["MinPollutionIn"]}<span class="VeryPoor"
                        >{$Constants[max_min_timeofday[1]]}</span
                    >
                </h2>
            {:else}
                <h2 class="text-center mb-4 pt-3 text-2xl {aqi_class}">
                    <span class="Good">{$Constants[max_min_timeofday[0]]}</span
                    >{$Constants["MaxPollutionIn"]}
                </h2>
                <h2 class="text-center mb-4 pt-3 text-2xl {aqi_class}">
                    <span class="VeryPoor"
                        >{$Constants[max_min_timeofday[1]]}</span
                    >{$Constants["MinPollutionIn"]}
                </h2>
            {/if}
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

<style>
    .Good {
        color: cadetblue;
    }
    .Satisfactory {
        color: cornflowerblue;
    }
    .Moderate {
        color: burlywood;
    }
    .Poor {
        color: darksalmon;
    }
    .VeryPoor {
        color: chocolate;
    }
    .Severe {
        color: brown;
    }
</style>
