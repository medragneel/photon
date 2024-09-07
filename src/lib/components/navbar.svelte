<script lang="ts">
    import CartIcon from "$lib/components/cartIcon.svelte";
    import UserMenu from "$lib/components/userMenu.svelte";

    export let data;
</script>

<div class="navbar bg-base-100">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">
            <img src="/logo.png" alt="logo" width="80"  />
            Photon
        </a>
    </div>
    {#if !data?.session}
        <div class="flex items-center gap-4 px-8">
            <a class="btn btn-base-100 btn-outline" href="/login">Login</a>
            <a class="btn btn-base-100" href="/register">Register</a>
        </div>
    {:else}
        <div class="flex-none px-8 z-10">
            <ul class="menu menu-horizontal px-1">
                <li><a href="/">Home</a></li>
                <li><a href="/shop">Shop</a></li>
                <li>
                    <CartIcon />
                </li>
                <li>
                    <UserMenu user={data?.user} />
                </li>
            </ul>
        </div>
    {/if}
</div>
