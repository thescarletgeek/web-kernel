import { registerPrograms } from "./programs/register.js";
import { registerRequests } from "./requests/register.js";
import { Kernel } from "/dist/index.js";

// Initiate kernel
window.kernel = new Kernel();

// Programs
registerPrograms(window.kernel);

window.kernel.onBoot((k) => {
    k.start("my-program", {
        message: "Kernel is booted.",
    });
})

// window.kernel.start("my-program", {
//     message: "Message is registered."
// });

document.getElementById("link-button").addEventListener("click", () => window.kernel.destroy("my-program"));


// Events
window.kernel.on("kernel:test", (e) => {
    console.log("Kernel test event fired :: ", e.detail);
});

document.getElementById("second-link-button").addEventListener("click", () => {
    window.kernel.emit("kernel:test", {
        name: "Naruto Uzumaki",
        age: 18,
        residence: "Konoha village"
    });
});

// Requests
registerRequests(window.kernel);

document.getElementById("trail-button").addEventListener("click", () => {
    window.kernel.send("getposts");
});

document.getElementById("metrics-button").addEventListener("click", () => {
    window.kernel.metrics();
});

document.addEventListener("DOMContentLoaded", () => {
    window.kernel.boot();
});
