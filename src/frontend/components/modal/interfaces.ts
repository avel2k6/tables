import React from 'react';
import { modalSizes } from './constants';

export type TModalPortalProps = {
    children: React.ReactNode,
    isShow: boolean,
    size?: typeof modalSizes[keyof typeof modalSizes]
    onHide: () => void,
};

/**
 * Тип пропса для выравнивания контента
 */
type TAlign = {
    align?: 'right' | 'left',
};

type TDataTestId = {
    // ID для тестирования
    dataTestId?: string,
};

type TChildren = {
    // Дети компонента
    children: React.ReactNode,
};

/**
 * Общие пропсы
 */
type TCommonProps = TChildren & {
    // Дополнительный CSS-class компонента
    className?: string,
};

/**
 * Тип пропсов у Modal
 */
export type TModalProps = TChildren & TDataTestId;

/**
 * Modal с подкомпонентом
 */
export type ModalComponent = React.FC<TModalProps> & {
    Wrapper: React.FC<TWrapperProps>;
    Dialog: React.FC<TDialogProps>;
    Header: React.FC<THeaderProps>;
    Title: React.FC<TTitleProps>;
    Body: React.FC<TBodyProps>;
    Footer: React.FC<TFooterProps>;
};

/**
 * Тип пропсов у Wrapper
 */
export type TWrapperProps = TChildren & TDataTestId;

/**
 * Тип пропсов у Dialog
 */
export type TDialogProps = TChildren & TDataTestId;

/**
 * Тип пропсов у Header
 */
export type THeaderProps = TAlign & TCommonProps & TDataTestId & {
    // Нужна кнопка закрытия окна в правом верхнем углу или нет
    hasCloseButton?: boolean,
};

/**
 * Тип пропсов у Title
 */
export type TTitleProps = TDataTestId & {
    // Дети
    children: string,

    // Дополнительный CSS-class компонента
    className?: string,
};

/**
 * Тип пропсов у Body
 */
export type TBodyProps = TAlign & TCommonProps & TDataTestId;

/**
 * Тип пропсов у Footer
 */
export type TFooterProps = TAlign & TCommonProps & TDataTestId;

export type TConfirmProps = {
    // Признак показано ли окно
    isShow: boolean,

    // Заголовок окна
    title: string,

    // Тело окна
    body: React.ReactNode,

    // Колбек скрытия окна
    onHide: () => void,

    // Колбек подтверждения окна
    onConfirm: () => void,

    // Тест кнопки подтверждения
    confirm?: string,

    // Тест кнопки отмены
    cancel?: string,

    // Кнопка подтверждения disabled или нет
    isDisabledConfirmButton?: boolean,

    // Имя CSS-класса для body модального окна
    bodyClassname?: string,
};
