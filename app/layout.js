import { Inter } from 'next/font/google';
import ClientThemeWrapper from './ClientThemeWrapper';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientThemeWrapper>{children}</ClientThemeWrapper>
      </body>
    </html>
  );
}