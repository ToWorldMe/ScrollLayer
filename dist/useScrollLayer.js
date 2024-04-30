"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLayerScrollSubscriber = exports.useScrollLayer = void 0;
const react_1 = require("react");
const list = {};
const isElementInScreen = (rect) => rect && rect.top <= window.innerHeight && rect.top + rect.height >= 0;
const isElementOnStartScreen = (rect) => rect && rect.top <= 0 && rect.top + rect.height >= 0;
const initialState = { prevFrame: -1, frame: -1, percent: 0, visible: false };
const useScrollLayer = (id, { onScreen } = { onScreen: false }) => {
    const [state, dispatch] = (0, react_1.useReducer)((state, { percent, frame, visible }) => {
        return {
            percent,
            frame,
            prevFrame: state.frame,
            visible: visible
        };
    }, initialState);
    (0, react_1.useEffect)(() => {
        const onScrollAction = () => {
            var _a;
            if (!list[id]) {
                return;
            }
            const top = window.scrollY;
            const element = (_a = list[id]) === null || _a === void 0 ? void 0 : _a.current;
            if (!element) {
                return;
            }
            const rect = element.getBoundingClientRect();
            if (onScreen && isElementInScreen(rect)) {
                const childRect = element.children[0].getBoundingClientRect();
                if (childRect) {
                    const position = Math.floor(Math.abs(window.innerHeight - rect.top) / childRect.height);
                    const percent = ((Math.abs(window.innerHeight - rect.top) -
                        position * childRect.height) *
                        100) /
                        childRect.height;
                    dispatch({
                        frame: position,
                        percent,
                        visible: rect.top < window.innerHeight
                    });
                    return;
                }
            }
            if (!onScreen && isElementOnStartScreen(rect)) {
                const childRect = element.children[0].getBoundingClientRect();
                if (childRect) {
                    const position = Math.floor(Math.abs(rect.top) / childRect.height);
                    const percent = ((Math.abs(rect.top) - position * childRect.height) * 100) /
                        childRect.height;
                    dispatch({
                        frame: position,
                        percent,
                        visible: rect.top < window.innerHeight
                    });
                    return;
                }
            }
            dispatch({
                frame: -1,
                percent: 0,
                visible: rect.top < window.innerHeight
            });
        };
        document.addEventListener('scroll', onScrollAction, true);
        return () => {
            document.removeEventListener('scroll', onScrollAction, true);
        };
    }, [onScreen, id]);
    return {
        currentFrame: state.frame,
        percent: state.percent,
        prevFrame: state.prevFrame,
        visible: state.visible,
    };
};
exports.useScrollLayer = useScrollLayer;
const useLayerScrollSubscriber = () => {
    const subscribe = (id, ref) => {
        if (list[id]) {
            throw new Error(`element with this id ("${id}") exists`);
        }
        list[id] = ref;
        return () => {
            delete list[id];
        };
    };
    return {
        subscribe
    };
};
exports.useLayerScrollSubscriber = useLayerScrollSubscriber;
