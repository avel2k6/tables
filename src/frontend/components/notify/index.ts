import { publish } from './eventManager';
import { DEFAULT_AUTO_CLOSE_DELAY_MS, Theme } from './constants';
import { TTextData } from './interfaces';
import { isTextData } from '../../utils';

/**
 * Вызов нужной публикации согласно переданной теме.
 * @param theme - выбранная тема.
 *
 * @return - функцию для публикации нотификации.
 */
const publishByTheme = (theme: Theme) => (
    textData: TTextData | string,
    autoCloseDelayMs: number = DEFAULT_AUTO_CLOSE_DELAY_MS,
) => {
    const data = isTextData(textData)
        // Если пришли комплексные данные, то смотрим, какие текст и код сообщения.
        ? { text: textData.text, autoCloseDelayMs, code: textData.code }
        // В противном случае просто передаем текст сообщения.
        : { text: textData, autoCloseDelayMs, code: null };

    publish(theme, data);
};

/**
 * Объект с функциями для генерации уведомления (успех, предупреждение и ошибка).
 * Каждая ф-ия принимает текст (или текст и код) для уведомления
 * и необязательный параметр времени показа.
 *
 * Сохраняем обратную совместимость, когда можно передать текст первым аргументом.
 */
export const notify = {
    success: publishByTheme(Theme.Success),

    warning: publishByTheme(Theme.Warning),

    error: publishByTheme(Theme.Error),
};
