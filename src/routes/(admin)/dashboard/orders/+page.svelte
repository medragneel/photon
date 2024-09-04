<script>
    export let data;
    $: ({ orders, total, limit, skip } = data);
    $: pageSize = limit;
    $: totalItems = total[0].count;
    $: totalPages = Math.ceil(totalItems / pageSize);
    $: currentPage = skip / pageSize;

    import CartOrderItem from "$lib/components/cartOrderItem.svelte";
    const openModal = () => {
        const modal = document.querySelector("#my_modal_5");
        modal.showModal();
    };
</script>

{#if orders.length > 0}
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th></th>
                    <th>OrderId</th>
                    <th>FullName</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Created_at</th>
                </tr>
            </thead>
            <tbody>
                {#each orders as p, idx}
                    <tr>
                        <th>{idx + 1}</th>
                        <td>{p.id}</td>
                        <td>{p.fullName}</td>
                        <td>{p.total} DA</td>
                        <td>
                            <span class="bg-neutral-content p-2 rounded">
                                {p.status}
                            </span>
                        </td>
                        <td>{p.createdAt}</td>
                        <td
                            ><button
                                class="btn btn-outline btn-primary"
                                on:click={openModal}
                            >
                                Details
                            </button>
                        </td>
                        <dialog
                            id="my_modal_5"
                            class="modal modal-bottom sm:modal-middle w-screen"
                        >
                            <div class="modal-box">
                                <div class="container mx-auto py-12">
                                    <div class="">
                                        {p.id}
                                    </div>
                                    <div class="cart">
                                        <div class="card bg-base-100 shadow-lg">
                                            <div class="card-body">
                                                <h2 class="card-title mb-4">
                                                    {p.id}
                                                </h2>
                                                {#if p.orderItems.length > 0}
                                                    <div class="space-y-4">
                                                        {#each p.orderItems as item}
                                                            <CartOrderItem
                                                                item={item.product}
                                                                quantity={item.quantity}
                                                            />
                                                        {/each}
                                                    </div>
                                                {:else}
                                                    <p class="text-gray-500">
                                                        Your cart is empty.
                                                    </p>
                                                {/if}
                                                <div class="divider mt-6"></div>
                                                <div
                                                    class="flex justify-between items-center"
                                                >
                                                    <span
                                                        class="text-lg font-semibold"
                                                        >Total:</span
                                                    >
                                                    <span
                                                        class="text-xl font-bold"
                                                        >{p.total.toFixed(2)} DA</span
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
                        </dialog>
                        <td>
                            <div class="flex justify-center gap-2">
                                <a href="/dashboard/orders/{p.prodId}/edit">
                                    <i class="bx bx-pencil"></i>
                                </a>
                                <form method="POST">
                                    <button type="submit">
                                        <input
                                            type="hidden"
                                            name="prodId"
                                            value={p.prodId}
                                        />
                                        <i class="bx bx-trash-alt text-[#f00]"
                                        ></i>
                                    </button>
                                </form>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
    <center>
        <div class="join p-4 mt-4">
            {#each Array(totalPages).fill(0) as _, idx}
                <a
                    href="/dashboard/orders?limit={pageSize}&skip={pageSize *
                        idx}"
                    class="join-item btn {currentPage === idx
                        ? 'btn-active'
                        : ''}"
                    class:btn-disabled={idx * pageSize >= totalItems}
                >
                    {idx + 1}
                </a>
            {/each}
        </div>
    </center>
{:else}
    <p class="text-xl font-bold text-center p-6">...no orders found</p>
{/if}
