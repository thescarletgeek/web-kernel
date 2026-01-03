import ProgramHandler from "./ProgramHandler";
import { IKernelProgram, IEventMap, IEventHandler, IUnsubscribeEvent, IKernelRequest, KernelState } from "./types/IKernel";
import KernelEvents from "./KernelEvents";
import RequestHandler from "./RequestHandler";

class Kernel {
    programHandler;
    eventHandler;
    requestHandler;
    state: KernelState;
    bootHandlers: any[];
    
    constructor() {
        this.programHandler = new ProgramHandler();
        this.eventHandler = new KernelEvents();
        this.requestHandler = new RequestHandler();
        this.state = KernelState.CREATED;
        this.bootHandlers = [];
    }

    onBoot(callback: any) {
        if(this.state == KernelState.BOOTED) {
            callback(this);
            return;
        }

        this.bootHandlers.push(callback);
    }

    boot() {
        if(this.state !== KernelState.CREATED) {
            return;
        }

        this.state = KernelState.BOOTING;

        for(const handler of this.bootHandlers) {
            handler(this);
        }

        this.bootHandlers.length = 0;
        this.state = KernelState.BOOTED;
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

    metrics() {
        const data: any = {};

        data["programs"] = this.programHandler.getAllProgramStatus();

        console.log(data);
    }
}

export default Kernel;
