import Button from '@material-ui/core/Button'
import Page from 'material-ui-shell/lib/containers/Page'
import { useIntl } from 'react-intl'
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

const ServiceBusRecieve = () => {

  const classes = useStyles()
  const intl = useIntl()



  const { delay, ServiceBusClient } = require("@azure/service-bus");

// connection string to your Service Bus namespace
    const connectionString = "Endpoint=sb://road-adoherty-servicebus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=4xv4/5kWvSi3Ez/LLKNKnyoLS+78ERuCn2SVDHBcRPo="
    const queueName = "ciccdservicebusqueue"

    const SBRecieveRun = async () => {
	// create a Service Bus client using the connection string to the Service Bus namespace
	const sbClient = new ServiceBusClient(connectionString);

	// createReceiver() can also be used to create a receiver for a subscription.
	const receiver = sbClient.createReceiver(queueName);

	// function to handle messages
	const myMessageHandler = async (messageReceived) => {
		alert(`Received message: ${messageReceived.body}`);
	};

	// function to handle any errors
	const myErrorHandler = async (error) => {
		console.log(error);
	};

	// subscribe and specify the message and error handlers
	receiver.subscribe({
		processMessage: myMessageHandler,
		processError: myErrorHandler
	});

	// Waiting long enough before closing the sender to send messages
	await delay(20000);

	await receiver.close();	
	await sbClient.close();
}    



  return (
    <Page pageTitle={intl.formatMessage({ id: 'ServiceBusTest', defaultMessage: 'Service Bus Test' })} >
      <div className={classes.container}>

        <Typography component="h3" variant="h6">
          {intl.formatMessage({ id: 'loan_intro', defaultMessage: 'This mortgage rule application example uses an Azure Function to call a rule applicatinm using irJavascript' })}
        </Typography>
        <br/>

         <form className={classes.form}  >   
         <Typography component="h1" variant="h5"> {intl.formatMessage({ id: 'monthlyPayment', defaultMessage: 'Montly Payment' })} </Typography>
          <br/>


          <Button onClick={SBRecieveRun}  variant="contained" color="primary" className={classes.submit}>
          {intl.formatMessage({ id: 'submit_mortgage_form', defaultMessage: 'Calculate Mortgage' })}
          </Button>

         </form>
        </div>

    </Page>
  )
}
export default ServiceBusRecieve


