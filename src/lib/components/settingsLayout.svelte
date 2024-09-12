<script>
    import { page } from "$app/stores";
    import { slide } from "svelte/transition";

    export let navigation;
    export let title;
    let isOpen = true;

    function toggleSidebar() {
        isOpen = !isOpen;
    }
</script>

<div class="container mx-auto p-4">
    <div class="w-full px-2 mb-4 flex items-center justify-between">
        <h1 class="text-2xl font-semibold">{title}</h1>
        <button
            on:click={toggleSidebar}
            class="md:hidden px-2 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
            {isOpen ? "Hide sidebar" : "Show sidebar"}
        </button>
    </div>
    <div class="flex flex-col md:flex-row w-full md:space-x-4">
        {#if isOpen}
            <div
                transition:slide={{ duration: 200 }}
                class="w-full md:w-64 mb-4 md:mb-0 flex-shrink-0"
            >
                <nav class="space-y-1" aria-label="Sidebar">
                    {#each navigation as navItem}
                        <a
                            href={navItem.href}
                            class="flex items-center px-3 py-2 text-sm font-medium rounded-md {$page
                                .url.pathname === navItem.href
                                ? 'bg-gray-200 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-100'}"
                            aria-current={$page.url.pathname === navItem.href
                                ? "page"
                                : undefined}
                        >
                            {navItem.title}
                        </a>
                    {/each}
                </nav>
            </div>
        {/if}
        <div class="flex-grow">
            <slot />
        </div>
    </div>
</div>
