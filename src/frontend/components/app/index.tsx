import '../../../window';
import '../../common/normalize.less';
import '../../common/common.less';

import React from 'react';
import { NotificationContainer } from '../notify/NotificationContainer';
import { AppCommonProviders } from '../../contexts/AppCommonProviders';
import { ErrorBoundary } from '../error-boundary';
import { PageMain } from '../page-main';

/**
 * Общий компонент инициализации приложения.
 * @constructor
 */
export const App = () => <AppCommonProviders>
    <ErrorBoundary>
        <PageMain/>
    </ErrorBoundary>
    <NotificationContainer/>
</AppCommonProviders>;
