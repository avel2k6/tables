import './index.less';

import classNames from 'classnames';
import React from 'react';

import { classes, directions } from './constants';
import { TFormGroupProps, TFormGroupTextProps } from './interfaces';

/**
 * Компонент для оформления отдельного поля формы. Включает вёрстку для лейбла, поля и ошибки поля.
 * @component
 */
const FormGroup = ({
    className, flow, disabled, label, comment, required, error, dataTestId, children,
}: TFormGroupProps) => <div
    className={classNames({
        [classes.component]: true,
        [className]: !!className,
        [classes.columnFlow]: flow === directions.COLUMN,
        [classes.disabled]: disabled,
    })}
    data-testid={dataTestId}>
    {label
        ? <div className={classNames({
            [classes.label]: true,
            [classes.labelColumn]: flow === directions.COLUMN,
            [classes.labelRequired]: required,
        })}>
            {label}
        </div>
        : null}
    <div className={classes.content}>
        {children}
        {comment ? <div className={classes.comment}>{comment}</div> : null}
        {error ? <div className={classes.error}>{error}</div> : null}
    </div>
</div>;

/**
 * Текст справа от лейбла
 * @component
 */
const Text = ({ dataTestId, children }: TFormGroupTextProps) => <div
    className={classes.text}
    data-testid={dataTestId}>
    {children}
</div>;

const defaultProps: Partial<TFormGroupProps> = {
    flow: directions.ROW,
    disabled: false,
    required: false,
};

FormGroup.defaultProps = defaultProps;

FormGroup.Text = Text;

export { FormGroup };
