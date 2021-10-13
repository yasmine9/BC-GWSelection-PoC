pragma solidity ^0.5.0;
// register a new node to the blockchain trust model 
import "./Trust.sol" ; 
import "./P2Selection.sol" ;

contract Registration {
    address public owner;
    Trust public trust ;
    P2Selection public p2selection; 

    constructor(Trust _trust, P2Selection _p2selection) public {
        trust=_trust;
        owner = msg.sender; // recuperer l'adressee du celui qui a deployer la sc
        p2selection = _p2selection;
    }


    // Register a new user to trust System
  function register(address sender) public {
    // does the ID exists?
    bool bol =trust.isRegistred(sender);
    require(bol==false ,"Already registred"); //if not, the function will fail directly

    // add the ID with S0 to scores. 
    trust.addNode(sender) ; 
    //trust.addressPresent[msg.sender] = true ;
    p2selection.setPerf(sender,10) ; 
  }


}