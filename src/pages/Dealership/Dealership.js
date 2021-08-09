import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import axios from 'axios'
import XMLParser from 'react-xml-parser';
import { useSnackbar } from 'notistack'
import InputAdornment from '@material-ui/core/InputAdornment';

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
            height: '260px !important'
          },
          Page:{
              'background': 'white !important'
          },
          notifications:{
            width: '550px'
        },
        margin:{
            margin: theme.spacing(1)
        },
        loanInfoFields:{
            margin: theme.spacing(1)
      }
    } ))

const Dealership= () => {
    useEffect(() => {  setCarImage("../img/CoveredCar.png")
 
    }, []);
    
    const classes = useStyles()
    const intl = useIntl()
    const { enqueueSnackbar } = useSnackbar()
    const { delay, ServiceBusClient }  = require("@azure/service-bus");

    var [make, setMake] = useState()
    var [model, setModel] = useState()
    var [year, setYear] = useState()
    var [transmission, setTransmission] = useState()
    var [listPrice] = useState();
    var [principal, setPrincipal] = useState(); var [APR, setAPR] = useState(); var [termInMonths, setTermInMonths] = useState();
    var [tax, setTax] = useState(); var [title, setTitle] = useState();
    var [monthlyPayment, setMonthlyPayment] = useState(); var [totalCost, setTotalCost] = useState();
    var [inventory, setInventory] = useState(); 
    var [VID, setVID] = useState(); 
    var [mainText, setMainText] = useState(); 
    var [carImage, setCarImage] = useState()


    var vehicle = {}
    vehicle.LoanInfo = {}
      vehicle.Make = make
      vehicle.Model = model
      vehicle.Transmission = transmission
      vehicle.VYear = year
      vehicle.VID = VID
      vehicle.ListPrice = listPrice
      vehicle.Inventory = inventory
      vehicle.LoanInfo.APR = APR 
      vehicle.LoanInfo.TermInMonths = termInMonths
      vehicle.LoanInfo.Title = title
      vehicle.LoanInfo.Tax = tax
      vehicle.LoanInfo.Principal = principal

    var vehicleJSON = {  } 
    const connectionString = "Endpoint=sb://road-adoherty-servicebus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=4xv4/5kWvSi3Ez/LLKNKnyoLS+78ERuCn2SVDHBcRPo="
    const queueName = "ciccdservicebusqueue"


    const CarImage = async (carChange) => { await axios.get('https://carimagery.com/api.asmx/GetImageUrl?searchTerm=' + carChange).then((formRes) => {
            var xml = new XMLParser().parseFromString(formRes.data); setCarImage(xml.value) })
    }


  const SBRecieveRun = async () => { const sbClient = new ServiceBusClient(connectionString);  var receiver = sbClient.createReceiver(queueName);
      const myMessageHandler = async (messageReceived) => { let _VID = messageReceived.body
          
        enqueueSnackbar(`VID ${_VID} was recieved`, { variant: 'success', autoHideDuration: 3000, anchorOrigin: { vertical: 'top', horizontal: 'center', }, }) 
        setVID(_VID); vehicle.VID = _VID
        vehicle = window.GetVehicleData(vehicle).Vehicle; 
        console.log(vehicle)
        setPrincipal(vehicle.LoanInfo.Principal); setAPR(vehicle.LoanInfo.APR); setTermInMonths(vehicle.LoanInfo.TermInMonths);
        setMake(vehicle.Make); setModel(vehicle.Model); setYear(vehicle.VYear); setTransmission(vehicle.Transmission); setInventory(vehicle.Inventory); 
        setTotalCost(vehicle.PaymentSummary.TotalCost); setMonthlyPayment(vehicle.PaymentSummary.MonthlyPayment);  setTitle(vehicle.LoanInfo.Title); setTax(vehicle.LoanInfo.Tax)
        CarImage(vehicle.Make + " " + vehicle.Model);
        setMainText(`An inquiry for a ${vehicle.VYear} ${vehicle.Make} ${vehicle.Model}, VID: ${_VID}, was just recieved. There are ${vehicle.Inventory} available.`)     
          vehicleJSON = { 
            "vid": _VID,
            "make": vehicle.Make,
            "model": vehicle.Model,
            "vYear": vehicle.VYear,
            "transmission": vehicle.Transmission,
            "inventory": vehicle.Inventory,
            "price": vehicle.ListPrice,
            "warranty": vehicle.Warranty
            }
            const vehicleGetURL = 'https://dealershipswaggerapi.azurewebsites.net/api/Dealership/'  + _VID
            await axios.get(vehicleGetURL).then((formRes) => {
                if(formRes.data.length === 0){ axios.post('https://dealershipswaggerapi.azurewebsites.net/api/Dealership', vehicleJSON).then((formRes) => { console.log(formRes.data.response)})
                }
                else{ axios.put(vehicleGetURL, vehicleJSON).then((formRes) => {console.log(formRes.data.response) })
                }
            })
        }; 
        const myErrorHandler = async (error) => {  }
        receiver.subscribe({ processMessage: myMessageHandler, processError:  myErrorHandler })
        await delay(1000); await receiver.close(); await sbClient.close()
    }

    const buyVehicle = async () => {
      let tempInventory = vehicle.Inventory - 1,                                
      vehicleJSON = { 
        "vid": VID,
        "make": make,
        "model": model,
        "vYear": year,
        "transmission": transmission,
        "inventory": tempInventory,
        "price": totalCost,
        "warranty": vehicle.Warranty
        }
        const vehicleGetURL = 'https://dealershipswaggerapi.azurewebsites.net/api/Dealership/' + VID
        await axios.put(vehicleGetURL, vehicleJSON).then((formRes) => {console.log(formRes.data.response) })
        enqueueSnackbar(`The ${vehicle.VYear} ${vehicle.Make} ${vehicle.Model} has just been purchased, there now ${tempInventory}.`, { variant: 'success', autoHideDuration: 3000, anchorOrigin: { vertical: 'top', horizontal: 'center', }, }) 
    
    }
    const PaymentRules = () =>{
      var payments = window.PaymentRules(vehicle)
      setPrincipal(payments.LoanInfo.Principal); 
      setAPR(payments.LoanInfo.APR); 
      setTermInMonths(payments.LoanInfo.TermInMonths); 
      setTitle(payments.LoanInfo.Title); 
      setTax(payments.LoanInfo.Tax); 
      setTotalCost(payments.PaymentSummary.TotalCost); 
      setMonthlyPayment(payments.PaymentSummary.MonthlyPayment);
      console.log(payments)
    }

    const principalChange = (e) =>{ setPrincipal(e); }
    const APRChange = (e) =>{ setAPR(e);  }
    const termInMonthsChange = (e) =>{ setTermInMonths(e);  }
    const titleChange = (e) =>{ setTitle(e);  }
    const taxChange = (e) =>{ setTax(e);  }
    const TotalCostChange = (e) =>{ setTotalCost(e);  }
    const MonthlyPaymentChange = (e) =>{ setMonthlyPayment(e);   }


    return (

        <Page className = {classes.Page} pageTitle={intl.formatMessage({ id: 'Dealership', defaultMessage: 'Dealership' })} >
           
            <Container className={classes.container}>
             <br/> <br/>
            <Button onClick={SBRecieveRun} variant="contained" color="primary" > {intl.formatMessage({ id: 'SBRecieveRun', defaultMessage: 'Check for new inquires' })} </Button> 

            <br/><br/>
            <img className={classes.carTop} alt="Vehicle" src= {carImage} /> <br/> <br/>

            <br/> <div>{mainText}</div> <br/>
            <FormControl  className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">List Price</InputLabel>
          <Input id="standard-adornment-amount" onChange={e => principalChange(e.target.value)} value={principal} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
        </FormControl>
        <FormControl  className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">APR</InputLabel>
          <Input id="standard-adornment-amount" onChange={e => APRChange(e.target.value)} value={APR} startAdornment={<InputAdornment position="start">%</InputAdornment>} />
        </FormControl>
        <FormControl  className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Term in Months</InputLabel>
          <Input id="standard-adornment-amount" onChange={e => termInMonthsChange(e.target.value)} value={termInMonths} startAdornment={<InputAdornment position="start"></InputAdornment>} />
        </FormControl>
        <br/>
        <FormControl  className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Title</InputLabel>
          <Input id="standard-adornment-amount" onChange={e => titleChange(e.target.value)} value={title} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
        </FormControl>
        <FormControl  className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Tax</InputLabel>
          <Input id="standard-adornment-amount" onChange={e => taxChange(e.target.value)} value={tax} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
        </FormControl>
    
        <br/>
        <FormControl  className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Total Cost</InputLabel>
          <Input id="standard-adornment-amount" onChange={e => TotalCostChange(e.target.value)} value={totalCost} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
        </FormControl>
        <FormControl  className={classes.margin}>
          <InputLabel htmlFor="standard-adornment-amount">Monthly Payment</InputLabel>
          <Input id="standard-adornment-amount" onChange={e => MonthlyPaymentChange(e.target.value)} value={monthlyPayment} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
        </FormControl>

        <br/><br/>
        <Button className={classes.margin} onClick={PaymentRules} variant="contained" > {intl.formatMessage({ id: 'clearForm', defaultMessage: 'Recalculate Payment' })} </Button> 
        
        <Button className={classes.margin} onClick={buyVehicle} variant="contained" color="primary" > {intl.formatMessage({ id: 'clearForm', defaultMessage: 'Buy This Car' })} </Button> <br/> <br/> 
          
          
      </Container>
            
    </Page>
  )
}
export default Dealership