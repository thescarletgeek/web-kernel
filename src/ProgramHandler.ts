import { ProgramState } from "./types/IKernel";
import { logger, LoggerLevel } from "./utils";

class ProgramHandler {
    private programs = new Map();
    private programState = new Map();

    constructor() {
        //
    }

    addProgram(key: string, program: any) {
        if(this.programs.has(key)) {
            logger(LoggerLevel.WARNING, `Program ${key} already exists.`);
            return;
        }

        this.programs.set(key, new program());
        this.programState.set(key, ProgramState.IDLE);
    }

    startProgram(key: string, args: any = null) {
        const program = this.programs.get(key);
        if(!program) {
            logger(LoggerLevel.WARNING, `Program ${key} not found.`);
            return;
        }

        const status = this.programState.get(key);
        if(status === ProgramState.RUNNING) {
            logger(LoggerLevel.WARNING, `Program ${key} is already running.`);
            return;
        }

        if(typeof program.onStart !== "function") {
            logger(LoggerLevel.ERROR, `onStart method is not defined in the program ${key}.`);
            return;
        }

        try {
            program.onStart(args);
            this.programState.set(key, ProgramState.RUNNING);
        } catch(error) {
            this.programState.set(key, ProgramState.ERROR);
            logger(LoggerLevel.ERROR, `Error occured in program ${key} - `, error);
        }
    }

    endProgram(key: string) {
        const program = this.programs.get(key);
        if(!program) {
            logger(LoggerLevel.WARNING, `Program ${key} not found.`);
            return;
        }

        if(this.programState.get(key) !== ProgramState.RUNNING) {
            logger(LoggerLevel.WARNING, `Program ${key} is not running.`);
            return;
        }

        if(typeof program.onDestroy !== "function") {
            logger(LoggerLevel.ERROR, `onDestroy method is not defined in the program ${key}.`);
            return;
        }
        
        try {
            program.onDestroy();
            this.programState.set(key, ProgramState.STOPPED);
        } catch(error) {
            this.programState.set(key, ProgramState.ERROR);
            logger(LoggerLevel.ERROR, `Error occured in program ${key} - `, error);
        }
    }

    getProgramsByState(programState: ProgramState) {
        const status: any = {};

        for(const [key, state] of this.programState) {
            if(state === programState) {
                status[key] = state;
            }
        }

        return status;
    }

    getAllProgramStatus() {
        return this.programState;
    }
}

export default ProgramHandler;
