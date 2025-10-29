export type TColConfig = {
    filepath: string,
    color: string,
};

export type TConfig = {
    filepath: string,
    cols: Record<string, {
        filepath: string,
        color: string,
    }>
    getColConfig: (colIndex: number) => TColConfig,
};
