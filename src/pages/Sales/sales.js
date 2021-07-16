import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import axios from 'axios'
import XMLParser from 'react-xml-parser';

    const useStyles = makeStyles((theme) => ({
        container: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginTop: theme.spacing(5),
            
        },
        PageTopText: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginTop: theme.spacing(5),
            width: '550px'
        },
        formControlMake: {
            marginLeft: theme.spacing(1),
            'min-width': '60px',
        },
        formControlModel: {
            marginLeft: theme.spacing(1),
            'min-width': '100px',
        },
        formControlYear: {
            marginLeft: theme.spacing(1),
            'min-width': '60px',
        },
        formControlTrans: {
            marginLeft: theme.spacing(1),
            'min-width': '120px',
        },
        logging:{
            width: '450px',
            left: '400px',
            'margin-top': '-308px',
            position: 'relative'
          },
          carTop:{
            width: '550px !important',
            height: '280px !important'
          },
          Page:{
              'background': 'white !important'
          },
          notifications:{
            width: '550px'
        }
    } ))

const Dealership = () => {
    useEffect(() => { 
        setMakes(window.vehicleMakeTable().map((make) => ( 
        <option value={make.Value}>{make.Name}</option>))) 
        setCarImage("../img/CoveredCar.png")
    },[])

    const classes = useStyles()
    const intl = useIntl()
    var [carImage, setCarImage] = useState()
    var [makes, setMakes] = useState()
    var [make, setMake] = useState()
    var [models, setModels] = useState()
    var [model, setModel] = useState()
    var [years, setYears] = useState()
    var [year, setYear] = useState()
    var [VID, setVID] = useState()
    var [transmissions, setTransmissions] = useState()
    var [transmission, setTransmission] = useState()
    var [vehicleLog, setVehicleLog] = useState()

    var [notifications, setNotifications] = useState()
    var vehicle = {}; 
    vehicle.MakeChoice = make; 
    vehicle.ModelChoice = model;  
    vehicle.YearChoice = year;
    vehicle.TransmissionChoice = transmission;
    vehicle.VID = VID



    const GetAllVehicleData = (VID) => {
        if( make !==null | year !==null  | transmission !==null | model !==null )
        {
            vehicle.VID = VID
            setNotifications( window.GetAllVehicleData(vehicle).map((_notification) => <div>{_notification.message}</div>))
        }
    }

    //const goToSales = () => {
    //    props.history.push({ 
     //       pathname: '/register',
     //       state: data_you_need_to_pass
    //       });
//

  //  }



    return (
        
        <Page className = {classes.Page} pageTitle={intl.formatMessage({ id: 'Sales', defaultMessage: 'Sales Department' })} >
            
            <br/> <Typography component="h1" variant="h6" className = {classes.PageTopText}> {intl.formatMessage({ id: 'paymentSummary', 
           defaultMessage: 'Welcome to the Sales department to finilize your new vehicle purchase.' })} </Typography>
    
            <br/>
            <Container className={classes.container}>

            </Container>
        </Page>
        )
}
export default Dealership