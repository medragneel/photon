<script lang="ts">
    import "../app.css";
    import { cart } from "$lib/client/cart";
    export let data;
    let open = false;
    const toggleCart = () => {
        open = !open;
        const drawer = document.getElementById("drawer-example") as HTMLElement;
        if (open) {
            drawer.style.transform = "translateX(0)";
        } else {
            drawer.style.transform = "translateX(100%)";
        }
    };
    let cartItems;
    $: cartItems = $cart;
    cart.subscribe((items) => {
        cartItems = items;
    });
    const calculateTotal = () => {
        return $cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
        );
    };
    function handleUpdateQuantity(name: string, newQuantity: number) {
        console.log(`Updating quantity for item ${name} to ${newQuantity}`);
        cart.updateQuantity(name, newQuantity);
    }
</script>

<div class="navbar bg-base-100">
    <div class="flex-1">
        <a class="btn btn-ghost text-xl" href="/">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 40 40"
                ><path
                    fill="#F06225"
                    d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"
                ></path><path
                    fill="#F06225"
                    d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                ></path></svg
            >
            Photon
        </a>
    </div>
    {#if !data?.session}
        <div class="flex items-center gap-4 px-8">
            <a class="btn btn-base-100 btn-outline" href="/login">Login</a>
            <a class="btn btn-base-100" href="/register">Register</a>
        </div>
    {:else}
        <div class="flex-none px-8 z-10">
            <ul class="menu menu-horizontal px-1">
                <li><a href="/">Home</a></li>
                <li><a href="/shop">Shop</a></li>
                <li>
                    <button class="text-xl" on:click={() => toggleCart()}>
                        <i class="bx bx-cart"></i>
                    </button>

                    {#if open}
                        <div
                            id="drawer-example"
                            class="drawer fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto bg-secondary-content shadow-2xl w-96"
                        >
                            <button
                                type="button"
                                on:click={toggleCart}
                                class="absolute top-4 right-4"
                            >
                                <i class="bx bx-x text-2xl"></i>
                                <span class="sr-only">Close menu</span>
                            </button>

                            <div class="cart-items flex flex-col gap-6 mt-12">
                                <h1 class="text-2xl font-bold">Your Cart</h1>
                                {#if $cart.length > 0}
                                    <div class="items-card space-y-4">
                                        {#each $cart as item}
                                            <div
                                                class="cart-item bg-secondary-content rounded-lg shadow-md p-4 flex items-center justify-between"
                                            >
                                                <div class="flex-1">
                                                    <h3
                                                        class="text-lg font-semibold"
                                                    >
                                                        {item.name}
                                                    </h3>
                                                    <p class="">
                                                        {item.price.toFixed(2)} DA
                                                    </p>
                                                </div>
                                                <div
                                                    class="flex items-center space-x-2"
                                                >
                                                    <button
                                                        class="w-8 h-8 flex items-center justify-center bg-secondary-content rounded"
                                                        on:click={() =>
                                                            handleUpdateQuantity(
                                                                item.name,
                                                                item.quantity -
                                                                    1,
                                                            )}
                                                    >
                                                        <i class="bx bx-minus"
                                                        ></i>
                                                    </button>
                                                    <span
                                                        class="text-lg font-medium w-8 text-center"
                                                        >{item.quantity}</span
                                                    >
                                                    <button
                                                        class="w-8 h-8 flex items-center bg-secondary-content justify-center bg-gray-200 rounded"
                                                        on:click={() =>
                                                            handleUpdateQuantity(
                                                                item.name,
                                                                item.quantity +
                                                                    1,
                                                            )}
                                                    >
                                                        <i class="bx bx-plus"
                                                        ></i>
                                                    </button>
                                                </div>
                                                <button
                                                    class="ml-4 text-red-500 hover:text-red-700"
                                                    on:click={() =>
                                                        cart.removeItem(
                                                            item.name,
                                                        )}
                                                >
                                                    <i
                                                        class="bx bx-trash text-xl"
                                                    ></i>
                                                </button>
                                            </div>
                                        {/each}
                                    </div>
                                {:else}
                                    <p>there's nothing in your cart yet</p>
                                {/if}
                                <div class="mt-6 border-t pt-4">
                                    <div
                                        class="flex justify-between items-center mb-4"
                                    >
                                        <span
                                            class="text-lg font-semibold "
                                            >Total:</span
                                        >
                                        <span
                                            class="text-xl font-bold "
                                        >
                                            {calculateTotal().toFixed(2)} DA
                                        </span>
                                    </div>
                                    <button
                                        class="w-full btn py-3 btn-wide  rounded-lg font-semibold"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/if}
                </li>
                <li>
                    <details>
                        <summary>{data?.user?.username}</summary>
                        <ul class="bg-base-100 rounded-t-none p-2">
                            {#if data?.user?.isAdmin}
                                <li>
                                    <a href="/dashboard/users">Dashboard</a>
                                </li>
                            {/if}
                            <li><a href="/settings">Settings</a></li>
                            <li>
                                <form action="/logout" method="POST">
                                    <button type="submit" class="text-[#f00]">
                                        <i class="bx bx-log-in"></i>
                                        Logout
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    {/if}
</div>
<div class="h-screen">
    <slot />
</div>

<!-- <footer -->
<!--     class="footer bg-neutral text-neutral-content items-center p-4 sticky bottom-0" -->
<!-- > -->
<!--     <aside class="grid-flow-col items-center"> -->
<!--         <div class="logo"> -->
<!--             <svg -->
<!--                 xmlns="http://www.w3.org/2000/svg" -->
<!--                 width="20" -->
<!--                 height="20" -->
<!--                 fill="none" -->
<!--                 viewBox="0 0 40 40" -->
<!--                 ><path -->
<!--                     fill="#F06225" -->
<!--                     d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z" -->
<!--                 ></path><path -->
<!--                     fill="#F06225" -->
<!--                     d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" -->
<!--                 ></path></svg -->
<!--             > -->
<!--         </div> -->
<!--         <p>Copyright © {new Date().getFullYear()} - All right reserved</p> -->
<!--     </aside> -->
<!--     <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end"> -->
<!--         <a href="/"> -->
<!--             <i class="bx bxl-facebook-circle text-xl"></i> -->
<!--         </a> -->
<!--         <a href="/"> -->
<!--             <i class="bx bxl-instagram text-xl"></i> -->
<!--         </a> -->
<!--     </nav> -->
<!-- </footer> -->
