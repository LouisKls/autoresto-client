import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@styles/global.scss';
import ServerProvider from '@/app/Voiture/ServerContext';
import { ReservationProvider } from '@/app/Voiture/ReservationHourContext';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Autoresto',
  description: 'L\'application qui vous permet de commander en toutes circonstances !'
};

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
    <body>
    <ReservationProvider>
      <ServerProvider>
        {children}
      </ServerProvider>
    </ReservationProvider>
    </body>
    </html>
  );
}
