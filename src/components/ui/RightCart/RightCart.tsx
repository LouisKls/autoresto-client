import React from 'react';
import styles from './RightCart.module.scss';
import { CartItem } from '../../../types';

interface RightCartProps {
  onClose: () => void;
  cart?: CartItem[];
  onRemoveItem?: (productId: number) => void;
}

const RightCart: React.FC<RightCartProps> = ({
                                               onClose,
                                               cart = [],
                                               onRemoveItem,
                                             }) => {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className={styles.rightCartContent}>
      <button onClick={onClose}>Fermer</button>
      <h2>Mon Panier</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.product.id}>
            <div>
              {item.quantity} x {item.product.name}
            </div>
            <div>{(item.product.price * item.quantity).toFixed(2)} €</div>
            <button onClick={() => onRemoveItem && onRemoveItem(item.product.id)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.cartSummary}>
        <p>Sous-total : {subtotal.toFixed(2)} €</p>
        <p>Réductions : 0%</p>
        <p>Total : {subtotal.toFixed(2)} €</p>
        <button>Valider ma commande</button>
      </div>
    </div>
  );
};

export default RightCart;
