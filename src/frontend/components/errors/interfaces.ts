/**
 * Формат ошибок в АПИ
 */
export type TApiError = {
    // Код ошибки
    code: string,

    // Сообщение
    detail: string,

    // Указатель на ошибку
    source?: {
        // Указывает на ошибку при POST/PATCH запросах
        pointer?: string,

        // Указывает на ошибку при GET запросах
        parameter?: string,
    },
};

/**
 * Формат хранения ошибок на форме.
 */
export type TFormErrors = Record<string, string | null>;

/**
 * Объект с набором правил для маппинга API ошибок, вида `{'указатель на ошибку backend': 'указатель на ошибку frontend'}`
 */
export type TBackendErrorsMapData = { [key: string]: string };

export type TResponseError = {
    name: string,
    code: string,
    message: string,
    response: {
        status: number,
        statusText: string,
        data: {
            errors: TApiError[],
        },
    },
};

/**
 * Ошибка запроса, вызванная AbortController.
 */
export type TRequestAbortError = {
    name: string,
    message: string,
    request: any,
    config: {
        signal: {
            reason: string,
        }
    }
};

export type TRequestError = {
    name: string,
    message: string,
    request: any,
};

export type TCommonError = {
    name: string,
    message: string,
};

export type TResponseBlobError = {
    name: string,
    code: string,
    message: string,
    response: {
        status: number,
        statusText: string,
        data: Blob,
    },
};

/**
 * Коллекция ошибок с данными из АПИ.
 * Ключ - название поля формы.
 */
export type TApiMappedErrors = Record<string, TApiError>;
