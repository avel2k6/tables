import { useState } from 'react';

export const COMMON_ERROR = 'common';

/**
 * Тип для валидатора поля формы
 * @param value - Значение поля
 * @param fieldsData - Данные о всех полей формы. Необязательный параметр
 */
type TValidator<FieldsData> = (value: any, fieldsData?: Partial<FieldsData>) => Promise<any>;

/**
 * Тип для ошибок полей формы
 */
type FormErrors<FieldsData> = {
    [K in keyof FieldsData]: string | null;
};

/**
 * Валидация полей формы. Пробегаемся по каждому переданному полю с данными своим набором асинхронных валидаторов.
 * На выходе получаем список ошибок в том же формате, в каком храним ошибки формы.
 *
 * @param validationFields - Поля в формате ключ->значение
 * @param validators - Набор валидаторов
 * @returns Промис с объектом ошибок полей, в формате ключ->значение, где ключ - название поля, значение - ошибка поля.
 * Например: {
 *     name: 'Имя не может быть пустым',
 * }
 */
async function validate<FieldsData>(
    validationFields: Partial<FieldsData>,
    validators: { [key in keyof FieldsData]: TValidator<FieldsData> },
): Promise<FormErrors<FieldsData>> {
    // Ключи полей, которые необходимо провалидировать
    const fieldsKeys = Object.keys(validationFields);

    // Набор промисов с валидаторами
    const promises = fieldsKeys.map((key) => validators[key as keyof FieldsData](validationFields[key as keyof FieldsData], validationFields));

    // Результаты валидации
    const results = await Promise.allSettled(promises);

    // Возвращаем ошибки валидации в формате хранения в стейте formErrors.
    // Если нет ошибки, то у поля будет null.
    return results.reduce(
        (acc, result, index) => {
            // Имя поля формы
            const fieldName = fieldsKeys[index];

            return {
                ...acc,
                [fieldName]: result.status === 'fulfilled'
                    ? null
                    : result.reason.message,
            };
        },
        {} as FormErrors<FieldsData>,
    );
}

/**
 * Хук управления состоянием формы.
 * Содержит данные о полях формы и ошибках. Позволяет обновить поля и ошибки.
 * В дополнении включает валидатор ошибок.
 * @param defaultFields - Начальное значение полей формы в формате ключ значение
 * @param validators - Набор валидаторов для полей формы
 */
export function useForm<FieldsData>(
    defaultFields: FieldsData,
    validators: { [key in keyof FieldsData]: TValidator<FieldsData> },
): {
        /**
         * Поля формы
         */
        fields: FieldsData,

        /**
         * Обновление полей формы. Доступно частичное обновление нескольких полей.
         * @param fields - Поля в формате ключ->значение
         */
        setFields: (fields: Partial<FieldsData>) => void,

        /**
         * Ошибки формы
         */
        errors: FormErrors<FieldsData>,

        /**
         * Обновление ошибок формы, доступно частичное обновление полей.
         * @param fields - Поля в формате ключ->значение
         */
        setErrors: (fields: { [key: string]: string | null }) => void,

        /**
         * Проверка, что форма содержит какие-то ошибки кроме COMMON_ERROR
         */
        hasErrors: (errors: FormErrors<FieldsData>) => boolean,

        /**
         * Валидация новых полей формы.
         * @param fields - Поля в формате ключ->значение
         */
        validate: (fields: Partial<FieldsData>) => Promise<FormErrors<FieldsData>>,
    } {
    const [formFields, setFormFields] = useState<FieldsData>(defaultFields);

    // Начальное состояние ошибок. Все ошибки null
    const defaultFormErrors: FormErrors<FieldsData> = Object.keys(defaultFields).reduce(
        (acc, key) => ({ ...acc, [key]: null }),
        { [COMMON_ERROR]: null } as unknown as FormErrors<FieldsData>,
    );

    const [formErrors, setFormErrors] = useState(defaultFormErrors);

    return {
        fields: formFields,

        setFields: (newFields) => setFormFields((fields) => ({ ...fields, ...newFields })),

        errors: formErrors,

        setErrors: (newErrors) => setFormErrors((fields) => ({ ...fields, ...newErrors })),

        hasErrors: (errors) => Object
            .entries(errors)
            .filter(([key, value]) => key !== COMMON_ERROR && value !== null)
            .length > 0,

        validate: (validationFields: Partial<FieldsData>) => validate(validationFields, validators),
    };
}
