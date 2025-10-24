import { createContext } from 'react';

import { TErrorHandlerContext } from './interfaces';

export const ErrorHandlerContext = createContext<TErrorHandlerContext>({
    handleError: () => {},
});
