// Factory Method Pattern in Typescript
class Carr {
  brand: any;
  model: any;
  constructor(brand) {
    this.brand = brand;
  } 
}
class CarFactory {
  static createCar(brand) {
    return new Carr(brand);
  }
}
const car1 = CarFactory.createCar('Toyota');
console.log(car1.brand); // Output: Toyota
