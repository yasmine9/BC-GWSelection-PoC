const Trust = artifacts.require("Trust");
const Registration = artifacts.require("Registration")
const P1Selection = artifacts.require("P1Selection")
const P2Selection = artifacts.require("P2Selection")

module.exports = async function(deployer,network, accounts ) {
    //async keyword is used to deploy in the order needed. 
    // accounts : all accounts of the network


    // Deploy trust 
    await deployer.deploy(Trust) 
    const trust = await Trust.deployed()

    //deploy the P2 selection
    await deployer.deploy(P2Selection, trust.address) //these are used in the sc constructor
    const p2selection= await P2Selection.deployed()
    p2selection.setGW(accounts[0]) 

    //deploy p1 selection smart contract 
    await deployer.deploy(P1Selection,trust.address,p2selection.address)//these are used in the sc constructor

    //deploy registration SC 
    await deployer.deploy(Registration,trust.address,p2selection.address)//these are used in the sc constructor
    const registr= await Registration.deployed()


    // enregistrer les 6 premier accounts dans le systeme de confiance 
    await registr.register(accounts[0])
    await registr.register(accounts[1])
    await registr.register(accounts[2])
    await registr.register(accounts[3])
    await registr.register(accounts[4])
    await registr.register(accounts[5])
    await trust.blackList(accounts[5])

  
};


