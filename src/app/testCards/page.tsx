import styles from './TestCardsPage.module.scss';
import { Card } from '@components/ui/Card/Card';

export default function testCardsPage() {
  return (
    <div className={styles.testCardsPage}>
        <Card 
          label={"Nom du plat"}
          description={"Gluten - Arachides"}
          price={4.5}
          imageLink={"viande.png"}
        />
    </div>
  );
}
