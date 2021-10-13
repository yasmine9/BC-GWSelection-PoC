import React, { Component } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import { TabPanel } from '@material-ui/lab';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = withStyles((theme) => ({
root: {
    Width: '25%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  btn: {
   margin: theme.spacing(5),
 },

 }));



class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
          TrustScore : this.props.TrustScore,
          value : 0,
        }
      }


      renderTableData(i) {
          if (i==1){
            return this.props.members.map((member) => {
                return (
                   <tr key={member}>
                      <td>{member}</td>  
                   </tr>
                );
             }) 
          }
          else {
            return this.props.tscore.map((member) => {
                return (
                   <tr key={member}>
                      <td>{member}</td>  
                   </tr>
                );
             }) 
          }
        
     }

     renderBlacklist() {
          return this.props.bl.map((member) => {
              return (
                 <tr key={member}>
                    <td>{member}</td>  
                 </tr>
              );
           }) 
        }

        renderComplaints() {
            return this.props.complaints.map((severity) => {
                return (
                    <table>
                        <tr >
                            <td> {severity}</td>
                        </tr>
                   
                    </table>
                      
                );
                
             }) 
            }  

 handleChange  (event, newValue) {
              this.setState({value : newValue})

            };
   
  render() {
   const classes = useStyles;
   
   function valuetext(value) {
      return {value};
    }

   const marks = [
      {
        value: 1,
        label: '1',
      },
      {
        value: 2,
        label: '2',
      },
      {
        value: 3,
        label: '3',
      },
      {
        value: 4,
        label: '4',
      },
      {
         value: 5,
         label: '5',
      }
    ];
    

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    return (
      <div >

   


      <Grid  container spacing={2}>
      <Grid item xs={3}>
      <Card className={classes.root} >
      <CardContent>
        <Typography  className={classes.title} variant="h6" component="h2">
         My trust score
        </Typography>
        <Typography className={classes.pos}  color="textSecondary">
        </Typography>
        <Typography variant="body2" component="p">
        {this.props.TrustScore} 
        </Typography>
      </CardContent>
    </Card>
      </Grid>

      <Grid item xs={6}>
    <Card className={classes.root} >
      <CardContent>
        <Typography  className={classes.title} variant="h6" component="h2">
         Current gateway
        </Typography>
        <Typography className={classes.pos}  color="textSecondary">
        </Typography>
        <Typography variant="body2" component="p">
        {this.props.gateway}
        </Typography>
      </CardContent>
    </Card>
      </Grid>

      <Grid item xs={3}>
      <Card  className={classes.root} >
      <CardContent>
        <Typography  className={classes.title} variant="h6" component="h2">
         My optimal signal
        </Typography>
        <Typography className={classes.pos}  color="textSecondary">   
        </Typography>
        <Typography variant="body2" component="p">
        {this.props.optsign}
        </Typography>
      </CardContent>
    </Card>
      </Grid>
  
    </Grid>

    <Grid>
       <Card className={classes.root}>
       <CardHeader
            textsize="13"
            title={"Actions"}
          />
          <CardContent align>
          <ButtonGroup>
          <Button
          className={classes.btn}
          onClick={(event) => {
            event.preventDefault()
            this.props.goodaction(this.props.optsign)
            }}
            variant="contained"
            size="large"
            color="primary"
        >
          Honest action 
        </Button>

        <Button
          className={classes.btn}
          onClick={(event) => {
            event.preventDefault()
            this.props.badaction(this.props.optsign)
            }}
            variant="contained"
            size="large"
            color="primary"
        >
          Malicious action
        </Button>

        <Button
          className={classes.btn}
          onClick={(event) => {
            event.preventDefault()
            this.props.p1selection()
            }}
            variant="contained"
            size="large"
            color="secondary"
        >
          Select a new bridge
        </Button>
      </ButtonGroup>
      <Button
          className={classes.btn}
          onClick={(event) => {
            event.preventDefault()
            this.props.p1selection()
            }}
            variant="contained"
            size="large"
            color="secondary"
        >
          Complaint about the bridge
        </Button>

         <Typography id="input-slider" gutterBottom>
        Severity
      </Typography>
         <Slider
        aria-label="Custom marks"
        defaultValue={1}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        max ="5"
        marks={marks}
      />

       <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            
            <Button
            onClick={(event) => {
                event.preventDefault()
                this.props.sendComplaint(1)
                }}>
            One</Button>
            <Button
            onClick={(event) => {
                event.preventDefault()
                this.props.sendComplaint(2)
                }}>Two</Button>


            <Button onClick={(event) => {
                event.preventDefault()
                this.props.sendComplaint(3)
                }} >Three</Button>

            <Button onClick={(event) => {
                event.preventDefault()
                this.props.sendComplaint(4)
                }}>Four</Button>

            <Button onClick={(event) => {
                event.preventDefault()
                this.props.sendComplaint(5)
                }}>Five</Button>
        </ButtonGroup>
          </CardContent>
        
      </Card>
      <Card className={classes.root}>
         <CardHeader
               textsize="13"
               title={"Members & Scores"}
            />
            <CardContent align>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Node adresse</TableCell>
            <TableCell align="left">Trust score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.tscore.map((row) => (
            <TableRow
              key={row[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row[0]}
              </TableCell>
              <TableCell align="right">{row[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </CardContent>
      </Card>

      <Card className={classes.root}>
         <CardHeader
               textsize="13"
               title={"Black list"}
            />
            <CardContent align>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Node adresse</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.bl.map((row) => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="right">{row}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </CardContent>
      </Card>


      <Card className={classes.root}>
         <CardHeader
               textsize="13"
               title={"Complaints list"}
            />
            <CardContent align>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>severity</TableCell>
            <TableCell align="right">source adr</TableCell>
            <TableCell align="right">Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.complaints.map((row) => (
            <TableRow
              key={row[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row[0]}
              </TableCell>
              <TableCell align="right">{row[1]}</TableCell>
              <TableCell align="right">{row[2]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </CardContent>
      </Card>

    </Grid>

    
    </div>
    );
  }
}

export default Main;
