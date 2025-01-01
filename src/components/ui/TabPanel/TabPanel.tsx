
"use client";
import classNames from 'classnames';
import styles from './TabPanel.module.scss';
import React, { useState } from 'react';

export interface TabPanelProps {
  tabs: Record<string, React.ReactNode>;
}

export const TabPanel = ({
  tabs,
  ...props
}: TabPanelProps) => {

  const [currentTab, setCurrentTab] = useState(Object.keys(tabs)[0]);

  return (
    <div {...props} className={styles.tabPanel}>
      <div className={styles.tabHeader}>
        {Object.keys(tabs).map((tab) =>
          <button onClick={() => {setCurrentTab(tab)}} className={tab === currentTab ? styles.selected : undefined}>
            {tab}
          </button>
        )}
      </div>
      <div className={styles.tabBody}>
        {tabs[currentTab]}
      </div>
    </div>
  );
};
