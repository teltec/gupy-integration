import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from './context/AuthProvider'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Frontend Template',
  description: 'Template para frontend com autenticação azure-ad implementada usando Next.js',
  viewport: "width=device-width, initial-scale=1"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden bg-slate-100`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
