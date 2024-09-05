<script>
    import OrdersTable from "$lib/components/OrdersTable.svelte";
    import Pagination from "$lib/components/Pagination.svelte";
    const link="orders"
    export let data

    $: ({ orders, total, limit, skip } = data);
    $: pageSize = limit;
    $: totalItems = total[0].count;
    $: totalPages = Math.ceil(totalItems / pageSize);
    $: currentPage = skip / pageSize;
</script>

{#if orders.length > 0}
    <OrdersTable orders={orders} total={total} limit={limit} skip={skip} />
    <Pagination {link} {totalPages} {currentPage} {pageSize} {totalItems} />
{:else}
    <p class="text-xl font-bold text-center p-6">...no orders found</p>
{/if}
