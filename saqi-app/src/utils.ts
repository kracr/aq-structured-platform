export const voices = ['Google Deutsch', 'Google US English', 'Google UK English Female', 'Google UK English Male', 'Google español', 'Google español de Estados Unidos', 'Google français', 'Google हिन्दी', 'Google Bahasa Indonesia', 'Google italiano', 'Google 日本語', 'Google 한국의', 'Google Nederlands', 'Google polski', 'Google português do Brasil', 'Google русский', 'Google 普通话（中国大陆）', 'Google 粤語（香港）', 'Google 國語（臺灣）']
import { SpeechVoices, GlobalLanguage, Constants, IsMuted } from "./store";
import { get } from 'svelte/store'
export function SpeakText(message_key: string) {
    console.log(get(SpeechVoices), get(GlobalLanguage))
    console.log("speaking lang:", get(GlobalLanguage), "voice:", get(SpeechVoices)[get(GlobalLanguage)], "text:", get(Constants)[message_key]);
    let speech = new SpeechSynthesisUtterance();
    speech.voice = get(SpeechVoices)[get(GlobalLanguage)];
    speech.text = get(Constants)[message_key]
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    if (!get(IsMuted))
        window.speechSynthesis.speak(speech);
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}
type AQIData = {
    pm25: number;
    pm10: number;
    so2: number;
    no2: number;
    co: number;
    o3: number;
    nh3: number;
};
export async function runSPARQL(query: string) {
    console.log(query)
    // let response = await fetch('http://localhost:3030/#/dataset/aq-store/query?query=' + encodeURIComponent(query))

    let response = await fetch("http://localhost:3030/aq-store/query",
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "query=" + encodeURIComponent(query)
        })
    console.log(response);
    let data = await response.json()
    console.log(data);
    return data
}
export function getAQIIndex(aqi_data: AQIData) {
    let pm25_index = get_PM25_subindex(aqi_data.pm25);
    let pm10_index = get_PM10_subindex(aqi_data.pm10);
    let so2_index = get_SO2_subindex(aqi_data.so2);
    let aqi_index = Math.round(Math.max(pm25_index, pm10_index, so2_index));
    let aqi_class = ""
    if (aqi_index <= 50)
        aqi_class = "Good"
    else if (aqi_index <= 100)
        aqi_class = "Satisfactory"
    else if (aqi_index <= 200)
        return "Moderate"
    else if (aqi_index <= 300)
        aqi_class = "Poor"
    else if (aqi_index <= 400)
        aqi_class = "VeryPoor"
    else if (aqi_index > 400)
        aqi_class = "Severe"
    else
        aqi_class = "Good"
    return [aqi_index, aqi_class]
}

function get_PM25_subindex(x) {
    if (x <= 30)
        return x * 50 / 30
    else if (x <= 60)
        return 50 + (x - 30) * 50 / 30
    else if (x <= 90)
        return 100 + (x - 60) * 100 / 30
    else if (x <= 120)
        return 200 + (x - 90) * 100 / 30
    else if (x <= 250)
        return 300 + (x - 120) * 100 / 130
    else if (x > 250)
        return 400 + (x - 250) * 100 / 130
    else
        return 0
}

function get_PM10_subindex(x) {
    if (x <= 50)
        return x
    else if (x <= 100)
        return x
    else if (x <= 250)
        return 100 + (x - 100) * 100 / 150
    else if (x <= 350)
        return 200 + (x - 250)
    else if (x <= 430)
        return 300 + (x - 350) * 100 / 80
    else if (x > 430)
        return 400 + (x - 430) * 100 / 80
    else
        return 0
}

function get_SO2_subindex(x) {
    if (x <= 40)
        return x * 50 / 40
    else if (x <= 80)
        return 50 + (x - 40) * 50 / 40
    else if (x <= 380)
        return 100 + (x - 80) * 100 / 300
    else if (x <= 800)
        return 200 + (x - 380) * 100 / 420
    else if (x <= 1600)
        return 300 + (x - 800) * 100 / 800
    else if (x > 1600)
        return 400 + (x - 1600) * 100 / 800
    else
        return 0
}

function get_NOx_subindex(x) {
    if (x <= 40)
        return x * 50 / 40
    else if (x <= 80)
        return 50 + (x - 40) * 50 / 40
    else if (x <= 180)
        return 100 + (x - 80) * 100 / 100
    else if (x <= 280)
        return 200 + (x - 180) * 100 / 100
    else if (x <= 400)
        return 300 + (x - 280) * 100 / 120
    else if (x > 400)
        return 400 + (x - 400) * 100 / 120
    else
        return 0
}
