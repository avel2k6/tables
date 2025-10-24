import React, { ErrorInfo } from 'react';

import { classes, texts } from './constants';
import { TErrorBoundaryProps, TErrorBoundaryState } from './interfaces';
import './index.less';

/**
 * Компонент перехвата ошибок. Позволяет не "развалиться" родительскому рендеру.
 * Перехватывает ошибку и отрисовывает её на месте компонента, в котором произошла ошибка.
 */
export class ErrorBoundary extends React.Component<TErrorBoundaryProps, TErrorBoundaryState> {
    constructor(props: TErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            message: '',
        };
    }

    static getDerivedStateFromError(error: Error) {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI
        return {
            hasError: true,
            message: error.message,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
        console.error(texts.childError);
        console.error(error, errorInfo);
    }

    render() {
        return this.state.hasError
            // Можно отрендерить запасной UI произвольного вида
            ? <div className={classes.component}>
                {texts.error}<br/>
                {this.state.message}
            </div>
            : this.props.children;
    }
}
