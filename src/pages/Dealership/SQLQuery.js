import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'


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


    
    
const DealershipRES = () => {

    const classes = useStyles()
    const intl = useIntl()

    var [bodySQL, setBodySQL] = useState()
    const sql = require('mssql')
    const constSQL = async () => {
        
            try {
                // make sure that any items are correctly URL encoded in the connection string
                await sql.connect('Server=tcp:road-adoherty.database.windows.net,1433;Initial Catalog=IntegrationTrainingAPI;Persist Security Info=False;User ID=adoherty;Password=ROADroad1234;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;')
                const result = await sql.query`select * from EmployeeDatabase`
                console.dir(result)
            } catch (err) {
                console.dir(err)
                // ... error checks
            }
         
        }
    
    return (
    <Page>
        <Container>
            
        <Button onClick={constSQL} variant="contained" color="primary" > {intl.formatMessage({ id: 'clearForm', defaultMessage: 'Buy This Vehicle' })} </Button> <br/> <br/> 
                <br/>
            <div>{constSQL}</div>

        </Container>
    </Page>
    )
}
export default DealershipRES