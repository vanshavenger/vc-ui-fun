import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import Navbar from '@/components/global/navbar'
import Footer from '@/components/global/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VC-UI Components',
  description: 'Explore VC-UI components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='relative min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
