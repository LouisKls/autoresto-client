'use client';

import { ServerProvider } from '@/app/Voiture/ServerContext';
import Formule from '@/app/Voiture/Formule';

export default function OrderPage() {
  return (
    <ServerProvider>
      <Formule />
    </ServerProvider>
  );
} 