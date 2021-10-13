import React, { Component } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';


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



class InfosPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
          TrustScore : this.props.TrustScore,
          value : 0,
          open: false,
        }
      }

      componentWillReceiveProps(nextProps) {
        this.setState({ TrustScore: nextProps.TrustScore });  
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
 
handleClickOpen = () => {
                this.setState({ open :true});
              };

handleClose = () => {
                this.setState({ open :false});
              };
            

  render() {
   const classes = useStyles;


    return (
      <div >

  

      <Grid  container spacing={2} justifyContent="center" alignItems="center"  >
      <Grid item xs={12}></Grid>
      <Grid item xs={12}></Grid>

      <Grid item xs={2.5}>
      <Card className={classes.root} >
      <CardContent>
      <Icon className="fa fa-plus-circle" />
        <Typography  className={classes.title} variant="h6" component="h2">
         My trust score
        </Typography>
        <Typography className={classes.pos}  color="textSecondary">
        </Typography>
        <Typography variant="body" component="p">
        {this.state.TrustScore} 
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
          onClick={this.handleClickOpen}
            variant="contained"
            size="large"
            color="secondary"
        >
          Complaint about the bridge
        </Button>
      </ButtonGroup>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Complaint about the gateway</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select the severity of the problem
          </DialogContentText>
          <ButtonGroup variant="contained"color="primary" aria-label="text primary button group">
            
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
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
          </CardContent>
        
      </Card>
    </Grid>
    </Grid>
    </div>
    );
  }
}

export default InfosPage;
