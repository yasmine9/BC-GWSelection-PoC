pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

// smart contract respo for the trust model. 
import "./P2Selection.sol" ; 

contract Trust {

//state variables : will be stored on the blockchain
uint24 public alpha = 1 ; 
uint24 beta = 1 ; 
uint24 public s0 = 100; //initial score for nodes
P2Selection public  p2selection ; 
address public owner;

//variables for the complaints treatment 

struct Complaint {
  int severity; 
  address source; 
  uint256 time ; 
}
Complaint [] public listcomplains ;
Complaint [] public arr;
uint256 public lastTreated; 
int cptNotTreated = 0; 
uint nbDifferent= 0 ;

//maps an address to a bool : is it registred?
mapping (address => bool) public addressPresent;//array that keeps track of all addresses that have registred to the DTM.
// get score of a node
mapping(address => int) public ScoreOf;

address []  public members; // do we really need this ? YES in selection
address []  public blacklistA; // do we really need this ? YES in selection

mapping(address => bool) public blacklist ;  // returns  true if the node is blacklisted 


constructor(/*P2Selection _p2selection*/) public {
    //p2selection =_p2selection;
    owner = msg.sender; // recuperer l'adressee du celui qui a deployer la sc
}

function getMembers() public view returns (address[] memory){
  return members ;
}
function getAlpha() public view   returns (int) {
  return int(alpha) ; 
}

function getBeta() public view returns (int) {
  return int(beta) ; 
}
function getBlackList() public view returns (address[] memory){
  return blacklistA ;
}

function getNBComplains() public view returns (uint){
  return listcomplains.length ;
}

function getComplains() public view returns (Complaint[] memory){
  Complaint[] memory cs = listcomplains ; 
  return cs ;
}
function calculatSignal(address adr) public view returns (int256) {

  return int256((uint(ScoreOf[adr]) **uint(alpha +1)) / uint(beta * (alpha +1)));
}

function calculReward(address adr) public view returns( int256) {
int256 sign = calculatSignal(adr); 

return int256(uint256(beta* sign * (alpha+1))** uint(1/(alpha+1))); 
}

function isRegistred(address adr) public view returns (bool) {
if (!addressPresent[adr]) {return false ;}
return true ;
}

function addNode (address adr) public {
members.push(adr);
addressPresent[adr] = true ;
ScoreOf[adr] = s0;
}

function blackList(address adr) public {
  blacklistA.push(adr); 
  blacklist[adr] = true ; 
}


// function to apply a cost on the account with address adr 
function applyCost(address adr, uint24 signal) public {
ScoreOf[adr] = ScoreOf[adr] - int(beta * signal / (uint(ScoreOf[adr])**uint(alpha)) ); 
}

// function to give a reward 
function applyReward(address adr, uint24 signal) public  {
  ScoreOf[adr] = ScoreOf[adr] + int(beta * signal / (uint(ScoreOf[adr])**uint(alpha))) + int((beta * signal / (uint(ScoreOf[adr])**uint(alpha)) )/2); 
}



function g (int x) public  pure returns (int) { //sigmoidal function
  return (int(x /(x+1)) ); 
}
//function to apply a penalty to the gateway ( ie treat complaints)
function applyPenalty(Complaint []  memory _complains2treat, address gw) public {
  // Compute penalty based on complaints list ( their scores) and nbDifferent ( distribution)
  int penalty;
  Complaint memory c ; 
  int Si; 
  int severity ; 
  int EvalP; 
  for (uint i=0; i< _complains2treat.length ; i++) {
    c = _complains2treat[i] ; 
    Si= Si+ ScoreOf[c.source] ; // sum of scores
    severity = severity + c.severity ; 
  }

  EvalP = Si / cptNotTreated ;
  severity =  severity / cptNotTreated; // average severity. 
  penalty = ScoreOf[gw] * g(EvalP * severity) ; 

  // apply the penalty to the gateway
  ScoreOf[gw] = ScoreOf[gw] - severity*10; // aulieu de severity * 10 normalement penalty!
}


// recieve a complaint and do the necesary log + treat 
function complaint(address adr, int _severity, address gw) public returns (bool) {
  bool selectGW = false ; 
// log the complaint on the blockchian 
if (isRegistred(adr) ){
  Complaint memory _complaint;
_complaint.severity = _severity; 
_complaint.source = adr ;
_complaint.time = now ; 

listcomplains.push(_complaint) ; 
cptNotTreated = cptNotTreated +1 ;
bool exists = false ; 
int index = int(listcomplains.length) - cptNotTreated ; // index of the first not treated complaint.
//address [] memory arr ; 
Complaint memory x; 
for (uint i=uint(index) ; i<listcomplains.length; i++ ) { // check in the intreated complaints whether this adr is already calculated. 
  x = listcomplains[i] ; 
  if (x.source == adr ){
      exists = true; 
      break ;
  }
}
if (!exists){ // if this node hasnt complained before 
  nbDifferent = nbDifferent +1 ;
}
 

// check if its time to apply penalty , if yes call the function applyPenalty
bool time2apply = false; 

//HERE
if (cptNotTreated ==3){
  time2apply = true ;
}

if (time2apply ) {
  int index2 = int(int(listcomplains.length) - cptNotTreated ); // index of the first not treated complaint.
  for (uint i=uint(index2); i<listcomplains.length; i++){
    arr.push(listcomplains[i] ) ; 
  }

  applyPenalty((arr),gw);
  // reinit vars cpts 
  cptNotTreated = 0 ; 
  nbDifferent = 0 ; 
  lastTreated = listcomplains[listcomplains.length -1].time;
  selectGW = true ;
  time2apply = false;
}


}
return selectGW; 
} 

}