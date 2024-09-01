<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import { z } from "zod";
    import { cart } from "$lib/client/cart";

    const orderSchema = z.object({
        shippingAddress: z.object({
            name: z.string().min(1),
            address: z.string().min(1),
            city: z.string().min(1),
            state: z.string().min(1),
            zip: z.string().min(1),
        }),
    });

    const { form, errors, enhance } = superForm(
        {
            shippingAddress: {
                name: "",
                address: "",
                city: "",
                state: "",
                zip: "",
            },
        },
        {
            dataType: "json",
            validators: { schema: orderSchema },
        },
    );
</script>

<div class="container mx-auto py-8">
    <div class="bg-base-200 p-8 rounded-lg">
        <h2 class="text-2xl font-bold mb-4">Checkout</h2>

        <div>
            <h3 class="text-lg font-bold mb-4">Shipping Information</h3>
            <form method="POST" use:enhance>
                <div class="mb-4">
                    <label class="label" for="name">
                        <span class="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        class="input input-bordered w-full"
                        data-invalid={$errors.shippingAddress?.name}
                        bind:value={$form.shippingAddress.name}
                    />
                    {#if $errors.shippingAddress?.name}
                        <p class="text-error">{$errors.shippingAddress.name}</p>
                    {/if}
                </div>

                <div class="mb-4">
                    <label class="label" for="address">
                        <span class="label-text">Address</span>
                    </label>
                    <input
                        type="text"
                        id="address"
                        class="input input-bordered w-full"
                        data-invalid={$errors.shippingAddress?.address}
                        bind:value={$form.shippingAddress.address}
                    />
                    {#if $errors.shippingAddress?.address}
                        <p class="text-error">
                            {$errors.shippingAddress.address}
                        </p>
                    {/if}
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="label" for="city">
                            <span class="label-text">City</span>
                        </label>
                        <input
                            type="text"
                            id="city"
                            class="input input-bordered w-full"
                            data-invalid={$errors.shippingAddress?.city}
                            bind:value={$form.shippingAddress.city}
                        />
                        {#if $errors.shippingAddress?.city}
                            <p class="text-error">
                                {$errors.shippingAddress.city}
                            </p>
                        {/if}
                    </div>

                    <div>
                        <label class="label" for="state">
                            <span class="label-text">State</span>
                        </label>
                        <input
                            type="text"
                            id="state"
                            class="input input-bordered w-full"
                            data-invalid={$errors.shippingAddress?.state}
                            bind:value={$form.shippingAddress.state}
                        />
                        {#if $errors.shippingAddress?.state}
                            <p class="text-error">
                                {$errors.shippingAddress.state}
                            </p>
                        {/if}
                    </div>

                    <div>
                        <label class="label" for="zip">
                            <span class="label-text">Zip</span>
                        </label>
                        <input
                            type="text"
                            id="zip"
                            class="input input-bordered w-full"
                            data-invalid={$errors.shippingAddress?.zip}
                            bind:value={$form.shippingAddress.zip}
                        />
                        {#if $errors.shippingAddress?.zip}
                            <p class="text-error">
                                {$errors.shippingAddress.zip}
                            </p>
                        {/if}
                    </div>
                </div>
            </form>
        </div>

        <div class="mt-8">
            <h3 class="text-lg font-bold mb-4">Order Summary</h3>
            <ul class="menu bg-base-100 rounded-box">
                {#each $cart as item}
                    <li class="flex items-center justify-between">
                        <span>{item.name}</span>
                        <span>{item.price.toFixed(2)} DA x {item.quantity}</span
                        >
                    </li>
                {/each}
                <li class="flex items-center justify-between font-bold">
                    <span>Total</span>
                    <span>
                        {$cart
                            .reduce(
                                (total, item) =>
                                    total + item.price * item.quantity,
                                0,
                            )
                            .toFixed(2)} DA
                    </span>
                </li>
            </ul>
        </div>

        <button type="submit" class="btn btn-primary w-full mt-8">
            Place Order
        </button>
    </div>
</div>
