<script lang="ts">
    export let user;
</script>

<details>
    <summary>
        <div class="avatar online placeholder">
            <div class="bg-neutral text-neutral-content w-8 rounded-full">
                <span class="text-xs"
                    >{user?.username.charAt(0).toUpperCase()}</span
                >
            </div>
        </div>
    </summary>
    <ul class="bg-base-100 rounded-t-none w-52 p-2 right-4">
        {#if user?.isAdmin}
            <li>
                <a href="/dashboard/users">
                    <i class="bx bxs-dashboard"></i>
                    Dashboard
                </a>
            </li>
        {/if}
        <li>
            <a href="/settings/profile">
                <i class="bx bx-cog"></i>
                Settings
            </a>
        </li>
        <li>
            <form action="/logout" method="POST">
                <button type="submit" class="text-error">
                    <i class="bx bx-log-in"></i>
                    Logout
                </button>
            </form>
        </li>
    </ul>
</details>
