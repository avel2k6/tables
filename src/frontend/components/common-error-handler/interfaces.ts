import React from 'react';

import { THandleError } from '../../contexts/error-handler/interfaces';

export type TErrorHandlerProps = {
    children: React.ReactNode | React.ReactNode[] | null,

    /**
     * Общий обработчик поступающих ошибок
     */
    handleError: THandleError,
};
