export declare enum LoggerLevel {
    LOG = "LOG :: ",
    ERROR = "ERROR :: ",
    WARNING = "WARNING :: "
}
export declare function logger(level: LoggerLevel, message: any, data?: any): void;
