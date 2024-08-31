<script lang="ts">
    import { cart } from "$lib/client/cart";

    export let item;

    function handleUpdateQuantity(name: string, newQuantity: number) {
        console.log(`Updating quantity for item ${name} to ${newQuantity}`);
        cart.updateQuantity(name, newQuantity);
    }
</script>

<div
    class="cart-item bg-secondary-content rounded-lg shadow-md p-4 flex items-center justify-between"
>
    <div class="flex-1">
        <h3 class="text-lg font-semibold">{item.name}</h3>
        <p class="">{item.price.toFixed(2)} DA</p>
    </div>
    <div class="flex items-center space-x-2">
        <button
            class="w-8 h-8 flex items-center justify-center bg-secondary-content rounded"
            on:click={() => handleUpdateQuantity(item.name, item.quantity - 1)}
        >
            <i class="bx bx-minus"></i>
        </button>
        <span class="text-lg font-medium w-8 text-center">{item.quantity}</span>
        <button
            class="w-8 h-8 flex items-center bg-secondary-content justify-center bg-gray-200 rounded"
            on:click={() => handleUpdateQuantity(item.name, item.quantity + 1)}
        >
            <i class="bx bx-plus"></i>
        </button>
    </div>
    <button
        class="ml-4 text-red-500 hover:text-red-700"
        on:click={() => cart.removeItem(item.name)}
    >
        <i class="bx bx-trash text-xl"></i>
    </button>
</div>
