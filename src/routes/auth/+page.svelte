<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import { page } from '$app/stores';

  let activeTab = $state('login');

  // Check URL params for mode
  $effect(() => {
    const mode = $page.url.searchParams.get('mode');
    if (mode === 'register') activeTab = 'register';
  });

  let isLoading = $state(false);
  let formError = $state(''); // General error

  // If we get form errors from server
  let { form } = $props(); 

  $effect(() => {
    if (form?.message) {
      formError = form.message;
      isLoading = false;
    }
  });

  function toggleTab(tab: string) {
    activeTab = tab;
    formError = '';
    // Update URL without reload could be nice, but not strictly required
  }
</script>

<div class="flex min-h-[80vh] items-center justify-center p-4">
  <div class="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
    <!-- Header/Tabs -->
    <div class="flex border-b border-gray-100 dark:border-gray-700">
      <button 
        class="flex-1 py-4 text-center text-sm font-medium transition-colors hover:text-indigo-600 focus:outline-none {activeTab === 'login' ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:bg-gray-50'}"
        onclick={() => toggleTab('login')}
      >
        Log In
      </button>
      <button 
        class="flex-1 py-4 text-center text-sm font-medium transition-colors hover:text-indigo-600 focus:outline-none {activeTab === 'register' ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'text-gray-500 hover:bg-gray-50'}"
        onclick={() => toggleTab('register')}
      >
        Register
      </button>
    </div>

    <div class="p-8">
      {#if formError}
        <div class="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/10 dark:text-red-400">
          {formError}
        </div>
      {/if}

      {#if activeTab === 'login'}
        <div in:fade={{ duration: 200 }}>
          <form 
            method="POST" 
            action="?/login" 
            use:enhance={() => {
              isLoading = true;
              return async ({ update }) => {
                await update();
                isLoading = false;
              };
            }}
            class="space-y-4"
          >
            <Input 
              name="username" 
              label="Username" 
              placeholder="Enter your username" 
              required 
            />
            <Input 
              name="password" 
              type="password" 
              label="Password" 
              placeholder="••••••••" 
              required 
            />
            
            <Button type="submit" class="w-full mt-6" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
        </div>
      {:else}
        <div in:fade={{ duration: 200 }}>
          <form 
            method="POST" 
            action="?/register" 
            use:enhance={() => {
              isLoading = true;
              return async ({ update }) => {
                await update();
                isLoading = false;
              };
            }}
            class="space-y-4"
          >
            <Input 
              name="username" 
              label="Username" 
              placeholder="Choose a username" 
              required 
            />
            <Input 
              name="password" 
              type="password" 
              label="Password" 
              placeholder="•••••••• (min 6 chars)" 
              required 
            />
            <Input 
              name="confirmPassword" 
              type="password" 
              label="Confirm Password" 
              placeholder="••••••••" 
              required 
            />

            <Button type="submit" class="w-full mt-6" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </div>
      {/if}
    </div>
    
  </div>
</div>
