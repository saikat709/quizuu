<script>
    const currentYear = new Date().getFullYear();
</script>

<footer class="border-t border-gray-200 bg-white/50 backdrop-blur-sm dark:bg-gray-950/50 dark:border-gray-800">
    <div class="container mx-auto px-4 py-8 md:py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="space-y-4">
                <span class="text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">QuizGen</span>
                <p class="text-sm text-gray-500 leading-relaxed">
                    Instantly generate quizzes and notes from your content using advanced AI.
                </p>
            </div>
            
            <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
                <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><a href="/features" class="hover:text-indigo-600">Features</a></li>
                    <li><a href="/pricing" class="hover:text-indigo-600">Pricing</a></li>
                    <li><a href="/api" class="hover:text-indigo-600">API</a></li>
                </ul>
            </div>

            <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
                <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><a href="/about" class="hover:text-indigo-600">About</a></li>
                    <li><a href="/blog" class="hover:text-indigo-600">Blog</a></li>
                    <li><a href="/careers" class="hover:text-indigo-600">Careers</a></li>
                </ul>
            </div>

            <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
                <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><a href="/privacy" class="hover:text-indigo-600">Privacy</a></li>
                    <li><a href="/terms" class="hover:text-indigo-600">Terms</a></li>
                </ul>
            </div>
        </div>
        
        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-sm text-gray-500">
                © {currentYear} QuizGen. All rights reserved.
            </p>
        </div>
    </div>
</footer>
