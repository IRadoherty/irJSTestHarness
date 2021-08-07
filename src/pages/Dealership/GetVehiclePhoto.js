import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import XMLParser from 'react-xml-parser'
import TextField from '@material-ui/core/TextField'

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
        },
          carTop:{
            width: '450px !important',
            height: '250px !important'
          },
          single:{
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
          }
    } ))

const GetVehiclePhoto = () => {
    useEffect(() => { setCarImage("../img/CoveredCar.png")
    },[])

    const classes = useStyles()
    const intl = useIntl()
    var [carImage, setCarImage] = useState()
    var [vehicleMake, setVehicleMake] = useState()
    var [vehicleModel, setVehicleModel] = useState()
    var [carImageURL, setCarImageURL] = useState()

    const CarImage = () => {
        setCarImageURL('http://carimagery.com/api.asmx/GetImageUrl?searchTerm=' + vehicleMake + " " +vehicleModel)
        axios.get('http://carimagery.com/api.asmx/GetImageUrl?searchTerm=' + vehicleMake + " " +vehicleModel).then((formRes) => {
            
            var xml = new XMLParser().parseFromString(formRes.data); 

            setCarImage(xml.value)
        })
    }


    return (
        
        <Page className = {classes.Page} pageTitle={intl.formatMessage({ id: 'Vehicle_Calculator', defaultMessage: 'Vehicle Calculator' })} >
            
            <br/> 
            <Typography component="h1" variant="h6" className = {classes.PageTopText}> {intl.formatMessage({ id: 'GetVehiclePhotoType', 
                defaultMessage: 'This page emulates a GET request to a SOAP API to retrieve a link to an image for a make and model.' })} </Typography>
            <br/>
            
            <Container className={classes.container}>

            <img className={classes.carTop} alt="Car" src= {carImage} /> <br/>
            <br/>
            <TextField className={classes.single} id="outlined-textarea" label="Make" placeholder="Make" multiline variant="outlined"
                 onInput={(e) => setVehicleMake(e.target.value)}  />

            <TextField className={classes.single} id="outlined-textarea" label="Model" placeholder="Model" multiline variant="outlined"
                 onInput={(e) => setVehicleModel(e.target.value)} />
                 <br/><br/>
        <div> {carImageURL}</div><br/>
            <br/>
            <Button className={classes.single} onClick={CarImage} variant="contained" color="primary" >
              {intl.formatMessage({ id: 'clearForm', defaultMessage: 'Set Car Image' })}
            </Button> 
         
            </Container>
        </Page>
        )
}
export default GetVehiclePhoto