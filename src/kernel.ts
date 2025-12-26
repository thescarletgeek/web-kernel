import ProgramHandler from "./ProgramHandler";
import { IKernelProgram, IEventMap, IEventHandler, IUnsubscribeEvent } from "./types/IKernel";
import KernelEvents from "./KernelEvents";

class Kernel {
    programHandler;
    eventHandler;
    
    constructor() {
        this.programHandler = new ProgramHandler();
        this.eventHandler = new KernelEvents();
    }

    registerPrograms(programs: IKernelProgram) {
        if(Object.keys(programs).length) {
            Object.keys(programs).forEach(key => {
                this.programHandler.addProgram(key, programs[key]);
            })
        }
    }

    start(programName: string) {
        this.programHandler.startProgram(programName);
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
}

export default Kernel;
