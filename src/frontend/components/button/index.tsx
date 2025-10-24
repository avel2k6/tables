import './index.less';

import classNames from 'classnames';
import React from 'react';

import { classes } from './constants';
import { TButtonProps } from './interfaces';

/**
 * Компонет кнопки, который может быть как кнопкой, так и ссылкой
 * @component
 */
export const Button = (props: TButtonProps) => {
    const componentClass = classNames({
        [classes.component]: true,
        [classes.primary]: props.variant === 'primary',
        [classes.secondary]: props.variant === 'secondary',
        [classes.confirm]: props.variant === 'confirm',
        [classes.danger]: props.variant === 'danger',
        [classes.transparent]: props.variant === 'transparent',
        [classes.link]: props.variant === 'link',
        [classes.info]: props.variant === 'info',
        [classes.disabled]: props.disabled,
        [classes.smallPadding]: props.padding === 'small',
        [classes.fullWidth]: props.width === 'full',
        [props.className]: !!props.className,
    });

    return 'href' in props
        ? <a
            className={componentClass}
            href={props.href}
            target={props.target || '_self'}
            title={props.title}
            autoFocus={props.autoFocus}
            data-testid={props.dataTestId}>
            {props.children ? props.children : null}
        </a>
        : <button
            className={componentClass}
            type={props.type || 'button'}
            title={props.title}
            onClick={props.onClick}
            disabled={props.disabled}
            autoFocus={props.autoFocus}
            data-testid={props.dataTestId}>
            {props.children ? props.children : null}
        </button>;
};

const defaultProps: Partial<TButtonProps> = {
    disabled: false,
    onClick: () => {},
    variant: 'primary',
    padding: 'default',
    width: 'default',
};

Button.defaultProps = defaultProps;
