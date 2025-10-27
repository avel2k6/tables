/**
 * Общий контекст для листингов
 */
export type TCommonListContext<TList, TFilter, TSort> = {
    // Элементы листинга
    list: TList,

    // Колбэк изменения листинга
    updateList: (rowId: string, col: number, text: string) => Promise<void>,

    // Установка редактируемого элемента
    setColEditData: (rowId: string, col: number, text: string) => void,

    // Текущее состояние фильтра
    filter?: TFilter,

    // Колбэк обновления фильтра
    updateFilter?: (filter: Partial<TFilter>) => void,

    // Сортировка
    sort?: TSort,

    // Колбэк обновления сортировки
    updateSort?: (sort: TSort) => void,
};
