<script>
    export let data;
    const { users } = data;
</script>

<div class="overflow-x-auto">
    <table class="table">
        <!-- head -->
        <thead>
            <tr>
                <th></th>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>IsAdmin</th>
                <th>Created_at</th>
                <th>Updated_at</th>
            </tr>
        </thead>
        <tbody>
            {#each users as user, idx}
                <tr>
                    <th>{idx + 1}</th>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    {#if user.isAdmin}
                        <td><i class="bx bx-user-check text-xl"></i></td>
                    {:else}
                        <td><i class="bx bx-user-x text-xl"></i></td>
                    {/if}
                    <td>{user.createdAt}</td>
                    <td>{user.updatedAt}</td>
                    <td>
                        <form>
                            <i class="bx bx-trash-alt text-[#f00]"></i>
                        </form>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
