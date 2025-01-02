import React from 'react';
import styles from './LeftMenu.module.scss';

interface LeftMenuProps {
  onClose: () => void;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ onClose }) => {
  return (
    <div className={styles.leftMenuContent}>
      <button onClick={onClose}>Fermer</button>
      <ul>
        <li>Profil</li>
        <li>Paramètres</li>
        <li>Déconnexion</li>
      </ul>
    </div>
  );
};

export default LeftMenu;
