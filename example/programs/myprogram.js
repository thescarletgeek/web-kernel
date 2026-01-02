export default class MyProgram {
    onStart(args) {
        console.log("My Program is started :: ", args);
    }

    onDestroy() {
        console.log("My Program is destroyed");
    }
}
