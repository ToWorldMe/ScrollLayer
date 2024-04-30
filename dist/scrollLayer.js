"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollLayer = void 0;
const react_1 = __importStar(require("react"));
const useScrollLayer_1 = require("./useScrollLayer");
const ScrollClass = 'scroll-layer-sticky';
const ScrollLayer = ({ children, frames = 1, id, className = '', noSticky = false }) => {
    const [height, setHeight] = (0, react_1.useState)(0);
    const ref = (0, react_1.useRef)(null);
    const { subscribe } = (0, useScrollLayer_1.useLayerScrollSubscriber)();
    (0, react_1.useEffect)(() => {
        const unsubscribe = subscribe(id, ref);
        return () => {
            unsubscribe();
        };
    }, []);
    (0, react_1.useEffect)(() => {
        const resize = () => {
            var _a, _b, _c, _d;
            if ((ref === null || ref === void 0 ? void 0 : ref.current) && ((_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.length)) {
                if (!noSticky && ((_c = ref.current) === null || _c === void 0 ? void 0 : _c.children[0].classList.contains(ScrollClass))) {
                    (_d = ref.current) === null || _d === void 0 ? void 0 : _d.children[0].classList.add(ScrollClass);
                }
                const rect = ref.current.children[0].getBoundingClientRect();
                setHeight(rect.height * frames);
            }
        };
        window.addEventListener('resize', resize);
        window.addEventListener('orientationchange', resize);
        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('orientationchange', resize);
        };
    }, [frames]);
    return (react_1.default.createElement("div", { id: id, style: { height }, className: className, ref: ref }, children));
};
exports.ScrollLayer = ScrollLayer;
