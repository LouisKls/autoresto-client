import React from 'react';
import styles from './RightCart.module.scss';

import { IconButton } from '@components/ui/IconButton/IconButton';
import { X, Trash2 } from 'lucide-react';
import { Button } from '@components/ui/Button/Button';
import { CartItem } from '@/data/types';

interface RightCartProps {
  cart?: CartItem[];
  onRemoveItem?: (productId: number) => void;
}

const RightCart: React.FC<RightCartProps> = ({
                                               cart = [],
                                               onRemoveItem,
                                             }) => {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const reduction = 0;
  const total = subtotal - reduction;

  return (
    <div className={styles.rightCartContent}>
      <div className={styles.rightCartHeader}>
        <div className={styles.rightCartTitle}>Mon Panier</div>
      </div>

      <div className={styles.cartItems}>
        {cart.map((item) => (
          <div key={item.product.id} className={styles.cartItem}>
            <div className={styles.itemImage}>
              {/* Placeholder pour l'image */}
              <div className={styles.imagePlaceholder}></div>
            </div>
            <div className={styles.itemDetails}>
              <div className={styles.itemInfo}>
                <span className={styles.itemQuantity}>{item.quantity}</span>
                <span className={styles.itemX}>x</span>
                <span className={styles.itemName}>{item.product.name}</span>
              </div>
              <div className={styles.itemPrice}>
                {(item.product.price * item.quantity).toFixed(2)} €
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cartSummary}>
        <div className={styles.summaryRow}>
          <span>Sous-total</span>
          <span>{subtotal.toFixed(2)}€</span>
        </div>
        <div className={`${styles.summaryRow} ${styles.reduction}`}>
          <span>Réduction</span>
          <span>-{reduction}%</span>
        </div>
        <div className={`${styles.summaryRow} ${styles.total}`}>
          <span>Total</span>
          <span>{total.toFixed(2)}€</span>
        </div>
      </div>

      <Button
        variant={'contained'}
        onClick={() => {}}
        color={'success'}
        thin
      >
        Valider mon panier
      </Button>
    </div>
  );
};

export default RightCart;