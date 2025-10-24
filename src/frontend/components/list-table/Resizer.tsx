import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { Icons } from '../icons';

import { classes, texts } from './constants';
import { TResizerProps } from './interfaces';

/**
 * Иконка для изменения ширины ячейки таблицы. Должна быть установлена как дочерний элемент Th таблицы.
 * @component
 */
export const Resizer = ({ resizerPosition, onChange, dataTestId }: TResizerProps) => {
    const [isMouseCaptured, setIsMouseCaptured] = useState(false);

    const element = useRef<HTMLDivElement>(null);

    /**
     * Фиксируем момент зажатия кнопки мыши.
     * После этого начнем следить за курсором мыши.
     * @param event - событие клика мыши
     */
    const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setIsMouseCaptured(true);
    };

    /**
     * Двойной клик сбрасывает к начальному состоянию.
     */
    const handleMouseDoubleClick = () => onChange(null);

    /**
     * По движению курсора рассчитываем новую ширину ячейки.
     * За ячейку таблицы принимаем родительский элемент компонента.
     * @param event - событие движения мыши
     */
    const mouseMoveListener = (event: MouseEvent) => {
        if (!isMouseCaptured || !resizerPosition) {
            return;
        }

        const width = resizerPosition === 'right'
            ? event.x - element.current.parentElement.getBoundingClientRect().left
            : element.current.parentElement.getBoundingClientRect().right - event.x;

        onChange(width);
    };

    /**
     * Фиксируем момент, когда кнопку мыши отпустили.
     * После этого прекратим следить за курсором.
     */
    const mouseUpListener = () => setIsMouseCaptured(false);

    useEffect(() => {
        window.addEventListener('mousemove', mouseMoveListener);
        window.addEventListener('mouseup', mouseUpListener);

        return () => {
            window.removeEventListener('mousemove', mouseMoveListener);
            window.removeEventListener('mouseup', mouseUpListener);
        };
    }, [
        isMouseCaptured,
        resizerPosition,
    ]);

    return <div
        title={texts.resizer}
        ref={element}
        className={classNames({
            [classes.resizer]: true,
            [classes.resizerLeft]: resizerPosition === 'left',
            [classes.resizerRight]: resizerPosition === 'right',
        })}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleMouseDoubleClick}
        data-testid={dataTestId}
    >
        <Icons.Expand color='gray'/>
    </div>;
};
