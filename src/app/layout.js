import './globals.css'
import { Inter } from 'next/font/google'
// import Navbar from './components/Navbar'
import { AuthProvider } from './Providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Daily Sales App',
  description: 'Records and handles daily sales.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen bg-[#101D42]`}>
        {/* <Navbar /> */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
