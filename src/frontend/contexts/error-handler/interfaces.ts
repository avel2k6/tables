/**
 * Объект с набором правил для маппинга API ошибок вида {'указатель на ошибку backend': 'указатель на ошибку frontend'}
 */
type TBackendErrorsMapData = { [key: string]: string };

type TUnhandledErrorsCallback = (unhandledErrors: { [key: string]: string }) => void;

export type THandleError = (
    // Объект ошибки
    err: any,

    // Объект с набором правил для маппинга API ошибок
    backendMapData?: TBackendErrorsMapData,

    // Колбэк, прокидывающий ошибки, которые были конвертированы через маппинг, но не были показаны в UI
    unhandledErrorsCallback?: TUnhandledErrorsCallback,
) => void;

export type TErrorHandlerContext = {
    // Метод для универсальной обработки ошибок
    handleError:THandleError,
};
