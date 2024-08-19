<script>
    import { page } from "$app/stores";
    export let data;
    $: ({ products, total, limit, skip } = data);
    $: pageSize = limit;
    $: totalItems = total[0].count;
    $: totalPages = Math.ceil(totalItems / pageSize);
    $: currentPage = skip / pageSize;
</script>

<h1 class="text-2xl text-bold text-center">Shop</h1>
<br /><br />

<div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-y-6 mb-6"
>
    {#each products as p}
        <div class="card w-96 shadow-xl">
            <figure>
                <img src={p.prodImage} alt="Shoes" />
            </figure>
            <div class="card-body">
                <p class="card-title">
                    <a href="/shop/{p.prodId}">
                        {p.name}
                    </a>
                </p>
                <p class="m-2">{p.description}</p>
                <div class="card-actions justify-start">
                    <div class="badge badge-outline">{p.category}</div>
                </div>
                <div class="card-actions justify-between items-center p-4">
                    <h1 class="text-2xl font-bold">{p.price} DA</h1>
                    <button class="btn btn-neutral text-xl">
                        <i class="bx bx-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    {/each}
</div>

<center>
    <div class="join p-4">
        {#each Array(totalPages).fill(0) as _, idx}
            <a
                href="/shop?limit={pageSize}&skip={pageSize * idx}"
                class="join-item btn {currentPage === idx ? 'btn-active' : ''}"
                class:btn-disabled={idx * pageSize >= totalItems}
            >
                {idx + 1}
            </a>
        {/each}
    </div>
</center>
