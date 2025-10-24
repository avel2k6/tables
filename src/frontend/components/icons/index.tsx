import classNames from 'classnames';
import React from 'react';

import { classes } from './constants';
import { TIconsProps, TIconType } from './interfaces';
import './index.less';

/**
 * Компонент отрисовки иконок.
 * Доступны:
 * - Close;
 * - Delete;
 * - Download;
 * - Edit;
 * - Expand;
 * - Eye;
 * - Folder;
 * - Person;
 * - Link;
 * - Reorder;
 * - DocumentHat;
 * - SearchLensChecked;
 * - LightningOrange.
 *
 * @component
 */
const Icons = (type: TIconType) => ({
    className, color, disabled, dataTestId,
}: TIconsProps) => <div
    className={classNames({
        [classes.component]: true,
        [classes[type]]: true,
        [className]: !!className,
        [classes.disabled]: disabled,
        [classes.colorBlack]: color === 'black',
        [classes.colorGray]: color === 'gray',
        [classes.colorBlue]: color === 'blue',
        [classes.colorRed]: color === 'red',
    })}
    data-testid={dataTestId} />;

Icons.Close = Icons('close');
Icons.Delete = Icons('delete');
Icons.Download = Icons('download');
Icons.Edit = Icons('edit');
Icons.Expand = Icons('expand');
Icons.Eye = Icons('eye');
Icons.Folder = Icons('folder');
Icons.Person = Icons('person');
Icons.Link = Icons('link');
Icons.Reorder = Icons('reorder');
Icons.DocumentHat = Icons('documentHat');
Icons.SearchLensChecked = Icons('searchLensChecked');
Icons.LightningOrange = Icons('lightningOrange');

export { Icons };
