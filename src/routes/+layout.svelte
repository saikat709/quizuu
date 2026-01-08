<script lang="ts">
	import Header from '$lib/components/ui/Header.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import type { User } from '$lib/server/db/schema';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children, data }: { children: any, data: { user: User | null } } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>QuizGen - AI Powered Notes & Quizzes</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-50">
	<Header user={data.user} />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
