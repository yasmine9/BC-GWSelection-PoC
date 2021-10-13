pragma solidity ^0.5.0;
// smart contract respo for the trust model. 
import "./Trust.sol" ; 
import "./P2Selection.sol" ; 

contract P1Selection {
uint public lambda = 50 ; 
Trust trust ; 
P2Selection p2selection ; 
address owner; 
// store the first phase list 
address [] selectedList ; //sorted
//address [] members  ; // get all registred addresses

constructor(Trust _trust, P2Selection _p2selection) public {
        trust=_trust;
        p2selection = _p2selection ;
        owner = msg.sender; // recuperer l'adressee du celui qui a deployer la sc
    }


  function getList() public view returns (address [] memory) {
     return selectedList; 
  }
  function abs(int x) private pure returns (int) {
    return x >= 0 ? x : -x;
    } 

  function sortByScore(address[] memory data) public  returns(address[] memory) {
       quickSort(data, int(0), int(data.length - 1));
       return data;
    }
    
    function quickSort(address[] memory arr, int left, int right) internal{
        int i = left;
        int j = right;
        if(i==j) return;
        int pivot = int(trust.ScoreOf(arr[uint(left + (right - left) / 2)]));
        while (i <= j) {

            while (int(trust.ScoreOf(arr[uint(i)]))> pivot) i++;

            while (pivot > int(trust.ScoreOf(arr[uint(j)]))) j--;
            if (i <= j) {
                (arr[uint(i)], arr[uint(j)]) = (arr[uint(j)], arr[uint(i)]);
                i++;
                j--;
            }
        }
        if (left < j)
            quickSort(arr, left, j);
        if (i < right)
            quickSort(arr, i, right);
    }

    
function executePhase1 () public { // store selected list on the state variable selectedList
   // address [] members = trust.members ; // get all registred addresses
    int lastscore ; 
    // sort registred nodes based on their scores ( descending)
    address [] memory nodes ; 
    nodes = sortByScore(trust.getMembers()); //sort them 
    //algo starts here 
    uint i=0  ; 
    
    //address taken = nodes[0]; 
    while ((i<nodes.length) && (trust.blacklist(nodes[i]))  ) {
        i= i+1; 
    }
    if (i<nodes.length) {
        selectedList.push(nodes[i]);
        lastscore = trust.ScoreOf(nodes[0]) ; 
        i=i+1;
    }
    
    bool stop = false; 
    while ((i< nodes.length) && (!stop)){
        if (trust.ScoreOf(nodes[i])<0){
            //return taken
            //p2selection.selectGW(taken); 
            stop= true; 
        }    
        else { // score not null

            if (((abs(lastscore-trust.ScoreOf(nodes[i]))*100/lastscore)< int(lambda)) && (!trust.blacklist(nodes[i]) )) {
            selectedList.push(nodes[i]);
            lastscore= trust.ScoreOf(nodes[i]);
            i = i + 1    ;
            }                  
            else {
                //return taken
                //p2selection.selectGW(taken); 
                stop = true; 
            }
        }

    }
    
    //return taken
    p2selection.selectGW(selectedList); 
    
}

}