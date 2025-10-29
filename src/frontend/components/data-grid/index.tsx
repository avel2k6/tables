import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../contexts/api';
import { ErrorHandlerContext } from '../../contexts/error-handler';
import { TFetchState } from '../fetch-state/interfaces';
import { fetchStateStatus } from '../fetch-state';
import { useListingPagination } from '../../hooks/useListingPagination';
import { Page } from '../page';
import { MainListContext } from '../../contexts/mail-list-context';
import { List } from '../list-editable';
import {prepareList, TRow} from '../../domains/Row';
import { TEditData } from '../../domains/EditData';
import { Pagination } from '../pagination';
import { ColEditor } from '../col-editor';



export const DataGrid = ({ filepath = null }: { filepath: string | null }) => {
    const [list, setList] = useState<TRow[]>([]);

    const [editData, setEditData] = useState<TEditData>(null);

    const api = useContext(ApiContext);

    const { handleError } = useContext(ErrorHandlerContext);

    const [loadingState, setLoadingState] = useState<TFetchState>(fetchStateStatus.IDLE);

    const [pageState, setPageState, setPageNumber] = useListingPagination({
        number: 1,
        size: 10,
        total: 1000,
    });

    const paginationStartIndex = pageState.number * pageState.size - pageState.size;
    const paginationEndIndex = paginationStartIndex + pageState.size;
    const paginatedList = list.slice(paginationStartIndex, paginationEndIndex);

    const fetchMainTable = async () => {
        try {
            const result = await api.file.readFile(filepath);
            setList(prepareList(result.data));
            setPageState({ total: result.data.length });
        } catch (e) {
            handleError(e);
        } finally {
            setLoadingState(fetchStateStatus.IDLE);
        }
    };

    const updateList = async (rowId: string, col: number, text: string) => {
        console.log(rowId, col, text);
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

    useEffect(() => {
        fetchMainTable().finally();
    }, []);
    return <Page>
        <MainListContext.Provider value={{
            list,
            updateList,
            setColEditData: handleSetEditData,
        }}>
            <Page.Pagination>
                <Pagination currentPageNumber={pageState.number} size={pageState.size} total={pageState.total} onChange={setPageNumber}/>
            </Page.Pagination>
            <Page.List>
                <List
                    list={paginatedList}
                    setColEditData={handleSetEditData}
                    activeRowId={editData?.rowId || null}
                />
            </Page.List>
            <Page.Pagination>
                <Pagination currentPageNumber={pageState.number} size={pageState.size} total={pageState.total} onChange={setPageNumber}/>
            </Page.Pagination>
        </MainListContext.Provider>
    </Page>;
};
