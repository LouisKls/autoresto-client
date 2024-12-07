import styles from './Dropdown.module.scss';
import { useClickAwayListener } from '@hooks/useClickAwayListener';
import classNames from 'classnames';
import Link from 'next/link';
import {
  PropsWithChildren,
  ReactElement,
  RefAttributes,
  cloneElement,
  useRef,
  useState,
} from 'react';

export type DropdownItem = { id: string } & (
  | { type: 'separator' }
  | { type: 'link'; href: string; label: string }
);

export interface DropdownMenuProps {
  children: ReactElement<RefAttributes<any> & { onClick?: Function }>;
  offset?: { x?: number; y?: number };
  items: DropdownItem[];
}

export const Dropdown = ({
  children,
  items,
  offset: { x: offsetX = 0, y: offsetY = 10 } = {},
}: PropsWithChildren<DropdownMenuProps>) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickAwayListener((e) => {
    if (!(e.target instanceof Node) || !ref.current?.contains(e.target)) {
      setOpen(false);
    }
  }, dropdownRef);

  return (
    <div className={styles.popper}>
      {cloneElement(children, {
        ref,
        onClick: (e) => {
          setOpen(!open);
        },
      })}
      <div
        ref={dropdownRef}
        className={classNames(styles.dropdown, open && styles.open)}
        style={{
          top: 'calc(100% + ' + offsetY + 'px)',
          right: offsetX + 'px',
        }}
      >
        {items.map((item) => {
          if (item.type === 'separator') {
            return <div key={item.id} className={styles.separator}></div>;
          } else {
            return (
              <Link
                href={item.href}
                key={item.id}
                onClick={(e) => {
                  setOpen(!open);
                }}
              >
                <div className={styles.item}>{item.label}</div>
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
};
