<script lang="ts">
    import { themes } from "$lib/themes";
    import { onMount } from "svelte";

    let current_theme = "";
    let selected_theme = "";

    function setInitialTheme() {
        if (typeof window !== "undefined") {
            const stored_theme = window.localStorage.getItem("current-theme");
            const theme =
                stored_theme && themes.includes(stored_theme)
                    ? stored_theme
                    : "light";
            document.documentElement.setAttribute("data-theme", theme);
        }
    }

    setInitialTheme();

    onMount(() => {
        if (typeof window !== "undefined") {
            const theme =
                window.localStorage.getItem("current-theme") || "light";
            if (themes.includes(theme)) {
                document.documentElement.setAttribute("data-theme", theme);
                current_theme = theme;
                selected_theme = theme;
            }
        }
    });

    function apply_theme() {
        if (themes.includes(selected_theme)) {
            const one_year = 60 * 60 * 24 * 365;
            window.localStorage.setItem("current-theme", selected_theme);
            document.cookie = `current-theme=${selected_theme}; max-age=${one_year}; path=/;SameSite=Strict;`;
            document.documentElement.setAttribute("data-theme", selected_theme);
            current_theme = selected_theme;
        }
    }
</script>

<div class="mb-8">
    <select
        bind:value={selected_theme}
        class="select select-bordered select-primary max-w-3xl text-xl capitalize"
    >
        <option disabled value="">Choose a theme</option>
        {#each themes as theme}
            <option value={theme} class="capitalize">{theme}</option>
        {/each}
    </select>
    <button on:click={apply_theme} class="btn btn-primary mt-2"
        >Apply Theme</button
    >
</div>
