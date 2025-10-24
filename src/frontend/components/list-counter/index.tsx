import React from 'react';

import { texts } from './constants';
import { TListCounterProps } from './interfaces';

/**
 * Компонент подсчёта элементов листинга
 * @component
 */
export const ListCounter = ({
    currentPageNumber, size, total, dataTestId,
}: TListCounterProps) => {
    const from = total !== 0
        ? 1 + (currentPageNumber - 1) * size
        : 0;

    const to = total !== null && currentPageNumber * size > total
        ? total
        : currentPageNumber * size;

    return <span data-testid={dataTestId}>
        {texts.count}<b>{from}-{to}</b>{total !== null
            ? <>{texts.maxCount}<b>{total}</b></>
            : null}
        {texts.dot}
    </span>;
};
