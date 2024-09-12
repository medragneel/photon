<script lang="ts">
    import { cart } from "$lib/client/cart";
    import Cart from "$lib/components/cart.svelte";

    let open = false;

    const toggleCart = () => {
        open = !open;
    };

    $: cartCount = $cart.reduce((total, item) => total + item.quantity, 0);
</script>

<button class="text-2xl mt-1" on:click={toggleCart}>
    <i class="bx bx-cart indicator">
        <span
            class="indicator-item indicator-end badge badge-accent rounded-full w-5 h-5"
            >{cartCount}</span
        >
        <span></span>
    </i>
</button>

{#if open}
    <Cart {open} {toggleCart} />
{/if}
