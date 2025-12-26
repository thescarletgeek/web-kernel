import { IEventMap, IEventHandler, IUnsubscribeEvent } from "./types/IKernel";
declare class KernelEvents extends EventTarget {
    on<K extends keyof IEventMap>(type: K, handler: IEventHandler<IEventMap[K]>, options?: AddEventListenerOptions): IUnsubscribeEvent;
    once<K extends keyof IEventMap>(type: K, handler: IEventHandler<IEventMap[K]>): void;
    off<K extends keyof IEventMap>(type: K, handler: IEventHandler<IEventMap[K]>): void;
    emit<K extends keyof IEventMap>(type: K, detail?: IEventMap[K]): boolean;
    destroy(): void;
}
export default KernelEvents;
