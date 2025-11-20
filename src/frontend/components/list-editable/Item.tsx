import {
    useContext, useLayoutEffect, useRef, useState,
} from 'react';
import { MainListContext } from '../../contexts/mail-list-context';
import { TEditData } from '../../domains/EditData';
import { Textarea } from '../textarea';
import { classes } from './constants';
import { ColEditor } from '../col-editor';
import { dataAttributes } from '../data-attributes';
import { customEvents } from '../custom-events';

export const Item = ({
    currentRowId = '',
    currentColIndex = 0,
    currentTextText = '',
}) => {
    const { updateList } = useContext(MainListContext);

    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [editData, setEditData] = useState<TEditData>(null);
    const [editText, setEditText] = useState<string>(currentTextText);
    const cellElement = useRef<HTMLDivElement>(null);

    const handleShowMenu = (event: CustomEvent) => {
        if (!event.detail.cell) {
            return;
        }

        if (event.detail.cell.rowId !== currentRowId || event.detail.cell.colIndex !== currentColIndex) {
            return;
        }

        setEditData({
            rowId: currentRowId,
            colIndex: currentColIndex,
            text: currentTextText,
        });
    };
    useLayoutEffect(() => {
        document.addEventListener(customEvents.CELL_MENU, handleShowMenu);
        return () => {
            document.removeEventListener(customEvents.CELL_MENU, handleShowMenu);
        };
    }, []);

    const handleSaveEdit = async (rowId: string, colIndex: number, text: string) => {
        await updateList(rowId, colIndex, text);
        setEditData(null);
        setIsEditable(false);
    };

    const handleClearEditData = () => {
        setEditData(null);
        setIsEditable(false);
    };

    const handleEdit = () => {
        if (isEditable) {
            return;
        }
        setIsEditable(true);
        setEditText(currentTextText);
    };

    const handleChange = (newText: string) => {
        setEditText(newText);
    };

    const handleBlur = async () => {
        setIsEditable(false);
        await updateList(currentRowId, currentColIndex, editText);
    };

    const attributes = {
        [dataAttributes.dataColIndex]: currentColIndex,
        [dataAttributes.dataRowId]: currentRowId,
    };

    return <>
        <div
            {...attributes}
            ref={cellElement}
            tabIndex={0}
            className={classes.cell}
            // onAuxClick={handleShowMenu(currentRowId, currentColIndex, currentTextText)}
            onDoubleClick={handleEdit}>
            {isEditable
                ? <Textarea
                    autoFocus
                    blockClassName={classes.textareaBlock}
                    className={classes.textarea}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={editText}/>
                : currentTextText
            }

        </div>
        <ColEditor
            editData={editData}
            handleClear={handleClearEditData}
            handleSave={handleSaveEdit}
        />
    </>;
};
