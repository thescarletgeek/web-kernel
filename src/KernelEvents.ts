import { IEventMap, IEventHandler, IUnsubscribeEvent } from "./types/IKernel";

class KernelEvents extends EventTarget {
    on<K extends keyof IEventMap>(
        type: K,
        handler: IEventHandler<IEventMap[K]>,
        options?: AddEventListenerOptions
    ): IUnsubscribeEvent {
        this.addEventListener(type, handler, options);

        return () => this.off(type, handler);
    }

    once<K extends keyof IEventMap>(
        type: K,
        handler: IEventHandler<IEventMap[K]>
    ) {
        this.addEventListener(type, handler, {
            once: true
        });
    }

    off<K extends keyof IEventMap>(
        type: K,
        handler: IEventHandler<IEventMap[K]>
    ) {
        this.removeEventListener(type, handler);
    }

    emit<K extends keyof IEventMap>(
        type: K,
        detail: IEventMap[K] = {}
    ) {
        return this.dispatchEvent(new CustomEvent(type, { detail }));
    }

    destroy() {
        // this.replaceWith?.(null);
    }
}

export default KernelEvents;
