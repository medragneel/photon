<script lang="ts">
    import { cart } from "$lib/client/cart";
    import CartItem from "$lib/components/cartItem.svelte";
    import { superForm } from "sveltekit-superforms/client";
    import { wilayas } from "$lib";
    import Select from "svelte-select";
    import { toast, Toaster } from "svelte-french-toast";

    export let data;
    $: cartItems = $cart;
    const total = $cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    const { form, errors, enhance, submitting } = superForm(data.form, {
        dataType: "json",
        onError: (errors) => {
            console.error("Form submission errors:", errors);
        },
        onResult: ({ result }) => {
            console.log("Form submission result:", result);
            if (result.type === "success") {
                toast.success("Order placed successfully!", {
                    position: "top-center",
                    duration: 5000,
                });
            } else {
                toast.error("there's a problem", {
                    position: "top-center",
                    duration: 5000,
                });
            }
        },
    });

    // Update the form data when the cart changes
    $: {
        const orderItems = $cart.map((item) => ({
            prodId: item.prodId,
            quantity: item.quantity,
            price: item.price,
        }));
        $form = { ...($form || {}), orderItems, total };
    }
</script>

<!-- <SuperDebug data={$form}/> -->

{#if cartItems.length > 0}
    <Toaster />
    <div class="container mx-auto py-12">
        <h1 class="text-3xl font-bold text-center mb-8">Checkout</h1>

        <form
            method="POST"
            class="max-w-4xl mx-auto max-[600px]:px-4"
            use:enhance
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="form">
                    <div class="form-control w-full mb-4">
                        <label class="label font-semibold" for="fullName">
                            <span class="label-text">Full Name</span>
                        </label>
                        <div class="input-group">
                            <span
                                class="w-10 bg-gray-200 flex items-center justify-center"
                            >
                            </span>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Enter your full name"
                                class="input input-bordered w-full"
                                bind:value={$form.fullName}
                                aria-invalid={$errors.fullName
                                    ? "true"
                                    : undefined}
                            />
                        </div>
                        {#if $errors.fullName}
                            <label class="label" for="fullName">
                                <span class="label-text-alt text-error"
                                    >{$errors.fullName}</span
                                >
                            </label>
                        {/if}
                    </div>

                    <div class="form-control w-full mb-4">
                        <label class="label font-semibold" for="adress">
                            <span class="label-text">Shipping Adress</span>
                        </label>
                        <div class="input-group">
                            <span
                                class="w-10 bg-gray-200 flex items-center justify-center"
                            >
                            </span>
                            <input
                                type="text"
                                id="adress"
                                name="adress"
                                placeholder="Enter your address"
                                class="input input-bordered w-full"
                                bind:value={$form.adress}
                                aria-invalid={$errors.adress
                                    ? "true"
                                    : undefined}
                            />
                        </div>
                        {#if $errors.adress}
                            <label class="label" for="adress">
                                <span class="label-text-alt text-error"
                                    >{$errors.adress}</span
                                >
                            </label>
                        {/if}
                    </div>

                    <div class="form-control w-full mb-4">
                        <label class="label font-semibold" for="wilaya">
                            <span class="label-text">Wilaya</span>
                        </label>
                        <div class="input-group">
                            <span
                                class="w-10 bg-gray-200 flex items-center justify-center"
                            >
                            </span>
                            <Select
                                items={wilayas}
                                bind:value={$form.wilaya}
                                name="wilaya"
                                placeholder="Select your wilaya"
                                class="select select-bordered w-full"
                            />
                        </div>
                        {#if $errors.wilaya}
                            <label class="label" for="wilaya">
                                <span class="label-text-alt text-error"
                                    >{$errors.wilaya}</span
                                >
                            </label>
                        {/if}
                    </div>

                    <div class="form-control w-full mb-4">
                        <label class="label font-semibold" for="phone">
                            <span class="label-text">Phone Number</span>
                        </label>
                        <div class="input-group">
                            <span
                                class="w-10 bg-gray-200 flex items-center justify-center"
                            >
                            </span>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                class="input input-bordered w-full"
                                bind:value={$form.phone}
                                aria-invalid={$errors.phone
                                    ? "true"
                                    : undefined}
                            />
                        </div>
                        {#if $errors.phone}
                            <label class="label" for="phone">
                                <span class="label-text-alt text-error"
                                    >{$errors.phone}</span
                                >
                            </label>
                        {/if}
                    </div>

                    <button
                        type="submit"
                        class="btn btn-primary w-full mt-6"
                        disabled={$submitting}
                    >
                        {$submitting ? "Submitting..." : "Place Order"}
                    </button>
                </div>

                <div class="cart">
                    <div class="card bg-base-100 shadow-lg">
                        <div class="card-body">
                            <h2 class="card-title mb-4">Your Cart</h2>
                            {#if cartItems.length > 0}
                                <div class="space-y-4">
                                    {#each cartItems as item}
                                        <CartItem {item} />
                                    {/each}
                                </div>
                            {:else}
                                <p class="text-gray-500">Your cart is empty.</p>
                            {/if}
                            <div class="divider mt-6"></div>
                            <div class="flex justify-between items-center">
                                <span class="text-lg font-semibold">Total:</span
                                >
                                <span class="text-xl font-bold"
                                    >{total.toFixed(2)} DA</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
{:else}
    <div class="h-screen flex flex-col items-center justify-center">
        <span class="loading loading-spinner text-neutral w-10"></span>
        <p class="text-xl text-center mt-6">...Loading</p>
    </div>
{/if}
