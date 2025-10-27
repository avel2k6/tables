/**
 * Функция чтения файла. Возвращает данные из файла. Если файл csv, то парсит json. В противном случае возвращает данные как есть.
 * @param filePath - путь к файлу.
 */
export const readFile = async (filePath: string):Promise<{ data: any }> => {
    const result = await window.api.fileApi.openFile(filePath);
    if (result.success) {
        if (filePath.endsWith('.csv')) {
            return {
                data: JSON.parse(result.data),
            };
        }

        return {
            data: result.data,
        };
    }
    throw new Error('Error file read');
};
