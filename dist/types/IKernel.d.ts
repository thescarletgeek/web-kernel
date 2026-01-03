export interface IKernelProgram {
    [key: string]: any;
}
export type IEventMap = Record<string, any>;
export type IEventHandler<T = unknown> = (event: Event) => void;
export type IUnsubscribeEvent = () => void;
export interface IKernelRequest {
    [key: string]: any;
}
export declare enum KernelState {
    CREATED = "CREATED",
    BOOTING = "BOOTING",
    BOOTED = "BOOTED"
}
export declare enum ProgramState {
    IDLE = "IDLE",
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
    ERROR = "ERROR"
}
export interface IKernelProgramInstance {
    onStart: () => void;
    onDestroy: () => void;
}
export interface IKernelProgramConstructor {
    new (): IKernelProgramInstance;
}
