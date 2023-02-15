var Cow = artifacts.require("Cow");
var Horse = artifacts.require("Horse");
var Wolf = artifacts.require("Wolf");
var Farmer = artifacts.require("Farmer");
var Dog = artifacts.require("Dog");

module.exports = async (deployer) => {
  try {
    await deployer.deploy(Cow, "Ox");
    const cow = await Cow.deployed();
    console.log(`Cow deployed at address: ${cow.address}`);

    await deployer.deploy(Horse, "Lucky");
    const horse = await Horse.deployed();
    console.log(`Horse deployed at address: ${horse.address}`);

    await deployer.deploy(Wolf, "Rex");
    const wolf = await Wolf.deployed();
    console.log(`Wolf deployed at address: ${wolf.address}`);

    await deployer.deploy(Farmer);
    const farmer = await Farmer.deployed();
    console.log(`Farmer deployed at address: ${farmer.address}`);

    await deployer.deploy(Dog, "Alex");
    const dog = await Dog.deployed();
    console.log(`Dog deployed at address: ${dog.address}`);

    const FarmerInstance = await Farmer.at(farmer.address);
    console.log(await FarmerInstance.call(`${cow.address}`));
    console.log(await FarmerInstance.call(`${horse.address}`));

    try {
      eatplant = await FarmerInstance.feed(`${wolf.address}`, "plant");
      console.log(eatplant);
    } catch (e) {
      console.error(`Error while feeding wolf with plant: ${e.message}`);
    }

    try {
      eatmeat = await FarmerInstance.feed(`${wolf.address}`, "meat");
      console.log(eatmeat);
    } catch (e) {
      console.error(`Error while feeding wolf with meat: ${e.message}`);
    }
  } catch (error) {
    console.error(error);
  }
};
