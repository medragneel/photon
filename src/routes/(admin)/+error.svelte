<script>
    import { page } from "$app/stores";
</script>

<div class="h-screen w-screen flex flex-col items-center justify-center">
    <div class="card w-96 shadow-xl p-4 text-center gap-2 font-mono">
        <h1 class="font-bold text-xl">
            {$page.status}
        </h1>
        <br />
        <p class="text-xl">
            {$page?.error?.message}
        </p>
        <br />
        <a href="/" class="btn btn-neutral">Go Home</a>
    </div>
</div>
