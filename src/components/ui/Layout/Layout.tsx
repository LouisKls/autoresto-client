import React, { useState, ReactNode } from 'react';
import Header from '../Header/Header';
import LeftMenu from '../LeftMenu/LeftMenu';
import RightCart from '../RightCart/RightCart';
import { CartItem } from '../../../data/types';

import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
  cart?: CartItem[];
  onRemoveItem?: (productId: number) => void;
  mobile?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, cart = [], onRemoveItem, mobile }) => {
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  const [isRightCartOpen, setIsRightCartOpen] = useState(false);

  const toggleLeftMenu = () => {
    if (!isLeftMenuOpen) {
      setIsRightCartOpen(false);
    }
    setIsLeftMenuOpen(!isLeftMenuOpen);
  };

  const toggleRightCart = () => {
    if (!isRightCartOpen) {
      setIsLeftMenuOpen(false);
    }
    setIsRightCartOpen(!isRightCartOpen);
  };

  return (
    <div
      className={[
        styles.layoutContainer,
        isLeftMenuOpen ? styles.leftMenuOpen : '',
        isRightCartOpen ? styles.rightCartOpen : '',
        mobile ? styles.mobileLayout : '',
      ].join(' ')}
    >
      {!mobile && <div className={styles.leftColumn}>
        <LeftMenu
          onClose={() => setIsLeftMenuOpen(false)}
        />
      </div>}

      {mobile && isLeftMenuOpen ?
        <div className={styles.mobileColumn}>
          <LeftMenu
            onClose={() => setIsLeftMenuOpen(false)}
            mobile={true}
          />
        </div>
      : mobile && isRightCartOpen ?
        <div className={styles.mobileColumn}>
          <RightCart
            onClose={() => setIsRightCartOpen(false)}
            cart={cart}
            onRemoveItem={onRemoveItem}
            mobile={true}
          />
        </div>
      :
        <div className={styles.mainContent}>
          <Header
            onLeftMenuToggle={toggleLeftMenu}
            onRightCartToggle={toggleRightCart}
            mobile={mobile}
          />
          {children}
        </div>
      }

      {!mobile && <div className={styles.rightColumn}>
        <RightCart
          onClose={() => setIsRightCartOpen(false)}
          cart={cart}
          onRemoveItem={onRemoveItem}
        />
      </div>}
    </div>
  );
};

export default Layout;
