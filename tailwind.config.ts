
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
				// Casino theme colors
				casino: {
					green: '#0B7B3D',
					'green-light': '#0E8B45',
					'green-dark': '#094A26',
					gold: '#FFD700',
					'gold-light': '#FFED4A',
					'gold-dark': '#F59E0B',
					red: '#DC2626',
					'red-light': '#EF4444',
					felt: '#1B5E20'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'card-deal': {
					'0%': {
						transform: 'translateX(-100px) rotate(-20deg)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0) rotate(0deg)',
						opacity: '1'
					}
				},
				'pulse-gold': {
					'0%, 100%': {
						boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.7)'
					},
					'70%': {
						boxShadow: '0 0 0 10px rgba(255, 215, 0, 0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'card-deal': 'card-deal 0.6s ease-out',
				'pulse-gold': 'pulse-gold 2s infinite',
				'float': 'float 3s ease-in-out infinite'
			},
			backgroundImage: {
				'felt-texture': 'radial-gradient(ellipse at center, #0B7B3D 0%, #094A26 100%)',
				'card-back': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e3a8a 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
