<script>
    export let order;
    import CartOrderItem from "$lib/components/cartOrderItem.svelte";
</script>

<dialog id={`modal_${order.id}`} class="modal modal-bottom sm:modal-middle">
    <div class="modal-box max-w-full">
        <div class="container mx-auto py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="card w-96 bg-base-100 shadow-xl w-full">
                    <div class="card-body">
                        <h2 class="card-title">Order Details</h2>
                        <div class="flex flex-col gap-4">
                            <div class="flex justify-between">
                                <span class="text-sm">Status:</span>
                                <span class="badge badge-lg"
                                    >{order.status}</span
                                >
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm">Full Name:</span>
                                <span>{order.fullName}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm">Wilaya:</span>
                                <span>{order.wilaya}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm">Address:</span>
                                <span>{order.adress}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm">Phone:</span>
                                <span>{order.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cart">
                    <div class="card bg-base-100 shadow-lg">
                        <div class="card-body">
                            <h2 class="card-title mb-4">Order-{order.id}</h2>
                            {#if order.orderItems.length > 0}
                                <div class="space-y-4">
                                    {#each order.orderItems as item}
                                        <CartOrderItem
                                            item={item.product}
                                            quantity={item.quantity}
                                        />
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
                                    >{order.total.toFixed(2)} DA</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </div>
</dialog>

<style>
    @media (min-width: 640px) {
        .modal-box {
            max-width: 100%;
        }
    }
</style>
