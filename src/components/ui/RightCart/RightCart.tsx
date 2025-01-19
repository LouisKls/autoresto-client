import React, { useState, useRef, useEffect } from 'react';
import styles from './RightCart.module.scss';
import { IconButton } from '@components/ui/IconButton/IconButton';
import { CartItem, Product } from '@/data/types';
import { Button } from '@components/ui/Button/Button';
import classNames from 'classnames';
import { Users } from 'lucide-react';

interface RightCartProps {
  cart?: CartItem[];
  onRemoveItem: (product: Product, shared: boolean[]) => void;
  tableId: string
  className?: string;
}

const RightCart: React.FC<RightCartProps> = ({ cart = [], onRemoveItem, tableId, className }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [cloneVisible, setCloneVisible] = useState(false);
  const cloneRef = useRef<HTMLDivElement | null>(null);
  const touchStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const draggedItemRef = useRef<CartItem | null>(null);
  const [tableIds, setTableIds] = useState<string[]>(["tableA", "tableB", "tableC", "tableD"]);

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>,
    item: CartItem
  ) => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }

    touchTimerRef.current = setTimeout(() => {
      if (!item) return; // Vérification supplémentaire
      console.log('Setting draggedItemRef:', item);
      draggedItemRef.current = item;
      setIsDragging(true);
      setOpacity(0.5);
      setCloneVisible(true);
      const touch = event.touches[0];
      touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    }, 300);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && cloneRef.current) {
      const touch = event.touches[0];
      const dx = touch.clientX - touchStartPos.current.x;
      const dy = touch.clientY - touchStartPos.current.y;
      cloneRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      setOpacity(1);
      setCloneVisible(false);

      const touch = event.changedTouches[0];
      const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

      if (targetElement && targetElement.closest('.bin-container')) {
        console.log('Dropped in bin:', draggedItemRef.current);
        if(draggedItemRef.current) onRemoveItem(draggedItemRef.current.product, draggedItemRef.current.shared);
      }
      draggedItemRef.current = null;
    }
  };

  const isShared = (item: CartItem) => {
    for(let i = 0; i < item.shared.length; i++) {
      if(item.shared[i] && tableId != tableIds[i]) return true;
    }
    return false;
  }

  const getSharedLabel = (item: CartItem) => {
    let result = "";
    for(let i = 0; i < item.shared.length; i++) {
      if(item.shared[i] && tableId != tableIds[i]) result += tableIds[i].charAt(tableIds[i].length-1);
    }
    return result;
  }

  const getSharedPrice = (item: CartItem) => {
    let sharedNumber = 0;
    item.shared.forEach(shared => {
      if(shared) sharedNumber++;
    });
    return item.product ? item.product.price / sharedNumber : 0;
  }

  useEffect(() => {
    return () => {
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
      }
    };
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const reduction = 0;
  const total = subtotal - reduction;

  return (
    <div className={[
      styles.rightCartContent,
      className ? className : '',
    ].join(' ')}>
      <div className={styles.rightCartHeader}>
        <div className={styles.rightCartTitle}>Mon Panier</div>
      </div>

      <div className={styles.cartItems}>
        {cart.map((item) => (
          <div
            key={item.product.id}
            className={styles.cartItem}
            onTouchStart={(e) => handleTouchStart(e, item)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ opacity: isDragging ? 0.5 : 1 }}
          >
            <div className={styles.itemLine}>
              <div className={styles.itemImage}>
                <div className={styles.imagePlaceholder}></div>
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemQuantity}>{item.quantity}</span>
                  <span className={styles.itemX}>x</span>
                  <span className={styles.itemName}>{item.product.name}</span>
                </div>
                <div className={classNames(styles.itemPrice, isShared(item) ? styles.itemPriceShared : '')}>
                  {(item.product.price * item.quantity).toFixed(2)} €
                </div>
              </div>
            </div>
            {isShared(item) && <div className={styles.itemLine}>
              <div className={styles.itemDetails}>
                <div className={styles.itemInfo}>
                  <Users className={styles.sharedIcon} />
                  <span className={styles.itemSharedWithLabel}>Partagé avec :</span>
                  <span className={styles.itemSharedLabel}>{getSharedLabel(item)}</span>
                </div>
                <div className={styles.itemPrice}>
                  {(getSharedPrice(item) * item.quantity).toFixed(2)} €
                </div>
              </div>
            </div>}
          </div>
        ))}
      </div>

      {cloneVisible && draggedItemRef.current && (
        <div
          ref={cloneRef}
          className={styles.itemClone}
          style={{
            position: 'fixed',
            zIndex: 1000,
            pointerEvents: 'none',
            transform: 'translate(0, 0)',
          }}
        >
          <div className={styles.itemDetailsClone}>
            <span>{draggedItemRef.current.quantity} x</span>{' '}
            {draggedItemRef.current.product.name}
          </div>
        </div>
      )}

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

      <Button variant={'contained'} onClick={() => {}} color={'success'} thin>
        Valider mon panier
      </Button>
    </div>
  );
};

export default RightCart;