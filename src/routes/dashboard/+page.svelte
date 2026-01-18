<script lang="ts">
  import { 
    PlusOutline, 
    BookOpenOutline,
    WandMagicSparklesOutline,
    BrainOutline,
    FileLinesOutline,
    GridOutline,
    ListOutline,
    FolderOutline
  } from 'flowbite-svelte-icons';
  import { Spinner } from "flowbite-svelte";
  import { Motion } from 'svelte-motion';
  import { fade } from 'svelte/transition';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Modal from '$lib/components/ui/Modal.svelte';
  import ClassListItem from '$lib/components/dashboard/ClassListItem.svelte';
  import PlaylistListItem from '$lib/components/dashboard/PlaylistListItem.svelte';
  import { enhance } from '$app/forms'; 

  let { data } = $props();

  let activeTab = $state<'classes' | 'playlists'>('classes');
  let isNewModalOpen = $state(false);
  let isPlaylistModalOpen = $state(false);
  let isAddToPlaylistModalOpen = $state(false);
  let selectedUrlForPlaylist = $state<string | null>(null);

  let isTranscribing = $state(false);
  let transcriptionResult = $state<{ text: string, url: string, title: string } | null>(null);

  function resetModal() {
    isNewModalOpen = false;
    isPlaylistModalOpen = false;
    isAddToPlaylistModalOpen = false;
    transcriptionResult = null;
    isTranscribing = false;
    selectedUrlForPlaylist = null;
  }

  function openModalForExisting(url: string) {
    isNewModalOpen = true;
  }

  function openAddToPlaylist(url: string) {
    selectedUrlForPlaylist = url;
    isAddToPlaylistModalOpen = true;
  }
</script>

