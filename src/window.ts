// Объявление амбиентного модуля для глобальных интерфейсов
import { api } from './preload';

declare global {
    interface Window {
        api: typeof api,
    }
}
// Необходимо экспортировать что-то, чтобы TypeScript воспринял этот файл как внешний модуль
export {};
