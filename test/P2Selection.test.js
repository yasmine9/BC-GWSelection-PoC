// here we test our sc that its working. 
// libraries helpful for tests are 
// chai and mocha that comes with truffle.

const { assert } = require('chai');
const _deploy_contracts = require('../migrations/2_deploy_contracts');

const Trust = artifacts.require("Trust");
const Registration = artifacts.require("Registration");
const P1Selection = artifacts.require("P1Selection"); 
const P2Selection = artifacts.require("P2Selection"); 

require('chai')
    .use(require('chai-as-promised'))
    .should() 


//write basic tests
contract ('P2Selection', (accounts) => { 
    before(async()=> {
        trust = await Trust.new()
        p2selection = await P2Selection.new(trust.address)
        registration = await Registration.new(trust.address, p2selection.address)
        p1selection = await P1Selection.new(trust.address, p2selection.address)

        await  registration.register(accounts[0])
        await  registration.register(accounts[1])
        await  registration.register(accounts[2])
        await  registration.register(accounts[3])
        //await  registration.register(accounts[4])
        //await  registration.register(accounts[5])
        //await  registration.register(accounts[6])
        //await  registration.register(accounts[7])
        //await  registration.register(accounts[8])
        //await  registration.register(accounts[9]) 

        let score = await trust.ScoreOf(accounts[1])
        let signal = await trust.calculatSignal(accounts[1])
        await trust.applyCost(accounts[1], signal) 
        await trust.applyReward(accounts[1], signal) 
        await trust.applyCost(accounts[2], signal) 
        await trust.applyReward(accounts[3], signal) 
        //await trust.applyCost(accounts[2], signal) 
        //await trust.applyReward(accounts[2], signal) 
        //await trust.applyCost(accounts[2], signal) 
        //await trust.applyCost(accounts[2], signal) 
        await trust.blackList(accounts[0])
        await p2selection.setPerf(accounts[0],100)
        await p2selection.setPerf(accounts[1],50)
        await p2selection.setPerf(accounts[2],60)
        await p2selection.setPerf(accounts[3],20)
        await p1selection.executePhase1() 
        let l1 = await p1selection.getList() 
        p2selection.selectGW(l1)

        
})


    describe('2nd phase of selection', async()=>{

    it('Selection not null', async()=>{  
        let gateway = await p2selection.getGW() 
        assert.isNotNull(gateway, 'no node has been selected')
    }) 

    it('Selected gateway is registred', async()=>{  
        let list = await p1selection.getList() 
        assert.includeMembers(accounts, list) 
    }) 

    it('Selected gateway is not black listed', async()=>{  
        let gateway = await p2selection.getGW() 
        let BL = await trust.getBlackList()
        assert.notInclude(BL, [gateway])
    }) 

    it('Valid selection', async()=>{  // if its really the max 

        let list1 = await p1selection.getList() 
        let gateway = await p2selection.getGW() 
        let valid = true
        for (let i = 0 ; i<list1.length-1; i++){
            let s1 = await trust.ScoreOf(list1[i])
            let sGW = await trust.ScoreOf(gateway)
            if ((list1[i]!= gateway) && s1> (sGW)){
                valid = false 
            }
            assert.equal(valid,true,'wrong gateway selection')
        }
       
    }) 
    


})
 
})

