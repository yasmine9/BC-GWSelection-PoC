pragma solidity ^0.5.0;
// smart contract respo for the trust model. 
import "./Trust.sol" ; 
contract P2Selection {
Trust trust ; 

address public currentGW  ; 
mapping(address => int) public PerfOf; 

constructor(Trust _trust) public {
        trust=_trust;
    }
function getGW() public view returns (address){
    return currentGW;
}

function setGW(address gw) public  {
   currentGW = gw ;
}

function selectGW (address[] memory listP1) public {
    // get the max(listP1) based on their perf
    int max= trust.ScoreOf(listP1[0]) ; 
    address currentMax = listP1[0]; 
    for (uint i=1; i<listP1.length; i++){
        if (trust.ScoreOf(listP1[i]) > max ){
            max = trust.ScoreOf(listP1[i]);
            currentMax = listP1[i] ;
        }
    }
    
    currentGW = currentMax ; 
}

function setPerf(address adr, int p) public {
    PerfOf[adr] = p ; 

}
}
