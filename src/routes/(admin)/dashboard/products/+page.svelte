<script>
    import Pagination from "$lib/components/Pagination.svelte";

    export let data;
    const link = "products"
    $: ({ products, total, limit, skip } = data);
    $: pageSize = limit;
    $: totalItems = total[0].count;
    $: totalPages = Math.ceil(totalItems / pageSize);
    $: currentPage = skip / pageSize;
</script>

<div class="flex justify-end items-center mb-6">
    <a href="/dashboard/products/create" class="btn btn-wide btn-neutral">
        <i class="bx bx-plus"></i>
        Create
    </a>
</div>
{#if products.length > 0}
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th></th>
                    <th>ProdId</th>
                    <th>name</th>
                    <th>Price</th>
                    <th>Catrgory</th>
                    <th>Created_at</th>
                    <th>Updated_at</th>
                </tr>
            </thead>
            <tbody>
                {#each products as p, idx}
                    <tr>
                        <th>{idx + 1}</th>
                        <td>{p.prodId}</td>
                        <td>{p.name}</td>
                        <td>{p.price}</td>
                        <td>{p.category}</td>
                        <td>{p.createdAt}</td>
                        <td>{p.updatedAt}</td>
                        <td>
                            <div class="flex justify-center gap-2">
                                <a href="/dashboard/products/{p.prodId}/edit">
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
    <Pagination {link} {totalPages} {currentPage} {pageSize} {totalItems} />
{:else}
    <p class="text-xl font-bold text-center p-6">...no products found</p>
{/if}
