import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
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

const DealershipirJS = () => {

    const classes = useStyles()
    const intl = useIntl()
    var [carImage, setCarImage] = useState()
    var [makes, setMakes] = useState(); var [make, setMake] = useState()
    var [models, setModels] = useState(); var [model, setModel] = useState()
    var [years, setYears] = useState(); var [year, setYear] = useState()
    var [transmissions, setTransmissions] = useState(); var [transmission, setTransmission] = useState()
    var [VID, setVID] = useState()
    var [vehicleLog, setVehicleLog] = useState(); var [notifications, setNotifications] = useState()
    var [principal, setPrincipal] = useState(); var [APR, setAPR] = useState(); var [termInMonths, setTermInMonths] = useState();
    var vehicle = {}; vehicle.LoanInfo = {}; 
    vehicle.MakeChoice = make; vehicle.ModelChoice = model; vehicle.YearChoice = year; vehicle.TransmissionChoice = transmission; vehicle.VID = VID
    var [ruleTime, setRuleTime] = useState(); var [funcTime, setFuncTime] = useState()
    var [useLog, setUseLog] = useState();
    useEffect(() => { 
        setMakes(window.vehicleMakeTable().map((make) => ( <option value={make.Value}>{make.Name}</option>))); 
        setCarImage("../img/CoveredCar.png")   
        setUseLog("No") 
    }, []);

    const CarImage = async (carChange) => { await axios.get('https://carimagery.com/api.asmx/GetImageUrl?searchTerm=' + carChange).then((formRes) => {
            var xml = new XMLParser().parseFromString(formRes.data); setCarImage(xml.value) })
    }
    const ruleStartT= () => {return performance.now()}; const ruleStopT= (t) => {setRuleTime(`Rule Execution Time: ${performance.now() - t}  ms.`)}
    const funcStartT= () => {return performance.now()}; const funcStopT= (t) => {setFuncTime(`Function Execution Time: ${performance.now() - t}  ms.`)}

    const handleMakeChange = (event) => { var f = funcStartT(); setMake( event.target.value); vehicle.MakeChoice = event.target.value
        setYears(""); setYear(""); setTransmissions(""); setTransmission(""); 
        var t = ruleStartT(); const modelList = window.getModels(vehicle); ruleStopT(t)
        const filteredArr = modelList.reduce((acc, current) => { const x = acc.find(item => item.model === current.model)
            if (!x) { return acc.concat([current]) } else { return acc } }, [])
        setModels(filteredArr.map((_model) => ( <option value={_model.model}>{_model.Model}</option>))) 
        setNotifications(""); funcStopT(f)
        
    }

    const handleModelChange = (event) => {var f = funcStartT();  setModel(event.target.value); vehicle.ModelChoice = event.target.value
       setTransmissions(""); setTransmission(""); vehicle.MakeChoice = make; 
       var t = ruleStartT(); const yearList = window.getYears(vehicle); ruleStopT(t)
        const filteredArr = yearList.reduce((acc, current) => { const x = acc.find(item => item.Year === current.Year);
            if (!x) { return acc.concat([current]) } else { return acc } }, [])
            setYears(filteredArr.map((_year) => ( <option value={_year.VYear}>{_year.Year}</option>))) 
                 CarImage(make + " " + model); setNotifications(""); funcStopT(f)
      }

      const handleYearChange = (event) => {var f = funcStartT();  setYear(event.target.value); setTransmissions(""); setTransmission("")
        vehicle.MakeChoice = make; vehicle.YearChoice = event.target.value; vehicle.ModelChoice = model; 
        var t = ruleStartT(); var transmissionList = window.getTransmissions(vehicle); ruleStopT(t)
        setTransmissions(transmissionList.map((_trans) => ( <option value={_trans.trany}>{_trans.Transmission}</option>)))
        setNotifications(""); funcStopT(f)    
     }
     const handleTransChange = (event) => { setTransmission(event.target.value)
        vehicle.TransmissionChoice = event.target.value; vehicle.VID = window.getVID(vehicle);
        setVID(vehicle.VID); GetAllVehicleData(vehicle.VID);
        if (useLog === "Yes") { handleTransChangeLOG(event)} 
    }
     const handleTransChangeLOG = (event) => { setTransmission(event.target.value)
        vehicle.TransmissionChoice = event.target.value; var VIDObject = window.getVID(vehicle)
        setVID(VIDObject.VID); console.log(VIDObject.VID); setVehicleLog(VIDObject.log); 
        console.log(VIDObject.VID, vehicle.make, vehicle.model, vehicle.year, vehicle.transmission)
        GetAllVehicleData(VIDObject.VID)
    }
    const GetAllVehicleData = (VID) => {var f = funcStartT(); 
        if( make !==null | year !==null  | transmission !==null | model !==null ) { vehicle.VID = VID; 
            var t = ruleStartT(); const  tempNotifications = window.GetAllVehicleData(vehicle); ruleStopT(t)
               setNotifications(tempNotifications.map((_notification) => <div>{_notification.message}</div>))
               funcStopT(f)
        }
    }
    const PaymentRules = () => {
    
        vehicle.LoanInfo.Principal = 21000
        vehicle.LoanInfo.APR = 6
        vehicle.LoanInfo.TermInYears = 6
            var tempID = window.PaymentRules(vehicle); 
            console.log(tempID)
        }


    return (
        <Page className = {classes.Page} pageTitle={intl.formatMessage({ id: 'Dealership', defaultMessage: 'Dealership' })} >
            <br/> <Typography component="h3" variant="h6" className = {classes.PageTopText}> {intl.formatMessage({ id: 'paymentSummary', 
           defaultMessage: 'This rule app uses irJS to populate drop down values and run rules on the selected values. Displaying helpful information to research a vehicle then ' })} </Typography>


            <br/>
            <Container className={classes.container}>
            <img className={classes.carTop} alt="Vehicle" src= {carImage} /> <br/> <br/>

            <FormControl className={classes.formControlMake}> <InputLabel htmlFor="age-native-helper">Make</InputLabel>
                <NativeSelect id = "makes" onChange={handleMakeChange}> <option value={make} /> {makes} </NativeSelect>
            </FormControl>

            <FormControl className={classes.formControlModel}> <InputLabel htmlFor="age-native-helper">Model</InputLabel>
                <NativeSelect id = "models" onChange={handleModelChange}> <option value={model} /> {models} </NativeSelect>
            </FormControl> 
 
            <FormControl className={classes.formControlYear}> <InputLabel htmlFor="age-native-helper">Year</InputLabel>
                <NativeSelect id = "years" onChange={handleYearChange}> <option value={year} /> {years} </NativeSelect>
            </FormControl>

            <FormControl className={classes.formControlTrans}> <InputLabel htmlFor="age-native-helper">Transmission</InputLabel>
                <NativeSelect id = "models" onChange={handleTransChange}> <option value={transmission} /> {transmissions} </NativeSelect>
            </FormControl> 
            <br/><br/>
          
            <div>{ruleTime} </div> <div>{funcTime} </div> <br/>
            <div className={classes.notifications}> {notifications} </div>
            <br/><br/>

            <Button onClick={GetAllVehicleData} variant="contained" color="primary" > {intl.formatMessage({ id: 'clearForm', defaultMessage: 'Buy This Vehicle' })} </Button> <br/> <br/> 
            <br/>
            <Button onClick={PaymentRules} variant="contained" color="primary" > {intl.formatMessage({ id: 'clearForm', defaultMessage: 'Test' })} </Button> <br/> <br/> 
            <TextField id="outlined-textarea" label="Principal" placeholder="message" multiline variant="outlined"
                value={principal} onInput={(e) => setPrincipal(e.target.value)} />
                <br/><br/>
            <TextField id="outlined-textarea" label="APR" placeholder="message" multiline variant="outlined"
                value={APR} onInput={(e) => setAPR(e.target.value)} />
                <br/><br/>
            <TextField id="outlined-textarea" label="Term in Months" placeholder="message" multiline variant="outlined"
                value={termInMonths} onInput={(e) => setTermInMonths(e.target.value)} />
            <br/><br/>
          <div> {vehicleLog} </div>
            </Container>
            
        </Page>
        )
}
export default DealershipirJS