import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './ListBox.module.scss';
import { useClickAwayListener } from '../../hooks/useClickAwayListener';

interface ListBoxProps {
  options: { id: string; label: string }[];
  selectedValue?: string;
  onChange: (value: string) => void;
}

export const ListBox = ({
  options,
  selectedValue,
  onChange,
}: ListBoxProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(selectedValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(selectedValue);
  }, [selectedValue]);

  useClickAwayListener(() => setOpen(false), dropdownRef);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange(value);
    setOpen(false);
  };

  return (
    <div className={styles.listBox} ref={dropdownRef}>
      <button
        className={styles.button}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected
          ? options.find((option) => option.id === selected)?.label
          : 'Select a category'}
      </button>

      {open && (
        <div className={styles.listboxDropdown}>
          {options.map((option) => (
            <div
              key={option.id}
              className={classNames(styles.option, {
                [styles.selected]: option.id === selected,
              })}
              onClick={() => handleSelect(option.id)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
