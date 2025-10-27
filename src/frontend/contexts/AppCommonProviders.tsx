import React from 'react';

import { CommonErrorHandler } from '../components/common-error-handler';
import { api } from '../application/api';
import { handleError } from '../components/common-error-handler/handler';
import { ErrorBoundary } from '../components/error-boundary';

import { ApiContext } from './api';
import { TAppCommonProviders } from './interfaces';

/**
 * Компонент с набором общих провайдеров приложения.
 * @param props - пропсы компонента.
 * @constructor
 */
export const AppCommonProviders = (props: TAppCommonProviders) => <ApiContext.Provider value={api}>
    <CommonErrorHandler handleError={handleError}>
        <ErrorBoundary>
            {props.children}
        </ErrorBoundary>
    </CommonErrorHandler>
</ApiContext.Provider>;
