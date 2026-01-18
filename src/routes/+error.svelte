<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/ui/Button.svelte';
  import { HomeOutline, ArrowLeftOutline, FileSearchOutline, BookOutline, PenOutline, BookOpenOutline } from 'flowbite-svelte-icons';
  import { Motion } from 'svelte-motion';

  const floatingIcons = [
    { Icon: BookOutline, size: 24, top: '20%', left: '15%', delay: 0 },
    { Icon: PenOutline, size: 30, top: '15%', left: '75%', delay: 0.5 },
    { Icon: BookOpenOutline, size: 28, top: '70%', left: '10%', delay: 1 },
    { Icon: FileSearchOutline, size: 32, top: '80%', left: '80%', delay: 1.5 },
    { Icon: BookOutline, size: 22, top: '40%', left: '85%', delay: 2 },
  ];
</script>

<div class="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
  <!-- Background Decorative Elements -->
  <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    {#each floatingIcons as item}
      <Motion
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          delay: item.delay,
          ease: "easeInOut"
        }}
        let:motion
      >
        <div 
          use:motion 
          class="absolute text-indigo-500/20 dark:text-indigo-400/20"
          style="top: {item.top}; left: {item.left};"
        >
          <svelte:component this={item.Icon} size="none" class="h-{item.size} w-{item.size}" />
        </div>
      </Motion>
    {/each}

    <!-- Animated Blob Backgrounds -->
    <Motion
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
        rotate: [0, 90, 0]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      let:motion
    >
      <div 
        use:motion
        class="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-900/20"
      ></div>
    </Motion>

    <Motion
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.4, 0.3],
        rotate: [0, -90, 0]
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      let:motion
    >
      <div 
        use:motion
        class="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-900/20"
      ></div>
    </Motion>
  </div>

  <div class="relative z-10">
    <Motion
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      let:motion
    >
      <div use:motion class="mb-6 flex justify-center">
        <div class="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 shadow-xl dark:from-indigo-900/40 dark:to-purple-800/20">
          <FileSearchOutline class="h-16 w-16 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
    </Motion>

    <Motion
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      let:motion
    >
      <h1 use:motion class="mb-4 text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 lg:text-9xl">
        {$page.status || '404'}
      </h1>
    </Motion>
    
    <Motion
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      let:motion
    >
      <h2 use:motion class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl text-balance">
        {$page.status === 404 ? 'Lost in the Cloud of Knowledge?' : 'Something went wrong on our end.'}
      </h2>
    </Motion>
    
    <Motion
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      let:motion
    >
      <p use:motion class="mx-auto mb-8 max-w-lg text-lg font-light text-gray-500 dark:text-gray-400">
        {$page.status === 404 
          ? "The page you are looking for seems to have been erased from our notes. Don't worry, there's plenty more to learn!"
          : "We encountered an unexpected error while trying to fetch your study materials. Please try again later."}
      </p>
    </Motion>
    
    <Motion
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      let:motion
    >
      <div use:motion class="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button href="/" class="group px-8">
            <HomeOutline class="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
            Study Home
        </Button>
        
        <Button onclick={() => history.back()} variant="secondary" class="group px-8">
            <ArrowLeftOutline class="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Go Back
        </Button>
      </div>
    </Motion>
    
    {#if $page.error}
      <Motion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        let:motion
      >
        <div use:motion class="mt-12 rounded-xl border border-gray-100 bg-white/50 p-4 text-left backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
          <p class="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Technical Details</p>
          <p class="font-mono text-sm text-gray-600 dark:text-gray-400">{$page.error.message}</p>
        </div>
      </Motion>
    {/if}
  </div>
</div>
