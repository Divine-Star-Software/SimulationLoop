export const SimulationLoop = {
    speed: 0,
    _delta: 0,
    _previous: 0,
    _performance: {},
    _intervals: new Map(),
    async $INIT(speed) {
        this.speed = speed;
        if (performance) {
            this._performance = performance;
        }
        else {
            //@ts-ignore
            if (require) {
                //@ts-ignore
                this._performance = require("perf_hooks").performance;
            }
            else {
                //@ts-ignore
                this._performance = (await import("perf_hooks")).performance;
            }
        }
        this._previous = this._performance.now();
    },
    _round(n) {
        const d = Math.floor(n / 10) * 10;
        if (d < 10)
            return 10;
        return d;
    },
    registerInterval(interval) {
        this._intervals.set(this._round(interval), {
            delta: 0,
            functions: [],
        });
    },
    addToInterval(interval, run) {
        const inte = this._intervals.get(this._round(interval));
        if (!inte)
            return;
        inte.functions.push(run);
    },
    run() {
        const n = this._performance.now();
        this._delta = n - this._previous;
        this._previous = n;
        const roundedDelta = this._round(this._delta);
        for (const [inte, data] of this._intervals) {
            if (inte < roundedDelta) {
                data.functions.forEach((_) => _());
                continue;
            }
            if (data.delta + roundedDelta >= inte) {
                data.functions.forEach((_) => _(data.delta + roundedDelta));
                data.delta = 0;
                continue;
            }
            if (data.delta < inte) {
                data.delta += roundedDelta;
            }
        }
        setTimeout(() => {
            this.run();
        }, this.speed / 2);
    },
};
