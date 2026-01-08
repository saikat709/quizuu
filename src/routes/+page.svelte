<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import { ArrowRightOutline, BookOpenOutline, BrainOutline, WandMagicSparklesOutline } from 'flowbite-svelte-icons';

  let { data } = $props();
</script>

<div class="relative overflow-hidden pt-16 pb-32">
  <!-- Decorative background blobs -->
  <div class="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl filter"></div>
  <div class="absolute top-40 right-10 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl filter"></div>

  <div class="container mx-auto px-4 text-center relative z-10">
    <div class="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm text-indigo-600 mb-8 shadow-sm">
      <span class="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
      AI-Powered Study Assistant
    </div>
    
    <h1 class="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-6">
      Turn your content into <br />
      <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Quizzes & Notes</span>
      <span class="block text-indigo-600/20 absolute -z-10 transform scale-105 blur-lg select-none">Quizzes & Notes</span>
    </h1>
    
    <p class="mx-auto max-w-2xl text-xl text-gray-600 mb-10 leading-relaxed">
      Upload documents, paste links, or record audio. We instantly generate comprehensive study notes and practice quizzes to help you master any subject.
    </p>
    
  <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
    {#if data.user}
        <Button size="lg" href="/dashboard" class="w-full sm:w-auto text-lg px-10 shadow-indigo-500/40">
            Generate Quiz
        </Button>
        <Button variant="secondary" size="lg" href="/dashboard" class="w-full sm:w-auto text-lg">
            Generate Notes
        </Button>
    {:else}
        <Button size="lg" href="/auth" class="w-full sm:w-auto text-lg px-10 shadow-indigo-500/40">
            Get Started <ArrowRightOutline class="ml-2 h-5 w-5" />
        </Button>
        <Button variant="secondary" size="lg" href="/demo" class="w-full sm:w-auto text-lg">
            View Demo
        </Button>
    {/if}
    </div>

    <!-- Feature Preview Grid -->
    <div class="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
      <div class="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <WandMagicSparklesOutline size="lg" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Instant Generation</h3>
        <p class="text-gray-600">Convert YouTube videos, PDFs, or text into structured notes in seconds.</p>
      </div>

      <div class="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
          <BookOpenOutline size="lg" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Smart Summaries</h3>
        <p class="text-gray-600">Get concise, easy-to-read summaries that capture key points and concepts.</p>
      </div>

      <div class="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
        <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors">
          <BrainOutline size="lg" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Adaptive Quizzes</h3>
        <p class="text-gray-600">Test your knowledge with AI-generated questions tailored to your material.</p>
      </div>
    </div>
  </div>
</div>
