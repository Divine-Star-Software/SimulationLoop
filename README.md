<h1 align="center">
  Simulation Loop
</h1>

<p align="center">
<img src="https://divine-star-software.github.io/DigitalAssets/images/logo-small.png">
</p>

---

```ts
await SimulationLoop.$INIT(20);

SimulationLoop.registerInterval(0);
SimulationLoop.addToInterval(0, () => {
  //do stuff
});

SimulationLoop.registerInterval(100);
SimulationLoop.addToInterval(100, () => {
  //do stuff
});

SimulationLoop.registerInterval(10_000);
SimulationLoop.addToInterval(10_000, () => {
  //do stuff
});
SimulationLoop.run();
```
