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
contract ('P1Selection', (accounts) => { 
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
        await p1selection.executePhase1() 
        
})


    describe('1st phase of selection', async()=>{

    it('list not empty', async()=>{  
        let list = await p1selection.getList() 

        assert.notEqual(list.length,0, 'no node has been selected')
        //assert.equal(list.length, 3,'length list not 3')
        //assert(await trust.ScoreOf(accounts[1]> await trust.ScoreOf(accounts[2])),'scores comparaison false') 
       
        //assert.equal(list[1],accounts[1], 'wrong order')
    }) 
    it('Selected nodes are registred', async()=>{  
        let list = await p1selection.getList() 
        assert.includeMembers(accounts, list) 
    }) 

    it('Selected nodes are not black listed', async()=>{  
        let list = await p1selection.getList() 
        let BL = await trust.getBlackList()
        assert.notInclude(list, BL)
    }) 

    it('List ordred by score successfully', async()=>{  

        let list = await p1selection.getList() 
        //assert.equal(list,[],'printing the list') // i can see the list content through this

       // let s1 = await trust.ScoreOf(list[0])
        //let s2 = await trust.ScoreOf(list[1])
        //let s3 = await trust.ScoreOf(list[2])
        //assert.equal(list,[],'worng order') // i can see the list content through this
        //assert((s1>s2) ,'scores order is wrong')
        //assert((s3>s1) ,'scores order is wrong')

        
        for (let i = 0 ; i<list.length-1; i++){
            let s1 = await trust.ScoreOf(list[i])
            let s2 = await trust.ScoreOf(list[i+1])

            assert(s1>=s2,'worng order')
        }
        
        //assert(await trust.ScoreOf(accounts[1]> await trust.ScoreOf(accounts[2])),'scores comparaison false') 
       
    }) 
    


})
 
})

