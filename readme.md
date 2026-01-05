# Web Kernel
Web Kernel is an experimental runtime layer inspired by the core concepts of operating system kernels. While it is not a real kernel, it is designed to feel like one, focusing on structure, control and clarity without relying on shiny frameworks.

The idea originated while I am studying how OS kernels manage processes, states and system coordination.

As applications grow, scripting often becomes duplicated, tightly coupled, and hard to reason about. Web kernel explores whether a central control layer can manage programs, events and requests in a structured and predictable manner, while keeping the system minimal and extensible.

## Philosophy
- Structure programs, events, and requests without relying on frameworks.
- Enable scripting using Javascript/Typescript.
- Reduce duplication in execution and orchestration logic.
- Follow lifecycle-based design for programs and requests.

## What web kernel is (and isn't)
### What it is
- A runtime coordination layer.
- A structured way to manage programs.
- A state-aware execution controller.
- A foundation for custom architecture.

### What it is not
- A web framework.
- A replacement for React, Vue, Express, etc.
- A dependency-heavy abstraction layer.
- A magic solution for bad architecture.

---
## Quickstart
To install web kernel, either install through npm or directly incldue the script.

Install through **npm** :
```
npm install @thescarletgeek/web-kernel
```

To initialize the kernel :

```js
import { Kernel } from "@thescarletgeek/web-kernel";

// Initialize the kernel
window.kernel = new Kernel();

// Run programs on boot
window.kernel.onBoot((k) => {
    k.start("program-name");
});

// Run boot() method to boot the kernel
document.addEventListener("DOMContentLoaded", () => {
    window.kernel.boot();
});
```

---
## Programs
Programs are first-class execution units, similar to processes in an OS.

**Each Program :**
- Has a defined lifecycle.
- Can be executed, tracked and observed.
- Exists independently of framework logic.

To create and initialize programs :

```js
export default class MyProgram {
    onStart(args) {
        console.log("My Program is started :: ", args);
    }

    onDestroy() {
        console.log("My Program is destroyed");
    }
}
```

```js
// Register programs by passing program object and a name.
window.kernel.registerPrograms({
    "program-name": MyProgram
});
```

Run programs from kernel :

```js
// Run program using kernel
// Arguments can be passed in start() method.
// Arguments are optional
window.kernel.start("program-name", {})
```
Run programs on kernel startup :

```js
// Run programs on startup using onBoot() method
window.kernel.onBoot((k) => {
    k.start("program--name");
});
```

---

## Events

- Events represent signals within the system.
- Used to communicate between programs without tight coupling.
- Help reduce duplication in cross-program communication.

Fire events from kernel :
```js
// Fire events using kernel
window.kernel.emit("kernel:test", {
    name: "Naruto Uzumaki",
    age: 18,
    residence: "Konoha village"
});
```

To listen to events from kernel :
```js
// Add event listener
const listener = window.kernel.on("kernel:test", (e) => {
    console.log("Kernel test event fired :: ", e.detail);
});

// Remove the defined listener
listener();

// To listen to event only once
window.kernel.once("kernel:test", (e) => {
    console.log("Kernel test event fired :: ", e.detail);
});
```

---

## Request
Requests can be used for API calls.

**Request Types** :

- GET
- POST
- PUT
- PATCH
- DELETE

Create Request :

```js
import { Request } from "/dist/index.js";

export default class GetPosts extends Request {
    get url() {
        return "https://jsonplaceholder.typicode.com/posts";
    }

    get method() {
        return "GET";
    }

    get headers() {
        // Headers can be defined here
        return {}
    }

    get payload() {
        // Request payload can be defined here
        return {}
    }
    
    onProcessing() {
        // Runs while request is running
        console.log("Get posts is processing");
    }

    onSuccess(response) {
        // When request is succeeded
        console.log("Get posts is success :: ", response);
    }

    onError(error) {
        // When request is error
        console.error("Get Posts is error :: ", error);
    }
}

```

Register request on kernel :

```js
window.kernel.registerRequest({
    "get-posts": GetPosts
});
```

Run request using kernel :

```js
window.kernel.send("get-posts");
```

---

## Contributing

Web kernel is an experimental project. Contributions are welcome for experimentation, improvements, and exploration of ideas.

1. Fork the repository
2. Create a new branch from **develop**.
3. Make your changes with clear, focused commits.
4. Ensure existing functionality is not broken.
5. Submit a pull request to the **develop** branch.
6. Describe what has changed and why.

---
## License

[MIT License](https://opensource.org/license/MIT)
