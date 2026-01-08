<script lang="ts">
  import { cn } from '$lib/utils';
  
  type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  type Size = 'sm' | 'md' | 'lg';

  let { 
    class: className = undefined, 
    variant = 'primary' as Variant, 
    size = 'md' as Size, 
    children, 
    ...rest 
  } = $props();

  const variants: Record<Variant, string> = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/30 border-transparent',
    secondary: 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:text-indigo-600 shadow-sm border',
    ghost: 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100/50',
    outline: 'bg-transparent border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30'
  };

  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg'
  };
</script>

<button 
  class={cn(
    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95', 
    variants[variant], 
    sizes[size], 
    className
  )}
  {...rest}
>
  {@render children()}
</button>
