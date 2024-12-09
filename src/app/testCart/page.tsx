"use client";

import styles from './TestCartPage.module.scss';
import { SearchBar } from '@components/ui/SearchBar/SearchBar';
import React, { useState } from 'react';

const handleSearch = (value : string) => {
  //TODO
}

export default function testCartPage() {
  
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className={styles.testCartPage}>
      <SearchBar value={searchQuery} onChange={handleSearch}/>
    </div>
  );
}
