<script>
    import OrderDetailsModal from "$lib/components/OrderDetailsModal.svelte";
    export let orders;
    export let total;
    export let limit;
    export let skip;
</script>

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
                    <td>{p.total.toFixed(2)} DA</td>
                    <td>
                        <form method="POST" action="?/editStatus">
                            <input type="hidden" name="orderId" value={p.id} />

                            <select
                                bind:value={p.status}
                                class="select select-bordered w-full max-w-xs"
                                name="editStatus"
                                id={`status_${p.id}`}
                                on:change={(e) => e.target.form.submit()}
                            >
                                <option value="pending">Pending</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="canceled">Canceled</option>
                            </select>
                        </form>
                    </td>
                    <td>{p.createdAt}</td>
                    <td>
                        <button
                            class="btn btn-outline btn-primary"
                            on:click={() =>
                                document
                                    .querySelector(`#modal_${p.id}`)
                                    .showModal()}
                        >
                            Details
                        </button>
                    </td>
                    <OrderDetailsModal order={p} />
                    <td>
                        <div class="flex justify-center gap-2">
                            <form method="POST" action="?/removeOrder">
                                <button type="submit">
                                    <input
                                        type="hidden"
                                        name="orderId"
                                        value={p.id}
                                    />
                                    <i class="bx bx-trash-alt text-error"></i>
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
