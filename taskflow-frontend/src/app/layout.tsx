import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

import { SITE_NAME } from '@/constants/seo.constants'

import './globals.scss'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',       
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `${SITE_NAME} | %s `
	},
	icons: {
		icon: '/favicon.ico',       
		shortcut: '/favicon.ico',   
		apple: '/favicon.ico',       
	},
  	description: 'App for planning',
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>
					{children}

					<Toaster
						theme='dark'
						position='bottom-right'
						duration={1500}
					/>
				</Providers>
			</body>
		</html>
	)
}
