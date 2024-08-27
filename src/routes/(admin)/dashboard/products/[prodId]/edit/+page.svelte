<script>
    import { ProductUpdateSchema } from "$lib";
    import { superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data;
    const { form: formData, errors, enhance } = superForm(data.form,{
    validators: zodClient(ProductUpdateSchema)
    });
</script>

<div class="container mx-auto">
    <h1 class="text-xl text-center font-bold">edit product</h1>
    <br />

    <form
        method="POST"
        class="form-control flex items-center gap-4"
        use:enhance
    >
        <label
            class="input input-bordered input-lg flex items-center gap-2 w-full max-w-xs"
        >
            <i class="bx bx-edit-alt"></i>
            <input
                type="text"
                class="grow"
                name="name"
                bind:value={$formData.name}
                aria-invalid={$errors.name ? "true" : undefined}
                placeholder="product name"
            />
        </label>
        {#if $errors.name}
            <span class="invalid text-[#f00000]">{$errors.name}</span>{/if}

        <label
            class="input input-bordered input-lg flex items-center gap-2 w-full max-w-xs"
        >
            <i class="bx bx-dollar"></i>
            <input
                type="number"
                class="grow"
                bind:value={$formData.price}
                aria-invalid={$errors.price ? "true" : undefined}
                name="price"
                placeholder="product price"
            />
        </label>
        {#if $errors.price}
            <span class="invalid text-[#f00000]">{$errors.price}</span>{/if}

        <label
            class="input input-bordered input-lg flex items-center gap-2 w-full max-w-xs"
        >
            <i class="bx bx-image-alt"></i>
            <input
                type="text"
                class="grow"
                name="prodImage"
                bind:value={$formData.prodImage}
                aria-invalid={$errors.prodImage ? "true" : undefined}
                placeholder="product image url"
            />
        </label>
        {#if $errors.prodImage}
            <span class="invalid text-[#f00000]">{$errors.prodImage}</span>{/if}

        <select
            class="select select-bordered w-full max-w-xs"
            name="category"
            bind:value={$formData.category}
            aria-invalid={$errors.category ? "true" : undefined}
        >
            <option value="anime">Anime</option>
            <option value="movie">Movie</option>
            <option value="sport">Sport</option>
            <option value="custom">Custom</option>
        </select>

        {#if $errors.category}
            <span class="invalid text-[#f00000]">{$errors.category}</span>{/if}

        <textarea
            class="textarea textarea-bordered textarea-lg w-full max-w-xs resize-none"
            name="description"
            bind:value={$formData.description}
            aria-invalid={$errors.description ? "true" : undefined}
            placeholder="Product description"
        ></textarea>

        {#if $errors.description}
            <span class="invalid text-[#f00000]">{$errors.description}</span
            >{/if}
        <button type="submit" class="btn btn-wide btn-neutral w-full max-w-xs"
            >+ Edit product</button
        >
    </form>
</div>
