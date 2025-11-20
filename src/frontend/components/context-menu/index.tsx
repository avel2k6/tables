import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { classes as editableListClasses } from '../list-editable/constants';
import './index.less';
import { TEditData } from '../../domains/EditData';
import { dataAttributes } from '../data-attributes';
import { customEvents } from '../custom-events';

export const classes = {
    component: 'context-menu',
    item: 'context-menu__item',
    itemDisabled: 'context-menu__item_disabled',
    itemCopy: 'context-menu__item_copy',
    itemPrint: 'context-menu__item_print',
    itemCopyNews: 'context-menu__item_copy-news',
};

/**
 * Теги, для которых запрещен показ контекстного меню
 */
export const forbidenTags = ['A'];

export const menu = {
    offsetWidth: 250,
    offsetHigh: 80,
};

export const buttons = {
    copy: 'Копировать',
    more: 'Подробно',
    deleteRow: 'Удалить строку',
    addRowUp: 'Добавить строку 🠅',
    addRowDown: 'Добавить строку 🠇',
    print: 'Печать...',
} as const;

export const ContextMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [selectionText, setselectionText] = useState<string>('');
    const [cell, setCell] = useState<TEditData>(null);

    const toggleMenuOn = () => {
        setIsOpen(true);
    };

    const toggleMenuOff = () => {
        setIsOpen(false);
    };

    /**
     * Клик был внутри элемента, в котором не показываем контекстное меню
     * @param event
     */
    const clickInsideForbiddenTag = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        return !!target.closest(forbidenTags.join(','));
    };

    /**
     * Клик внутри самого контекстного меню
     * @param event
     */
    const clickInsideContexedTag = (event: MouseEvent) => {
        const target = event.target as HTMLElement;

        return clickInsideForbiddenTag(event) || !!target.closest(`.${classes.component}`);
    };

    /**
     * Определяет позицию меню. Если оно выходит за границы экрана, то пересчитывает позицию.
     * @param event
     */
    const positionMenu = (event: MouseEvent) => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const clickTopPosition = event.clientY + document.documentElement.scrollTop;
        const clickLeftPosition = event.clientX;

        const top = (clickTopPosition + menu.offsetHigh) > document.documentElement.scrollTop + windowHeight
            ? clickTopPosition - menu.offsetHigh
            : clickTopPosition;

        const left = clickLeftPosition + menu.offsetWidth > windowWidth
            ? clickLeftPosition - menu.offsetWidth
            : clickLeftPosition;

        setPosition({ top, left });
    };

    const saveSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim() !== '') {
            const selectedText = selection.toString().trim();
            setselectionText(selectedText);
        }
    };

    /**
     * Закрывает меню, если кликнули мимо.
     * @param event
     */
    const clickListener = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.closest(`.${classes.component}`)) {
            return;
        }
        toggleMenuOff();
    };

    const keyupListener = (event: KeyboardEvent) => {
        if (event.key === 'esc') {
            toggleMenuOff();
        }
    };

    const resizeListener = () => {
        toggleMenuOff();
    };

    const saveCellAttributes = (currentCell: Element) => {
        if (!currentCell) {
            setCell(null);
            return;
        }
        setCell({
            rowId: currentCell.getAttribute(dataAttributes.dataRowId),
            colIndex: parseInt(currentCell.getAttribute(dataAttributes.dataColIndex), 10),
            text: '',
        });
    };

    /**
     * Клик ПКМ.
     * @param event
     */
    const contextListener = (event: MouseEvent) => {
        if (clickInsideForbiddenTag(event)) {
            // Если кликнули по запрещенному тегу, то закрываем меню, если оно было открыто
            if (isOpen) {
                toggleMenuOff();
            }
            return;
        }

        const itemInContext = clickInsideContexedTag(event);
        if (!itemInContext) {
            toggleMenuOff();
        }
        // если элемент определен, отображаем меню
        // включаем отображение меню
        toggleMenuOn();
        positionMenu(event);
        saveSelection();

        // отключаем стандартное контекстное меню
        event.preventDefault();
        const { target } = event;
        if (!(target instanceof HTMLElement)) {
            return;
        }
        const closestCell = target.closest(`.${editableListClasses.cell}`);
        saveCellAttributes(closestCell);
    };

    useEffect(() => {
        document.body.addEventListener('contextmenu', contextListener);
        document.body.addEventListener('click', clickListener);
        window.addEventListener('keyup', keyupListener);
        window.addEventListener('resize', resizeListener);

        return () => {
            document.body.removeEventListener('contextmenu', contextListener);
            document.body.removeEventListener('click', clickListener);
            window.removeEventListener('keyup', keyupListener);
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    const handleCopyText = async () => {
        // после нажатия на кнопку любое выделение автоматически снимается,
        // поэтому восстанавливаем его из сохраненного

        try {
            if (selectionText) {
                await navigator.clipboard.writeText(selectionText);
            }
        } catch (err) {
            console.error(err);
        }
        toggleMenuOff();
    };

    const handlePrint = () => {
        window.print();
        toggleMenuOff();
    };

    const handleOpenCellMenu = () => {
        document.dispatchEvent(new CustomEvent(customEvents.CELL_MENU, {
            detail: {
                cell,
            },
            bubbles: true,
        }));
        toggleMenuOff();
    };

    const handleDeleteRow = () => {
        document.dispatchEvent(new CustomEvent(customEvents.REMOVE_ROW, {
            detail: {
                rowId: cell.rowId,
            },
            bubbles: true,
        }));
        toggleMenuOff();
    };

    const handleAddRow = (type: 'before' | 'after') => () => {
        document.dispatchEvent(new CustomEvent(customEvents.ADD_ROW, {
            detail: {
                rowId: cell.rowId,
                type,
            },
            bubbles: true,
        }));
    };

    return <>
        {isOpen
            ? <div
                style={{
                    top: position.top,
                    left: position.left,
                }}
                className={classes.component}>
                <div
                    onClick={selectionText
                        ? handleCopyText
                        : () => {}}
                    className={classNames({
                        [classes.item]: true,
                        [classes.itemDisabled]: !selectionText,
                        [classes.itemCopy]: true,
                    })}>
                    {buttons.copy}
                </div>
                <div
                    onClick={handlePrint}
                    className={classNames({
                        [classes.item]: true,
                        [classes.itemPrint]: true,
                    })}>
                    {buttons.print}
                </div>
                {cell
                    ? <>
                        <div
                            onClick={handleOpenCellMenu}
                            className={classNames({
                                [classes.item]: true,
                            })}>
                            {buttons.more}
                        </div>
                        <div
                            onClick={handleDeleteRow}
                            className={classNames({
                                [classes.item]: true,
                            })}>
                            {buttons.deleteRow}
                        </div>
                        <div
                            onClick={handleAddRow('before')}
                            className={classNames({
                                [classes.item]: true,
                            })}>
                            {buttons.addRowUp}
                        </div>
                        <div
                            onClick={handleAddRow('after')}
                            className={classNames({
                                [classes.item]: true,
                            })}>
                            {buttons.addRowDown}
                        </div>
                    </>
                    : null
                }
            </div>
            : null}
    </>;
};
