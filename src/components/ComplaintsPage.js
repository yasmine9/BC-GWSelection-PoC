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


 const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#D96238',
      color: theme.palette.common.white,
      fontSize: 18,
    },
    body: {
      fontSize: 16,
    },
  }))(TableCell);
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
class ComplaintsPage extends Component {
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

   


      <Grid  container spacing={2} justifyContent="center" alignItems="center" >
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={2.5}>
      <Card className={classes.root} >
      <CardContent>
        <Typography  className={classes.title} variant="h6" component="h2">
         My trust score
        </Typography>
        <Typography className={classes.pos}  color="textSecondary">
        </Typography>
        <Typography variant="body" component="p">
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
        <Typography variant="body" component="p">
        {this.props.gateway}
        </Typography>
      </CardContent>
    </Card>
      </Grid>

      <Grid item xs={2.5}>
      <Card  className={classes.root} >
      <CardContent>
        <Typography  className={classes.title} variant="h6" component="h2">
         My optimal signal
        </Typography>
        <Typography className={classes.pos}  color="textSecondary">   
        </Typography>
        <Typography variant="body" component="p">
        {this.props.optsign}
        </Typography>
      </CardContent>
    </Card>
      </Grid>
  
      <Grid item xs={11}>
      <Card className={classes.root}>
         <CardHeader
               textsize="13"
               title={"Complaints list"}
            />
            <CardContent align>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>severity</StyledTableCell>
            <StyledTableCell align="left">source address</StyledTableCell>
            <StyledTableCell align="left">Timestamp</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {this.props.complaints.map((row) => (
            <StyledTableRow
              key={row[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row[0]}
              </StyledTableCell>
              <StyledTableCell align="left">{row[1]}</StyledTableCell>
              <StyledTableCell align="left">{row[2]}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </CardContent>
      </Card>

    </Grid>
    </Grid>
    
    </div>
    );
  }
}

export default ComplaintsPage;
