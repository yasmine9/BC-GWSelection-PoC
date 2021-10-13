import React, { Component } from 'react'
import Web3 from 'web3'
import Trust from '../abis/Trust.json'
import Registration from '../abis/Registration.json'
import P1Selection from '../abis/P1Selection.json'
import P2Selection from '../abis/P2Selection.json'
import Navbar from './Navbar'
import Main from './Main'
import InfoPage from './InfosPage'
import MembersPage from './MembersPage'
import BlistPage from './BlistPage'
import ComplaintsPage from './ComplaintsPage'
import './App.css'
import Button from '@material-ui/core/Button';

class App extends Component {

  async componentWillMount() { 
    await this.loadWeb3() // connect app to the blockchain
    await this.loadBlockchainData() // get data from the blockchain to our states
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

   // Load REGISTRATION
   const registrationData = Registration.networks[networkId]
   // verify if the sc exists ( gets its abi) if yes we create a web3js version of it, else error msg 
   if(registrationData) {
     const regis = new web3.eth.Contract(Registration.abi, registrationData.address)
   } else {
     window.alert('Registration contract not deployed to detected network.')
   }

    // Load Trust
    const trustData = Trust.networks[networkId]
    if(trustData) {
      const trust = new web3.eth.Contract(Trust.abi, trustData.address)
      this.setState({ trust })
      let score = await trust.methods.ScoreOf(this.state.account).call()
      let optsignal = await trust.methods.calculatSignal(this.state.account).call()
      let members = await trust.methods.getMembers().call()
      let complaints = await trust.methods.getComplains().call()
      var  array = members.toString().split(',');
      var scores = new Array( array.length); 
      var rows = new Array(array.length);
      this.setState({ trustScore: score.toString() })
      this.setState({ optsig: optsignal.toString() })
      this.setState({ members: array })
      for (var i = 0; i < array.length; i++) {
          scores[i] = await trust.methods.ScoreOf(members [i]).call()
          rows.push([members[i],scores[i]]);
        }

      let blacklist = await trust.methods.getBlackList().call()
      this.setState({Tscore : rows}) // was scores instead of rows
      this.setState({blacklist: blacklist })
      var complaintsList = complaints.toString().split(',') ; 
      var D3array = new Array()
      for (var i = 0 ; i<complaintsList.length ; i=i+3){
        D3array.push([complaintsList[i], complaintsList[i+1],complaintsList[i+2]])
      }
      this.setState({complaints: D3array })

   
    } else {
      window.alert('Trust contract not deployed to detected network.')
    }
    //load P1selection 
    const p1Data= P1Selection.networks[networkId] 
    if (p1Data) {
      const p1 = new web3.eth.Contract(P1Selection.abi, p1Data.address)
      this.setState({ p1 })
    }

    //load P2selection 
    const p2Data= P2Selection.networks[networkId] 
    if (p2Data) {
      const p2 = new web3.eth.Contract(P2Selection.abi, p2Data.address)
      this.setState({ p2 })
      let gateway = await p2.methods.getGW().call()
      this.setState({ gateway: gateway.toString() })
    }


    this.setState({ loading: false })
  }
 // connnects the app to the blockchain
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  applyCost = (signal) => {
    this.setState({ loading: true })
    this.state.trust.methods.applyCost(this.state.account,signal).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
      window.location.reload();
    })
  }

  applyReward = (signal) => {
    this.setState({ loading: true })
    this.state.trust.methods.applyReward(this.state.account,signal).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
      window.location.reload();
    })
  }

  applyCost = (signal) => {
    this.setState({ loading: true })
    this.state.trust.methods.applyCost(this.state.account,signal).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
      window.location.reload();
    })
  }

  sendComplaint = (value) => {
  this.setState({ loading: true })
  console.log('dsc')
  let bol = this.state.trust.methods.complaint(this.state.account, value, this.state.gateway).send({ from: this.state.account }).on('transactionHash', (hash) => {
    this.setState({b: bol.toString()});
    if(bol) {
      this.LaunchSelection() ; 
    }
    else{
      window.location.reload();
    }
     

    this.setState({ loading: false })
    
  })
}

LaunchSelection = () => {
  this.setState({ loading: true })
   this.state.p1.methods.executePhase1().send({ from: this.state.account }).on('transactionHash', (hash) => {
    this.setState({ loading: false })
    window.location.reload();
  
  })
}

