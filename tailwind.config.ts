import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./1776424437927008423.html"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				cormorant: ['Cormorant Garamond', 'serif'],
				ibm: ['IBM Plex Sans', 'sans-serif'],
				oswald: ['Oswald', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				blood: {
					DEFAULT: '#8B0000',
					light: '#C41E3A',
					dark: '#4A0000',
				},
				void: {
					DEFAULT: '#0A0A0A',
					mid: '#111111',
					soft: '#1A1A1A',
					ash: '#2A2222',
				},
				ember: {
					DEFAULT: '#FF4500',
					glow: '#FF6B35',
				},
				bone: {
					DEFAULT: '#E8DCC8',
					dim: '#9A8A78',
					faint: '#4A3F35',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'flicker': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
					'75%': { opacity: '0.9' },
					'80%': { opacity: '0.4' },
					'85%': { opacity: '0.95' },
				},
				'blood-drip': {
					'0%': { transform: 'translateY(-100%)', opacity: '0' },
					'20%': { opacity: '1' },
					'100%': { transform: 'translateY(100vh)', opacity: '0.6' }
				},
				'fog-drift': {
					'0%': { transform: 'translateX(-10%) scaleX(1)', opacity: '0.4' },
					'50%': { transform: 'translateX(5%) scaleX(1.05)', opacity: '0.6' },
					'100%': { transform: 'translateX(-10%) scaleX(1)', opacity: '0.4' }
				},
				'rise-from-dark': {
					'0%': { transform: 'translateY(40px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'pulse-blood': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(139,0,0,0.3)' },
					'50%': { boxShadow: '0 0 40px rgba(196,30,58,0.6), 0 0 80px rgba(139,0,0,0.2)' }
				},
				'glitch': {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(2px, -2px)' },
					'60%': { transform: 'translate(-1px, 1px)' },
					'80%': { transform: 'translate(1px, -1px)' },
					'100%': { transform: 'translate(0)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'flicker': 'flicker 3s infinite',
				'fog-drift': 'fog-drift 12s ease-in-out infinite',
				'rise-from-dark': 'rise-from-dark 1s ease-out forwards',
				'pulse-blood': 'pulse-blood 2.5s ease-in-out infinite',
				'glitch': 'glitch 0.3s ease-in-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
