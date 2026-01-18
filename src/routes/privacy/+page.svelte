<script lang="ts">
    import { Motion } from 'svelte-motion';
    import { ShieldCheckOutline, LockOutline, EyeSlashOutline, DatabaseOutline } from 'flowbite-svelte-icons';

    const principles = [
        {
            title: "Data Ownership",
            description: "Your data belongs to you. We do not sell your personal information or your study materials to third parties.",
            icon: ShieldCheckOutline
        },
        {
            title: "Secure Encryption",
            description: "All uploaded documents and generated content are encrypted both in transit and at rest using industry-standard protocols.",
            icon: LockOutline
        },
        {
            title: "Privacy by Default",
            description: "We collect only the minimum amount of data required to provide our AI services and improve your experience.",
            icon: EyeSlashOutline
        },
        {
            title: "Full Transparency",
            description: "We are clear about what data we collect, why we collect it, and how it is processed by our AI models.",
            icon: DatabaseOutline
        }
    ];
</script>

<svelte:head>
    <title>Privacy Policy | YourClass - Your Security is Our Priority</title>
</svelte:head>

<div class="bg-white dark:bg-gray-950 pb-24 pt-16">
    <div class="container mx-auto px-4 max-w-4xl">
        <!-- Header -->
        <div class="mb-16 text-center">
            <Motion initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} let:motion>
                <h1 use:motion class="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-6xl">
                    Our Commitment to <br />
                    <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Your Privacy</span>
                </h1>
            </Motion>
            <p class="text-xl text-gray-500 dark:text-gray-400">Last Updated: January 18, 2026</p>
        </div>

        <!-- Privacy Principles -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {#each principles as principle}
                <div class="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                    <div class="mb-4 text-indigo-600">
                        <svelte:component this={principle.icon} size="lg" />
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{principle.title}</h3>
                    <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{principle.description}</p>
                </div>
            {/each}
        </div>

        <!-- Detailed Policy -->
        <div class="prose prose-lg dark:prose-invert max-w-none">
            <section class="mb-12">
                <h2>1. Information We Collect</h2>
                <p>
                    YourClass collects information to provide better services to all our users. This includes:
                </p>
                <ul>
                    <li><strong>Account Information:</strong> Name, email address, and password when you register.</li>
                    <li><strong>User Content:</strong> Documents, text, links, and audio files you upload for AI processing.</li>
                    <li><strong>Usage Data:</strong> Information about how you interact with our platform, such as quiz scores and feature usage.</li>
                </ul>
            </section>

            <section class="mb-12">
                <h2>2. How We Use Your Information</h2>
                <p>
                    We use the information we collect to:
                </p>
                <ul>
                    <li>Provide, maintain, and improve our AI generation services.</li>
                    <li>Personalize your learning experience.</li>
                    <li>Communicate with you about updates, features, and support.</li>
                    <li>Protect the security and integrity of our platform.</li>
                </ul>
            </section>

            <section class="mb-12">
                <h2>3. AI Data Processing</h2>
                <p>
                    When you upload content for quiz or note generation, that data is processed by our secure AI models. 
                    We do not use your private study materials to train public AI models without your express permission. 
                    Your content remains private to your account.
                </p>
            </section>

            <section class="mb-12">
                <h2>4. Data Retention and Deletion</h2>
                <p>
                    You have full control over your data. You can delete your uploaded documents or generated notes at any time. 
                    If you choose to delete your account, all personal data and user content will be permanently removed 
                    from our active servers within 30 days.
                </p>
            </section>

            <section class="p-8 rounded-3xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                <h3 class="text-indigo-900 dark:text-indigo-300 mt-0">Questions?</h3>
                <p class="mb-0 text-indigo-800 dark:text-indigo-400">
                    If you have any questions about this Privacy Policy, please contact our Data Protection Officer at 
                    <a href="mailto:privacy@yourclass.ai" class="text-indigo-600 font-bold">privacy@yourclass.ai</a>.
                </p>
            </section>
        </div>
    </div>
</div>
