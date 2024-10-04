<!-- ProductGrid.svelte -->
<script lang="ts">
    export let products: {
        prodId: string;
        userId: string;
        name: string;
        price: number;
        description: string;
        prodImage: string;
        category: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
</script>

<div class="container mx-auto px-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each products as product (product.prodId)}
            <div
                class="card bg-base-100 shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
            >
                <figure class="relative h-72">
                    <img
                        src={product.prodImage}
                        alt={product.name}
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                        class="absolute bottom-0 right-0 w-24 h-24 bg-base-100 rounded-tl-full shadow-lg"
                    >
                        <a
                            href={`/shop/${product.prodId}`}
                            class="btn btn-accent btn-circle absolute bottom-3 right-3 w-14 h-14 text-2xl hover:scale-110 transition-transform duration-300"
                        >
                            <i class="bx bx-right-arrow-alt -rotate-45"></i>
                        </a>
                    </div>
                </figure>
                <div class="card-body p-6">
                    <h2 class="card-title text-2xl mb-2 font-bold">
                        {product.name}
                    </h2>
                    <p class="text-base-content/70 mb-4 line-clamp-2">
                        {product.description}
                    </p>
                    <div class="flex justify-between items-center">
                        <span class="text-xl font-semibold"
                            >{product.price.toFixed(2)} DA</span
                        >
                        {#if product.category}
                            <span class="badge badge-accent px-4 py-2 text-sm">
                                {product.category}
                            </span>
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
