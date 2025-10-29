import './index.less';

import React from 'react';

import { Item } from './Item';
import {
    classes,
    text,
    sizeConfigs,
    MAX_PAGES_BEFORE_ELLIPSIS,
} from './constants';
import { TPaginationProps } from './interfaces';

/**
 * Пагинация листингов
 * @param props
 * @constructor
 */
export const Pagination = (props: TPaginationProps) => {
    const {
        currentPageNumber, size, total, onChange,
    } = props;

    const handleChangePage = (pageNumber: number) => () => {
        onChange(pageNumber);
        if (props.scrollTo) {
            props.scrollTo.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };
    const firstPageNumber = 1;
    const lastPageNumber = Math.ceil(total / size) || 1;
    const prevPageNumber = currentPageNumber - 1 >= 1 ? currentPageNumber - 1 : null;
    const nextPageNumber = currentPageNumber + 1 <= lastPageNumber ? currentPageNumber + 1 : null;

    // Текущий конфиг с размерами для отрисовки пагинации.
    const sizeConfig = sizeConfigs[props.itemsCount || 'default'];

    return <div className={classes.component}>
        {prevPageNumber
            ? <>
                <Item onClick={handleChangePage(firstPageNumber)}>{text.first}</Item>
                <Item onClick={handleChangePage(prevPageNumber)}>{text.prev}</Item>
            </>
            : <>
                <Item disabled>{text.first}</Item>
                <Item disabled>{text.prev}</Item>
            </>
        }
        {(lastPageNumber <= MAX_PAGES_BEFORE_ELLIPSIS)
            ? ([...new Array(lastPageNumber)]
                .map((val, index) => index + 1)
                .map((val) => <Item
                    active={val === currentPageNumber}
                    onClick={handleChangePage(val)}
                    key={val}>
                    {val}
                </Item>))
            : null
        }
        {(lastPageNumber > MAX_PAGES_BEFORE_ELLIPSIS)
            ? <>
                {(currentPageNumber > sizeConfig.lever + 1)
                    ? <Item disabled>{text.ellipsis}</Item>
                    : null}
                {([...new Array(sizeConfig.length)]
                    .map((val, index) => index + currentPageNumber - sizeConfig.lever)
                    .map((val) => (val > 0 && val <= lastPageNumber
                        ? <Item
                            active={val === currentPageNumber}
                            onClick={handleChangePage(val)}
                            key={val}>
                            {val}</Item>
                        : null)))}
                {(currentPageNumber < lastPageNumber - sizeConfig.lever)
                    ? <Item disabled>{text.ellipsis}</Item>
                    : null}
            </>
            : null
        }
        {nextPageNumber
            ? <>
                <Item onClick={handleChangePage(nextPageNumber)}>{text.next}</Item>
                <Item onClick={handleChangePage(lastPageNumber)}>{text.last}</Item>
            </>
            : <>
                <Item disabled>{text.next}</Item>
                <Item disabled>{text.last}</Item>
            </>
        }
    </div>;
};

const defaultProps: Partial<TPaginationProps> = {
    itemsCount: 'default',
};

Pagination.defaultProps = defaultProps;
