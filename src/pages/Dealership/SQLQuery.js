import React from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'


    
    
const DealershipRES = () => {


    const intl = useIntl()
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
            
        <Button onClick={constSQL} variant="contained" color="primary" > {intl.formatMessage({ id: 'clearForm', defaultMessage: 'Test SQL' })} </Button> <br/> <br/> 
                <br/>
            <div>{constSQL}</div>

        </Container>
    </Page>
    )
}
export default DealershipRES