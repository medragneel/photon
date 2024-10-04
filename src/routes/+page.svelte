<script lang="ts">
    import { Canvas } from "@threlte/core";
    import Scene from "$lib/components/Scene.svelte";
    import ProductCard from "$lib/components/productCard.svelte";
    import Services from "$lib/components/services.svelte";

    export let data;
</script>

<div class="min-h-screen">
    <div class="header flex flex-col items-center justify-center">
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
                    Transform your environment with our bespoke lighting
                    solutions.
                </p>
                <a href="/shop" class="btn btn-accent text-lg font-semibold">
                    Explore Products
                </a>
            </div>
        </main>
        <div class="py-16">
            <a href="#products">
                <i
                    class="bx bx-down-arrow-circle text-center animate-bounce max-[600px]:hidden"
                    style="font-size: 2rem;"
                ></i>
            </a>
        </div>
    </div>

    <div
        class="absolute top-0 right-0 w-1/2 h-full overflow-hidden max-[1000px]:hidden max-[600px]:text-center"
    >
        <Canvas>
            <Scene />
        </Canvas>
    </div>
</div>
{#if data.products}
    <div class="container mx-auto" id="products">
        <h1 class="text-2xl mb-8 font-bold text-center">Featured Products</h1>
        <!-- <pre>{JSON.stringify(data.products, null, 2)}</pre> -->
        <ProductCard products={data.products} />
    </div>
{:else}
    <p>...Loading</p>
{/if}

<Services />
