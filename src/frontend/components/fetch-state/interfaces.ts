import { fetchStateStatus } from './index';

/**
 * Состояние загрузки листинга
 */
export type TFetchState = typeof fetchStateStatus[keyof typeof fetchStateStatus];
