<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { CloseCircleSolid } from 'flowbite-svelte-icons';
  import { cn } from '$lib/utils';
  
  let { 
    open = $bindable(false), 
    title, 
    description,
    children, 
    class: className 
  } = $props();

  function close() {
    open = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) close();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" transition:fade={{ duration: 200 }}>
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
      onclick={close}
      aria-hidden="true"
    ></div>

    <!-- Dialog Content -->
    <div 
        class={cn("relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all sm:my-8 dark:bg-gray-900 border border-gray-100 dark:border-gray-800", className)}
        transition:scale={{ duration: 200, start: 0.95 }}
        role="dialog"
        aria-modal="true"
    >
      <div class="flex items-center justify-between mb-5">
        <div>
          {#if title}
            <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
              {title}
            </h3>
          {/if}
          {#if description}
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          {/if}
        </div>
        <button 
          onclick={close} 
          class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <CloseCircleSolid size="lg" />
        </button>
      </div>

      <div class="mt-2">
        {@render children()}
      </div>
    </div>
  </div>
{/if}
