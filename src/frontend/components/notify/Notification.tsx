import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { TNotificationProps } from './interfaces';
import {
    APPEARANCE_DELAY_MS, CLOSING_DELAY_MS, START_DELAY_MS, classes, texts,
} from './constants';
import { ProgressBar } from './ProgressBar';

/**
 * Компонент появляющегося уведомления
 * @component
 */
export const Notification = ({
    id, text, autoCloseDelayMs, theme, onClose, code,
}: TNotificationProps) => {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        // задержка, чтобы сработала анимация появления уведомления
        const appearanceTimer = setTimeout(() => setIsShow(true), START_DELAY_MS);

        // таймер для изменения состояния, чтобы вызвать анимацию закрытия
        const closingTimer = setTimeout(() => {
            setIsShow(false);
        }, autoCloseDelayMs + APPEARANCE_DELAY_MS);

        // таймер для удаления уведомления по истечению времени показа
        const removingTimer = setTimeout(() => {
            onClose(id);
        }, autoCloseDelayMs + APPEARANCE_DELAY_MS + CLOSING_DELAY_MS);

        return () => {
            clearTimeout(appearanceTimer);
            clearTimeout(closingTimer);
            clearTimeout(removingTimer);
        };
    }, []);

    /**
     * Закрытие отдельного уведомления
     */
    const handleClose = () => {
        setIsShow(false);
        setTimeout(() => onClose(id), CLOSING_DELAY_MS);
    };

    return (
        <div
            className={classNames(classes.body, `${classes.body}_${theme}`, {
                [classes.shownBody]: isShow,
                [classes.hiddenBody]: !isShow,
            })}
        >
            <div className={`${classes.icon} ${classes.icon}_${theme}`} />
            <div className={classes.text}>{text}</div>
            {code
                ? <div className={classes.code}>{code}</div>
                : null}
            <button
                className={classes.closeButton}
                onClick={handleClose}
                type="button"
                aria-label={texts.close}
            />
            <ProgressBar autoCloseDelayMs={autoCloseDelayMs} theme={theme} />
        </div>
    );
};
