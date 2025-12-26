import ProgramHandler from "./ProgramHandler";
import { IKernelProgram, IEventMap, IEventHandler, IUnsubscribeEvent } from "./types/IKernel";
import KernelEvents from "./KernelEvents";
declare class Kernel {
    programHandler: ProgramHandler;
    eventHandler: KernelEvents;
    constructor();
    registerPrograms(programs: IKernelProgram): void;
    start(programName: string): void;
    destroy(programName: string): void;
    emit<K extends keyof IEventMap>(type: K, detail?: IEventMap[K]): void;
    on<K extends keyof IEventMap>(type: K, handler: IEventHandler<IEventMap[K]>, options?: AddEventListenerOptions): IUnsubscribeEvent;
    once<K extends keyof IEventMap>(type: K, handler: IEventHandler<IEventMap[K]>): void;
}
export default Kernel;
