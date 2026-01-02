import { IKernelProgram } from "./types/IKernel";
import { logger, LoggerLevel } from "./utils";

class ProgramHandler {
    programs: IKernelProgram = {};

    constructor() {
        //
    }

    addProgram(key: string, program: any) {
        this.programs[key] = new program();
    }

    startProgram(key: string, args: any = null) {
        if(!this.programs[key]) {
            logger(LoggerLevel.WARNING, "Program not found.");
            return;
        }

        if(typeof this.programs[key].onStart !== "function") {
            logger(LoggerLevel.ERROR, "onStart method is not defined in the program.");
            return;
        }

        this.programs[key].onStart(args);
    }

    endProgram(key: string) {
        if(!this.programs[key]) {
            logger(LoggerLevel.WARNING, "Program not found.");
            return;
        }

        if(typeof this.programs[key].onDestroy !== "function") {
            logger(LoggerLevel.ERROR, "onDestroy method is not defined in the program.");
            return;
        }

        this.programs[key].onDestroy();
    }
}

export default ProgramHandler;
