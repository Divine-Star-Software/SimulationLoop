declare type LoopFunction = (deltaTime: number) => void;
export declare const SimulationLoop: {
    speed: number;
    _delta: number;
    _previous: number;
    _performance: Performance;
    _intervals: Map<number, {
        delta: number;
        functions: Function[];
    }>;
    $INIT(speed: number): Promise<void>;
    _round(n: number): number;
    registerInterval(interval: number): void;
    addToInterval(interval: number, run: LoopFunction): void;
    run(): void;
};
export {};
