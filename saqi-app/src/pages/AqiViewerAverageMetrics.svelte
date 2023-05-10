<script lang="ts">
    import { scale } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { link } from "svelte-spa-router";
    import { Constants, SpatialLocation } from "../store";
    import { get } from "svelte/store";
    // import { DatePicker } from "attractions";
    import { SpeakText, getAQIIndex, runSPARQL, sleep } from "../utils";
    import { aqi_sparql_avg } from "../data/sparql";
    import { Datepicker } from "svelte-calendar";
    import { Loading } from "attractions";

    let nextLink = "/prompt";
    let homeLink = "/";
    let pickedRange;
    type AQIData = {
        pm25: number;
        pm10: number;
        so2: number;
        no2: number;
        co: number;
        o3: number;
        nh3: number;
    };
    const default_aqi_data = {
        pm25: 0.0,
        pm10: 0.0,
        so2: 0.0,
        no2: 0.0,
        co: 0.0,
        o3: 0.0,
        nh3: 0.0,
    };
    let aqi_data: AQIData = {
        pm25: 404,
        pm10: 422,
        so2: 20.0,
        no2: 0.0,
        co: 0.0,
        o3: 0.0,
        nh3: 0.0,
    };
    let aqi_data_cpcb: AQIData = {
        pm25: 404,
        pm10: 422,
        so2: 20.0,
        no2: 0.0,
        co: 0.0,
        o3: 0.0,
        nh3: 0.0,
    };
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
        let query = await aqi_sparql_avg(
            Constants["SpatialLocation"],
            selected_start,
            selected_end
        );
        console.log("Sending");
        let data = await runSPARQL(query);
        console.log("got data", data["results"]["bindings"]);
        aqi_data.pm10 = Math.round(
            data["results"]["bindings"][1]["pm_10"]["value"]
        );
        aqi_data.pm25 = Math.round(
            data["results"]["bindings"][1]["pm_25"]["value"]
        );
        aqi_data_cpcb.pm10 = Math.round(
            data["results"]["bindings"][0]["pm_10"]["value"]
        );
        aqi_data_cpcb.pm25 = Math.round(
            data["results"]["bindings"][0]["pm_25"]["value"]
        );
        [aqi_value, aqi_class] = getAQIIndex(aqi_data);
        [aqi_value2, aqi_class2] = getAQIIndex(aqi_data_cpcb);
        is_loading_aqi = false;
    }

    let [aqi_value, aqi_class] = getAQIIndex(aqi_data);
    let [aqi_value2, aqi_class2] = getAQIIndex(aqi_data_cpcb);
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
            </div>
            <Datepicker
                {theme}
                {format}
                bind:selected={selected_start}
                start={start_date}
                end={end_date}
            /><Datepicker
                {theme}
                {format}
                bind:selected={selected_end}
                start={start_date}
                end={end_date}
            />

            <div
                class="p-8 rounded-lg dark:bg-gray-800"
                id="stats"
                role="tabpanel"
                aria-labelledby="stats-tab"
            >
                <dl
                    class="mt-2 grid grid-cols-3 gap-2 p-2 mx-auto max-w-screen-xl text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8"
                >
                    <div class="flex flex-col justify-center items-center">
                        {#if is_loading_aqi}
                            <Loading />
                        {:else}
                            <dt
                                class="mb-2 text-4xl font-extrabold {aqi_class}"
                            >
                                {aqi_data.pm25}
                            </dt>
                        {/if}
                        <dd class="font-xl text-gray-500 dark:text-gray-400">
                            PM 2.5
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        {#if is_loading_aqi}
                            <Loading />
                        {:else}
                            <dt
                                class="mb-2 text-4xl font-extrabold {aqi_class}"
                            >
                                <span>{aqi_data.pm10}</span>
                            </dt>
                        {/if}
                        <dd class="font-xl text-gray-500 dark:text-gray-400">
                            PM 10
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        {#if is_loading_aqi}
                            <Loading />
                        {:else}
                            <dt
                                class="mb-2 text-4xl font-extrabold {aqi_class}"
                            >
                                {aqi_value}
                            </dt>
                            <dd
                                class="font-xl text-gray-500 dark:text-gray-400"
                            >
                                AQI
                            </dd>
                        {/if}
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-4xl font-extrabold {aqi_class}">
                            {aqi_data_cpcb.pm25}
                        </dt>
                        <dd class="font-xl text-gray-500 dark:text-gray-400">
                            PM 2.5 CPCB
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-4xl font-extrabold {aqi_class}">
                            <span>{aqi_data_cpcb.pm10}</span>
                        </dt>
                        <dd class="font-xl text-gray-500 dark:text-gray-400">
                            PM 10 CPCB
                        </dd>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <dt class="mb-2 text-4xl font-extrabold {aqi_class}">
                            {aqi_value2}
                        </dt>
                        <dd class="font-xl text-gray-500 dark:text-gray-400">
                            AQI CPCB
                        </dd>
                    </div>
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
            <h2 class="text-center mb-4 pt-3 text-2xl {aqi_class}">
                {$Constants[aqi_class]}
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
