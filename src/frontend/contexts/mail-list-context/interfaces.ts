import { TCommonListContext } from '../common-listing/interfaces';
import { TRow } from '../../domains/Row';

export type TMainListContext = TCommonListContext<TRow[], never, never>;
