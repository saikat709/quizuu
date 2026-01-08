<script lang="ts">
  import { PlusOutline, VideoCameraOutline, FileLinesOutline, BrainOutline, DownloadOutline } from 'flowbite-svelte-icons';
  import { Spinner } from "flowbite-svelte";

  import { fade, fly } from 'svelte/transition';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Modal from '$lib/components/ui/Modal.svelte';

  import { enhance } from '$app/forms'; 

  let { data } = $props();

  let isNewModalOpen = $state(false);
  let isTranscribing = $state(false);
  let transcriptionResult = $state<{ text: string, url: string } | null>(null);

  // Helper to extract video ID for thumbnail
  const getThumbnail = (url: string) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg` : null;
  };

  function resetModal() {
      isNewModalOpen = false;
      transcriptionResult = null;
      isTranscribing = false;
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex items-center justify-between mb-8">
    <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p class="text-gray-500 mt-1">Manage your study materials and quizzes.</p>
    </div>
    <Button onclick={() => isNewModalOpen = true}>
        <PlusOutline class="mr-2 h-5 w-5" /> New Project
    </Button>
  </div>

  {#if data.dashboardItems.length === 0}
    <div class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-20 text-center dark:border-gray-800 dark:bg-gray-900/50">
        <div class="mb-4 rounded-full bg-indigo-50 p-4 text-indigo-500 dark:bg-indigo-900/20">
            <VideoCameraOutline size="xl" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">No projects yet</h3>
        <p class="max-w-sm text-gray-500 mt-2 mb-6">Start by adding a YouTube video to generate AI notes and quizzes.</p>
        <Button onclick={() => isNewModalOpen = true} variant="outline">Create your first project</Button>
    </div>
  {:else}
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {#each data.dashboardItems as item}
            {@const thumbnail = getThumbnail(item.ytUrl)}
            <div class="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-gray-900 dark:border-gray-800">
                <!-- Thumbnail -->
                <div class="aspect-video w-full overflow-hidden bg-gray-100 relative">
                    {#if thumbnail}
                        <img src={thumbnail} alt={item.title} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                        <a href={item.ytUrl} target="_blank" class="absolute bottom-3 left-3 text-white/90 hover:text-white flex items-center gap-1 text-xs font-medium bg-black/30 backdrop-blur-md px-2 py-1 rounded-full">
                            <VideoCameraOutline size="xs" /> Watch
                        </a>
                    {:else}
                        <div class="flex h-full w-full items-center justify-center text-gray-400">
                            <VideoCameraOutline size="xl" />
                        </div>
                    {/if}
                </div>

                <div class="p-5">
                    <h3 class="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1 mb-3" title={item.title}>
                        {item.title}
                    </h3>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                        {#if item.items.some(i => i.type === 'note')}
                            <span class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400">
                                <FileLinesOutline size="xs" class="mr-1" /> Notes
                            </span>
                        {/if}
                        {#if item.items.some(i => i.type === 'quiz')}
                            <span class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 dark:bg-indigo-400/10 dark:text-indigo-400">
                                <BrainOutline size="xs" class="mr-1" /> Quiz
                            </span>
                        {/if}
                    </div>

                    <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                         <div class="flex gap-2 w-full">
                            {#each item.items as subItem}
                                {#if subItem.type === 'note'}
                                    <Button size="sm" variant="ghost" class="flex-1 text-xs h-8 px-2" title="Download PDF">
                                        <DownloadOutline size="xs" class="mr-1.5" /> PDF
                                    </Button>
                                {:else}
                                    <Button size="sm" variant="ghost" class="flex-1 text-xs h-8 px-2" title="See Results">
                                        <BrainOutline size="xs" class="mr-1.5" /> Results
                                    </Button>
                                {/if}
                            {/each}
                         </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
  {/if}

  <Modal bind:open={isNewModalOpen} title="New Project">
    {#if !transcriptionResult}
        <form 
            method="POST" 
            action="?/transcribe" 
            use:enhance={() => {
                console.log('enhance');
                isTranscribing = true;
                return async ({ result }) => {
                    console.log('result', result);
                    isTranscribing = false;

                    if (result.type !== 'success') return;

                    type Data = {
                        transcription: string;
                        url: string;
                        success: boolean;
                    };

                    const data = result.data as Data;

                    if (data.success) {
                        transcriptionResult = {
                            text: data.transcription || "No transcription",
                            url: data.url || "No URL"
                        };
                    }
                };
            }}
            class="space-y-4"
        >
            <Input 
                name="url" 
                label="YouTube Video URL" 
                placeholder="https://www.youtube.com/watch?v=..." 
                required 
            />
            <Button type="submit" class="w-full" disabled={isTranscribing}>
                {#if isTranscribing}
                    <Spinner class="mr-2 h-4 w-4" /> Transcribing Video...
                {:else}
                    <BrainOutline class="mr-2 h-4 w-4" /> Start Magic
                {/if}
            </Button>
        </form>
    {:else}
        <div class="space-y-6" in:fade>
            <div class="rounded-lg bg-green-50 p-4 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
                <h4 class="font-semibold text-green-800 dark:text-green-400 mb-1">Transcription Complete!</h4>
                <p class="text-sm text-green-700 dark:text-green-300">Ready to generate content from your video.</p>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                 <form 
                    method="POST" 
                    action="?/createQuiz" 
                    use:enhance={() => {
                        console.log('enhance create quiz');
                        return async ({ result }) => {
                            console.log('result create quiz', result);
                        };
                    }}>
                    <input type="hidden" name="url" value={transcriptionResult.url} />
                    <input type="hidden" name="text" value={transcriptionResult.text} />
                    <Button type="submit" variant="outline" class="w-full h-24 flex-col gap-2 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                        <BrainOutline size="lg" class="text-indigo-600" />
                          Generate Quiz
                    </Button>
                 </form>

                 <form 
                    method="POST" 
                    action="?/createNote" 
                    use:enhance={() => {
                        console.log('enhance create note');
                        return async ({ result }) => {
                            console.log('result create note', result);
                        };
                    }}>
                    <input type="hidden" name="url" value={transcriptionResult.url} />
                    <input type="hidden" name="text" value={transcriptionResult.text} />
                    <Button type="submit" variant="outline" class="w-full h-24 flex-col gap-2 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                        <FileLinesOutline size="lg" class="text-purple-600" />
                        Generate Notes
                    </Button>
                 </form>
            </div>
            
            <Button variant="ghost" class="w-full" onclick={resetModal}>Start Over</Button>
        </div>
    {/if}
  </Modal>
</div>
