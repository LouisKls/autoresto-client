'use client';

import styles from './Loading.module.scss';
import { Colors } from '@/styles';
import React from 'react';
import { Oval } from 'react-loader-spinner';

export interface LoadingProps {
  size?: number; //in px
  color?: string;
  className?: string;
  secondaryColor?: string;
}

export const LoadingIcon = ({
  size,
  color,
  className,
  secondaryColor,
}: LoadingProps) => {
  return (
    <Oval
      height={size ?? 20}
      width={size ?? 20}
      color={color ?? 'white'}
      wrapperClass={className}
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor={secondaryColor ?? Colors["primary"]}
      strokeWidth={7}
      strokeWidthSecondary={5}
    />
  );
};

export const Loading = ({ size = 100 }: LoadingProps) => {
  return (
    <div className={styles.loadingContainer}>
      <LoadingIcon size={size ?? 100} />
    </div>
  );
};
