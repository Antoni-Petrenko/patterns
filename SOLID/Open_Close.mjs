let Color = Object.freeze({
    red: 'red',
    green: "green",
    blue: "blue"
})
let Size = Object.freeze({
    small: 'small',
    medium: "medium",
    large: "large"
})

class Product {
    constructor(name, color, size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

//Open for extension, close for modification
// OLD approach

class ProductFilter {
    filterByColor(products, color) {
        return products.filter(p => p.color === color);
    }

    filterBySize(products, size) {
        return products.filter(p => p.size === size);
    }
}

// One of the best whey for understanding OCP is using specification pattern

class ColorSpecification{
    constructor(color) {
        this.color = color;
    }
    isSatisfied(item){
        return item.color === this.color;
    }
}

class SizeSpecification{
    constructor(size) {
        this.size = size;
    }
    isSatisfied(item){
        return item.size === this.size;
    }
}

//Combinator of specification

class AndSpecification{
    constructor(...specs) {
        this.specs = specs;
    }
    isSatisfied(item){
        return this.specs.every(x => x.isSatisfied(item));
    }
}
class BatterFilter{
    filter(items,spec){
        return items.filter(x => spec.isSatisfied(x))
    }
}

let apple = new Product("Apple", Color.green, Size.small);
let tree = new Product('Tree', Color.green, Size.large);
let house = new Product("House", Color.blue, Size.large);

const products = [apple, tree, house];

// let pf = new ProductFilter();
//
// console.log(`Green products (old):`);
// for (let p of pf.filterByColor(products, Color.green)) console.log(`* ${p.name} is green`);
//
// console.log(`
// Large products (old):`);
// for (let p of pf.filterBySize(products, Size.large)) console.log(`* ${p.name} is large`)

let bf = new BatterFilter();

for (let p of bf.filter(products, new ColorSpecification(Color.green))) console.log(`* ${p.name} is green`);

//her we can easy to add and combine the specifications of filtering
const spec = new AndSpecification(
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.large)
)

for(let p of bf.filter(products,spec)) console.log(`* ${p.name} is green and large`)