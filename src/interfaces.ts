export type TReadFile = {
    success: true,
    data: string,
} | {
    success: false,
    error: string,
};
