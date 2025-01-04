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

  return (
    <div className={[
      styles.rightCartContent,
      mobile ? styles.mobileCart : '',
      ].join(' ')}
    >
      <div className={styles.rightCartHeader}>
        <div className={styles.rightCartTitle}>Mon Panier</div>
        <div className={styles.rightCartCloseButton}>
          <IconButton
            square
            onClick={onClose}
          >
            <X color={"white"} />
          </IconButton>
        </div>
      </div>
      <ul>
        {cart.map((item) => (
          <li key={item.product.id}>
            <div className={styles.cartItemInfo}>
              <div className={styles.cartItemName}>
                {item.quantity} x {item.product.name}
              </div>
              <div>{(item.product.price * item.quantity).toFixed(2)} €</div>
            </div>
            <IconButton
              square
              color={'danger'}
              small
              onClick={() => onRemoveItem && onRemoveItem(item.product.id)}
            >
              <Trash2 color={"white"}/>
            </IconButton>
          </li>
        ))}
      </ul>
      <div className={styles.cartFooter}>
        <div className={styles.cartSummary}>
          <p>Sous-total : {subtotal.toFixed(2)} €</p>
          <p>Réductions : 0%</p>
          <p>Total : {subtotal.toFixed(2)} €</p>
        </div>
        <div style={{width: "100%"}}>
          <Button fullWidth variant={'contained'} onClick={() => {}} color={'success'} thin>
            Valider ma commande
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RightCart;
