export interface IKernelProgram {
    [key: string]: any;
}
export type IEventMap = Record<string, any>;
export type IEventHandler<T = unknown> = (event: Event) => void;
export type IUnsubscribeEvent = () => void;
