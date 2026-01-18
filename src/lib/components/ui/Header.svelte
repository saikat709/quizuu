<script lang="ts">
    import { page } from '$app/stores';
    import Button from './Button.svelte';
    import { WandMagicSparklesOutline, BarsOutline, CloseOutline } from 'flowbite-svelte-icons';
    import { slide } from 'svelte/transition';

    let { user } = $props();
    let isMenuOpen = $state(false);

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
</script>

<header class="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-sm dark:bg-gray-950/80 dark:border-gray-800/50 transition-all duration-300">
    <div class="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <a href="/" class="flex items-center gap-2 group">
            <div class="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg transition-transform group-hover:scale-105">
                <WandMagicSparklesOutline size="sm" />
            </div>
            <span class="text-xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                YourClass
            </span>
        </a>

        <nav class="hidden md:flex items-center gap-8">
            <a href="/" class="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors dark:text-gray-400 dark:hover:text-indigo-400">Home</a>
            <a href="/features" class="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors dark:text-gray-400 dark:hover:text-indigo-400">Features</a>
            <a href="/pricing" class="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors dark:text-gray-400 dark:hover:text-indigo-400">Pricing</a>
        </nav>

        <div class="hidden md:flex items-center gap-4">
            {#if user}
                {#if user.role === 'admin'}
                    <a href="/admin" class="text-sm font-bold text-purple-600 hover:text-purple-700 dark:text-purple-400">Admin</a>
                {/if}
                <a href="/dashboard" class="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300">Dashboard</a>
                <span class="text-sm text-gray-400">|</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{user.username}</span>
                <form action="/auth?/logout" method="POST" class="inline">
                    <button type="submit" class="text-sm font-medium text-red-500 hover:text-red-700 ml-2">Logout</button>
                </form>
            {:else}
                <a href="/auth" class="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-300">Log in</a>
                <Button size="sm" href="/auth?mode=register" onclick={() => window.location.href='/auth?mode=register'}>Get Started</Button>
            {/if}
        </div>

        <button class="md:hidden p-2 text-gray-600" onclick={toggleMenu} aria-label="Toggle menu">
            {#if isMenuOpen}
                <CloseOutline size="lg" />
            {:else}
                <BarsOutline size="lg" />
            {/if}
        </button>
    </div>

    {#if isMenuOpen}
        <div transition:slide class="md:hidden border-t border-gray-100 bg-white dark:bg-gray-950 dark:border-gray-800">
            <div class="flex flex-col space-y-4 p-4">
                <a href="/" class="text-base font-medium text-gray-600" onclick={toggleMenu}>Home</a>
                <a href="/features" class="text-base font-medium text-gray-600" onclick={toggleMenu}>Features</a>
                <a href="/pricing" class="text-base font-medium text-gray-600" onclick={toggleMenu}>Pricing</a>
                <hr class="border-gray-100 dark:border-gray-800" />
                {#if user}
                     {#if user.role === 'admin'}
                        <a href="/admin" class="text-base font-bold text-purple-600" onclick={toggleMenu}>Admin Panel</a>
                     {/if}
                     <a href="/dashboard" class="text-base font-medium text-gray-600" onclick={toggleMenu}>Dashboard</a>
                     <form action="/auth?/logout" method="POST" class="w-full">
                        <button type="submit" class="text-base font-medium text-red-500 hover:text-red-700 w-full text-left">Logout</button>
                    </form>
                {:else}
                    <a href="/auth" class="text-base font-medium text-gray-600" onclick={toggleMenu}>Log in</a>
                    <Button class="w-full" href="/auth">Get Started</Button>
                {/if}
            </div>
        </div>
    {/if}
</header>
