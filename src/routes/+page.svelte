<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Scene from "$lib/components/Scene.svelte";
</script>

<div class="min-h-screen">
    <main
        class="container mx-auto px-4 flex items-center justify-between py-16 relative"
    >
        <div class="max-w-2xl">
            <h1 class="text-5xl font-bold mb-4 leading-tight">
                Illuminate Your Space
                <br />
                with Custom Lightboxes
            </h1>
            <p class="text-xl mb-8">
                Transform your environment with our bespoke lighting solutions.
            </p>
            <a href="/shop" class="btn btn-neutral text-lg font-semibold">
                Explore Products
            </a>
        </div>
    </main>

    <div class="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
        <Canvas>
            <Scene />
        </Canvas>
    </div>
</div>
