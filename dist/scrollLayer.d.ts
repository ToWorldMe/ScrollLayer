import React, { PropsWithChildren } from 'react';
export interface ScrollLayerProps extends PropsWithChildren<any> {
    frames: number;
    id: string;
    className?: string;
    noSticky?: boolean;
}
export declare const ScrollLayer: ({ children, frames, id, className, noSticky }: ScrollLayerProps) => React.JSX.Element;
