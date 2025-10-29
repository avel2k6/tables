import { generateId } from '../utils';

type TCol = string;

export type TRow = {
    id: string,
    cols: TCol[],
};

export const prepareList = (data: string[][]): TRow[] => data.map((rowContent) => ({
    id: generateId('list_'),
    cols: rowContent,
}));
