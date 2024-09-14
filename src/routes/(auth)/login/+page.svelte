<script lang="ts">
    export let data;
    import { superForm } from "sveltekit-superforms";
    const { form: formData, errors } = superForm(data.form);
</script>

<h1 class="text-xl text-center font-mono py-4 mb-4">Login Page</h1>

<form method="POST" class="form-control flex flex-col items-center gap-4">
    <a
        href="/login/google"
        class="btn btn-neutral btn-wide flex items-center justify-center gap-2"
    >
        <i class="bx bxl-google text-xl"></i>
        Login With Google
    </a>
    <br />
    <br />

    <label class="input input-bordered flex items-center gap-2">
        <i class="bx bx-envelope"></i>
        <input
            type="email"
            class="grow"
            name="email"
            id="email"
            aria-invalid={$errors.email ? "true" : undefined}
            bind:value={$formData.email}
            placeholder="Example@mail.com"
        />
    </label>
    {#if $errors.email}<span class="invalid text-[#f00000]"
            >{$errors.email}</span
        >{/if}
    <label class="input input-bordered flex items-center gap-2">
        <i class="bx bx-key"></i>
        <input
            type="password"
            class="grow"
            name="password"
            id="password"
            aria-invalid={$errors.password ? "true" : undefined}
            bind:value={$formData.password}
            placeholder="**************"
        />
    </label>
    {#if $errors.password}<span class="invalid text-[#f00000]"
            >{$errors.password}</span
        >{/if}
    <button class="btn text-sm btn-wide">Login</button>
    <span class="text-sm text-center">
        if you already don't have an account
        <a href="/register" class="text-accent"> Register</a> here
    </span>
</form>
