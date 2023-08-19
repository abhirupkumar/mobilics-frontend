import './globals.css'
import { Inter } from 'next/font/google'
import App from '@/containers/App';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mobilicis India',
  description: 'Mobilicis India Private Limited',
  viewport: {
    width: 'device-width',
    height: 'device-height',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
  }
}

export default function RootLayout({ children, params }) {
  params.email = "";
  return (
    <html lang="en">
      <body className={inter.className}>
        <App params={params} children={children} />
      </body>
    </html>
  )
}
