import { useContext, useEffect, useState } from 'react';
import { DataGrid } from '../data-grid';
import { ErrorHandlerContext } from '../../contexts/error-handler';
import { ApiContext } from '../../contexts/api';
import { TConfig } from '../../contexts/config/interfaces';
import { ConfigContext } from '../../contexts/config';
import { Titlebar } from '../titlebar';
import { defaultColConfig } from '../../contexts/config/constants';

export const PageMain = () => {
    const api = useContext(ApiContext);

    const { handleError } = useContext(ErrorHandlerContext);

    const [config, setConfig] = useState<TConfig>(null);

    const fetchConfig = async () => {
        try {
            const result = await api.file.readFile('./data/example.json');
            setConfig(JSON.parse(result.data));
        } catch (e) {
            handleError(e);
        }
    };

    const getColConfig = (colIndex: number) => {
        if (!colIndex) {
            return null;
        }

        const colConfig = config.cols[colIndex] || {};
        return {
            ...defaultColConfig,
            ...colConfig,
        };
    };

    useEffect(() => {
        fetchConfig().finally();
    }, []);

    return <ConfigContext.Provider value={{
        ...config,
        getColConfig,
    }}>
        <Titlebar/>
        {config
            ? <DataGrid filepath={config.filepath}/>
            : null}
    </ConfigContext.Provider>;
};
