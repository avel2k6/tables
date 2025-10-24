import { useState } from 'react';

/**
 * Состояние пагинации листинга
 */
type TPageState = {
    // Текущий номер страницы
    number: number,

    // Размер листинга на странице
    size: number,

    // Размер листинга на всех страницах в целом
    total: number,
};

/**
 * Возвращаемые значения из хука
 */
type TUsePageResult = [
    // Данные о пагинации
    TPageState,

    // Колбэк изменения данных о пагинации
    (newValue: Partial<TPageState>) => void,

    // Колбэк изменения номера страницы
    (pageNumber: number) => void,
];

const defaultPageState: TPageState = {
    // Начальная страница
    number: 1,

    // Начальный размер листинга
    size: 0,

    // Начальный размер всего списка сущностей
    // -1  означает, что листинг еще не был загружен и данные о его размере еще не получены
    total: -1,
};

/**
 * Хук пагинации листинга
 * @param {Partial<TPageState>} initialValue - Начальное состояние пагинации листинга
 * @returns {TUsePageResult} Кортеж
 */
export const useListingPagination = (initialValue: Partial<TPageState>): TUsePageResult => {
    const [pageState, setPageState] = useState<TPageState>({
        ...defaultPageState,
        ...initialValue,
    });

    // Колбэк изменения данных о пагинации
    const setState = (newStateValue: Partial<TPageState>) => setPageState({
        ...pageState,
        ...newStateValue,
    });

    // Колбэк изменения номера страницы
    const setPageNumber = (pageNumber: number) => setPageState({ ...pageState, number: pageNumber });

    return [pageState, setState, setPageNumber];
};
