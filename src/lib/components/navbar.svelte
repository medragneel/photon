<script lang="ts">
    import CartIcon from "$lib/components/cartIcon.svelte";
    import UserMenu from "$lib/components/userMenu.svelte";

    export let data;
</script>

<div class="navbar bg-base-100">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 40 40"
                ><path
                    fill="#F06225"
                    d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"
                ></path><path
                    fill="#F06225"
                    d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                ></path></svg
            >
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
