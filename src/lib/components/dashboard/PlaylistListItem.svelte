<script lang="ts">
  import { 
    FolderOutline, 
    ArrowRightOutline,
    TrashBinOutline,
    ClockOutline,
    LayersOutline
  } from 'flowbite-svelte-icons';
  import { Motion } from 'svelte-motion';

  interface Props {
    playlist: {
      id: string;
      title: string;
      description?: string | null;
      classes: { ytUrl: string; title: string }[];
    };
  }

  let { playlist } = $props<Props>();
</script>

<div class="group relative flex flex-col gap-4 rounded-2xl bg-white p-4 transition-all hover:bg-gray-50 dark:bg-gray-900/50 dark:hover:bg-gray-800/50 md:flex-row md:items-center md:gap-6 border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
  <!-- Playlist Icon / Folder Icon -->
  <div class="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-indigo-50 dark:bg-indigo-900/20 md:w-36 flex items-center justify-center">
    <div class="flex flex-col items-center gap-1">
        <FolderOutline class="h-8 w-8 text-indigo-600" />
        <span class="text-[10px] font-black uppercase tracking-tighter text-indigo-400">Playlist</span>
    </div>
    
    <!-- Stack preview overlay -->
    {#if playlist.classes.length > 0}
    <div class="absolute bottom-1 right-1 flex items-center gap-0.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-md px-1.5 py-0.5 border border-indigo-100 dark:border-gray-700 shadow-sm">
        <LayersOutline class="h-3 w-3 text-indigo-600" />
        <span class="text-[10px] font-bold text-indigo-900 dark:text-indigo-300">{playlist.classes.length}</span>
    </div>
    {/if}
  </div>

  <!-- Playlist Info -->
  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2 mb-1">
        <span class="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase tracking-wider">
            COLLECTION
        </span>
    </div>
    <h3 class="truncate text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
      {playlist.title}
    </h3>
    {#if playlist.description}
      <p class="truncate text-xs text-gray-500 font-medium">{playlist.description}</p>
    {/if}
  </div>

  <!-- Class Previews (Thumbnails) -->
  <div class="hidden lg:flex items-center -space-x-4 overflow-hidden px-2">
    {#each playlist.classes.slice(0, 4) as c}
      <div class="h-10 w-16 shrink-0 overflow-hidden rounded-lg border-2 border-white bg-gray-100 dark:border-gray-900 dark:bg-gray-800 shadow-sm">
           <img 
            src={`https://img.youtube.com/vi/${c.ytUrl.split('v=')[1]?.split('&')[0]}/hqdefault.jpg`} 
            alt={c.title} 
            class="h-full w-full object-cover" 
            onerror={(e) => (e.currentTarget.src = 'https://www.gstatic.com/youtube/src/web/htdocs/img/broken_video_v2.png')}
           />
      </div>
    {/each}
    {#if playlist.classes.length > 4}
      <div class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-indigo-50 text-[10px] font-black text-indigo-600 dark:border-gray-900 dark:bg-gray-800 shadow-sm z-10">
        +{playlist.classes.length - 4}
      </div>
    {/if}
  </div>

  <!-- Actions -->
  <div class="flex items-center gap-2 border-t border-gray-100 pt-3 md:border-none md:pt-0">
    <a 
      href="/dashboard/playlist/{playlist.id}" 
      class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
      title="View Playlist"
    >
      <ArrowRightOutline class="h-5 w-5" />
    </a>
    <button 
      class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all dark:bg-gray-800 dark:text-gray-500"
      title="Delete Playlist"
    >
      <TrashBinOutline class="h-5 w-5" />
    </button>
  </div>
</div>
