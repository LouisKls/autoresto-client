import React from 'react';
import styles from './RightCart.module.scss';
import { CartItem } from '../../../data/types';
import { IconButton } from '@components/ui/IconButton/IconButton';
import { X, Trash2 } from 'lucide-react';
import { Button } from '@components/ui/Button/Button';

interface RightCartProps {
  onClose: () => void;
  cart?: CartItem[];
  onRemoveItem?: (productId: number) => void;
  mobile?: boolean;
}

const RightCart: React.FC<RightCartProps> = ({
                                               onClose,
                                               cart = [],
                                               onRemoveItem,
                                               mobile
                                             }) => {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const reduction = 0;
  const total = subtotal - reduction;

  return (
    <div className={[
      styles.rightCartContent,
      mobile ? styles.mobileCart : '',
    ].join(' ')}>
      <div className={styles.rightCartHeader}>
        <div className={styles.rightCartTitle}>Mon Panier</div>
        <IconButton
          square
          onClick={onClose}
        >
          <X color={"white"} />
        </IconButton>
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
            <IconButton
              square
              color={'danger'}
              small
              onClick={() => onRemoveItem && onRemoveItem(item.product.id)}
            >
              <Trash2 color={"white"}/>
            </IconButton>
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
        fullWidth
        variant={'contained'}
        onClick={() => {}}
        color={'success'}
        thin
      >
        Valider ma commande
      </Button>
    </div>
  );
};

export default RightCart;