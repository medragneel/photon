<script lang="ts">
    import { cart } from "$lib/client/cart";
    import CartItem from "$lib/components/cartItem.svelte";
    import { fly } from "svelte/transition";
    import { goto } from "$app/navigation";

    export let toggleCart: () => void;

    async function handleCheckout() {
        toggleCart();
        if ($cart.length > 0) {
            await goto("/checkout");
        }
    }

    $: cartItems = $cart;
    $: total = $cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );
</script>

<div
    class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto bg-base-100 hover:bg-base-100 shadow-2xl w-screen"
    transition:fly={{ x: -300, duration: 300 }}
>
    <button
        type="button"
        on:click={toggleCart}
        class="absolute top-4 right-4 text-base-content"
    >
        <i class="bx bx-x text-2xl px-8 py-4"></i>
        <span class="sr-only">Close menu</span>
    </button>
    <div class="cart-items flex flex-col gap-6 mt-12">
        <h1 class="text-2xl font-bold text-base-content">Your Cart</h1>
        {#if cartItems.length > 0}
            <div class="items-card px-2 space-y-4">
                {#each cartItems as item}
                    <CartItem {item} />
                {/each}
            </div>
        {:else}
            <p class="text-base-content/70">There's nothing in your cart yet</p>
        {/if}
        <div class="mt-6 border-t border-base-300 pt-4">
            <div
                class="flex justify-between items-center max-[600px]:flex-col mb-4"
            >
                <span class="text-lg font-semibold text-base-content"
                    >Total:</span
                >
                <span class="text-xl font-bold text-base-content">
                    {total.toFixed(2)} DA
                </span>
            </div>
            <div class="flex max-[600px]:flex-col gap-4">
                <button
                    type="button"
                    class="btn btn-accent btn-wide {cartItems.length === 0
                        ? 'btn-disabled'
                        : ''} py-3 rounded-lg font-semibold max-[600px]:btn-block"
                    on:click={handleCheckout}
                    aria-disabled={cartItems.length === 0}
                    style="pointer-events: {cartItems.length === 0
                        ? 'none'
                        : 'auto'}"
                >
                    Proceed to Checkout
                </button>
                <button
                    class="btn btn-wide py-3 max-[600px]:btn-block rounded-lg font-semibold"
                    on:click={() => cart.clearCart()}
                >
                    Clear Cart
                </button>
            </div>
        </div>
    </div>
</div>
