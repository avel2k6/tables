import React from 'react';

export type TErrorBoundaryProps = {
    children: React.ReactNode,
};

export type TErrorBoundaryState = {
    hasError: boolean,
    message: string,
};