<div class="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 px-4 py-12 md:px-8">
  <div class="mx-auto max-w-5xl">
    
    <!-- DASHBOARD HEADER -->
    <header class="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p class="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          Manage your AI-powered study materials.
        </p>
      </div>
      
      <Motion whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <button 
          onclick={() => activeTab === 'classes' ? isNewModalOpen = true : isPlaylistModalOpen = true}
          class="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 dark:shadow-none"
        >
          <PlusOutline class="h-4 w-4" />
          {activeTab === 'classes' ? 'Add New Class' : 'Create Playlist'}
        </button>
      </Motion>
    </header>

    <!-- TAB SYSTEM -->
    <div class="mb-8 flex items-center border-b border-gray-200 dark:border-gray-800">
        <button 
            onclick={() => activeTab = 'classes'}
            class="relative px-6 py-4 text-sm font-bold transition-all {activeTab === 'classes' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}"
        >
            Classes
            {#if activeTab === 'classes'}
                <div class="absolute bottom-0 left-0 h-0.5 w-full bg-indigo-600" in:fade></div>
            {/if}
        </button>
        <button 
            onclick={() => activeTab = 'playlists'}
            class="relative px-6 py-4 text-sm font-bold transition-all {activeTab === 'playlists' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}"
        >
            Playlists
            {#if activeTab === 'playlists'}
                <div class="absolute bottom-0 left-0 h-0.5 w-full bg-indigo-600" in:fade></div>
            {/if}
        </button>
    </div>

    <!-- CONTENT AREA -->
    {#if activeTab === 'classes'}
        <div class="space-y-4" in:fade>
            {#if data.classes.length === 0}
            <div class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-24 text-center dark:border-gray-800 dark:bg-gray-900/30">
                <div class="mb-6 rounded-2xl bg-indigo-50 p-6 text-indigo-500 dark:bg-indigo-900/20">
                <BookOpenOutline class="h-12 w-12" />
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Start your first class</h3>
                <p class="mt-2 max-w-xs text-sm text-gray-500">Drop a YouTube link to generate your first AI study materials.</p>
                <button 
                onclick={() => isNewModalOpen = true}
                class="mt-8 flex items-center gap-2 text-base font-bold text-indigo-600 hover:text-indigo-800"
                >
                Add first lecture
                </button>
            </div>
            {:else}
                <div class="flex flex-col gap-2">
                    {#each data.classes as classItem}
                        <ClassListItem 
                            {classItem} 
                            onAddMaterial={openModalForExisting} 
                            onAddToPlaylist={openAddToPlaylist}
                        />
                    {/each}
                </div>
            {/if}
        </div>
    {:else}
        <div class="space-y-4" in:fade>
            {#if data.playlists.length === 0}
            <div class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-24 text-center dark:border-gray-800 dark:bg-gray-900/30">
                <div class="mb-6 rounded-2xl bg-indigo-50 p-6 text-indigo-500 dark:bg-indigo-900/20">
                <FolderOutline class="h-12 w-12" />
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">No playlists yet</h3>
                <p class="mt-2 max-w-xs text-sm text-gray-500">Organize your classes into logical study paths.</p>
                <button 
                onclick={() => isPlaylistModalOpen = true}
                class="mt-8 flex items-center gap-2 text-base font-bold text-indigo-600 hover:text-indigo-800"
                >
                Create your first playlist
                </button>
            </div>
            {:else}
                <div class="flex flex-col gap-2">
                    {#each data.playlists as playlist}
                        <PlaylistListItem {playlist} />
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
  </div>

  <!-- NEW CLASS MODAL -->
  <Modal bind:open={isNewModalOpen} title="New AI Class">
    <p class="mb-6 text-sm text-gray-500">Add a YouTube lecture to generate AI study materials.</p>
    
    {#if !transcriptionResult}
        <form 
            method="POST" 
            action="?/transcribe" 
            use:enhance={() => {
                isTranscribing = true;
                return async ({ result }) => {
                    isTranscribing = false;
                    if (result.type !== 'success') return;
                    const data = result.data as any;
                    if (data.success) {
                        transcriptionResult = {
                            text: data.transcription,
                            url: data.url,
                            title: data.title
                        };
                    }
                };
            }}
            class="space-y-6"
        >
            <Input 
                name="url" 
                label="Lecture URL" 
                placeholder="https://www.youtube.com/watch?v=..." 
                required 
                class="rounded-xl"
            />
            <Button type="submit" class="w-full py-4 text-base font-bold shadow-lg shadow-indigo-100" disabled={isTranscribing}>
                {#if isTranscribing}
                    <Spinner class="mr-2 h-4 w-4" /> Analyzing...
                {:else}
                    <WandMagicSparklesOutline class="mr-2 h-4 w-4" /> Transform Video
                {/if}
            </Button>
        </form>
    {:else}
        <div class="space-y-6" in:fade>
            <div class="relative overflow-hidden rounded-2xl bg-indigo-600 p-8 text-white shadow-xl">
                <div class="relative z-10">
                   <h4 class="text-lg font-bold mb-2 line-clamp-1">{transcriptionResult.title}</h4>
                   <p class="text-indigo-100 text-xs font-medium opacity-90 leading-relaxed">Lecture analyzed successfully. Select an option below.</p>
                </div>
                <div class="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
            </div>
            
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                 <form 
                    method="POST" 
                    action="?/createQuiz" 
                    class="h-full"
                    use:enhance={() => {
                        return async ({ result }) => {
                          if (result.type === 'success') resetModal();
                        };
                    }}>
                    <input type="hidden" name="url" value={transcriptionResult.url} />
                    <input type="hidden" name="text" value={transcriptionResult.text} />
                    <input type="hidden" name="title" value={transcriptionResult.title} />
                    <button type="submit" class="flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-indigo-500 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30">
                          <BrainOutline class="h-6 w-6" />
                        </div>
                        <span class="text-sm font-bold text-gray-900 dark:text-white">Build Quiz</span>
                    </button>
                 </form>

                 <form 
                    method="POST" 
                    action="?/createNote" 
                    class="h-full"
                    use:enhance={() => {
                        return async ({ result }) => {
                          if (result.type === 'success') resetModal();
                        };
                    }}>
                    <input type="hidden" name="url" value={transcriptionResult.url} />
                    <input type="hidden" name="text" value={transcriptionResult.text} />
                    <input type="hidden" name="title" value={transcriptionResult.title} />
                    <button type="submit" class="flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-purple-500 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/30">
                          <FileLinesOutline class="h-6 w-6" />
                        </div>
                        <span class="text-sm font-bold text-gray-900 dark:text-white">Gen Notes</span>
                    </button>
                 </form>
            </div>
            
            <button 
              onclick={resetModal}
              class="w-full text-center text-xs font-bold text-gray-400 hover:text-gray-600 transition-all py-2"
            >
              Cancel & Start Over
            </button>
        </div>
    {/if}
  </Modal>

  <!-- NEW PLAYLIST MODAL -->
  <Modal bind:open={isPlaylistModalOpen} title="Create Playlist">
     <form 
        method="POST" 
        action="?/createPlaylist" 
        use:enhance={() => {
            return async ({ result }) => {
              if (result.type === 'success') resetModal();
            };
        }}
        class="space-y-6"
    >
        <Input 
            name="title" 
            label="Playlist Title" 
            placeholder="e.g., Computer Science 101" 
            required 
            class="rounded-xl"
        />
        <Input 
            name="description" 
            label="Description (Optional)" 
            placeholder="A collection of lectures about..." 
            class="rounded-xl"
        />
        <Button type="submit" class="w-full py-4 text-base font-bold">
            Create Playlist
        </Button>
    </form>
  </Modal>

  <!-- ADD TO PLAYLIST MODAL -->
  <Modal bind:open={isAddToPlaylistModalOpen} title="Add to Playlist">
    {#if data.playlists.length === 0}
        <div class="text-center py-12">
            <FolderOutline class="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p class="text-sm text-gray-500 font-medium">You don't have any playlists yet.</p>
            <button 
                onclick={() => { isAddToPlaylistModalOpen = false; isPlaylistModalOpen = true; }}
                class="mt-4 text-sm font-bold text-indigo-600 hover:underline"
            >
                Create one now
            </button>
        </div>
    {:else}
        <p class="mb-6 text-sm text-gray-500">Select a playlist to add this class to.</p>
        <div class="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2">
            {#each data.playlists as p}
                <form 
                    method="POST" 
                    action="?/addToPlaylist" 
                    use:enhance={() => {
                        return async ({ result }) => {
                          if (result.type === 'success') resetModal();
                        };
                    }}
                >
                    <input type="hidden" name="playlistId" value={p.id} />
                    <input type="hidden" name="ytUrl" value={selectedUrlForPlaylist} />
                    <button 
                        type="submit"
                        class="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/30 transition-all text-left group"
                    >
                        <div>
                            <span class="block text-sm font-bold text-gray-900 group-hover:text-indigo-700">{p.title}</span>
                            <span class="block text-[10px] text-gray-400 font-medium uppercase tracking-wider">{p.classes.length} Classes</span>
                        </div>
                        <PlusOutline class="h-4 w-4 text-gray-300 group-hover:text-indigo-500" />
                    </button>
                </form>
            {/each}
        </div>
    {/if}
  </Modal>
</div>
