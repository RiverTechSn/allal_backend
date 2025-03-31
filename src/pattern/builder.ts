// Builder Pattern in Typescript
class Car {
  model: string;
  brand: string;
  constructor() {
    this.brand = '';
    this.model = '';
  }
}
class CarBuilder {
  car: Car;
  setBrand(brand) {
    this.car.brand = brand;
    return this;
  }
  setModel(model) {
    this.car.model = model;
    return this;
  }
  build() {
    return this.car;
  }
}
const car = new CarBuilder().setBrand('Toyota').setModel('Corolla').build();
console.log(car); // Output: Car { brand: 'Toyota', model: 'Corolla' }
