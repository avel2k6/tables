type TObject = { [key: string]: string | number | null | string[] | boolean | TObject };

/**
 * Type guard - для определения, что перед нами объект.
 * @param obj - объект.
 */
export const isObject = (obj: any): obj is Object => typeof obj === 'object'
    && !Array.isArray(obj)
    && obj !== null;

/**
 * Проверяем, что входящий аргумент null
 * @param value
 */
const isNull = (value: any) => value === null;

/**
 * Проверяем, что каждое свойство фильтра пустое
 * @param object
 */
export const isEveryEntryEmpty = (object: TObject): boolean => Object
    .values(object)
    // заменяем пустые строки на null
    .map((value) => {
        if (isNull(value)) {
            return null;
        }
        if (typeof value === 'boolean') {
            return !value ? null : value;
        }

        if (typeof value === 'string') {
            return value === '' ? null : value;
        }
        if (typeof value === 'number') {
            return value === 0 ? null : value;
        }
        if (Array.isArray(value)) {
            return value.length === 0 ? null : value;
        }
        if (typeof value === 'object') {
            return isEveryEntryEmpty(value) ? null : value;
        }
        return value;
    })
    .every(isNull);
