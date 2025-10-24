import React from 'react';

type TDataTestId = {
    // ID для тестирования
    dataTestId?: string,
};

export type TCommonPageProps = {
    // Дочерние компоненты
    children: React.ReactNode | React.ReactNode[] | null,

    // Дополнительный CSS-класс компонента
    className?: string,
} & TDataTestId;

export type THeaderProps = {
    // Текст заголовка
    title: string,
};

export type TCounterSeparatorProps = TDataTestId;

export type TFormProps = {
    // Время последнего обновления формы. При изменении пропса сбрасывается состояние редактирования формы к начальному.
    updatedAt?: string,

    // Колбэк при отправке формы
    onSubmit?: (e: React.FormEvent) => Promise<void>,

    // Колбэк, выполняемый до отправки формы. Если true, то выполняется onSubmit. Нужен, например, для валидации данных перед отправкой.
    beforeSubmit?: () => Promise<boolean>,
};