goodaction = (signal) => {
this.applyReward(signal);
}


  constructor(props) {
    super(props)
    this.state = {
      gateway: '',
      trustScore : '10',
      account: '0x0',
      loading: true, 
      Tscore : [[]],
    }
    this.applyCost = this.applyCost.bind(this)
    this.applyReward = this.applyReward.bind(this)
    this.sendComplaint = this.sendComplaint.bind(this)
    this.LaunchSelection = this.LaunchSelection.bind(this)
    this.goodaction = this.goodaction.bind(this)
    this.loadBlockchainData = this.loadBlockchainData.bind(this)
  }

  render() {
    let content
    let content1
    let content2 
    let content3
    let content4
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
      content1 = <p id="loader" className="text-center">Loading...</p>
      content2 = <p id="loader" className="text-center">Loading...</p>
      content3 = <p id="loader" className="text-center">Loading...</p>
      content4 = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        TrustScore={this.state.trustScore}
        gateway = {this.state.gateway}
        applycost= {this.applyCost}
        applyreward ={this.applyReward}
        goodaction = {this.goodaction}
        badaction = {this.applyCost}
        sendComplaint = {this.sendComplaint}
        optsign ={this.state.optsig} 
        members= {this.state.members}
        tscore= {this.state.Tscore}
        bl = {this.state.blacklist}
        complaints ={this.state.complaints}
        p1selection = {this.LaunchSelection}
        b = {this.state.b}
    
      />
      content1= <InfoPage
      TrustScore={this.state.trustScore}
      gateway = {this.state.gateway}
      applycost= {this.applyCost}
      applyreward ={this.applyReward}
      goodaction = {this.goodaction}
      badaction = {this.applyCost}
      sendComplaint = {this.sendComplaint}
      optsign ={this.state.optsig} 
      members= {this.state.members}
      tscore= {this.state.Tscore}
      bl = {this.state.blacklist}
      complaints ={this.state.complaints}
      p1selection = {this.LaunchSelection}
      b = {this.state.b}
    />
    content2= <MembersPage
    TrustScore={this.state.trustScore}
    gateway = {this.state.gateway}
    applycost= {this.applyCost}
    applyreward ={this.applyReward}
    goodaction = {this.goodaction}
    badaction = {this.applyCost}
    sendComplaint = {this.sendComplaint}
    optsign ={this.state.optsig} 
    members= {this.state.members}
    tscore= {this.state.Tscore}
    bl = {this.state.blacklist}
    complaints ={this.state.complaints}
    p1selection = {this.LaunchSelection}
    b = {this.state.b}
  />
  content3= <BlistPage
  TrustScore={this.state.trustScore}
  gateway = {this.state.gateway}
  applycost= {this.applyCost}
  applyreward ={this.applyReward}
  goodaction = {this.goodaction}
  badaction = {this.applyCost}
  sendComplaint = {this.sendComplaint}
  optsign ={this.state.optsig} 
  members= {this.state.members}
  tscore= {this.state.Tscore}
  bl = {this.state.blacklist}
  complaints ={this.state.complaints}
  p1selection = {this.LaunchSelection}
  b = {this.state.b}
  />
  content4= <ComplaintsPage
  TrustScore={this.state.trustScore}
  gateway = {this.state.gateway}
  applycost= {this.applyCost}
  applyreward ={this.applyReward}
  goodaction = {this.goodaction}
  badaction = {this.applyCost}
  sendComplaint = {this.sendComplaint}
  optsign ={this.state.optsig} 
  members= {this.state.members}
  tscore= {this.state.Tscore}
  bl = {this.state.blacklist}
  complaints ={this.state.complaints}
  p1selection = {this.LaunchSelection}
  b = {this.state.b}
  />
    }

    const Tab = props => {
      const { activeTab, setActiveTab } = React.useContext(TabContext);
      const { label, tabIndex } = props;
      const active = activeTab === tabIndex;
    
      return (

        <Button variant="contained"
          color ='#34302e'
          onClick={() => setActiveTab(tabIndex)}
          className={`tabs-tab ${active ? "active" : ""}`}
          size="large"
        >
          {" "}
          {label}{" "}
        </Button>
        
      );
    };
    
    const TabPane = props => {
      const { activeTab } = React.useContext(TabContext);
      const { children, tabIndex } = props;
    
      if (activeTab === tabIndex) {
        return <div className="tabs-tab-pane">{children}</div>;
      } else {
        return null;
      }
    };
    const TabContext = React.createContext();

    const Tabs = props => {
      const { children, defaultTab } = props;
      const [activeTab, setActiveTab] = React.useState(defaultTab);
      return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
          {children}
        </TabContext.Provider>
      );
    };    
    return (
      
      <div>
        <Navbar account={this.state.account} />
        <Tabs defaultTab={0} aria-label="simple tabs example"> 
       
          <Tab label="My account" tabIndex={0} />
          <Tab label="Members and scores" tabIndex={1} />
          <Tab label="Black List" tabIndex={2} />
          <Tab label="Complaints list" tabIndex={3} />


        <TabPane tabIndex={0}>{content1} </TabPane>
        <TabPane tabIndex={1}>{content2}</TabPane>
        <TabPane tabIndex={2}>{content3}</TabPane>
        <TabPane tabIndex={3}>{content4}</TabPane>
        
      </Tabs>

      </div>
    );
  }
}

export default App;
