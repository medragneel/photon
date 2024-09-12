<script>
    import SettingsLayout from "$lib/components/settingsLayout.svelte";
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
    const title = "Dashboard";
</script>

<SettingsLayout {navigation} {title}>
    <slot />
</SettingsLayout>
