import React, { useContext, useState } from 'react';

import { ListTable } from '../list-table';
import { TRow } from '../../domains/Row';
import { TSetColEditData } from '../../contexts/common-listing/interfaces';

import './index.less';
import { classes } from './constants';
import { Item } from './Item';
import { ConfigContext } from '../../contexts/config';

type TListProps = {
    list: TRow[],
    setColEditData: TSetColEditData,
    activeRowId: string | null,
};

/**
 * Основной листинг.
 * @constructor
 */
export const List = ({
    list = [],
    activeRowId = null,
}: TListProps) => {
    const { filepath } = useContext(ConfigContext);
    console.log('List render', new Date());
    return list.length
        ? <>
            <ListTable className={classes.component}>
                <ListTable.Head>
                    <ListTable.Tr>
                        {list[0].cols.map((_, colIndex) => <ListTable.Th
                            resizerPosition={'right'}
                            resizerId={`${filepath}_${colIndex}`}
                            key={colIndex}>
                            <div>
                                {'...'}
                            </div>
                        </ListTable.Th>)}
                    </ListTable.Tr>
                </ListTable.Head>
                <ListTable.Body>

                    {list.map((row) => <>
                        <ListTable.Tr
                            key={row.id}
                            className={activeRowId === row.id ? classes.active : null}>
                            <ListTable.Td>
                                <div>
                                    {'...'}
                                </div>
                            </ListTable.Td>
                            {row.cols.map((col, colIndex) => <ListTable.Td
                                key={colIndex}>
                                <Item
                                    currentRowId={row.id}
                                    currentColIndex={colIndex}
                                    currentTextText={col}
                                />
                            </ListTable.Td>)}
                        </ListTable.Tr>
                    </>)}

                </ListTable.Body>
            </ListTable>

        </>
        : null;
};
