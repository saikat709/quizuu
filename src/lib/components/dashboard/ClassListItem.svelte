<script lang="ts">
  import { 
    VideoCameraOutline, 
    FileLinesOutline, 
    BrainOutline, 
    ArrowRightOutline,
    PlusOutline,
    WandMagicSparklesOutline,
    TrashBinOutline,
    ClockOutline,
    FolderPlusOutline
  } from 'flowbite-svelte-icons';
  import { Motion } from 'svelte-motion';

  interface Props {
    classItem: {
      ytUrl: string;
      title: string;
      lastUpdated: Date;
      hasNote: boolean;
      hasQuiz: boolean;
      noteId?: string;
      quizId?: string;
    };
    onAddMaterial: (url: string) => void;
    onAddToPlaylist?: (url: string) => void;
  }

  let { classItem, onAddMaterial, onAddToPlaylist } = $props<Props>();

  const cleanTitle = (t: string) => {
    if (!t) return 'Untitled Lecture';
    let clean = t;
    
    // Explicitly remove "Notes from", "Quiz from" and other generic markers
    const patterns = [
      /notes from/gi, 
      /quiz from/gi, 
      /ai notes/gi, 
      /ai quiz/gi, 
      /untitled lecture/gi,
      /https?:\/\/[^\s]+/gi // Broad URL removal
    ];
    
    patterns.forEach(p => clean = clean.replace(p, ''));

    // Clean up leftover symbols and whitespace
    clean = clean.trim()
        .replace(/^[:\s\-\|]+|[:\s\-\|]+$/g, '') 
        .replace(/\s{2,}/g, ' ');

    return clean || 'Untitled Lecture';
  };

  const getThumbnail = (url: string) => {
    if (!url || url === 'unknown') return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg` : null;
  };

  const thumbnail = getThumbnail(classItem.ytUrl);
</script>

<div class="group relative flex flex-col gap-4 rounded-2xl bg-white p-4 transition-all hover:bg-gray-50 dark:bg-gray-900/50 dark:hover:bg-gray-800/50 md:flex-row md:items-center md:gap-6 border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
  <!-- Thumbnail Container -->
  <div class="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 md:h-20 md:w-36">
    {#if thumbnail}
      <img src={thumbnail} alt={classItem.title} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
    {:else}
      <div class="flex h-full w-full items-center justify-center text-gray-400">
        <VideoCameraOutline size="sm" />
      </div>
    {/if}
    <div class="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
  </div>

  <!-- Content Info -->
  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2 mb-1">
        <span class="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase tracking-wider">
            <ClockOutline class="h-3 w-3" />
            {new Date(classItem.lastUpdated).toLocaleDateString()}
        </span>
        <span class="text-gray-300">|</span>
        <a href={classItem.ytUrl} target="_blank" class="text-[10px] font-bold text-indigo-500 hover:underline uppercase tracking-wider">YouTube Source</a>
    </div>
    <h3 class="truncate text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors" title={cleanTitle(classItem.title)}>
      {cleanTitle(classItem.title)}
    </h3>
  </div>

  <!-- Material Slots (Horizontal on desktop) -->
  <div class="flex flex-wrap items-center gap-3 md:gap-4">
    <!-- Note Slot -->
    {#if classItem.hasNote}
      <a 
        href="/dashboard/note/{classItem.noteId}" 
        class="flex items-center gap-2 rounded-xl bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700 transition-all hover:bg-purple-600 hover:text-white dark:bg-purple-900/20 dark:text-purple-400"
      >
        <FileLinesOutline class="h-4 w-4" />
        Notes
      </a>
    {:else}
      <button 
        onclick={() => onAddMaterial(classItem.ytUrl)}
        class="flex items-center gap-2 rounded-xl border border-dashed border-purple-200 bg-transparent px-3 py-1.5 text-xs font-bold text-purple-400 transition-all hover:bg-purple-50 hover:border-purple-300 dark:border-purple-900/30 dark:hover:bg-purple-900/10"
      >
        <PlusOutline class="h-4 w-4" />
        Make Note
      </button>
    {/if}

    <!-- Quiz Slot -->
    {#if classItem.hasQuiz}
      <a 
        href="/dashboard/quiz/{classItem.quizId}" 
        class="flex items-center gap-2 rounded-xl bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 transition-all hover:bg-indigo-600 hover:text-white dark:bg-indigo-900/20 dark:text-indigo-400"
      >
        <BrainOutline class="h-4 w-4" />
        Quiz
      </a>
    {:else}
      <button 
        onclick={() => onAddMaterial(classItem.ytUrl)}
        class="flex items-center gap-2 rounded-xl border border-dashed border-indigo-200 bg-transparent px-3 py-1.5 text-xs font-bold text-indigo-400 transition-all hover:bg-indigo-50 hover:border-indigo-300 dark:border-indigo-900/30 dark:hover:bg-indigo-900/10"
      >
        <PlusOutline class="h-4 w-4" />
        Make Quiz
      </button>
    {/if}
  </div>

  <!-- End Actions -->
  <div class="flex items-center gap-2 border-t border-gray-100 pt-3 md:border-none md:pt-0">
    <a 
      href="/dashboard/class?url={encodeURIComponent(classItem.ytUrl)}" 
      class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all dark:bg-gray-800 dark:text-gray-500"
      title="Manage Materials"
    >
      <ArrowRightOutline class="h-5 w-5" />
    </a>
    <button 
      onclick={() => onAddToPlaylist?.(classItem.ytUrl)}
      class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-indigo-600 transition-all dark:bg-gray-800 dark:text-gray-500"
      title="Add to Playlist"
    >
      <FolderPlusOutline class="h-5 w-5" />
    </button>
    <button 
      class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all dark:bg-gray-800 dark:text-gray-500"
      title="Delete Class"
    >
      <TrashBinOutline class="h-5 w-5" />
    </button>
  </div>
</div>
