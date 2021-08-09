import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'

    const useStyles = makeStyles((theme) => ({
        container: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginTop: theme.spacing(5),
            width: '500px'
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

const GetGasPrices = () => {

    const classes = useStyles()
    const intl = useIntl()
    var [state, setState] = useState()
    var [gasPrices, setGasPrices] = useState()

    const CarImage = () => {
        const headers = { headers: { 'authorization': 'apikey 3bLRTdEolZLhlScVEw9YTv:1rhH09yY7x4gWPYYIJV13k', 'Accept': 'application/json', 'Content-Type': 'application/json' } }

        axios.get('https://api.collectapi.com/gasPrice/stateUsaPrice?state=' + state, headers).then((formRes) => {
            
            setGasPrices(JSON.stringify(formRes.data))
        })
    }


    return (
        
        <Page className = {classes.Page} pageTitle={intl.formatMessage({ id: 'Vehicle_Calculator', defaultMessage: 'Vehicle Calculator' })} >
            
            <br/> 
            <Typography component="h1" variant="h6" className = {classes.PageTopText}> {intl.formatMessage({ id: 'GetVehiclePhotoType', 
                defaultMessage: "This page emulates a GET request to a REST API to retrieve today's gas prices for a given state. There is an AUTH header which requires authentication." })} </Typography>
            <br/>
            
            <Container className={classes.container}>
            <br/>
            <TextField className={classes.single} id="outlined-textarea" label="State Abbreviation" placeholder="State Abbreviation" multiline variant="outlined"
                 onInput={(e) => setState(e.target.value)}  />

                 <br/><br/>
                <div className={classes.container}><pre >{gasPrices}</pre></div><br/>
            <br/>
            <Button className={classes.single} onClick={CarImage} variant="contained" color="primary" >
              {intl.formatMessage({ id: 'clearForm', defaultMessage: `Get Gas Prices for ${state}` })}
            </Button> 
         
            </Container>
        </Page>
        )
}
export default GetGasPrices