<script lang="ts">
    import { Motion } from 'svelte-motion';
    import Button from '$lib/components/ui/Button.svelte';
    import { 
        UsersGroupOutline, 
        ArchiveOutline, 
        PlusOutline,
        EditOutline,
        TrashBinOutline,
        CloseOutline,
        ShieldCheckOutline,
        UserOutline
    } from 'flowbite-svelte-icons';
    import { enhance } from '$app/forms';

    let { data } = $props();
    let { users, packages } = $derived(data);

    let activeTab = $state('users');
    let editingPackage = $state<any>(null);

    function startEditPackage(pkg: any = null) {
        editingPackage = pkg ? { ...pkg } : {
            id: '',
            name: '',
            description: '',
            monthlyPrice: 0,
            annualPrice: 0,
            features: '',
            isPopular: 0
        };
    }
</script>

<div class="min-h-screen bg-gray-50 p-4 dark:bg-gray-950 md:p-8">
    <div class="mx-auto max-w-7xl">
        <header class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
                <h1 class="text-3xl font-black text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p class="text-gray-500">Manage YourClass ecosystem components.</p>
            </div>
            
            <div class="flex gap-2 rounded-xl bg-white p-1 shadow-sm dark:bg-gray-900">
                <button 
                    onclick={() => activeTab = 'users'}
                    class="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all {activeTab === 'users' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}"
                >
                    <UsersGroupOutline class="h-4 w-4" />
                    Users
                </button>
                <button 
                    onclick={() => activeTab = 'packages'}
                    class="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all {activeTab === 'packages' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}"
                >
                    <ArchiveOutline class="h-4 w-4" />
                    Packages
                </button>
            </div>
        </header>

        {#if activeTab === 'users'}
            <Motion initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} let:motion>
                <div use:motion class="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <table class="w-full text-left">
                        <thead class="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">User</th>
                                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Role</th>
                                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
                                <th class="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                            {#each users as user}
                                <tr class="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-3">
                                            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30">
                                                <UserOutline size="sm" />
                                            </div>
                                            <div>
                                                <div class="font-bold text-gray-900 dark:text-white">{user.username}</div>
                                                <div class="text-xs text-gray-500">ID: {user.id.slice(0, 8)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <form method="POST" action="?/updateRole" use:enhance>
                                            <input type="hidden" name="userId" value={user.id} />
                                            <select 
                                                name="role" 
                                                value={user.role} 
                                                onchange={(e) => e.target?.parentElement?.requestSubmit()}
                                                class="rounded-lg border-gray-200 bg-white px-3 py-1 text-sm font-medium dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </form>
                                    </td>
                                    <td class="px-6 py-4">
                                        {#if user.role === 'admin'}
                                            <span class="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                                                <ShieldCheckOutline class="h-3 w-3" />
                                                Staff
                                            </span>
                                        {:else}
                                            <span class="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                Active
                                            </span>
                                        {/if}
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <form method="POST" action="?/deleteUser" use:enhance>
                                            <input type="hidden" name="userId" value={user.id} />
                                            <button 
                                                class="text-gray-400 hover:text-red-500 disabled:opacity-30" 
                                                disabled={user.role === 'admin'}
                                                aria-label="Delete user"
                                            >
                                                <TrashBinOutline class="h-5 w-5" />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </Motion>
        {:else}
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div class="lg:col-span-2">
                    <Motion initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} let:motion>
                        <div use:motion class="space-y-4">
                            <div class="flex items-center justify-between">
                                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Active Packages</h2>
                                <Button size="sm" onclick={() => startEditPackage()}>
                                    <PlusOutline class="mr-2 h-4 w-4" />
                                    New Package
                                </Button>
                            </div>

                            <div class="grid gap-4">
                                {#each packages as pkg}
                                    <div class="flex items-center justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                        <div class="flex items-center gap-4">
                                            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30">
                                                <ArchiveOutline size="sm" />
                                            </div>
                                            <div>
                                                <div class="flex items-center gap-2">
                                                    <span class="font-bold text-gray-900 dark:text-white">{pkg.name}</span>
                                                    {#if pkg.isPopular}
                                                        <span class="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black uppercase text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Popular</span>
                                                    {/if}
                                                </div>
                                                <div class="text-sm text-gray-500">${pkg.monthlyPrice}/mo · ${pkg.annualPrice}/yr</div>
                                            </div>
                                        </div>
                                        
                                        <div class="flex items-center gap-2">
                                            <button 
                                                onclick={() => startEditPackage(pkg)}
                                                class="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-indigo-600 dark:hover:bg-gray-800"
                                            >
                                                <EditOutline class="h-5 w-5" />
                                            </button>
                                            <form method="POST" action="?/deletePackage" use:enhance>
                                                <input type="hidden" name="id" value={pkg.id} />
                                                <button class="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-red-500 dark:hover:bg-gray-800">
                                                    <TrashBinOutline class="h-5 w-5" />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                {/each}
                                
                                {#if packages.length === 0}
                                    <div class="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 py-20 dark:border-gray-800">
                                        <ArchiveOutline class="mb-4 h-12 w-12 text-gray-300" />
                                        <p class="text-gray-500 font-medium">No packages found create one.</p>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </Motion>
                </div>

                <div class="lg:col-span-1">
                    <Motion initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} let:motion>
                        <div use:motion class="sticky top-24 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <h2 class="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                                {editingPackage?.id ? 'Edit Package' : 'Create Package'}
                            </h2>
                            
                            <form 
                                method="POST" 
                                action="?/savePackage" 
                                use:enhance={() => {
                                    return async ({ result }) => {
                                        if (result.type === 'success') {
                                            editingPackage = null;
                                        }
                                    };
                                }}
                                class="space-y-4"
                            >
                                <input type="hidden" name="id" value={editingPackage?.id || ''} />
                                
                                <div>
                                    <label class="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Plan Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={editingPackage?.name || ''} 
                                        required
                                        class="w-full rounded-xl border-gray-200 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800"
                                        placeholder="e.g. Pro Plan"
                                    />
                                </div>

                                <div>
                                    <label class="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Description</label>
                                    <textarea 
                                        name="description" 
                                        value={editingPackage?.description || ''} 
                                        required
                                        class="h-20 w-full rounded-xl border-gray-200 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800"
                                    ></textarea>
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Monthly ($)</label>
                                        <input 
                                            type="number" 
                                            name="monthlyPrice" 
                                            value={editingPackage ? editingPackage.monthlyPrice : 0} 
                                            required
                                            class="w-full rounded-xl border-gray-200 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800"
                                        />
                                    </div>
                                    <div>
                                        <label class="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Annual ($/mo)</label>
                                        <input 
                                            type="number" 
                                            name="annualPrice" 
                                            value={editingPackage ? editingPackage.annualPrice : 0} 
                                            required
                                            class="w-full rounded-xl border-gray-200 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label class="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300">Features (comma separated)</label>
                                    <textarea 
                                        name="features" 
                                        value={editingPackage?.features || ''} 
                                        required
                                        class="h-24 w-full rounded-xl border-gray-200 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800"
                                        placeholder="Unlimited Quizzes, PDF Analysis..."
                                    ></textarea>
                                </div>

                                <div class="flex items-center gap-2 py-2">
                                    <input 
                                        type="checkbox" 
                                        name="isPopular" 
                                        id="isPopular"
                                        checked={editingPackage?.isPopular === 1}
                                        class="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label for="isPopular" class="text-sm font-bold text-gray-700 dark:text-gray-300">Mark as Popular</label>
                                </div>

                                <div class="flex gap-2">
                                    <Button type="submit" class="flex-1">Save Package</Button>
                                    {#if editingPackage}
                                        <button 
                                            type="button" 
                                            onclick={() => editingPackage = null}
                                            class="rounded-xl bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                                        >
                                            <CloseOutline class="h-6 w-6" />
                                        </button>
                                    {/if}
                                </div>
                            </form>
                        </div>
                    </Motion>
                </div>
            </div>
        {/if}
    </div>
</div>
