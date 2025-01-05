'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ReservationContextType {
  hour: number;
  minute: number;
  setHour: (hour: number) => void;
  setMinute: (minute: number) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(30);

  return (
    <ReservationContext.Provider value={{ hour, minute, setHour, setMinute }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};