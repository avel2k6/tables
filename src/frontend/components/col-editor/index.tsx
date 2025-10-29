import { useContext, useEffect, useState } from 'react';
import { modalSizes } from '../modal/constants';
import { Modal } from '../modal/Modal';
import { texts } from '../data-grid/constants';
import { FormGroup } from '../form-group';
import { Textarea } from '../textarea';
import { Button } from '../button';
import { ModalPortal } from '../modal';
import { TEditData } from '../../domains/EditData';
import { ConfigContext } from '../../contexts/config';
import { ApiContext } from '../../contexts/api';
import { ErrorHandlerContext } from '../../contexts/error-handler';
import { prepareList, TRow } from '../../domains/Row';
import { Select } from '../select';

type TColEditDataProps = {
    editData: TEditData,
    handleClear: () => void,
    handleSave: (rowId: string, colIndex: number, text: string) => void,
};

export const ColEditor = ({
    editData = null,
    handleClear = () => {},
    handleSave = () => {},
}: TColEditDataProps) => {
    const api = useContext(ApiContext);
    const { handleError } = useContext(ErrorHandlerContext);
    const { getColConfig } = useContext(ConfigContext);

    const [text, setText] = useState<string>('');
    const [list, setList] = useState<TRow[]>([]);

    const colConfig = getColConfig(editData?.colIndex);

    const handleSaveEdit = () => {
        handleSave(editData.rowId, editData.colIndex, text);
    };

    const handleChangeText = (newText: string) => {
        setText(newText);
    };

    const fetchSecondaryTable = async () => {
        if (!colConfig.filepath) {
            return;
        }
        try {
            const result = await api.file.readFile(colConfig.filepath);
            setList(prepareList(result.data));
        } catch (e) {
            handleError(e);
        }
    };

    useEffect(() => {
        if (!editData) {
            return;
        }
        setText(editData.text);
    }, [editData?.text]);

    useEffect(() => {
        if (!colConfig) {
            setList([]);
            return;
        }
        fetchSecondaryTable().finally();
    }, [editData?.colIndex]);

    const selectOptions = list.map(({ cols }) => ({
        value: cols[0],
        title: cols[0],
        tooltip: cols[0],
    }));

    return <ModalPortal isShow={!!editData} onHide={handleClear} size={modalSizes.TAB}>
        {editData
            ? <>
                <Modal.Header hasCloseButton>
                    <Modal.Title>{texts.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editData
                        ? <div>
                            <FormGroup>
                                <Textarea
                                    rows={10}
                                    value={text || ''}
                                    onChange={handleChangeText}
                                    autoFocus
                                />
                            </FormGroup>
                            <FormGroup>
                                {list.length
                                    ? <Select
                                        value={selectOptions.find(({ value }) => value === text) ? text : selectOptions[0].value}
                                        selectOptions={selectOptions}
                                        onChange={handleChangeText}
                                    />
                                    : null}

                            </FormGroup>
                        </div>
                        : null}
                </Modal.Body>
                <Modal.Footer align='right'>
                    <Button
                        variant='confirm'
                        onClick={handleSaveEdit}>
                        {texts.ok}
                    </Button>
                    <Button
                        variant='secondary'
                        onClick={handleClear}>
                        {texts.cancel}
                    </Button>
                </Modal.Footer>
            </>
            : null}
    </ModalPortal>;
};
