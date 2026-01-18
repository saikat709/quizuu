<script lang="ts">
    import { Motion } from 'svelte-motion';
    import Button from '$lib/components/ui/Button.svelte';
    import { 
        UsersGroupOutline, 
        AwardOutline, 
        GlobeOutline, 
        MapPinOutline,
        ArrowRightOutline 
    } from 'flowbite-svelte-icons';

    const stats = [
        { label: "Active Students", value: "50,000+", icon: UsersGroupOutline },
        { label: "Quizzes Generated", value: "1.2M", icon: AwardOutline },
        { label: "Countries", value: "85+", icon: GlobeOutline },
        { label: "HQ Location", value: "Global", icon: MapPinOutline }
    ];

    const team = [
        { name: "Sarah Chen", role: "CEO & Founder", bio: "Former educator with a passion for leveraging AI to democratize learning." },
        { name: "Marcus Thorne", role: "CTO", bio: "AI researcher specializing in natural language processing and knowledge extraction." },
        { name: "Elena Rodriguez", role: "Head of Design", bio: "Ensuring that complex AI tools remain intuitive and accessible for all students." }
    ];
</script>

<svelte:head>
    <title>About Us | YourClass - Empowering Lifelong Learners</title>
    <meta name="description" content="Learn about the mission, team, and vision behind YourClass. We're on a mission to make learning easier through AI." />
</svelte:head>

<div class="bg-white dark:bg-gray-950">
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-24 pb-20">
        <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div class="absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full bg-indigo-50/50 blur-[120px] dark:bg-indigo-900/10"></div>
            <div class="absolute bottom-0 right-0 h-[40%] w-[40%] rounded-full bg-purple-50/50 blur-[120px] dark:bg-purple-900/10"></div>
        </div>

        <div class="container mx-auto px-4 text-center">
            <Motion initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} let:motion>
                <h1 use:motion class="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-7xl">
                    Our Mission: To Make <br />
                    <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Learning Effortless</span>
                </h1>
            </Motion>
            
            <Motion initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} let:motion>
                <p use:motion class="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                    At YourClass, we believe that education is the most powerful tool for change. 
                    Our goal is to remove the friction from studying, allowing students to focus 
                    on deep understanding rather than repetitive tasks.
                </p>
            </Motion>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
                {#each stats as stat}
                    <Motion 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        whileInView={{ opacity: 1, scale: 1 }} 
                        viewport={{ once: true }}
                        let:motion
                    >
                        <div use:motion class="text-center">
                            <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm dark:bg-gray-800">
                                <svelte:component this={stat.icon} size="lg" />
                            </div>
                            <div class="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</div>
                            <div class="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</div>
                        </div>
                    </Motion>
                {/each}
            </div>
        </div>
    </section>

    <!-- Story Section -->
    <section class="py-24">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
                <Motion initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} let:motion>
                    <div use:motion>
                        <h2 class="mb-6 text-4xl font-bold text-gray-900 dark:text-white">Started in a Dorm Room, <br /> Built for the World</h2>
                        <p class="mb-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            YourClass began as a simple tool created by two students who were overwhelmed by their course load. 
                            They realized that converting lecture notes into flashcards and quizzes was taking more time than 
                            actually studying.
                        </p>
                        <p class="mb-10 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            Today, YourClass is used by thousands of students globally, from middle schoolers to doctorate candidates, 
                            helping them master complex subjects with the help of advanced AI.
                        </p>
                        <Button variant="secondary" href="/features">Explore Our Features</Button>
                    </div>
                </Motion>

                <Motion initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} let:motion>
                    <div use:motion class="relative">
                        <div class="aspect-square rounded-[3rem] bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 overflow-hidden shadow-2xl flex items-center justify-center p-12">
                             <div class="text-9xl text-indigo-500/20 font-black italic">YC</div>
                        </div>
                        <!-- Decorative element -->
                        <div class="absolute -bottom-6 -right-6 h-32 w-32 rounded-3xl bg-white p-4 shadow-xl dark:bg-gray-800">
                             <div class="h-full w-full rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
                                <AwardOutline size="lg" />
                             </div>
                        </div>
                    </div>
                </Motion>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="py-24">
        <div class="container mx-auto px-4">
             <div class="rounded-[3rem] bg-indigo-600 p-8 md:p-16 text-center text-white shadow-2xl">
                <h2 class="mb-6 text-4xl font-bold">Ready to join our community?</h2>
                <p class="mx-auto mb-10 max-w-xl text-lg text-indigo-100">
                    Experience the future of learning today. Get started for free and see why students love YourClass.
                </p>
                <div class="flex justify-center">
                    <Button href="/auth?mode=register" class="bg-white text-indigo-600 hover:bg-indigo-50 px-10 py-4 font-bold shadow-xl">
                        Create Your Account <ArrowRightOutline class="ml-2 h-5 w-5" />
                    </Button>
                </div>
             </div>
        </div>
    </section>
</div>
