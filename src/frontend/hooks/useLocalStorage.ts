import { useEffect, useState } from 'react';

/**
 * Хук управлением ключами localStorage. Позволяет читать, обновлять и удалять данные ключа.
 * @param {string} key - ключ localStorage
 * @returns value - Значение ключа
 * @returns set - Задать новое значение ключа
 * @returns remove - Удалить ключ целиком
 */
export function useLocalStorage<T>(key: string): {
    // Значение ключа
    value: T | null,

    // Задать новое значение ключа
    set: (value: T) => void,

    // Удалить ключ целиком
    remove: () => void,
} {
    const [value, setValue] = useState<string>(null);

    /**
     * Запись нового значения.
     */
    const set = (newValue: T): void => {
        const stringNewValue = JSON.stringify(newValue);
        if (stringNewValue === value) {
            return;
        }

        setValue(stringNewValue);
        window.localStorage.setItem(key, stringNewValue);
    };

    /**
     * Получение значения.
     */
    const get = (): string | null => window.localStorage.getItem(key);

    /**
     * Удаление значения.
     */
    const remove = (): void => window.localStorage.removeItem(key);

    /**
     * Начальная инициализация, при которой читается значение из localStorage.
     */
    useEffect(() => {
        const actualValue = get();
        if (value === actualValue) {
            return;
        }

        setValue(actualValue);
    }, []);

    /**
     * Подписка на изменение значения.
     * @param event
     */
    const storageListener = (event: StorageEvent) => {
        if (event.key !== key || event.newValue === value) {
            return;
        }

        setValue(event.newValue);
    };

    /**
     * Обновление значения, если пришло событие от localStorage.
     */
    useEffect(() => {
        window.addEventListener('storage', storageListener);

        return () => window.removeEventListener('storage', storageListener);
    }, [
        value,
    ]);

    return {
        value: value !== null ? JSON.parse(value) : null,
        set,
        remove,
    };
}
