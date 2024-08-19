<script>
    export let data;
    const { product } = data;
</script>

<a href="/shop" class="btn m-4">
    <i class="bx bx-left-arrow-alt"></i>
    Go back
</a>

<div class="container mx-auto">
    <div class="flex justfy-center items-center gap-6">
        <img src={product?.prodImage} alt={product?.name} />
        <div class="flex flex-col gap-4">
            <h1 class="text-xl font-bold text-start">
                {product?.name}
            </h1>
            <p class="text-start">{product?.description}</p>
            <br />
            <p class="badge badge-outline">{product?.category}</p>
            <br />

            <div class="card-actions justify-between items-center p-4">
                <h2 class="text-2xl font-bold">{product?.price}DA</h2>

                <button class="btn btn-wide btn-neutral">
                    <i class="bx bx-cart"></i>
                    Add to cart
                </button>
            </div>
        </div>
    </div>
</div>
