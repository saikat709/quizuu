<script lang="ts">
    import { Motion } from 'svelte-motion';
    import { ScaleBalancedOutline, InfoCircleOutline, CheckCircleOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';
</script>

<svelte:head>
    <title>Terms of Service | YourClass - User Agreement</title>
</svelte:head>

<div class="bg-white dark:bg-gray-950 pb-24 pt-16">
    <div class="container mx-auto px-4 max-w-4xl">
        <!-- Header -->
        <div class="mb-16 text-center">
            <Motion initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} let:motion>
                <h1 use:motion class="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-6xl">
                    Our <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Terms of Service</span>
                </h1>
            </Motion>
            <p class="text-xl text-gray-500 dark:text-gray-400">By using YourClass, you agree to the following terms.</p>
        </div>

        <div class="mb-12 flex items-center gap-4 p-6 rounded-3xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 text-amber-800 dark:text-amber-400">
             <InfoCircleOutline size="lg" class="shrink-0" />
             <p class="text-sm font-medium mb-0">
                <strong>Simplified:</strong> Use YourClass for learning, don't break things, respect copyrights, and we'll keep the AI running smoothly for you.
             </p>
        </div>

        <div class="prose prose-lg dark:prose-invert max-w-none">
            <section class="mb-12">
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using the YourClass platform, website, or services, you agree to be bound by these Terms of Service. 
                    If you do not agree to these terms, please do not use our services.
                </p>
            </section>

            <section class="mb-12">
                <h2>2. Description of Service</h2>
                <p>
                    YourClass provides AI-powered study assistance tools, including but not limited to quiz generation, 
                    note summarization from various media types (PDF, YouTube, Audio), and adaptive learning analytics. 
                    We reserve the right to modify or discontinue any feature at any time.
                </p>
            </section>

            <section class="mb-12">
                <h2>3. User Responsibilities</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                    <div class="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                        <CheckCircleOutline class="text-green-500 mb-3" />
                        <h4 class="font-bold mb-2">You Should:</h4>
                        <ul class="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                            <li>Provide accurate account information.</li>
                            <li>Keep your password secure.</li>
                            <li>Use the AI for legal educational purposes.</li>
                            <li>Own the rights to content you upload.</li>
                        </ul>
                    </div>
                    <div class="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                        <ExclamationCircleOutline class="text-red-500 mb-3" />
                        <h4 class="font-bold mb-2">You Must Not:</h4>
                        <ul class="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                            <li>Attempt to reverse engineer the AI.</li>
                            <li>Use Automated scripts to scrape data.</li>
                            <li>Upload malicious or illegal content.</li>
                            <li>Bypass usage limits or paywalls.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="mb-12">
                <h2>4. Intellectual Property</h2>
                <p>
                    <strong>Your Content:</strong> You retain all ownership rights to the content you upload. 
                    However, you grant YourClass a limited license to process this content to provide the service.
                </p>
                <p>
                    <strong>Our Content:</strong> The YourClass brand, code, AI models, and design are the property of 
                    YourClass and are protected by intellectual property laws.
                </p>
            </section>

            <section class="mb-12">
                <h2>5. Limitation of Liability</h2>
                <p>
                    YourClass provides AI services "as is." While we strive for high accuracy, AI-generated content 
                    may occasionally contain errors. We are not responsible for any academic or financial consequences 
                    resulting from the use of our generated materials.
                </p>
            </section>

            <section class="mb-12">
                <h2>6. Termination</h2>
                <p>
                    We reserve the right to suspend or terminate accounts that violate these terms or engage 
                    in fraudulent or harmful behavior.
                </p>
            </section>

            <footer class="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center">
                <ScaleBalancedOutline size="xl" class="text-gray-300 dark:text-gray-700 mb-6" />
                <p class="text-sm text-gray-500 text-center">
                    Thank you for choosing YourClass as your study partner. <br />
                    We're committed to your success and your safety.
                </p>
            </footer>
        </div>
    </div>
</div>
