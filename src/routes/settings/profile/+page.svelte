<script lang="ts">
    import { superForm } from "sveltekit-superforms/client";
    import { toast, Toaster } from "svelte-french-toast";

    export let data;
    let isEditing = false;

    const {
        form: formData,
        errors,
        enhance,
        submitting,
    } = superForm(data.form, {
        onResult: ({ result }) => {
            console.log("Form submission result:", result);
            if (result.type === "redirect") {
                toast.success("Profile modified successfully!", {
                    position: "top-center",
                    duration: 5000,
                });
                isEditing = false;
            } else {
                toast.error("there's a problem", {
                    position: "top-center",
                    duration: 5000,
                });
            }
        },
    });

    function toggleEdit() {
        isEditing = !isEditing;
    }
</script>

<Toaster />
<div class="max-w-2xl mx-auto p-4">
    <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold">My Profile</h1>
    </div>

    <div class="shadow-md rounded-lg p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Profile Details</h2>
            <button
                class="text-success hover:text-success-300 font-medium"
                on:click={toggleEdit}
            >
                {isEditing ? "Done" : "Change"}
            </button>
        </div>

        <form method="POST" use:enhance class="space-y-4">
            <label class="input input-bordered flex items-center gap-2">
                <i class="bx bx-user"></i>
                <input
                    type="text"
                    class="grow"
                    name="username"
                    id="username"
                    disabled={!isEditing}
                    bind:value={$formData.username}
                    aria-invalid={$errors.username ? "true" : undefined}
                    placeholder="@Example: John Doe"
                />
            </label>

            {#if $errors.username}<span class="invalid text-[#f00000]"
                    >{$errors.username}</span
                >{/if}
            <label class="input input-bordered flex items-center gap-2">
                <i class="bx bx-envelope"></i>
                <input
                    type="email"
                    class="grow"
                    name="email"
                    id="email"
                    disabled={!isEditing}
                    aria-invalid={$errors.email ? "true" : undefined}
                    bind:value={$formData.email}
                    placeholder="Example@mail.com"
                />
            </label>
            {#if $errors.email}<span class="invalid text-error"
                    >{$errors.email}</span
                >{/if}

            {#if isEditing}
                <button
                    type="submit"
                    class="w-full bg-neutral text-white font-bold py-2 px-4 rounded"
                    disabled={$submitting}
                >
                    {$submitting ? "Saving..." : "Save Changes"}
                </button>
            {/if}
        </form>
    </div>

    <a
        href="/settings/user/orders"
        class="block btn btn-neutral font-bold py-4 px-6 rounded-lg text-center transition duration-300 ease-in-out transform hover:scale-105"
    >
        <div class="flex justify-between items-center">
            <span>Go check your orders</span>
            <i class="bx bx-chevron-right font-bold"></i>
        </div>
    </a>
</div>
