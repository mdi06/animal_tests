var Horse = artifacts.require("Horse.sol");
var Farmer = artifacts.require("Farmer.sol");
var Dog = artifacts.require("Dog.sol");

const HorseName = "Lucky";
const horseFood = "plant";
const notFood = "meat";
let DogName = "Alex";

let horseAdd;
let dogAdd;

let = contract("Horse and Farmer", async () => {
  it("Horse has the correct name ", async () => {
    let instance = await Horse.deployed();
    let name = await instance.getName();
    horseAdd = await instance.address;
    assert.equal(HorseName, name, "not equal --------------");
  });
  it("Horse can sleep", async () => {
    let instance = await Horse.deployed();
    let sleep = await instance.sleep();
    assert.ok(sleep, "Horse can sleep");
  });
  it("Horse can eat plant", async () => {
    let instance = await Horse.deployed();
    let eatPlant = await instance.eat(horseFood);
    assert.ok(eatPlant, "Horse can eat plant");
  });
  it("Horse cannot eat meat, not-food, plastic", async () => {
    let instance = await Horse.deployed();
    let success = true;

    try {
      await instance.eat(notFood);
    } catch (e) {
      success = false;
    }

    assert.equal(success, false, "Horse cannot eat meat, not-food, or plastic");
  });

  it("Farmer can call Horse, Horse responds correctly", async () => {
    let instance = await Farmer.deployed();
    let call = await instance.call(horseAdd);

    assert.ok(call, "Farmer can call Horse, Horse responds correctly");
    //assert.ok(feed, "Farmer can feed Horse with plant");
  });
  it("Farmer can feed Horse with plant", async () => {
    let instance = await Farmer.deployed();
    let feed = await instance.feed(horseAdd, "plant");
    assert.ok(feed, "Farmer can feed Horse with plant");
  });

  it("Farmer cannot feed Horse with anything else", async () => {
    let instance = await Farmer.deployed();
    //let feed = await instance.feed(horseAdd, notFood);
    let success = false;

    try {
      await instance.feed(horseAdd, notFood);
    } catch (e) {
      success = false;
    }

    assert.equal(
      success,
      false,
      "Farmer cannot feed Horse with anything other than plant"
    );
  });
});

let = contract("Dog and Farmer", async () => {
  it("Dog has the correct name.", async () => {
    let instance = await Dog.deployed();
    let name = await instance.getName();
    dogAdd = await instance.address;
    assert.equal(DogName, name, "not equal --------------");
  });
  it("Dog can sleep", async () => {
    let instance = await Dog.deployed();
    let sleep = await instance.sleep();
    assert.ok(sleep, "Dog can sleep");
  });
  it("Dog can eat plant", async () => {
    let instance = await Dog.deployed();
    let eatPlant = await instance.eat(horseFood);
    assert.ok(eatPlant, "Horse can eat plant");
  });
  it("Dog can eat meat", async () => {
    let instance = await Dog.deployed();
    let eatMeat = await instance.eat(notFood);
    assert.ok(eatMeat, "Can");
  });
  it("Dog cannot eat meat, not-food, plastic", async () => {
    let instance = await Dog.deployed();
    let success = true;

    try {
      await instance.eat(notFood);
    } catch (e) {
      success = false;
    }
    assert.equal(success, true, "Horse cannot eat meat, not-food, or plastic");
  });

  it("Farmer can call Dog, Dog responds correctly", async () => {
    let instance = await Farmer.deployed();
    let call = await instance.call(dogAdd);

    assert.ok(call, "Farmer can call Dog, Dog responds correctly");
    //assert.ok(feed, "Farmer can feed Horse with plant");
  });
  it("Farmer can feed Dog with meat,plant", async () => {
    let instance = await Farmer.deployed();
    let success = true;

    try {
      await instance.feed(notFood);
    } catch (e) {
      success = false;
    }
    try {
      await instance.feed(horseFood);
    } catch (e) {
      success = false;
    }
    assert.equal(success, false, "Horse cannot eat meat, not-food, or plastic");
  });
  it("Farmer cannot feed Dog with ”not-food”, ”plastic” and anything else", async () => {
    let instance = await Farmer.deployed();
    //let feed = await instance.feed(horseAdd, notFood);
    let success = false;

    try {
      await instance.feed(horseAdd, notFood);
    } catch (e) {
      success = false;
    }

    assert.equal(success, false, "Farmer cannot feed Dog with all dat shit");
  });
});
