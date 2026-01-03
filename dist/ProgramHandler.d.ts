import { ProgramState } from "./types/IKernel";
declare class ProgramHandler {
    private programs;
    private programState;
    constructor();
    addProgram(key: string, program: any): void;
    startProgram(key: string, args?: any): void;
    endProgram(key: string): void;
    getProgramsByState(programState: ProgramState): any;
    getAllProgramStatus(): Map<any, any>;
}
export default ProgramHandler;
