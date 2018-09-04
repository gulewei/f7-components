declare type ScrollerSize = {
    maxTranslate: number;
    minTranslate: number;
};
declare type ScrollerState = {
    isTouched: boolean;
    isMoved: boolean;
    startY: number;
    startTranslate: number;
    startTime: number;
    currentY: number;
    currentTranslate: number;
    currentTime: number;
    velocityTranslate: number;
};
declare type ScrollerCallback = (translate: number, isMoved: boolean) => void;
/**
 * Scroll Behaiver
 */
export default class BaseScroller {
    __initialized: boolean;
    state: ScrollerState;
    size: ScrollerSize;
    _callback: ScrollerCallback;
    initializeState(currentTranslate: number): void;
    /**
     * @param maxTranslate - Translate value when scroll content on the top
     * @param minTranslate - Translate value when content on the bottom
     */
    setSize(maxTranslate: number, minTranslate: number): void;
    /**
     * @param {number} finalTranslate
     */
    updateTranslate(finalTranslate: number): void;
    /**
     * @param callback - publish translate to render
     */
    setCallback(callback: ScrollerCallback): void;
    onTouchStart(touches: Touch[], startTime: number): void;
    onTouchMove(touches: Touch[], currentTime: number): void;
    onTouchEnd(touches: Touch[], endTime: number): void;
    _setState(nextState: Partial<ScrollerState>): void;
    _publish(translate: any, isMoved: any): void;
    _normalize(translate: number): number;
    _accelerate(endTime: number): number;
}
