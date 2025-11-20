import React, { useContext } from 'react';
import { Input } from '../input';
import { ListTable } from '../list-table';
import { MainListContext } from '../../contexts/mail-list-context';
import { ConfigContext } from '../../contexts/config';

export const Filter = () => {
    const { updateFilter, list, filter } = useContext(MainListContext);

    const { filepath } = useContext(ConfigContext);

    const handleFilterChange = (colIndex: number) => (value: string) => {
        updateFilter(colIndex, value);
    };

    return <ListTable.Tr>
        <ListTable.Th>
            <div>
                {'...'}
            </div>
        </ListTable.Th>
        {list[0]?.cols.map((_, colIndex) => (
            <ListTable.Th
                resizerPosition={'right'}
                resizerId={`${filepath}_${colIndex}`}
                key={colIndex}>
                <Input
                    key={colIndex}
                    placeholder={`${colIndex + 1}`}
                    value={filter[colIndex] || ''}
                    onChange={handleFilterChange(colIndex)}
                />
            </ListTable.Th>
        ))}
    </ListTable.Tr>;
};
