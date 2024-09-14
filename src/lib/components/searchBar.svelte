<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { createProdIndex, searchProdIndex } from "$lib/utils/search";
    import type { Product } from "$lib/utils/search";

    let search: "loading" | "ready" = "loading";
    let searchQuery: string = "";
    let isSearchOpen: boolean = false;
    let searchResults: Product[] = [];
    let searchInput: HTMLInputElement;

    onMount(async () => {
        const prods = await fetch("/search.json").then((res) => res.json());
        createProdIndex(prods);
        search = "ready";
    });

    $: if (search === "ready") {
        searchResults = searchProdIndex(searchQuery);
    }

    function openSearch() {
        isSearchOpen = true;
        setTimeout(() => searchInput.focus(), 100);
    }

    function closeSearch() {
        isSearchOpen = false;
        searchQuery = "";
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            closeSearch();
        } else if ((event.ctrlKey || event.metaKey) && event.key === "k") {
            event.preventDefault();
            isSearchOpen ? closeSearch() : openSearch();
        }
    }

    onMount(() => {
        document.addEventListener("keydown", handleKeydown);
        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    });
</script>

<button
    on:click={openSearch}
    class="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
    aria-label="Open search"
>
    <div class="flex items-center gap-2">
        <i class="bx bx-search text-xl"></i>
        <div class="keys max-[600px]:hidden">
            <kbd class="kbd">Ctrl</kbd>
            +
            <kbd class="kbd">K</kbd>
        </div>
    </div>
</button>

{#if isSearchOpen}
    <div
        transition:fade={{ duration: 200 }}
        class="fixed inset-0 z-50 flex items-start justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm p-4 sm:p-8 md:p-16 lg:p-24"
    >
        <div
            class="w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden"
            transition:fly={{ y: -20, duration: 200 }}
        >
            <div class="relative">
                <input
                    bind:this={searchInput}
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search Products..."
                    class="w-full py-4 pl-12 pr-12 text-xl text-gray-900 bg-white focus:outline-none"
                />
                <svg
                    class="absolute w-6 h-6 text-gray-400 left-4 top-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>
                <button
                    on:click={closeSearch}
                    class="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                    aria-label="Close search"
                >
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
            {#if search === "ready"}
                <div class="max-h-[60vh] overflow-y-auto">
                    <ul class="py-2">
                        {#each searchResults as result}
                            <li>
                                <a
                                    href={`/shop/${result.prodId}`}
                                    class="block px-4 py-3 text-lg text-gray-700 hover:bg-gray-100"
                                    on:click={closeSearch}
                                >
                                    {result.name}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            {:else if searchQuery.length > 1}
                <p class="px-4 py-3 text-lg text-gray-500">No results found</p>
            {/if}
        </div>
    </div>
{/if}
