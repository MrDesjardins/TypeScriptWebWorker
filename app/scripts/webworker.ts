importScripts("../vendors/requirejs/require.js");
console.log("loaded");
requirejs.config({
    baseUrl: ".",
});
require(["algo"], function (algo_1) {
    console.log("required");
    //debugger;
    self.addEventListener("message", (message: MessageEvent) => {
        console.log("receive message begin");
        const origin = message.origin;
        const iterations = message.data.iterations;
        const multiplier = message.data.multiplier;
        const algo = new algo_1.Algorithm();
        const result = algo.calculatePrimes(iterations, multiplier);
        console.log("receive message end");
        (self as any).postMessage({
            command: "done",
            primes: result
        });
    });
});