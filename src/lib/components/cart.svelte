<script lang="ts">
    import { cart } from "$lib/client/cart";
    import CartItem from "$lib/components/cartItem.svelte";

    export let toggleCart;

    $: cartItems = $cart;
    $: total = $cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
</script>

<div
    class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto bg-secondary-content hover:bg-secondary-content shadow-2xl w-96"
>
    <button type="button" on:click={toggleCart} class="absolute top-4 right-4">
        <i class="bx bx-x text-2xl"></i>
        <span class="sr-only">Close menu</span>
    </button>
    <div class="cart-items flex flex-col gap-6 mt-12">
        <h1 class="text-2xl font-bold">Your Cart</h1>
        {#if cartItems.length > 0}
            <div class="items-card space-y-4">
                {#each cartItems as item}
                    <CartItem {item} />
                {/each}
            </div>
        {:else}
            <p>there's nothing in your cart yet</p>
        {/if}
        <div class="mt-6 border-t pt-4">
            <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-semibold">Total:</span>
                <span class="text-xl font-bold">
                    {total.toFixed(2)} DA
                </span>
            </div>
            <div class="flex flex-col gap-4">
                <a
                    class="w-full btn py-3 btn-wide rounded-lg font-semibold"
                    href="/checkout"
                >
                    Proceed to Checkout
                </a>
                <button
                    class="w-full btn btn-error text-white py-3 btn-wide rounded-lg font-semibold"
                    on:click={() => cart.clearCart()}
                >
                    Clear Cart
                </button>
            </div>
        </div>
    </div>
</div>
