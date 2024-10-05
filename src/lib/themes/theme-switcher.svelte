<script lang="ts">
    import { onMount } from "svelte";
    import { theme } from "$lib/themes/themeStore";
    import { themes } from "$lib/themes";

    let selected_theme: string;

    onMount(() => {
        theme.initialize();
    });

    function apply_theme(newTheme: string) {
        if (themes.includes(newTheme)) {
            theme.set(newTheme);
            selected_theme = newTheme;
        }
    }

    $: current_theme = $theme;
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl sm:text-3xl font-bold mb-6">Choose Your Theme</h1>

    <div class="mb-8">
        <h2 class="text-lg sm:text-xl font-semibold mb-4">
            Current Theme: <span class="capitalize">{current_theme}</span>
        </h2>
    </div>

    <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4"
    >
        {#each themes as theme}
            <button
                class="p-2 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out {theme ===
                selected_theme
                    ? 'ring-2 ring-primary'
                    : ''}"
                on:click={() => apply_theme(theme)}
            >
                <div
                    class="w-full h-16 sm:h-24 mb-2 rounded"
                    data-theme={theme}
                >
                    <div
                        class="w-full h-full flex items-center justify-center bg-base-100"
                    >
                        <div
                            class="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary"
                        ></div>
                    </div>
                </div>
                <span class="text-xs sm:text-sm capitalize">{theme}</span>
            </button>
        {/each}
    </div>
</div>

