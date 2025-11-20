import { createContext } from 'react';
import { TMainListContext } from './interfaces';

export const MainListContext = createContext<TMainListContext>({
    setColEditData: () => {},
    updateFilter: () => {},
    updateSort: () => {},
    updateList: async () => {},
    list: [],
    filter: {},
});
