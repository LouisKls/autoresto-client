import { TabPanel } from '@/components/ui/TabPanel/TabPanel';
import styles from './TestTabsPage.module.scss';

export default function TestTabsPage() {
  return (
    <div className={styles.testTabsPage}>
      <TabPanel
        tabs={{
          "Entrées": <div>Les entrées</div>,
          "Plats": <div>Les plats</div>,
          "Desserts": <div>Les desserts</div>,
          "Boissons": <div>Les boissons</div>
        }}
      />
    </div>
  );
}
