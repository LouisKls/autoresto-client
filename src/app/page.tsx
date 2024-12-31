import Accueil from '@/app/Voiture/Accueil';
import { ServerProvider } from '@/app/Voiture/ServerContext';

export default function Home() {
  return (
    <ServerProvider>
        <Accueil />
    </ServerProvider>
  );
}
