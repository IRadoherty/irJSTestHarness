import Button from '@material-ui/core/Button'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import NativeSelect from '@material-ui/core/NativeSelect'
import { useSnackbar } from 'notistack'

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

const ServiceBus = () => {

  const classes = useStyles()
  const intl = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const [serviceBusMessage, setServiceBusMessage] = useState('')
  const [serviceBusReturn, setServiceBusReturn] = useState('')
  const { delay, ServiceBusClient }  = require("@azure/service-bus");
  var [sendChoice, setSendChoice] = useState('')
  var [messageText, setMessageText] = useState('')


  const handleSendChoice = (event) => { setSendChoice(event.target.value) }
  const handleClear = () => { setServiceBusReturn(""); setServiceBusMessage(""); }

    const connectionString = "Endpoint=sb://road-adoherty-servicebus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=4xv4/5kWvSi3Ez/LLKNKnyoLS+78ERuCn2SVDHBcRPo="
    const queueName = "ciccdservicebusqueue"
    const topicName = "cicdservicebustopic"
    const subscriptionName2 = "cicd_service_subscription2"

    const runServiceBus = async () => {
        await setServiceBusReturn(""); 
        const sbClient = new ServiceBusClient(connectionString); var sender = ""
        var message = [ { body: serviceBusMessage, contentType: "application/json" } ]
        // eslint-disable-next-line default-case
        switch(sendChoice){
          case sendChoice = "Queue": sender = sbClient.createSender(queueName); 
            setMessageText(`This message was sent using a ${sendChoice}. The returned message is: `); break
          case sendChoice = "Topic": sender = sbClient.createSender(topicName); 
            setMessageText(`This message was sent using a ${sendChoice} using a subscription. The returned message is: `); break
        }

        try {
          let batch = await sender.createMessageBatch()
          for (let i = 0; i < message.length; i++) {
              if (!batch.tryAddMessage(message[i])) {			
                  await sender.sendMessages(batch)
                  batch = await sender.createMessageBatch()
                  if (!batch.tryAddMessage(message[i])) { throw new Error("Message too big to fit in a batch") }
          }}
            enqueueSnackbar(`Sent "${serviceBusMessage}" to service bus successfully`, { variant: 'success', autoHideDuration: 1000, anchorOrigin: { vertical: 'top', horizontal: 'center', }, }) 
            await sender.sendMessages(message); await sender.close()
        } 
          finally { await sbClient.close() }
      }

    const SBRecieveRun = async () => { const sbClient = new ServiceBusClient(connectionString); var receiver = ""
      // eslint-disable-next-line default-case
      switch(sendChoice){
        case sendChoice = "Queue": receiver = sbClient.createReceiver(queueName); break
        case sendChoice = "Topic": receiver = sbClient.createReceiver(topicName, subscriptionName2); break
      }
      const myMessageHandler = async (messageReceived) => { setServiceBusReturn(messageText + '"'+ messageReceived.body + '"')}
      const myErrorHandler = async (error) => { enqueueSnackbar(error, { variant: 'error', autoHideDuration: 1000, anchorOrigin: { vertical: 'top', horizontal: 'center', }, }) 
    }
      receiver.subscribe({
        processMessage: myMessageHandler,
        processError:  myErrorHandler
      })
      await delay(20000); await receiver.close(); await sbClient.close()
    }

  return (
    <Page pageTitle={intl.formatMessage({ id: 'ServiceBusTest', defaultMessage: 'Service Bus Test' })} >
      <div className={classes.container}>

        <Typography component="h3" variant="h6">
          {intl.formatMessage({ id: 'loan_intro', defaultMessage: 'Use the fields below to send a message to a service bus using a queue or topic.' })}
        </Typography>
        <br/> <br/>

        Choose a topic or queue: <NativeSelect id = "sendID" onChange={handleSendChoice}><option />
                <option value="Queue" > Queue </option>
                <option value="Topic" > Topic </option>
                </NativeSelect>
        <br/><br/>
        <TextField id="outlined-textarea" label="Send Message" placeholder="message" multiline variant="outlined"
          value={serviceBusMessage} onInput={(e) => setServiceBusMessage(e.target.value)} />
        <br/> 
          <Button onClick={runServiceBus} variant="contained" color="primary" className={classes.submit}> {intl.formatMessage({ id: 'submitServiceBus', defaultMessage: 'Send to Service Bus' })}
          </Button>
        <div>
        <br/><br/><br/>
      <Typography component="h3" variant="h6"> {intl.formatMessage({ id: 'loan_intro', 
        defaultMessage: 'The below form pulls messages sent to the service bus above from a queue or topic with a subscription. If using a topic you must select a subscription.' })}
      </Typography>
      <br/>

      <br/>
      {serviceBusReturn}
      <br/>
        <Button onClick={SBRecieveRun} variant="contained" color="primary" className={classes.submit}> {intl.formatMessage({ id: 'recieveServiceBus', defaultMessage: 'Activate Listener for 20000' })}
        </Button>
        </div>
        <Button onClick={handleClear} variant="contained" color="primary" className={classes.submit}> {intl.formatMessage({ id: 'recieveServiceBus', defaultMessage: 'Clear Fields' })}
        </Button>
      </div>
    </Page>
  )
}
export default ServiceBus


