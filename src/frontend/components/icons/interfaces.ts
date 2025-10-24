/**
 * Тип пропсов
 */
export type TIconsProps = {
    // Дополнительный CSS-класс
    className?: string,

    // Иконка выглядит как неактивная
    disabled?: boolean,

    // Цвет иконки
    color?: 'black' | 'gray' | 'blue' | 'red',

    // ID для тестирования
    dataTestId?: string,
};

/**
 * Типы иконки
 */
export type TIconType = 'close'
| 'delete'
| 'download'
| 'edit'
| 'expand'
| 'eye'
| 'folder'
| 'person'
| 'link'
| 'reorder'
| 'documentHat'
| 'searchLensChecked'
| 'lightningOrange';
