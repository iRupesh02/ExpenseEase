/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	"./pages/**/*.{js,ts,jsx,tsx}",
    "./_components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: "#4845d2",
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  gray: {
			50: '#f9fafb',
			100: '#f3f4f6',
			200: '#e5e7eb',
			300: '#d1d5db',
			400: '#9ca3af',
			500: '#6b7280',
			600: '#4b5563',
			700: '#374151',
			800: '#1f2937',
			900: '#111827',
		  },
		  neutral: {
			50: '#fafafa',
			100: '#f4f4f5',
			200: '#e4e4e7',
			300: '#d4d4d8',
			400: '#a1a1aa',
			500: '#71717a',
			600: '#52525b',
			700: '#3f3f46',
			800: '#27272a',
			900: '#18181b',
		  },
		  slate: {
			50: '#f8fafc',
			100: '#f1f5f9',
			200: '#e2e8f0',
			300: '#cbd5e1',
			400: '#94a3b8',
			500: '#64748b',
			600: '#475569',
			700: '#334155',
			800: '#1e293b',
			900: '#0f172a',
		  },
		  stone: {
			50: '#fafaf9',
			100: '#f5f5f4',
			200: '#e7e5e4',
			300: '#d6d3d1',
			400: '#a8a29e',
			500: '#78716c',
			600: '#57534e',
			700: '#44403c',
			800: '#2d2926',
			900: '#1a1816',
		  },
		  zinc: {
			50: '#fafafa',
			100: '#f4f4f5',
			200: '#e4e4e7',
			300: '#d4d4d8',
			400: '#a1a1aa',
			500: '#71717a',
			600: '#52525b',
			700: '#3f3f46',
			800: '#27272a',
			900: '#18181b',
		  },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
