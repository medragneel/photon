<script>
    export let data;
    const { product } = data;
    import { cart } from "$lib/client/cart";

    function addToCart(item) {
        cart.addItem(item);
    }
</script>

<a href="/shop" class="btn btn-outline m-4">
    <i class="bx bx-left-arrow-alt"></i>
    Go back
</a>

{#if !product}
    <p class="text-xl font-bold text-center p-6 text-error">
        ...Error fetching product
    </p>
{:else}
    <div class="container mx-auto p-6">
        <div
            class="flex flex-col md:flex-row justify-center items-center gap-8"
        >
            <!-- Product Image -->
            <img
                src={product?.prodImage}
                alt={product?.name}
                class="rounded-lg shadow-lg w-full md:w-1/2 object-cover"
            />

            <!-- Product Details -->
            <div class="flex flex-col gap-4 w-full md:w-1/2">
                <h1 class="text-3xl font-bold text-left">{product?.name}</h1>
                <p class="text-left">{product?.description}</p>
                <p class="badge badge-outline">{product?.category}</p>

                <!-- Price and Add to Cart -->
                <div class="flex justify-between items-center mt-6">
                    <h2 class="text-2xl font-bold text-primary">
                        {product?.price} DA
                    </h2>
                    <button
                        on:click={() => addToCart(product)}
                        class="btn btn-primary flex items-center gap-2"
                    >
                        <i class="bx bx-cart"></i>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    img {
        width: 100%;
        max-width: 600px;
    }

    @media (max-width: 768px) {
        img {
            max-width: 100%;
        }
    }
</style>
