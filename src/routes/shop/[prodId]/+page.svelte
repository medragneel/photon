<script>
    export let data;
    const { product } = data;
    import { cart } from "$lib/client/cart";

    function addToCart(item) {
        cart.addItem(item);
    }
</script>

<a href="/shop" class="btn m-4">
    <i class="bx bx-left-arrow-alt"></i>
    Go back
</a>

{#if !product}
    <p class="text-xl font-bold text-center p-6">...Error fetching product</p>
{:else}
    <div class="container mx-auto">
        <div class="flex justfy-center items-center gap-6">
            <img src={product?.prodImage} alt={product?.name} />
            <div class="flex flex-col gap-4">
                <h1 class="text-xl font-bold text-start">
                    {product?.name}
                </h1>
                <p class="text-start">{product?.description}</p>
                <br />
                <p class="badge badge-outline">{product?.category}</p>
                <br />

                <div class="card-actions justify-between items-center p-4">
                    <h2 class="text-2xl font-bold">{product?.price}DA</h2>

                    <button on:click={()=> addToCart(product)} class="btn btn-wide btn-neutral">
                        <i class="bx bx-cart"></i>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
