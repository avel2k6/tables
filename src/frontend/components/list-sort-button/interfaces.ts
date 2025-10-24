import React from 'react';

export type TListSortButtonProps = {
    // Дети
    children?: React.ReactNode | null,

    // Дополнительный CSS-class компонента
    className?: string,

    // Текст при наведении на кнопку
    title?: string,

    // Тип сортировки
    sort: 'asc' | 'desc' | null,

    // Колбэк при клике
    onClick: () => void,

    // ID для тестирования
    dataTestId?: string,
};
