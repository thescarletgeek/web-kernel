import ProgramHandler from "./ProgramHandler";
import { IKernelProgram, IEventMap, IEventHandler, IUnsubscribeEvent, IKernelRequest } from "./types/IKernel";
import KernelEvents from "./KernelEvents";
import RequestHandler from "./RequestHandler";
declare class Kernel {
    programHandler: ProgramHandler;
    eventHandler: KernelEvents;
    requestHandler: RequestHandler;
    constructor();
    registerPrograms(programs: IKernelProgram): void;
    start(programName: string, args?: any): void;
    destroy(programName: string): void;
    emit<K extends keyof IEventMap>(type: K, detail?: IEventMap[K]): void;
    on<K extends keyof IEventMap>(type: K, handler: IEventHandler<IEventMap[K]>, options?: AddEventListenerOptions): IUnsubscribeEvent;
    once<K extends keyof IEventMap>(type: K, handler: IEventHandler<IEventMap[K]>): void;
    registerRequests(requests: IKernelRequest): void;
    send(key: string): void;
}
export default Kernel;
