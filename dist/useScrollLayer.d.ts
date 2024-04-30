import { MutableRefObject } from "react";
export declare const useScrollLayer: (id: string, { onScreen }?: ({
    onScreen: boolean;
} | undefined)) => {
    currentFrame: number;
    percent: number;
    prevFrame: number;
    visible: boolean;
};
export declare const useLayerScrollSubscriber: () => {
    subscribe: (id: string, ref: MutableRefObject<HTMLDivElement | null>) => () => void;
};
