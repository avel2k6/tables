import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { useLocalStorage } from '../../hooks/useLocalStorage';

import { Resizer } from './Resizer';
import { CELL_MAX_WIDTH, CELL_MIN_WIDTH, classes } from './constants';
import {
    TColProps, TCommonListTableProps, TdProps, ThProps,
} from './interfaces';

import './index.less';

/**
 * Компонент отрисовки таблицы листитинга элементов.
 * Доступные подкомпоненты:
 * - ColGroup;
 * - Col;
 * - Head;
 * - Body;
 * - Tr;
 * - Th;
 * - Td.
 *
 * @component
 */
const ListTable = ({ children, className, dataTestId }: TCommonListTableProps) => <table
    className={classNames({
        [classes.component]: true,
        [className]: !!className,
    })}
    data-testid={dataTestId}>
    {children}
</table>;

const ColGroup = ({ children, dataTestId }: Pick<TCommonListTableProps, 'children' | 'dataTestId'>) => <colgroup data-testid={dataTestId}>
    {children}
</colgroup>;

const Col = ({ width, dataTestId }: TColProps) => <col
    width={width ? `${width}px` : null}
    data-testid={dataTestId} />;

const Head = ({ children, className, dataTestId }: TCommonListTableProps) => <thead
    className={classNames({
        [classes.head]: true,
        [className]: !!className,
    })}
    data-testid={dataTestId}>
    {children}
</thead>;

const Body = ({
    children, className, componentRef, dataTestId,
}: TCommonListTableProps<HTMLTableSectionElement>) => <tbody
    ref={componentRef}
    className={classNames({
        [classes.body]: true,
        [className]: !!className,
    })}
    data-testid={dataTestId}>
    {children}
</tbody>;

const Tr = ({
    children, className, componentRef, style, dataAttributes, dataTestId,
}: TCommonListTableProps<HTMLTableRowElement>) => <tr
    ref={componentRef}
    style={style}
    className={classNames({
        [classes.tr]: true,
        [className]: !!className,
    })}
    data-testid={dataTestId}
    {...dataAttributes}>
    {children}
</tr>;

/**
 * Ячейка заголовка. Может быть пустой.
 * @component
 */
const Th = (props: Partial<TCommonListTableProps> & ThProps) => {
    if (!('resizerId' in props) || !('resizerPosition' in props)) {
        return <th
            colSpan={props.colSpan}
            className={classNames({
                [classes.th]: true,
                [props.className]: !!props.className,
            })}
            title={props.title}
            data-testid={props.dataTestId}>
            {props.children
                ? <div className={classNames({
                    [classes.thWrapper]: true,
                    [classes.thWrapperColspan]: props.colSpan > 1,
                })}>
                    {props.children}
                </div>
                : null}
        </th>;
    }

    const storageWidth = useLocalStorage(props.resizerId);

    const [width, setWidth] = useState(null);

    /**
     * Изменяем ширину ячейки и записываем в localStorage
     * @param newWidth
     */
    const handleWidthChange = (newWidth: number | null) => {
        if (!newWidth) {
            setWidth(null);
            storageWidth.remove();
            return;
        }

        if (newWidth < CELL_MIN_WIDTH || newWidth > CELL_MAX_WIDTH) {
            return;
        }

        setWidth(newWidth);
        storageWidth.set(newWidth);
    };

    useEffect(() => {
        setWidth(storageWidth.value);
    }, [
        storageWidth.value,
    ]);

    return <th
        colSpan={props.colSpan}
        style={{ width: width ? `${width}px` : null }}
        className={classNames({
            [classes.th]: true,
            [props.className]: !!props.className,
        })}
        data-testid={props.dataTestId}>
        {props.children
            ? <div className={classNames({
                [classes.thWrapper]: true,
                [classes.thWrapperResizable]: true,
                [classes.thWrapperColspan]: props.colSpan > 1,
            })}>
                {props.children}
            </div>
            : null}
        <Resizer onChange={handleWidthChange} resizerPosition={props.resizerPosition}/>
    </th>;
};

Th.defaultProps = {
    colSpan: 1,
};

/**
 * Может быть пустым
 * @component
 */
const Td = ({
    children, className, colSpan, onMouseDown, dataTestId,
}: Partial<TCommonListTableProps> & TdProps) => <td
    colSpan={colSpan}
    onMouseDown={onMouseDown}
    className={classNames({
        [classes.td]: true,
        [className]: !!className,
    })}
    data-testid={dataTestId}>
    {children || null}
</td>;

Td.defaultProps = {
    colSpan: 1,
};

ListTable.ColGroup = ColGroup;
ListTable.Col = Col;
ListTable.Head = Head;
ListTable.Body = Body;
ListTable.Tr = Tr;
ListTable.Th = Th;
ListTable.Td = Td;

export { ListTable };
