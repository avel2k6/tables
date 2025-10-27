import React from 'react';
import { Button } from '../button';

import { texts } from './constants';
import { TConfirmProps } from './interfaces';

import { ModalPortal } from './index';
import { Modal } from './Modal';

import './index.less';

/**
 * Модальное окно с кнопками отмены и подтверждения
 * @param props
 * @constructor
 */
export const ConfirmModal = (props: TConfirmProps) => <ModalPortal isShow={props.isShow} onHide={props.onHide}>
    {props.isShow
        ? <>
            <Modal.Header hasCloseButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={props.bodyClassname}>
                {props.body}
            </Modal.Body>
            <Modal.Footer align='right'>
                <Button
                    autoFocus
                    title={props.confirm}
                    variant='confirm'
                    disabled={props.isDisabledConfirmButton}
                    onClick={props.onConfirm}>
                    {props.confirm}
                </Button>
                <Button
                    title={props.cancel}
                    variant='secondary'
                    onClick={props.onHide}>
                    {props.cancel}
                </Button>
            </Modal.Footer>
        </>
        : null
    }
</ModalPortal>;

ConfirmModal.defaultProps = {
    confirm: texts.confirm,
    cancel: texts.cancel,
    isDisabledConfirmButton: false,
};
