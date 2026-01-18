<script lang="ts">
    import { Motion } from 'svelte-motion';
    import Button from '$lib/components/ui/Button.svelte';
    import { 
        TerminalOutline, 
        CodeOutline, 
        GlobeOutline,
        ArrowRightOutline,
        RocketOutline,
        EnvelopeOutline
    } from 'flowbite-svelte-icons';

    const techStack = [
        { name: "RESTful JSON", icon: GlobeOutline },
        { name: "OAuth 2.0 Auth", icon: CodeOutline },
        { name: "Webhooks", icon: RocketOutline }
    ];
</script>

<svelte:head>
    <title>Developer API | YourClass - COMING SOON</title>
    <meta name="description" content="Integrate YourClass AI-powered learning tools directly into your own applications. Our robust developer API is coming soon." />
</svelte:head>

<div class="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-white dark:bg-gray-950 px-4 py-24 text-center">
    <!-- Animated Background Decorative Elements -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Motion
            animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            let:motion
        >
            <div use:motion class="absolute top-[10%] left-[10%] h-96 w-96 rounded-full bg-indigo-100/50 blur-[100px] dark:bg-indigo-900/10"></div>
        </Motion>
        
        <Motion
            animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
                opacity: [0.3, 0.4, 0.3]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            let:motion
        >
            <div use:motion class="absolute bottom-[10%] right-[10%] h-[500px] w-[500px] rounded-full bg-purple-100/50 blur-[120px] dark:bg-purple-900/10"></div>
        </Motion>
    </div>

    <div class="container mx-auto max-w-4xl relative z-10">
        <!-- Main Graphic -->
        <Motion
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            let:motion
        >
            <div use:motion class="mb-12 flex justify-center">
                <div class="relative">
                    <div class="absolute inset-0 -m-4 animate-pulse rounded-full bg-indigo-500/20 blur-2xl"></div>
                    <div class="relative flex h-32 w-48 items-center justify-center rounded-3xl border border-indigo-200 bg-white shadow-2xl dark:border-indigo-800 dark:bg-gray-900 text-indigo-600">
                        <TerminalOutline size="none" class="h-16 w-16" />
                    </div>
                </div>
            </div>
        </Motion>

        <!-- Status Badge -->
        <Motion
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            let:motion
        >
            <div use:motion class="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-bold text-amber-700 dark:border-amber-900/30 dark:bg-amber-900/20 dark:text-amber-400">
                <span class="flex h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
                Coming Soon: Q2 2026
            </div>
        </Motion>

        <!-- Title -->
        <Motion
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            let:motion
        >
            <h1 use:motion class="mb-6 text-5xl font-black tracking-tight text-gray-900 dark:text-white md:text-7xl">
                The Power of YourClass <br />
                <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">In Your Own Apps</span>
            </h1>
        </Motion>

        <!-- Subtitle -->
        <Motion
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            let:motion
        >
            <p use:motion class="mx-auto mb-12 max-w-2xl text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                We're building a robust Developer API that will allow you to programmatically generate quizzes, 
                extract study notes, and integrate our AI learning brain directly into your own products.
            </p>
        </Motion>

        <!-- Tech Teasers -->
        <Motion
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
            let:motion
        >
            <div use:motion class="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {#each techStack as tech}
                    <div class="flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white/50 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
                        <tech.icon size="lg" class="text-indigo-500" />
                        <span class="text-sm font-bold text-gray-700 dark:text-gray-300">{tech.name}</span>
                    </div>
                {/each}
            </div>
        </Motion>

        <!-- CTA Action -->
        <Motion
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            let:motion
        >
            <div use:motion class="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button href="/" class="group px-10">
                    Back to Home
                    <ArrowRightOutline class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="secondary" href="/contact" class="px-10">
                    <EnvelopeOutline class="mr-2 h-5 w-5" />
                    Join Early Access Waitlist
                </Button>
            </div>
        </Motion>

        <Motion
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            let:motion
        >
            <p use:motion class="mt-12 text-sm text-gray-500">
                Documentation and sandbox coming soon. <br />
                Follow our developer blog for technical updates.
            </p>
        </Motion>
    </div>
</div>
