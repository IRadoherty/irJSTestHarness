import Button from '@material-ui/core/Button'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
    alignItems: 'left',
    width: '500px',
  },
  submit: {
    margin: theme.spacing(2.5, 0, 2),
    alignItems: 'left',
  },
  container: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(5),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'left',
    height: `100%`,
  },
  paymentSummaryClass:{
    width: '500px',
    left: '400px',
    'margin-top': '-308px',
    position: 'relative'
  },
  textFieldClass:{
    marginTop: theme.spacing(0),
    height: '50px',
    'font-weight': 'normal'
  },
  paymentSummaryTypography:{
    alignItems: 'center',
    marginTop: theme.spacing(-1),
    height: '50px',
  }

}))

const ServiceBusSend = () => {

  const classes = useStyles()
  const intl = useIntl()
  const [principal, setPrincipal] = useState('')
  const [termInYears, setTermInYears] = useState('')
  const [APR, setAPR] = useState('')
  const { ServiceBusClient } = require("@azure/service-bus")
  const [serviceBusMessage, setServiceBusMessage] = useState('')
  const [error, setError] = useState('')
  
    const connectionString = "Endpoint=sb://road-adoherty-servicebus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=4xv4/5kWvSi3Ez/LLKNKnyoLS+78ERuCn2SVDHBcRPo="
    const queueName = "ciccdservicebusqueue"
   
    
    const runservicebus = async () => {
      var message = [
        { body: serviceBusMessage, 
          contentType: "application/json"
      }
     ]
        const sbClient = new ServiceBusClient(connectionString);
        const sender = sbClient.createSender(queueName)
    if (serviceBusMessage === "") {
      setServiceBusMessage("Default Message, sent from React page")
    }
    alert(message.body)
    try {
      let batch = await sender.createMessageBatch()
      for (let i = 0; i < message.length; i++) {
          if (!batch.tryAddMessage(message[i])) {			
              await sender.sendMessages(batch);
              batch = await sender.createMessageBatch();
              if (!batch.tryAddMessage(message[i])) {
                throw new Error("Message too big to fit in a batch")
              }
          }
      }
      await sender.sendMessages(message)
      await sender.close();
      } 
      finally {
          await sbClient.close()
      }
    }


  return (
    <Page pageTitle={intl.formatMessage({ id: 'ServiceBusTest', defaultMessage: 'Service Bus Test' })} >
      <div className={classes.container}>

        <Typography component="h3" variant="h6">
          {intl.formatMessage({ id: 'loan_intro', 
          defaultMessage: 'This page sends a body to a service bus in Azure' })}
        </Typography>
        <br/>


          <TextField id="outlined-textarea" label="Service Bus Message" placeholder="Placeholder" multiline variant="outlined"
          value={serviceBusMessage} onInput={(e) => setServiceBusMessage(e.target.value)} 
          onChange={event => serviceBusMessage.setState({ text: event.target.value })}
          error={serviceBusMessage === ""} helperText={serviceBusMessage === "" ? 'Empty field!' : ' '}
           />
        <br/>

        <br/>
          <Button onClick={runservicebus}  variant="contained" color="primary" className={classes.submit}>
          {intl.formatMessage({ id: 'submitServiceBus', defaultMessage: 'Send message to Service Bus' })}
          </Button>

        </div>

    </Page>
  )
}
export default ServiceBusSend


