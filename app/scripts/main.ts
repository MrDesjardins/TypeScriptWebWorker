import { Algorithm } from "algo";

$(document).ready(() => {
    const $main = $("#main");
    const $btn = $("<button>")
        .attr("id", "btn1")
        .text("Without WebWorker");
    $main.append($btn);
    $btn.click(() => {
        slowFunction();
    });

    const $btn2 = $("<button>")
        .attr("id", "btn2")
        .text("WebWorker");
    $main.append($btn2);
    $btn2.click(() => {
        slowFunctionWebWorker();
    });

    $main.append("<br/>");
    let count = 0;
    setInterval(() => {
        $("#header").html(new Date().toLocaleTimeString());
        if (count === 100) {
            $main.append("<br/>");
            count = 0;
        }
        $main.append(".");
        count++;
    }, 50);
});

// Slow function that hang the main thread
function slowFunction(): void {
    $("#btn1").prop("disabled", true);
    const algo = new Algorithm();
    const result = algo.calculatePrimes(50, 99887766554);
    const $line = $("<p>").append("Result is returned");
    $("#main").append($line);
    $("#btn1").prop("disabled", false);
}

// Slow function that is passed to webworker; doesn't hang the main thread
let worker: Worker;
const callBack = (message: MessageEvent) => {
    if (message.data.command === "done") {
        const result =  message.data.prime;
        const $line = $("<p>").append("Result is returned");
        $("#main").append($line);
    }
    $("#btn2").prop("disabled", false);
};
function slowFunctionWebWorker(): void {
    $("#btn2").prop("disabled", true);
    if (worker) {
        worker.removeEventListener("message", callBack);
        worker.terminate();
    }
    worker = new Worker("output/webworker.js");
    worker.addEventListener("message", callBack, false);

    setTimeout(() => {
        worker.postMessage({
            multiplier: 50,
            iterations: 50000,
        });
    }, 1000);
}

