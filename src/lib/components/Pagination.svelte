<script>
    export let totalPages;
    export let currentPage;
    export let pageSize;
    export let totalItems;
    export let link;
</script>

<center>
    <div class="join p-4 mt-4">
        {#each Array(totalPages).fill(0) as _, idx}
            <a
                href={`/dashboard/${link}?limit=${pageSize}&skip=${pageSize * idx}`}
                class="join-item btn {currentPage === idx ? 'btn-active' : ''}"
                class:btn-disabled={idx * pageSize >= totalItems}
            >
                {idx + 1}
            </a>
        {/each}
    </div>
</center>
