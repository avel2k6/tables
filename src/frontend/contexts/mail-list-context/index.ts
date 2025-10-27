import { createContext } from 'react';
import { TMainListContext } from './interfaces';

export const MainListContext = createContext<TMainListContext>({
    list: [],
    updateList: async () => {},
});
