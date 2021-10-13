// here we test our sc that its working. 
// libraries helpful for tests are 
// chai and mocha that comes with truffle.

const _deploy_contracts = require('../migrations/2_deploy_contracts');

const Trust = artifacts.require("Trust");
const Registration = artifacts.require("Registration")
const P2Selection = artifacts.require("P2Selection")

require('chai')
    .use(require('chai-as-promised'))
    .should() 


//write basic tests
contract ('Registration', (accounts) => { 
    before(async()=> {
        trust = await Trust.new()
        p2selection = await P2Selection.new(trust.address)
        registration = await Registration.new(trust.address,p2selection.address)

     await  registration.register(accounts[5])
    
})

    describe('Registred', async()=>{
        it('node address registred', async()=>{    
            let presence = await trust.addressPresent(accounts[5])
            assert.equal(presence, true,'address not registred')
        })

        it('node init score is correct', async()=>{    
        let score = await trust.ScoreOf(accounts[5])
        assert.equal(score,100,'Something went wrong on registration')
        })
})
})



