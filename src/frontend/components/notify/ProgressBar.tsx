import React from 'react';
import { classes } from './constants';
import { TProgressBarProps } from './interfaces';

/**
 * Компонент индикатора прогресса (через сколько времени закроется уведомление)
 * @component
 */
export const ProgressBar = ({ autoCloseDelayMs, theme }: TProgressBarProps) => (
    <div
        style={{ animationDuration: `${autoCloseDelayMs}ms` }}
        className={`${classes.progressBar} ${classes.progressBar}_${theme}`}
    />
);
