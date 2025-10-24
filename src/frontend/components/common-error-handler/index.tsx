import React from 'react';

import { ErrorHandlerContext } from '../../contexts/error-handler';

import { TErrorHandlerProps } from './interfaces';

/**
 * Компонент провайдера с обработчиком общих ошибок.
 *
 * Основная идея провайдера: любая ошибка передается в метод `handleError`, который решает, каким образом показать ошибку в интерфейсе:
 * 1) Вывести в нотифере на несколько секунд,
 * 2) Показать в модалке с подтверждением для повторного логина,
 * 3) Отдать часть обработанных ошибок назад, чтобы их можно было бы показать в интерфейсе в специфических местах (например, под полями формы)
 *
 * @param props - пропсы компонента.
 * @constructor
 */
export const CommonErrorHandler = (props: TErrorHandlerProps) => <ErrorHandlerContext.Provider value={{
    handleError: props.handleError,
}}>
    {props.children}
</ErrorHandlerContext.Provider>;
