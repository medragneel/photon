<script>
    import { page } from "$app/stores";
    const navigation = [
        {
            title: "All Users",
            href: "/dashboard/users",
        },
        {
            title: "All Products",
            href: "/dashboard/products",
        },
        {
            title: "All Orders",
            href: "/dashboard/orders",
        },
    ];
</script>

<div class="container mx-auto">
    <div class="w-full h-full px-2">
        <h3 class="text-2xl font-medium">Dashboard</h3>
        <div class="divider" />
    </div>
    <div class="flex w-full h-full space-x-4">
        <ul class="menu bg-base-100 w-56 p-2 rounded-box">
            {#each navigation as navItem}
                <li>
                    <a
                        href={navItem.href}
                        class="font-medium {$page.url.pathname === navItem.href
                            ? 'active'
                            : ''}">{navItem.title}</a
                    >
                </li>
            {/each}
        </ul>
        <div class="w-full">
            <slot />
        </div>
    </div>
</div>
