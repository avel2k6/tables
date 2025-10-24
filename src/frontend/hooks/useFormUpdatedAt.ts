import { useState } from 'react';

/**
 * Хук для обновления последнего времени обновления формы.
 */
export const useFormUpdatedAt = () => {
    // Время последнего обновления формы.
    const [formUpdatedAt, setFormUpdatedAt] = useState<string>(null);

    /**
     * Обновляем время, когда форма была обновлена.
     */
    const refreshFormUpdatedAt = () => setFormUpdatedAt((new Date()).toISOString());

    return {
        // Время последнего обновления формы.
        formUpdatedAt,

        // Обновление времени последнего обновления.
        refreshFormUpdatedAt,
    };
};
