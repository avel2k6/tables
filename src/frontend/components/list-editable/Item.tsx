import { useContext, useState } from 'react';
import { MainListContext } from '../../contexts/mail-list-context';
import { TEditData } from '../../domains/EditData';
import { Textarea } from '../textarea';
import { classes } from './constants';
import { ColEditor } from '../col-editor';

export const Item = ({
    currentRowId = '',
    currentColIndex = 0,
    currentTextText = '',
}) => {
    const { updateList } = useContext(MainListContext);

    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [editData, setEditData] = useState<TEditData>(null);
    const [editText, setEditText] = useState<string>(currentTextText);

    const handleDoubleClick = (rowId: string, colIndex: number, text: string) => () => {
        setEditData({
            rowId,
            colIndex,
            text,
        });
    };

    const handleSaveEdit = async (rowId: string, colIndex: number, text: string) => {
        await updateList(rowId, colIndex, text);
        setEditData(null);
        setIsEditable(false);
    };

    const handleClearEditData = () => {
        setEditData(null);
        setIsEditable(false);
    };

    const handleClick = () => {
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

    return <>
        <div
            tabIndex={0}
            className={classes.cell}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick(currentRowId, currentColIndex, currentTextText)}>
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
