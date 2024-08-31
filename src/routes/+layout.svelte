<script lang="ts">
    import "../app.css";
    import Navbar from "$lib/components/navbar.svelte";
    import Footer from "$lib/components/footer.svelte";

    export let data;
</script>

<div class="flex flex-col min-h-screen">
    <Navbar {data} />

    <main class="flex-grow">
        <slot />
    </main>

    <Footer />
</div>
