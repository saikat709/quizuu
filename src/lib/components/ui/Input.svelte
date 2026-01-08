<script lang="ts">
  import { cn } from '$lib/utils';

  let { 
    class: className = undefined, 
    value = $bindable(),
    label = undefined,
    id = undefined,
    type = 'text',
    error = undefined,
    ...rest 
  } = $props();
</script>

<div class="w-full space-y-2">
  {#if label}
    <label for={id} class="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
      {label}
    </label>
  {/if}
  <input
    {id}
    {type}
    bind:value
    class={cn(
      'flex w-full rounded-xl border border-gray-200 bg-white/50 px-4 py-2.5 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 backdrop-blur-sm',
      error && 'border-red-500 focus-visible:ring-red-500',
      className
    )}
    {...rest}
  />
  {#if error}
    <p class="text-xs text-red-500 ml-1">{error}</p>
  {/if}
</div>
