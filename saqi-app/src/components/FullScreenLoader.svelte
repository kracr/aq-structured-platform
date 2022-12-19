<script lang="ts">
    import { Loading } from "attractions";
</script>

<div class="flex justify-center  bg-gray-50 loader-background">
    <Loading />
</div>

<style>
    .loader-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }
</style>
