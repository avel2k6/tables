import { createContext } from 'react';
import { TMainListContext } from './interfaces';

export const MainListContext = createContext<TMainListContext>({
    setColEditData: () => {},
    updateFilter: () => {},
    updateSort: () => {},
    list: [],
    updateList: async () => {},
});
