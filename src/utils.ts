export enum LoggerLevel {
    LOG = "LOG :: ",
    ERROR = "ERROR :: ",
    WARNING = "WARNING :: "
}

export function logger(level: LoggerLevel, message: any, data: any = undefined) {
    if(level == LoggerLevel.ERROR) {
        console.error(LoggerLevel.ERROR, message, data);
    } else if(level == LoggerLevel.WARNING) {
        console.warn(LoggerLevel.WARNING, message, data);
    } else {
        console.log(LoggerLevel.LOG, message, data);
    }
}
