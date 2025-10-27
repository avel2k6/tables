import React, { useState, useEffect } from 'react';
import { TNotification} from "./interfaces";
import { generateId, isCustomEvent } from '../../utils';
import { classes, texts, Theme } from './constants';
import { subscribe, unsubscribe} from "./eventManager";
import { Notification } from './Notification';

/**
 * Контейнер, который занимается созданием и удалением уведомлений
 * @component
 */
export const NotificationContainer = () => {
    const [notifications, setNotifications] = useState<TNotification[]>([]);

    /**
     * Создание нового уведомления
     * @param {Event} e - Кастомное событие, что нужно создать уведомление
     */
    const handleAddition = (e: Event) => {
        if (!isCustomEvent(e)) {
            throw new Error(texts.errors.notCustomEvent);
        }

        setNotifications((prevNotifications) => [
            {
                id: generateId(),
                text: e.detail.text,
                code: e.detail.code,
                autoCloseDelayMs: e.detail.autoCloseDelayMs,
                theme: e.type as Theme,
            },
            ...prevNotifications,
        ]);
    };

    useEffect(() => {
        subscribe(Theme.Success, handleAddition);
        subscribe(Theme.Warning, handleAddition);
        subscribe(Theme.Error, handleAddition);

        return () => {
            unsubscribe(Theme.Success, handleAddition);
            unsubscribe(Theme.Warning, handleAddition);
            unsubscribe(Theme.Error, handleAddition);
        };
    }, []);

    /**
     * Удаление уведомления из очереди
     * @param {number} id - ID уведомления
     */
    const handleClose = (id: number) => setNotifications(
        (prevNotifications) => prevNotifications.filter((item) => item.id !== id),
    );

    return (
        <div className={classes.component}>
            <div className={classes.container}>
                {notifications.map(({
                    id, text, autoCloseDelayMs, theme, code,
                }) => (
                    <Notification
                        key={id}
                        id={id}
                        text={text}
                        code={code}
                        autoCloseDelayMs={autoCloseDelayMs}
                        theme={theme}
                        onClose={handleClose}
                    />
                ))}
            </div>
        </div>
    );
};
