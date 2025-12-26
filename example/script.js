import { Kernel } from "/dist/index.js";

window.kernel = new Kernel();

class MyProgram {
    onStart() {
        console.log("My Program is started");
    }

    onDestroy() {
        console.log("My Program is destroyed");
    }
}

window.kernel.registerPrograms({
    "my-program": MyProgram
});

window.kernel.start("my-program");

document.getElementById("link-button").addEventListener("click", () => window.kernel.destroy("my-program"));

window.kernel.once("kernel:test", (e) => {
    console.log("Kernel test event fired :: ", e.detail);
});

document.getElementById("second-link-button").addEventListener("click", () => {
    window.kernel.emit("kernel:test", {
        name: "Naruto Uzumaki",
        age: 18,
        residence: "Konoha village"
    });
});
