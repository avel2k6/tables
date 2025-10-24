/**
 * Общий контекст для листингов
 */
export type TCommonListContext<TList, TFilter, TSort> = {
    // Элементы листинга
    list: TList,

    // Колбэк загрузки нового листинга на основе текущего фильтра
    updateList: () => Promise<void>,

    // Текущее состояние фильтра
    filter?: TFilter,

    // Колбэк обновления фильтра
    updateFilter?: (filter: Partial<TFilter>) => void,

    // Сортировка
    sort?: TSort,

    // Колбэк обновления сортировки
    updateSort?: (sort: TSort) => void,
};
