<script lang="ts">
    import { Motion } from 'svelte-motion';
    import Button from '$lib/components/ui/Button.svelte';
    import { 
        CheckOutline, 
        RocketOutline, 
        BadgeCheckOutline,
        InfoCircleOutline,
        QuestionCircleOutline,
        SchoolCheckOutline
    } from 'flowbite-svelte-icons';

    let { data } = $props();

    let isAnnual = $state(true);

    const staticPlans = [
        {
            name: "Basic",
            description: "Essential tools for occasional students.",
            monthlyPrice: 0,
            annualPrice: 0,
            icon: SchoolCheckOutline,
            color: "text-gray-600",
            bg: "bg-gray-100 dark:bg-gray-800",
            buttonText: "Get Started",
            buttonVariant: "secondary" as const,
            features: [
                "5 AI Quizzes / month",
                "3 YouTube conversions / month",
                "Basic PDF analysis (up to 10 pages)",
                "Standard community support",
                "Web access only"
            ]
        },
        {
            name: "Pro",
            description: "Everything you need for serious mastery.",
            monthlyPrice: 15,
            annualPrice: 12,
            popular: true,
            icon: RocketOutline,
            color: "text-indigo-600",
            bg: "bg-indigo-50 dark:bg-indigo-900/30",
            buttonText: "Start Free Trial",
            buttonVariant: "primary" as const,
            features: [
                "Unlimited AI Quizzes",
                "Unlimited Video conversions",
                "Advanced PDF analysis (unlimited pages)",
                "Voice & Lecture transcription",
                "Priority AI processing",
                "Personalized learning path"
            ]
        },
        {
            name: "Institutional",
            description: "Custom solutions for teams & schools.",
            monthlyPrice: 49,
            annualPrice: 39,
            icon: BadgeCheckOutline,
            color: "text-purple-600",
            bg: "bg-purple-50 dark:bg-purple-900/30",
            buttonText: "Contact Sales",
            buttonVariant: "secondary" as const,
            features: [
                "Everything in Pro",
                "Shared team libraries",
                "Bulk student onboarding",
                "LMS Integration (Canvas/Moodle)",
                "Detailed administrative analytics",
                "Dedicated account manager"
            ]
        }
    ];

    const displayPlans = $derived.by(() => {
        const pkgs = data?.packages;
        if (pkgs && pkgs.length > 0) {
            return pkgs.map((pkg: any, i: number) => ({
                ...pkg,
                popular: pkg.isPopular === 1,
                icon: i === 0 ? SchoolCheckOutline : i === 1 ? RocketOutline : BadgeCheckOutline,
                color: i === 0 ? "text-gray-600" : i === 1 ? "text-indigo-600" : "text-purple-600",
                bg: i === 0 ? "bg-gray-100 dark:bg-gray-800" : i === 1 ? "bg-indigo-50 dark:bg-indigo-900/30" : "bg-purple-50 dark:bg-purple-900/30",
                buttonText: pkg.annualPrice === 0 ? "Get Started" : (i === 1 ? "Start Free Trial" : "Contact Sales"),
                buttonVariant: i === 1 ? "primary" : "secondary",
                features: (pkg.features || '').split(',').map((f: string) => f.trim()).filter(Boolean)
            }));
        }
        return staticPlans;
    });

    const faqs = [
        {
            q: "Can I cancel my subscription at any time?",
            a: "Yes, you can cancel your subscription at any time from your account settings. You'll maintain access to Pro features until the end of your current billing period."
        },
        {
            q: "Is there a limit on file sizes for PDFs?",
            a: "Basic users can upload PDFs up to 5MB. Pro and Institutional users have a generous 50MB limit per file, suitable for even the largest textbooks."
        },
        {
            q: "How does the AI character limit work?",
            a: "We use character limits to ensure platform stability. Pro users have effectively unlimited access, but we apply fair usage policies for extremely large datasets."
        },
        {
            q: "Do you offer discounts for non-profits?",
            a: "Absolutely! Educational institutions and registered non-profits are eligible for specialized pricing. Contact our sales team to learn more."
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };
</script>

<svelte:head>
    <title>Pricing | YourClass - Affordable AI Study Plans</title>
    <meta name="description" content="Choose the perfect plan for your learning journey. From free basic tools to unlimited AI power with YourClass Pro." />
</svelte:head>

<div class="relative overflow-hidden bg-white dark:bg-gray-950 pb-24 pt-16">
    <!-- Background Decoration -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div class="absolute -top-[5%] left-1/2 -translate-x-1/2 h-[30%] w-[60%] rounded-full bg-indigo-50/50 blur-[120px] dark:bg-indigo-900/10"></div>
    </div>

    <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="mb-16 text-center">
            <Motion 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                let:motion
            >
                <h1 use:motion class="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-6xl">
                    Simple, Transparent <br />
                    <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Pricing for Everyone</span>
                </h1>
            </Motion>

            <Motion 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                let:motion
            >
                <p use:motion class="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
                    Join over 50,000 students mastering their subjects with YourClass. No hidden fees, cancel anytime.
                </p>
            </Motion>

            <!-- Billing Toggle -->
            <Motion 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                let:motion
            >
                <div use:motion class="flex items-center justify-center gap-4">
                    <span class="text-sm font-medium {!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}">Monthly</span>
                    <button 
                        onclick={() => isAnnual = !isAnnual}
                        class="relative flex h-8 w-14 items-center rounded-full bg-gray-200 p-1 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                        aria-label="Toggle annual billing"
                    >
                        <div class="h-6 w-6 rounded-full bg-white shadow-sm transition-transform {isAnnual ? 'translate-x-6' : 'translate-x-0'}"></div>
                    </button>
                    <span class="text-sm font-medium {isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}">
                        Yearly <span class="ml-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600 dark:bg-green-900/30 dark:text-green-400">Save 20%</span>
                    </span>
                </div>
            </Motion>
        </div>

        <!-- Pricing Cards -->
        <Motion
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            let:motion
        >
            <div use:motion class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {#each displayPlans as plan}
                    <Motion variants={itemVariant} let:motion>
                        <div 
                            use:motion
                            class="relative flex flex-col rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 {plan.popular ? 'border-indigo-400 ring-2 ring-indigo-500/10 lg:scale-105 lg:z-10' : ''}"
                        >
                            {#if plan.popular}
                                <div class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1 text-sm font-bold text-white shadow-lg">
                                    Most Popular
                                </div>
                            {/if}

                            <div class="mb-6 flex items-center justify-between">
                                <div class="inline-flex h-12 w-12 items-center justify-center rounded-2xl {plan.bg} {plan.color}">
                                    <svelte:component this={plan.icon} size="lg" />
                                </div>
                                <span class="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</span>
                            </div>

                            <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>

                            <div class="mb-8 flex items-baseline gap-1">
                                <span class="text-4xl font-black text-gray-900 dark:text-white">
                                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                                </span>
                                <span class="text-gray-500">/month</span>
                            </div>

                            <Button 
                                variant={plan.buttonVariant} 
                                class="mb-10 w-full py-4 text-lg font-bold shadow-lg"
                                href="/auth?mode=register"
                            >
                                {plan.buttonText}
                            </Button>

                            <ul class="flex-1 space-y-4">
                                {#each plan.features as feature}
                                    <li class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 leading-tight">
                                        <CheckOutline class="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                                        <span>{feature}</span>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                    </Motion>
                {/each}
            </div>
        </Motion>

        <!-- FAQs -->
        <div class="mt-32">
            <div class="mb-16 text-center">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">Frequently Asked Questions</h2>
            </div>

            <div class="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
                {#each faqs as faq}
                    <div class="rounded-3xl border border-gray-100 bg-white p-8 dark:border-gray-800 dark:bg-gray-900 transition-colors hover:border-indigo-100 dark:hover:border-indigo-900">
                        <div class="mb-3 flex items-center gap-3 font-bold text-gray-900 dark:text-white">
                            <QuestionCircleOutline class="h-5 w-5 text-indigo-500" />
                            {faq.q}
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {faq.a}
                        </p>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Trust Section -->
        <Motion
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            let:motion
        >
            <div use:motion class="mt-32 rounded-[3.5rem] bg-gray-50 p-12 text-center dark:bg-gray-900/50">
                <div class="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-indigo-600 shadow-sm dark:bg-gray-800">
                    <InfoCircleOutline size="lg" />
                </div>
                <h3 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Still have questions?</h3>
                <p class="mx-auto mb-8 max-w-lg text-gray-600 dark:text-gray-400">
                    Our support team is here to help you choose the right plan for your academic goals. We're available 24/7.
                </p>
                <Button variant="secondary" href="/contact" class="px-10">Chat with Support</Button>
            </div>
        </Motion>
    </div>
</div>
