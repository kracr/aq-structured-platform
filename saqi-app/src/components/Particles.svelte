<script lang="ts">
    import Particles from "svelte-particles";
    import { loadFull } from "tsparticles";

    let particlesConfig = {
        particles: {
            number: {
                value: 10,
                density: {
                    enable: true,
                    area: 800,
                },
            },
            color: {
                value: "#000",
            },
            move: {
                enable: true,
                speed: 6,
                direction: "top",
            },
            size: {
                value: 10,
            },
            polygon: {
                sides: 1,
            },
        },
    };
    let onParticlesLoaded = (event) => {
        const particlesContainer = event.detail.particles;

        // you can use particlesContainer to call all the Container class
        // (from the core library) methods like play, pause, refresh, start, stop
    };

    let particlesInit = async (engine) => {
        // you can use main to customize the tsParticles instance adding presets or custom shapes
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    };
</script>

<div class="particles">
    <Particles
        id="tsparticles"
        options={particlesConfig}
        on:particlesLoaded={onParticlesLoaded}
        {particlesInit}
    />
</div>

<style>
    .particles {
        opacity: 10%;
    }
</style>
