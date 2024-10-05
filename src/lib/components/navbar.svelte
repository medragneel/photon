<script lang="ts">
    import CartIcon from "$lib/components/cartIcon.svelte";
    import UserMenu from "$lib/components/userMenu.svelte";
    import SearchBar from "$lib/components/searchBar.svelte";
    import { theme } from "$lib/themes/themeStore";

    export let data;
    $: isLightTheme =
        $theme === "light" || $theme === "pastel" || $theme === "lofi";
    $: logoSrc = isLightTheme
        ? "/photon_logo_black_ver.svg"
        : "/photon_logo_white_ver.svg";
</script>

<div class="navbar bg-base-100">
    <div class="navbar-start">
        <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h7"
                    />
                </svg>
            </div>
            <ul
                role="menu"
                tabindex="0"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
                <li>
                    <a href="/">
                        <i class="bx bxs-home"></i>
                        Home
                    </a>
                </li>
                <li>
                    <a href="/shop">
                        <i class="bx bxs-store"></i>
                        Shop
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="navbar-center max-[600px]:hidden">
        <a
            class="btn btn-ghost flex items-center justify-center p-2 h-40 w-40"
            href="/"
        >
            <img src={logoSrc} alt="logo" class="h-full w-auto" />
        </a>
    </div>
    <div class="navbar-end">
        {#if !data?.session}
            <div class="flex items-center gap-4 px-8">
                <a class="btn btn-base-100 btn-outline" href="/login">Login</a>
            </div>
        {:else}
            <div class="flex-none z-10">
                <ul class="menu menu-horizontal px-1">
                    <li>
                        <CartIcon />
                    </li>
                    <li>
                        <SearchBar />
                        <!-- <div class="flex gap-2"> -->
                        <!--     <i class="bx bx-search text-xl"></i> -->
                        <!--     <div class="keys max-[600px]:hidden"> -->
                        <!--         <kbd class="kbd kbd-sm">ctrl</kbd> -->
                        <!--         + -->
                        <!--         <kbd class="kbd kbd-sm">k</kbd> -->
                        <!--     </div> -->
                        <!-- </div> -->
                    </li>
                    <li>
                        <UserMenu user={data?.user} />
                    </li>
                </ul>
            </div>
        {/if}
    </div>
</div>
