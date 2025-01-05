import React, { useRef, useState } from 'react';
import { useReservation } from '@/app/Voiture/ReservationHourContext';
import { useRouter } from 'next/navigation';

const ReservationComponent = () => {
  const { hour, minute, setHour, setMinute } = useReservation();
  const [isDragging, setIsDragging] = useState({ hours: false, minutes: false });
  const hourContainerRef = useRef<HTMLDivElement>(null);
  const minuteContainerRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 4 }, (_, i) => i + 11);
  const minutes = [0, 15, 30, 45];

  const router = useRouter();

  const handleValidation = () => {
    router.push('/recap');
  };


  const getAdjacentValues = (value: number, array: number[]) => {
    const currentIndex = array.indexOf(value);
    return {
      prev: currentIndex > 0 ? array[currentIndex - 1] : null,
      next: currentIndex < array.length - 1 ? array[currentIndex + 1] : null
    };
  };

  const handleTouchStart = (type: 'hours' | 'minutes') => {
    setIsDragging(prev => ({ ...prev, [type]: true }));
  };

  const handleTouchMove = (e: React.TouchEvent, type: 'hours' | 'minutes') => {
    if (!isDragging[type]) return;

    const touch = e.touches[0];
    const container = type === 'hours' ? hourContainerRef.current : minuteContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const y = touch.clientY - rect.top;
    const totalHeight = rect.height;

    const values = type === 'hours' ? hours : minutes;
    const stepHeight = totalHeight / values.length;
    const newIndex = Math.floor(y / stepHeight);

    if (newIndex >= 0 && newIndex < values.length) {
      const newValue = values[newIndex];
      if (type === 'hours') {
        setHour(newValue);
      } else {
        setMinute(newValue);
      }
    }
  };


  const handleTouchEnd = (type: 'hours' | 'minutes') => {
    setIsDragging(prev => ({ ...prev, [type]: false }));
  };

  const adjacentHours = getAdjacentValues(hour, hours);
  const adjacentMinutes = getAdjacentValues(minute, minutes);

  return (
    <div style={styles.container}>
      <button style={styles.exitButton}>
        QUITTER LE MODE VOITURE
      </button>

      <h1 style={styles.title}>Heure de réservation</h1>

      <div style={styles.infoBox}>
        🍙 Entrée / 🍕 Plat / 🍏 Dessert
      </div>

      <div style={styles.timePickerContainer}>
        <div style={styles.pickerColumn}>
          <div
            ref={hourContainerRef}
            style={styles.pickerScroller}
            onTouchStart={() => handleTouchStart('hours')}
            onTouchMove={(e) => handleTouchMove(e, 'hours')}
            onTouchEnd={() => handleTouchEnd('hours')}
          >
            <div style={styles.pickerValues}>
              {adjacentHours.prev !== null && (
                <div style={styles.adjacentValue}>{adjacentHours.prev}</div>
              )}
              <div style={styles.currentValue}>{hour}</div>
              {adjacentHours.next !== null && (
                <div style={styles.adjacentValue}>{adjacentHours.next}</div>
              )}
            </div>
          </div>
        </div>

        <div style={styles.separator}>:</div>

        <div style={styles.pickerColumn}>
          <div
            ref={minuteContainerRef}
            style={styles.pickerScroller}
            onTouchStart={() => handleTouchStart('minutes')}
            onTouchMove={(e) => handleTouchMove(e, 'minutes')}
            onTouchEnd={() => handleTouchEnd('minutes')}
          >
            <div style={styles.pickerValues}>
              {adjacentMinutes.prev !== null && (
                <div style={styles.adjacentValue}>
                  {adjacentMinutes.prev.toString().padStart(2, '0')}
                </div>
              )}
              <div style={styles.currentValue}>
                {minute.toString().padStart(2, '0')}
              </div>
              {adjacentMinutes.next !== null && (
                <div style={styles.adjacentValue}>
                  {adjacentMinutes.next.toString().padStart(2, '0')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.actions}>
        <button style={styles.actionButton} onClick={handleValidation}>VALIDER</button>
        <button style={styles.backButton}>RETOUR</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    margin: '0 auto',
    padding: '16px',
    boxSizing: 'border-box'
  },
  exitButton: {
    width: '100%',
    backgroundColor: '#EF4444',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '16px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '16px 0',
    textAlign: 'center'
  },
  infoBox: {
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '24px',
    fontSize: '18px',
    textAlign: 'center'
  },
  timePickerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '24px',
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  pickerColumn: {
    position: 'relative',
    width: '40%',
    height: '240px',
    backgroundColor: '#F3F4F6',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pickerScroller: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    touchAction: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerValues: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px'
  },
  currentValue: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#000000'
  },
  adjacentValue: {
    fontSize: '36px',
    fontWeight: 'normal',
    color: '#00000040'
  },
  separator: {
    fontSize: '32px',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px'
  },
  actionButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '28px',
    borderRadius: '5px',
    cursor: 'pointer',
    flex: 1
  },
  backButton: {
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '28px',
    borderRadius: '5px',
    cursor: 'pointer',
    flex: 1
  }
};


export default ReservationComponent;