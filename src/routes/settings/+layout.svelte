<script>
    import SettingsLayout from "$lib/components/settingsLayout.svelte";
    const navigation = [
        {
            title: "Theme",
            href: "/settings/theme",
        },
        {
            title: "profile",
            href: "/settings/profile",
        },
        {
            title: "Your Orders",
            href: "/settings/user/orders",
        },
    ];
    const title = "Settings";
</script>

<SettingsLayout {navigation} {title}>
    <slot />
</SettingsLayout>
