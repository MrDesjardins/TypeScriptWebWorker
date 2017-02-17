export class Algorithm {
    public calculatePrimes(iterations: number, multiplier: number): number[] {
        const primes: number[] = [];
        for (let i = 0; i < iterations; i++) {
            const candidate = i * (multiplier * Math.random());
            let isPrime = true;
            for (let c = 2; c <= Math.sqrt(candidate); ++c) {
                if (candidate % c === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                primes.push(candidate);
            }
        }
        return primes;
    }
}


