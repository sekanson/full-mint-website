const hre = require("hardhat");

async function main() {
  const Frugs = await hre.ethers.getContractFactory("Frugs");
  const frugs = await Frugs.deploy();

  await frugs.deployed();

  console.log("Frugs deployed to:", frugs.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
