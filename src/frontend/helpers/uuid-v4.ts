/**
 * Получение псевдослучайного целого числа.
 * @param max - максимальное значение.
 */
const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

/**
 * Генерация UUID своими руками.
 */
export const generateUUID4 = ():string => {
    const alphabet = 'abcdef0123456789';
    return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () => alphabet[getRandomInt(alphabet.length)]);
};
/**
 * Генерация UUIDv4.
 *
 * Судя по спеке https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
 * актуальный `crypto.randomUUID` генерирует UUID 4й версии. Именно он нам и нужен.
 *
 * Если не поддерживается `window.crypto`, то пользуемся костылем в виде generateUUID4.
 */
export const uuidv4 = () => {
    if (window.crypto && window.crypto.randomUUID) {
        return window.crypto.randomUUID();
    }
    return generateUUID4();
};
