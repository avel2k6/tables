import React, { useContext } from 'react';

import { ListTable } from '../list-table';
import { MainListContext } from '../../contexts/mail-list-context';

/**
 * Основной листинг.
 * @constructor
 */
export const List = () => {
    const { list, setColEditData } = useContext(MainListContext);

    const handleClick = (rowId: string, colIndex: number, text: string) => () => {
        setColEditData(rowId, colIndex, text);
    };

    return <ListTable>
        <ListTable.Body>
            {list.map((row) => <ListTable.Tr key={row.id}>
                {row.cols.map((col, colIndex) => <ListTable.Td
                    onMouseDown={handleClick(row.id, colIndex, col)}
                    key={colIndex}>
                    {col}
                </ListTable.Td>)}
            </ListTable.Tr>)}
        </ListTable.Body>
    </ListTable>;
};
