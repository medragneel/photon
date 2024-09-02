<script lang="ts">
    import { cart } from "$lib/client/cart";
    import Cart from "$lib/components/cart.svelte";

    let open = false;

    const toggleCart = () => {
        open = !open;
    };

    $: cartCount = $cart.reduce((total, item) => total + item.quantity, 0);
</script>

<button class="text-xl" on:click={toggleCart}>
    <span class="indicator-item badge badge-secondary">{cartCount}</span>
    <i class="bx bx-cart"></i>
</button>

{#if open}
    <Cart {open} {toggleCart} />
{/if}
