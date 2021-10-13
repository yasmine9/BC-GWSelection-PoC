import React, { Component } from 'react'
import farmer from '../farmer.png'
import logo from '../logo.png'
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Navbar extends Component {

  render() {
    return (

      <AppBar position="static">
        <Toolbar>
          
        <Box display='flex' ustifyContent="center" alignItems="center"  flexGrow={1}>

            <img src={logo} width="45" height="45" className="d-inline-block align-top" alt="" />
            <Icon 
            size="large"
            className="fa fa-plus-circle"  
            color="secondary"
            />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                 Gateway selection Proof of Concept
              </Typography>
            
        </Box>
          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
          My account address {"  "} 
          {this.props.account}
          </Typography>
          
        </Toolbar>
        
      </AppBar>

    );
  }
}

export default Navbar;
