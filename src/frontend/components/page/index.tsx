import classNames from 'classnames';
import React, {
    useEffect, useState, useRef, useLayoutEffect,
} from 'react';

import { ErrorBoundary } from '../error-boundary';

import { classes } from './constants';
import {
    TCommonPageProps, TCounterSeparatorProps, TFormProps, THeaderProps,
} from './interfaces';
import './index.less';

/**
 * Компонент отрисовки основных блоков страницы.
 * Доступные подкомпоненты:
 * - Header;
 * - Filter;
 * - Counter;
 * - CounterSeparator;
 * - List;
 * - Pagination;
 * - Form;
 * - FormButtons;
 * - Dummy;
 * - Block.
 *
 * @component
 */
const Page = (props: TCommonPageProps) => <div
    className={classNames({
        [classes.component]: true,
        [props.className]: !!props.className,
    })}
    data-testid={props.dataTestId}>
    <ErrorBoundary>
        {props.children}
    </ErrorBoundary>
</div>;

const Breadcrumbs = (props: TCommonPageProps) => <div
    className={classNames(classes.breadcrumbs, props.className)}>
    <ErrorBoundary>
        {props.children}
    </ErrorBoundary>
</div>;

const Header = (props: Partial<TCommonPageProps> & THeaderProps) => <div
    className={classNames({
        [classes.header]: true,
        [props.className]: !!props.className,
    })}
    data-testid={props.dataTestId}>
    <h1 className={classes.title}>{props.title}</h1>
    <ErrorBoundary>
        {props.children || null}
    </ErrorBoundary>
</div>;

const Filter = (props: TCommonPageProps) => <div
    className={classNames({
        [classes.filter]: true,
        [props.className]: !!props.className,
    })}
    data-testid={props.dataTestId}>
    <ErrorBoundary>
        {props.children}
    </ErrorBoundary>
</div>;

const Counter = (props: TCommonPageProps) => <div
    className={classNames({
        [classes.counter]: true,
        [props.className]: !!props.className,
    })}
    data-testid={props.dataTestId}>
    <ErrorBoundary>
        {props.children}
    </ErrorBoundary>
</div>;

const CounterSeparator = ({ dataTestId }: TCounterSeparatorProps) => <span className={classes.counterSeparator} data-testid={dataTestId}/>;

const List = (props: TCommonPageProps) => <div
    className={classNames({
        [classes.list]: true,
        [props.className]: !!props.className,
    })}
    data-testid={props.dataTestId}>
    <ErrorBoundary>
        {props.children}
    </ErrorBoundary>
</div>;

const Pagination = (props: TCommonPageProps) => <div
    className={classNames({
        [classes.pagination]: true,
        [props.className]: !!props.className,
    })}
    data-testid={props.dataTestId}>
    <ErrorBoundary>
        {props.children}
    </ErrorBoundary>
</div>;

/**
 * Компонент формы изменения сущности.
 * Отслеживает изменения на форме и предупреждает о них, если пользователь захочет уйти со страницы, не сохранив результат.
 *
 * React не всегда отлавливает нативные события изменений. Поэтому на них следует подписываться отдельно.
 * @component
 */
const Form = (props: TCommonPageProps & TFormProps) => {
    // Флаг, что на форме было какое-то изменение
    const [hasChanges, setHasChanges] = useState(false);

    // Реф текущей формы
    const formRef = useRef<HTMLFormElement>(null);

    /**
     * Обработка синтетических change на форме. Запоминаем, что было сделано какое-то изменение.
     */
    const handleChange = () => setHasChanges(true);

    /**
     * Обработка отправки формы.
     * На время submit "забываем", что были изменения, чтобы не мешать редиректу с формы в случае успешной отправки.
     * Если редиректа с формы не произошло, то возвращаем состояние изменения формы к значению до оправки.
     * @param {React.FormEvent} event - Событие submit формы
     */
    const handleSubmit = async (event: React.FormEvent) => {
        // Значение флага наличия изменений на форме до отправки формы
        const hasChangesBeforeSubmit = hasChanges;
        setHasChanges(false);

        // Признак, что submit был разрешен. По умолчанию разрешен.
        const shouldSubmit = await props.beforeSubmit();
        if (!shouldSubmit) {
            // Если submit не был разрешен, возвращаем флаг изменений к состоянию до отправки.
            setHasChanges(hasChangesBeforeSubmit);
            return;
        }

        // Если все успешно выполнилось, можно отправлять submit.
        await props.onSubmit(event);
        setHasChanges(hasChangesBeforeSubmit);
    };

    useEffect(() => {
        /**
         * Обработчик события beforeunload. Блокирует уход со страницы, если были какие-то изменения на форме.
         * @param {BeforeUnloadEvent} event - Событие перед выгрузкой окна
         */
        const handleUnload = (event: BeforeUnloadEvent) => {
            if (!hasChanges) {
                return;
            }
            event.preventDefault();

            // Только для поддержки legacy Chrome/Edge < 119
            const updatedEvent = event;
            updatedEvent.returnValue = true;
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => window.removeEventListener('beforeunload', handleUnload);
    }, [hasChanges]);

    useLayoutEffect(() => {
        /**
         * Обработка нативных change на форме. Запоминаем, что было сделано какое-то изменение.
         */
        const handleNativeChange = () => setHasChanges(true);

        formRef.current.addEventListener('change', handleNativeChange);

        return () => formRef.current.removeEventListener('change', handleNativeChange);
    }, []);

    // Если форма обновилась, то сбрасываем признак, что были изменения.
    useEffect(() => {
        setHasChanges(false);
    }, [props.updatedAt]);

    return <form
        className={classNames({
            [classes.form]: true,
            [props.className]: !!props.className,
        })}
        onChange={handleChange}
        onSubmit={handleSubmit}
        ref={formRef}
        data-testid={props.dataTestId}
        noValidate>
        <ErrorBoundary>
            {props.children}
        </ErrorBoundary>
    </form>;
};

const formDefaultProps: Partial<TFormProps> = {
    beforeSubmit: () => new Promise((resolve) => { resolve(true); }),
};

Form.defaultProps = formDefaultProps;

const FormButtons = (props: TCommonPageProps) => <div
    className={classNames({
        [classes.formButtons]: true,
        [props.className]: !!props.className,
    })}
    data-testid={props.dataTestId}>
    <ErrorBoundary>
        {props.children}
    </ErrorBoundary>
</div>;

/**
 * Блок, заполняющий собой пустое пространство
 * @component
 */
const Dummy = (props: TCommonPageProps) => <div
    className={classNames({
        [classes.dummy]: true,
        [props.className]: !!props.className,
    })}
    data-testid={props.dataTestId}>
    <ErrorBoundary>
        {props.children}
    </ErrorBoundary>
</div>;

/**
 * Обычный блок с нижним отступом
 * @component
 */
const Block = (props: TCommonPageProps) => <div
    className={classNames({
        [classes.block]: true,
        [props.className]: !!props.className,
    })}
    data-testid={props.dataTestId}>
    <ErrorBoundary>
        {props.children}
    </ErrorBoundary>
</div>;

Page.Breadcrumbs = Breadcrumbs;
Page.Header = Header;
Page.Filter = Filter;
Page.Counter = Counter;
Page.CounterSeparator = CounterSeparator;
Page.List = List;
Page.Pagination = Pagination;
Page.Form = Form;
Page.FormButtons = FormButtons;
Page.Dummy = Dummy;
Page.Block = Block;

export { Page };
