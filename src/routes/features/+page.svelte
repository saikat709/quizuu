<script lang="ts">
    import { Motion } from 'svelte-motion';
    import Button from '$lib/components/ui/Button.svelte';
    import { 
        WandMagicSparklesOutline, 
        FileVideoOutline, 
        FilePdfOutline, 
        MicrophoneOutline, 
        BrainOutline, 
        ChartPieOutline,
        ArrowRightOutline,
        CheckCircleOutline
    } from 'flowbite-svelte-icons';

    const features = [
        {
            title: "AI Quiz Generation",
            description: "Convert any document or video into a comprehensive quiz in seconds. Our AI understands context to create relevant, challenging questions.",
            icon: WandMagicSparklesOutline,
            color: "text-indigo-600",
            bg: "bg-indigo-100 dark:bg-indigo-900/30",
            benefits: ["Multiple choice & short answer", "Instant grading", "Detailed explanations"]
        },
        {
            title: "YouTube to Study Sets",
            description: "Paste a YouTube link and watch YourClass transform the video into structured notes and practice sets. No more manual transcribing.",
            icon: FileVideoOutline,
            color: "text-red-600",
            bg: "bg-red-100 dark:bg-red-900/30",
            benefits: ["Timestamps included", "Key concepts extracted", "Visual summaries"]
        },
        {
            title: "Smart PDF Analysis",
            description: "Upload your textbooks, lecture slides, or research papers. Our AI extracts core concepts and creates study materials tailored to the content.",
            icon: FilePdfOutline,
            color: "text-purple-600",
            bg: "bg-purple-100 dark:bg-purple-900/30",
            benefits: ["Supports large documents", "OCRs scanned pages", "Hierarchy preservation"]
        },
        {
            title: "Voice Notes & Lectures",
            description: "Record your lectures or upload audio files. YourClass transcribes and summarizes them, turning spoken words into actionable study notes.",
            icon: MicrophoneOutline,
            color: "text-pink-600",
            bg: "bg-pink-100 dark:bg-pink-900/30",
            benefits: ["High accuracy transcription", "Speaker identification", "Noise reduction"]
        },
        {
            title: "Adaptive Learning Brain",
            description: "Our AI tracks your progress and focuses on areas where you need more practice, creating a personalized learning path just for you.",
            icon: BrainOutline,
            color: "text-emerald-600",
            bg: "bg-emerald-100 dark:bg-emerald-900/30",
            benefits: ["Strength/Weakness analysis", "Spaced repetition", "Confidence tracking"]
        },
        {
            title: "Mastery Analytics",
            description: "Visualize your learning journey with detailed analytics. Track your quiz scores, study time, and consistency over time.",
            icon: ChartPieOutline,
            color: "text-blue-600",
            bg: "bg-blue-100 dark:bg-blue-900/30",
            benefits: ["Progress charts", "Subject breakdown", "Goal setting"]
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };
</script>

<svelte:head>
    <title>Features | YourClass - AI Study Assistant</title>
    <meta name="description" content="Discover the powerful AI features of YourClass. From YouTube video conversion to smart PDF analysis and adaptive quizzes." />
</svelte:head>

<div class="relative overflow-hidden bg-white dark:bg-gray-950 pb-24 pt-16">
    <!-- Decorative Background -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div class="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-indigo-50/50 blur-[120px] dark:bg-indigo-900/10"></div>
        <div class="absolute top-[20%] -right-[10%] h-[40%] w-[40%] rounded-full bg-purple-50/50 blur-[120px] dark:bg-purple-900/10"></div>
    </div>

    <div class="container mx-auto px-4">
        <!-- Hero Header -->
        <div class="mb-20 text-center">
            <Motion 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                let:motion
            >
                <div use:motion class="mb-4 inline-flex items-center rounded-full bg-indigo-50 px-4 py-1.5 dark:bg-indigo-900/30">
                    <span class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Everything you need to master any subject</span>
                </div>
            </Motion>
            
            <Motion 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                let:motion
            >
                <h1 use:motion class="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-7xl">
                    Powerful Features for <br />
                    <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Smarter Learning</span>
                </h1>
            </Motion>

            <Motion 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                let:motion
            >
                <p use:motion class="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
                    YourClass leverages state-of-the-art AI to automate the tedious parts of studying, allowing you to focus on what matters most: understanding.
                </p>
            </Motion>
        </div>

        <!-- Features Grid -->
        <Motion
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            let:motion
        >
            <div use:motion class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {#each features as feature}
                    <Motion variants={itemVariant} let:motion>
                        <div 
                            use:motion
                            class="group relative flex flex-col rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-indigo-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-800"
                        >
                            <div class="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl {feature.bg} {feature.color} shadow-inner transition-transform group-hover:scale-110">
                                <svelte:component this={feature.icon} size="lg" />
                            </div>
                            
                            <h3 class="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                            <p class="mb-6 flex-1 text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>

                            <ul class="space-y-3">
                                {#each feature.benefits as benefit}
                                    <li class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                        <CheckCircleOutline class="h-4 w-4 {feature.color}" />
                                        <span>{benefit}</span>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                    </Motion>
                {/each}
            </div>
        </Motion>

        <!-- Call to Action Section -->
        <Motion
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            let:motion
        >
            <div use:motion class="mt-24 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-purple-700 p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                <!-- Inner decoration -->
                <div class="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                <div class="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>

                <div class="relative z-10">
                    <h2 class="mb-6 text-4xl font-bold md:text-5xl">Ready to transform your study experience?</h2>
                    <p class="mx-auto mb-10 max-w-xl text-lg text-indigo-100">
                        Join thousands of students and lifelong learners who use YourClass to master new subjects faster than ever.
                    </p>
                    
                    <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button 
                            href="/auth?mode=register" 
                            class="w-full sm:w-auto bg-white text-indigo-600 hover:bg-indigo-50 px-10 py-4 text-lg font-bold shadow-xl"
                        >
                            Get Started Free
                        </Button>
                        <Button 
                            variant="secondary" 
                            href="/demo" 
                            class="w-full sm:w-auto border-white text-white bg-white/10 backdrop-blur-md hover:bg-white/20 px-10 py-4 text-lg font-bold"
                        >
                            Explore Demo <ArrowRightOutline class="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </Motion>

        <!-- Bottom FAQ/Trust -->
        <div class="mt-24 text-center">
            <p class="text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Loved by students from over 100+ institutions
            </p>
        </div>
    </div>
</div>
