import { createContext } from 'react';
import { TConfig } from './interfaces';

export const ConfigContext = createContext<TConfig>(null);
