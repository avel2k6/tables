import { createContext } from 'react';

import { api } from '../../application/api';

/**
 * Контекст для передачи API функций
 */
export const ApiContext = createContext(api);
