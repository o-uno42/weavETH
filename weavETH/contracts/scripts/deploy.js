const { ethers } = require("hardhat");

async function main() {
  // Deploy Greeter contract
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello World!");
  await greeter.waitForDeployment(); // This is required in Ethers v6
  console.log("Greeter deployed to:", await greeter.getAddress());

  // Deploy Counter contract
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();
  await counter.waitForDeployment();
  console.log("Counter deployed to:", await counter.getAddress());

  const ScarfBank = await ethers.getContractFactory("ScarfBank");
  const scarf = await ScarfBank.deploy();
  await scarf.waitForDeployment();
  console.log("Scarf deployed to:", await scarf.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
