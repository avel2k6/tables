import React from 'react';

import { ErrorBoundary } from '../error-boundary';

import { Body } from './Body';
import { Dialog } from './Dialog';
import { Footer } from './Footer';
import { Header } from './Header';
import { Title } from './Title';
import { Wrapper } from './Wrapper';
import { classes } from './constants';
import { ModalComponent } from './interfaces';

/**
 * Родитель для подкомпонентов модального окна
 * @component
 */
export const Modal: ModalComponent = ({ dataTestId, children }) => <div
    className={classes.component}
    data-testid={dataTestId}>
    <ErrorBoundary>
        {children}
    </ErrorBoundary>
</div>;

Modal.Wrapper = Wrapper;
Modal.Dialog = Dialog;
Modal.Body = Body;
Modal.Header = Header;
Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;
