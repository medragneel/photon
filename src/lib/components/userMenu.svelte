<script lang="ts">
    export let user;
</script>

<details>
    <summary>{user?.username}</summary>
    <ul class="bg-base-100 rounded-t-none p-2">
        {#if user?.isAdmin}
            <li>
                <a href="/dashboard/users">Dashboard</a>
            </li>
        {/if}
        <li><a href="/settings/profile">Settings</a></li>
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
