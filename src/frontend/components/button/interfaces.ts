import React from 'react';

/**
 * Общие свойства для кнопки и ссылки.
 */
type TCommon = {
    // Дочерние элементы.
    children?: React.ReactNode | React.ReactNode[] | null,

    // Дополнительные классы.
    className?: string,

    // Текст подсказки.
    title?: string,

    // Вариант стилизации.
    variant?: 'primary' | 'secondary' | 'confirm' | 'danger' | 'transparent' | 'link' | 'info',

    // Флаг отключения.
    disabled?: boolean,

    // Размер отступов.
    padding?: 'default' | 'small',

    // Ширина.
    width?: 'default' | 'full',

    // Идентификатор для тестирования
    dataTestId?: string,

    // Признак авто фокуса.
    autoFocus?: boolean,
};

/**
 * Свойства для ссылки.
 */
type TLink = {
    // URL ссылки.
    href: string,

    // Цель ссылки (например, '_blank').
    target?: string,
};

/**
 * Свойства для кнопки.
 */
type TButton = {
    // Тип кнопки.
    type: 'button' | 'submit',

    // Обработчик клика.
    onClick: () => void,
};

export type TButtonProps = TCommon & (TLink | TButton);
