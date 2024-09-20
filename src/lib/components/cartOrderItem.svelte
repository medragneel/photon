<script lang="ts">
    export let item;
    export let quantity;
</script>

<div
    class="cart-item bg-secondary-content rounded-lg shadow-md p-4 flex items-center justify-between"
>
    <div class="flex-1">
        <div class="flex gap-4">
            <img
                loading="lazy"
                src={item.prodImage}
                alt={item.name}
                width="60"
                height="60"
            />
            <div class="">
                <h3 class="text-lg font-semibold">
                    {item.name} x {quantity}
                </h3>
                <p class="">{item.price.toFixed(2)} DA</p>
            </div>
        </div>
    </div>
</div>
