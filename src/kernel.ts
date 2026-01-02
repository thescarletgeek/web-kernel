import ProgramHandler from "./ProgramHandler";
import { IKernelProgram, IEventMap, IEventHandler, IUnsubscribeEvent, IKernelRequest } from "./types/IKernel";
import KernelEvents from "./KernelEvents";
import RequestHandler from "./RequestHandler";

class Kernel {
    programHandler;
    eventHandler;
    requestHandler;
    
    constructor() {
        this.programHandler = new ProgramHandler();
        this.eventHandler = new KernelEvents();
        this.requestHandler = new RequestHandler();
    }

    registerPrograms(programs: IKernelProgram) {
        if(Object.keys(programs).length) {
            Object.keys(programs).forEach(key => {
                this.programHandler.addProgram(key, programs[key]);
            })
        }
    }

    start(programName: string, args: any = null) {
        this.programHandler.startProgram(programName, args);
    }

    destroy(programName: string) {
        this.programHandler.endProgram(programName);
    }

    emit<K extends keyof IEventMap>(type: K, detail: IEventMap[K] = {}) {
        this.eventHandler.emit(type, detail);
    }

    on<K extends keyof IEventMap>(type: K, handler: IEventHandler<IEventMap[K]>, options?: AddEventListenerOptions) {
        return this.eventHandler.on(type, handler, options);
    }

    once<K extends keyof IEventMap>(type: K, handler: IEventHandler<IEventMap[K]>) {
        this.eventHandler.once(type, handler);
    }

    registerRequests(requests: IKernelRequest) {
        if(Object.keys(requests).length) {
            Object.keys(requests).forEach(key => {
                this.requestHandler.addRequest(key, requests[key]);
            });
        }
    }

    send(key: string) {
        this.requestHandler.startRequest(key);
    }
}

export default Kernel;
