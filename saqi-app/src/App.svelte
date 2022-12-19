<script lang="ts">
  import Router from "svelte-spa-router";

  import NotFound from "./pages/NotFound.svelte";
  import LanguageSelection from "./pages/LanguageSelection.svelte";
  import GreetingsPage from "./pages/GreetingsPage.svelte";
  import PromptHome from "./pages/PromptHome.svelte";
  import LocationSelection from "./pages/LocationSelection.svelte";
  import CohortSelection from "./pages/CohortSelection.svelte";

  import AqiViewerAverageMetrics from "./pages/AqiViewerAverageMetrics.svelte";
  import AqiViewerDayMetrics from "./pages/AqiViewerDayMetrics.svelte";
  import FaqPage from "./pages/FaqPage.svelte";
  import SPARQLViewer from "./pages/SPARQLViewer.svelte";

  import BaseLayout from "./components/BaseLayout.svelte";
  import LanguageSelector from "./components/LanguageSelector.svelte";
  import Particles from "./components/Particles.svelte";
  import MuteSelector from "./components/MuteSelector.svelte";
  import FullScreenLoader from "./components/FullScreenLoader.svelte";
  import SparqlViewer from "./pages/SPARQLViewer.svelte";

  import { SpeechVoices, IsSparql } from "./store";
  import { sleep } from "./utils";

  const routes = {
    "/": GreetingsPage,
    "/options/lang": LanguageSelection,
    "/options/location": LocationSelection,
    "/options/cohort": CohortSelection,
    "/prompt": PromptHome,
    "/prompt/faq/:id": FaqPage,
    "/prompt/sparql/:id": SPARQLViewer,
    "/prompt/aqi/avg": AqiViewerAverageMetrics,
    "/prompt/aqi/day": AqiViewerDayMetrics,
    "/sparql": SparqlViewer,
    "*": NotFound,
  };

  let isSpeechLoaded = false;

  window.speechSynthesis.onvoiceschanged = async function () {
    console.log("Speech Loaded, Voices available");
    let voices = window.speechSynthesis.getVoices();
    let hin_voice = voices.find((o) =>
      /हिन्दी|hindi|Kalpana/gi.test(o.voiceURI)
    );
    let eng_voice = voices.find((o) =>
      /Google हिन्दी|Ravi|English\ \(India\)/gi.test(o.voiceURI)
    );
    if (eng_voice === undefined) {
      eng_voice = voices.find((o) => /English/gi.test(o.voiceURI));
    }
    console.log("Voices Selected", hin_voice, eng_voice);
    SpeechVoices.set({ Eng: eng_voice, Hin: hin_voice });
    await sleep(1000);
    isSpeechLoaded = true;
  };

  function routeLoaded(event) {
    if (event.detail.location == "/sparql") {
      IsSparql.set(true);
    } else {
      IsSparql.set(false);
    }
    console.log("is sparql page", $IsSparql);
    console.log("Location", event.detail.location);
  }
</script>

<main class="h-screen w-screen">
  {#if !$IsSparql}
    <LanguageSelector />
    <MuteSelector />
    <Particles />
  {/if}
  <Router {routes} on:routeLoaded={routeLoaded} />
  {#if !isSpeechLoaded}
    <FullScreenLoader />
  {/if}
</main>

<style global>
  @tailwind utilities;
  @tailwind components;
  @tailwind base;
</style>
