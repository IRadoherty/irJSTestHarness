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
import { useSnackbar } from 'notistack'

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
        principalTextField: {
            marginLeft: theme.spacing(1),
            'min-width': '30px',
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
            height: '260px !important'
          },
          Page:{
              'background': 'white !important'
          },
          notifications:{
            width: '550px'
        }
    } ))

const WebSite= () => {
    useEffect(() => { 
        setCarImage("../img/CoveredCar.png");
        setMakes(window.vehicleMakeTable().map((make) => ( <option value={make.Value}>{make.Name}</option>))); 
        setVIDCount(window.getVIDCount())
    }, []);

    const classes = useStyles()
    const intl = useIntl()
    const { enqueueSnackbar } = useSnackbar()
    var [carImage, setCarImage] = useState()
    var [makes, setMakes] = useState(); var [make, setMake] = useState()
    var [models, setModels] = useState(); var [model, setModel] = useState()
    var [years, setYears] = useState(); var [year, setYear] = useState()
    var [transmissions, setTransmissions] = useState(); var [transmission, setTransmission] = useState()
    var [VID, setVID] = useState()
    var [notifications, setNotifications] = useState()
    var vehicle = {}; vehicle.LoanInfo = {}; 
    vehicle.MakeChoice = make; vehicle.ModelChoice = model; vehicle.YearChoice = year; vehicle.TransmissionChoice = transmission; vehicle.VID = VID
    var [ruleTime, setRuleTime] = useState(); var [funcTime, setFuncTime] = useState()
    var [VIDCount, setVIDCount] = useState()
    const CarImage = async (carChange) => { await axios.get('https://carimagery.com/api.asmx/GetImageUrl?searchTerm=' + carChange).then((formRes) => {
            var xml = new XMLParser().parseFromString(formRes.data); setCarImage(xml.value) })
    }
    const ruleStartT= () => {return performance.now()}; const ruleStopT= (t) => {setRuleTime(`Rule Execution Time: ${performance.now() - t}  ms.`)}
    const funcStartT= () => {return performance.now()}; const funcStopT= (t) => {setFuncTime(`Function Execution Time: ${performance.now() - t}  ms.`)}

    const handleMakeChange = (e) => { var f = funcStartT(); setMake( e.target.value); vehicle.MakeChoice = e.target.value
        setYears(""); setYear(""); setTransmissions(""); setTransmission(""); 
        var t = ruleStartT(); const modelList = window.getModels(vehicle); ruleStopT(t)
        const filteredArr = modelList.reduce((acc, current) => { const x = acc.find(item => item.model === current.model)
            if (!x) { return acc.concat([current]) } else { return acc } }, [])
        setModels(filteredArr.map((_model) => ( <option value={_model.model}>{_model.Model}</option>))) 
        setNotifications(""); funcStopT(f)
    }

    const handleModelChange = (e) => {var f = funcStartT();  setModel(e.target.value); vehicle.ModelChoice = e.target.value
       setTransmissions(""); setTransmission(""); vehicle.MakeChoice = make; 
       var t = ruleStartT(); const yearList = window.getYears(vehicle); ruleStopT(t)
        const filteredArr = yearList.reduce((acc, current) => { const x = acc.find(item => item.Year === current.Year);
            if (!x) { return acc.concat([current]) } else { return acc } }, [])
            setYears(filteredArr.map((_year) => ( <option value={_year.VYear}>{_year.Year}</option>))) 
                 CarImage(make + " " + e.target.value); setNotifications(""); funcStopT(f)
      }

      const handleYearChange = (e) => {var f = funcStartT();  setYear(e.target.value); setTransmissions(""); setTransmission("")
        vehicle.MakeChoice = make; vehicle.YearChoice = e.target.value; vehicle.ModelChoice = model; 
        var t = ruleStartT(); var transmissionList = window.getTransmissions(vehicle); ruleStopT(t)
        setTransmissions(transmissionList.map((_trans) => ( <option value={_trans.trany}>{_trans.Transmission}</option>)))
        setNotifications(""); funcStopT(f)    
     }
     const handleTransChange = (e) => { setTransmission(e.target.value)
        vehicle.TransmissionChoice = e.target.value; vehicle.VID = window.getVID(vehicle);
        setVID(vehicle.VID); GetAllVehicleData(vehicle.VID);
    }

    const GetAllVehicleData = (_VID ) => {var f = funcStartT(); 
        if( make !==null && year !==null  && transmission !==null && model !==null ) { 
            var t = ruleStartT(); const tempNotifications = window.GetAllVehicleData(vehicle); ruleStopT(t)
               setNotifications(tempNotifications.map((_notification) => <div>{_notification.message}</div>))
               funcStopT(f)
        }
    }


        //service bus
        const { ServiceBusClient }  = require("@azure/service-bus");
        const connectionString = "Endpoint=sb://road-adoherty-servicebus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=4xv4/5kWvSi3Ez/LLKNKnyoLS+78ERuCn2SVDHBcRPo="
        const queueName = "ciccdservicebusqueue"

        
        const runServiceBus = async () => {
            const sbClient = new ServiceBusClient(connectionString);
            var message = [ { body: vehicle.VID, contentType: "application/json" } ]
            var sender = sbClient.createSender(queueName); 
            try {
                let batch = await sender.createMessageBatch()
                for (let i = 0; i < message.length; i++) {
                    if (!batch.tryAddMessage(message[i])) {			
                        await sender.sendMessages(batch)
                        batch = await sender.createMessageBatch()
                        if (!batch.tryAddMessage(message[i])) { throw new Error("Message too big to fit in a batch") }
                }}
                  enqueueSnackbar(`The ${make} ${model} request was sent to the dealership successfully`, { variant: 'success', autoHideDuration: 2000, anchorOrigin: { vertical: 'top', horizontal: 'center', }, }) 
                  await sender.sendMessages(message); await sender.close()
              } 
                finally { await sbClient.close() }
            }


    return (
        <Page className = {classes.Page} pageTitle={intl.formatMessage({ id: 'Dealership', defaultMessage: 'Dealership' })} >
           <Typography component="h4" variant="h6" className = {classes.PageTopText}> {intl.formatMessage({ id: 'paymentSummary', 
           defaultMessage: `Welcome to our website! Please browse our inventory below. If you are interested in any of our ${VIDCount} vehicles please submit an inquiry to the Dealership.` })} </Typography>

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

            <Button onClick={runServiceBus} variant="contained" color="primary" > {intl.formatMessage({ id: 'clearForm', defaultMessage: 'Buy This Vehicle' })} </Button> <br/> <br/> 
            <br/>
   
            </Container>
            
        </Page>
        )
}
export default WebSite