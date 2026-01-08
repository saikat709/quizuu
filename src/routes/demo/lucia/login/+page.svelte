<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex flex-col gap-2 max-w-md mx-auto p-4 border border-gray-300 rounded-md">
	<h1 class="text-2xl font-bold text-center w-full">Login/Register</h1>
	<form method="post" action="?/login" use:enhance class="flex flex-col gap-2">
		<label class="w-full flex justify-between items-center">
			Username
			<input
				name="username"
				class="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</label>
		<label class="w-full flex justify-between items-center">
			Password
			<input
				type="password"
				name="password"
				class="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</label>
		<button class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
			>Login</button
		>
		<button
			formaction="?/register"
			class="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
			>Register</button
		>
	</form>
	<p style="color: red">{form?.message ?? ''}</p>
</div>
