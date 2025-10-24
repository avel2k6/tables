import { fetchStateStatus } from './constants';

/**
 * Тип состояния загрузки
 */
export type TFetchState = typeof fetchStateStatus[keyof typeof fetchStateStatus];

/**
 * Тип пропсов компонента
 */
export type TLoaderProps = {
    type: TFetchState,
    size: 'normal' | 'small',
    dataTestId?: string,
};
