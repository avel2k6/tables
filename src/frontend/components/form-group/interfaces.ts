import React from 'react';

import { directions } from './constants';

export type TFormGroupProps = {
    // Дети
    children: React.ReactNode | React.ReactNode[] | null,

    // Дополнительный внешний CSS-класс
    className?: string | null,

    // Лейбл
    label?: string | null,

    // Комментарий
    comment?: string | null,

    // Текст ошибки
    error?: string | null,

    // Направление потока (вертикальное или горизонтальное)
    flow?: typeof directions[keyof typeof directions],

    // Флаг отключения группы
    disabled?: boolean,

    // Флаг обзательности поля
    required?: boolean,

    // ID для тестирования
    dataTestId?: string,
};

export type TFormGroupTextProps = {
    // Дети. Ожидаем, что будет обычный текст
    children: React.ReactNode | React.ReactNode[] | null,

    // ID для тестирования
    dataTestId?: string,
};
