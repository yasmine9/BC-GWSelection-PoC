// here we test our sc that its working. 
// libraries helpful for tests are 
// chai and mocha that comes with truffle.

const { assert } = require('chai');
const _deploy_contracts = require('../migrations/2_deploy_contracts');

const Trust = artifacts.require("Trust");
const Registration = artifacts.require("Registration")
const P2Selection = artifacts.require("P2Selection")

require('chai')
    .use(require('chai-as-promised'))
    .should() 


//write basic tests
contract ('Trust', (accounts) => { 
    before(async()=> {
        trust = await Trust.new()
        p2selection = await P2Selection.new(trust.address)
        registration = await Registration.new(trust.address,p2selection.address)
        await  registration.register(accounts[5])
        await  registration.register(accounts[1])
        await  registration.register(accounts[2])
        await  registration.register(accounts[3])
        await  registration.register(accounts[4])

        // launch some complaints 
        await p2selection.setGW(accounts[4]) ; 

        await trust.complaint(accounts[3], 5, accounts[4]) ; 
        await trust.complaint(accounts[2],3,accounts[4]) ; 
        await trust.complaint(accounts[1], 5,accounts[4]) ; 
        await trust.complaint(accounts[7],3,accounts[4]) ; 

})

    describe('Trust functions', async()=>{

    it('cost and reward applied correctly', async()=>{  
        let score0 = await trust.ScoreOf(accounts[5])
        let signal = await trust.calculatSignal(accounts[5])

        await trust.applyCost(accounts[5], signal) 
        let score = await trust.ScoreOf(accounts[5])
        assert(score< trust.s0,'something went wrong on cost application') 
        

        await trust.applyReward(accounts[5], signal)  
        score1 = await trust.ScoreOf(accounts[5])
        assert (score1> score0, 'reward value not correct')

        
    })
})

describe('Complaints functions', async()=>{

    it('complaint list filled successfully', async()=>{  
        let n = await trust.getNBComplains()
        assert.equal(n,3,'complains list not filled correctly')

    })

    it('none registred complainer ignored', async()=>{  
        let n = await trust.getNBComplains()
        assert.equal(n,3,'complains list not filled correctly')

    })
  

    it('Penalty applied to the gateway', async()=> {
        let gw = await p2selection.getGW()
        assert.equal(gw, accounts[4], 'wrong gateway')
        let score = await trust.ScoreOf(gw) 

        assert(score< 100, 'no penalty applied')
    })



})
 
}) 