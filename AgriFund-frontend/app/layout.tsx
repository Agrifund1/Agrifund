import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthContextProvider } from '@/context/AuthContext';
import dynamic from 'next/dynamic';

const ChatBot = dynamic(() => import('@/components/ChatBot'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AgriFund - Empowering Rural Communities',
  description: 'Decentralized financial platform providing support to farmers, businesses, and students through loans and investments.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ChatBot />
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}