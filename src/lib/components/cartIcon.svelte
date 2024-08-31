<script lang="ts">
    import { cart } from "$lib/client/cart";
    import Cart from "$lib/components/cart.svelte";

    let open = false;
    let cartCount = 0;

    const toggleCart = () => {
        open = !open;
    };

    cart.subscribe((items) => {
        cartCount = cart.getCartCount();
    });
</script>

<button class="text-xl" on:click={toggleCart}>
    <span class="indicator-item badge badge-secondary">{cartCount}</span>
    <i class="bx bx-cart"></i>
</button>

{#if open}
    <Cart {open} {toggleCart} />
{/if}
