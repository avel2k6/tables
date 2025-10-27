import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../contexts/api';
import { ErrorHandlerContext } from '../../contexts/error-handler';
import { TFetchState } from '../fetch-state/interfaces';
import { fetchStateStatus } from '../fetch-state';
import { useListingPagination } from '../../hooks/useListingPagination';
import { Page } from '../page';
import { MainListContext } from '../../contexts/mail-list-context';
import { List } from './List';
import { TRow } from '../../domains/Row';
import { generateId } from '../../utils';
import { TEditData } from '../../domains/EditData';
import { ModalPortal } from '../modal';
import { Modal } from '../modal/Modal';
import { Button } from '../button';
import { texts } from './constants';
import { FormGroup } from '../form-group';
import { Input } from '../input';

const prepareList = (data: string[][]): TRow[] => data.map((rowContent) => ({
    id: generateId('list_'),
    cols: rowContent,
}));

export const PageMain = () => {
    const [list, setList] = useState<TRow[]>([]);

    const [editData, setEditData] = useState<TEditData>(null);

    const api = useContext(ApiContext);

    const { handleError } = useContext(ErrorHandlerContext);

    const [loadingState, setLoadingState] = useState<TFetchState>(fetchStateStatus.IDLE);

    const [pageState, setPageState, setPageNumber] = useListingPagination({
        number: 1,
        size: 50,
    });

    const fetchMainTable = async () => {
        try {
            const result = await api.file.readFile('D:/svn/my-new-app/test.csv');
            setList(prepareList(result.data));
        } catch (e) {
            handleError(e);
        } finally {
            setLoadingState(fetchStateStatus.IDLE);
        }
    };

    const updateList = async (rowId: string, col: number, text: string) => {
        const rowIndex = list.findIndex((row) => row.id === rowId);
        if (rowIndex === -1) {
            throw new Error(`Row with id ${rowId} not found`);
        }

        const updatedList = [...list];

        updatedList[rowIndex].cols[col] = text;
        setList(updatedList);
    };

    const handleSetEditData = (rowId: string, colIndex: number, text: string) => {
        setEditData({ rowId, colIndex, text });
    };

    const handleClearEditData = () => {
        setEditData(null);
    };

    const handleChangeText = (text: string) => {
        handleSetEditData(editData.rowId, editData.colIndex, text);
    };

    useEffect(() => {
        fetchMainTable().finally();
    }, []);
    return <Page>
        <MainListContext.Provider value={{
            list,
            updateList,
            setColEditData: handleSetEditData,
        }}>
            <Page.List>
                <List/>
            </Page.List>
        </MainListContext.Provider>
        <ModalPortal isShow={!!editData} onHide={handleClearEditData}>
            <Modal.Header hasCloseButton>
                <Modal.Title>{texts.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {editData
                    ? <div>
                        <FormGroup>
                            <Input
                                value={editData.text || ''}
                                onChange={handleChangeText}
                                autoFocus={true}
                            />
                        </FormGroup>
                    </div>
                    : null}
            </Modal.Body>
            <Modal.Footer align='right'>
                <Button
                    autoFocus
                    variant='confirm'
                    onClick={() => updateList(editData.rowId, editData.colIndex, editData.text)}>
                    {texts.ok}
                </Button>
                <Button
                    variant='secondary'
                    onClick={handleClearEditData}>
                    {texts.cancel}
                </Button>
            </Modal.Footer>
        </ModalPortal>
    </Page>;
};
