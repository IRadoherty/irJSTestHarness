import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { blue } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
        Page:{ 
            //'background-color': '#ffffff !important',
        },
        container: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginTop: theme.spacing(5),
            //'background-color': '#ffffff !important',
        },
        PageTopText: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginTop: theme.spacing(5),
            color: blue
        },
        textField:{
            color: blue,
            padding: '3px',
            height: '42px',
            'flex-direction': 'inherit !important',
            'margin-bottom': '-15px'
        },
        button: {
            margin: theme.spacing(2),
            'margin-left': '-12px'
        },
        logging:{
            width: '450px',
            left: '400px',
            'margin-top': '-608px',
            position: 'relative'
          },
        notifications:{
            width: '110px'
        },
        Results:{
           'font-weight': 'bold',
        },
        FixedAmount:{
            width: '550px'
        },
        BasisPoints:{
            width: '550px'
        },
        presets:{
            width: '210px'
        },
        dateField:{
            width: '225px',
            'margin-left': '10px'
        },
        buttonRunX:{
            'margin-left': '-13px',
        }
    } ))

const MCAPPolicy = () => {
    useEffect(() => { 
       
     })
    const classes = useStyles()
    const intl = useIntl()

    var [InvestorNumber, setInvestorNumber] = useState()	
    var [InvestorSub, setInvestorSub] = useState()	
    var [LineOfBusiness, setLineOfBusiness] = useState()	
    var [Brand, setBrand] = useState()	
    var [ChargeType, setChargeType] = useState()	
    var [ProductCode, setProductCode] = useState()	
    var [TrancheID, setTrancheID] = useState()	
    var [SourceOfFunds, setSourceOfFunds] = useState()	
    var [BorrowerContractDate, setBorrowerContractDate] = useState()	
    var [CommitmentIssueDate, setCommitmentIssueDate] = useState()	
    var [ProductID, setProductID] = useState()	
    var [InsuranceType, setInsuranceType] = useState()
    var [BasisPoints, setBasisPoints] = useState()	
    var [FixedAmount, setFixedAmount] = useState()
    var [runCount, setRunCount] = useState()
    var [todaysDate] = useState()
    var policy = {}; 

    const getData = async ()=>{
        fetch('../InvestorServicingFeeSample.json'
        ,{ headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){ console.log(response)
           
            return response.json();
          })
          .then(function(myJson) { console.log(myJson);
            setData(myJson)
          });
      }
    const [data,setData]=useState([]);
    var [ruleTime, setRuleTime] = useState(); 
    var [funcTime] = useState()

    const ruleStartT= () => {return performance.now()}; const ruleStopT= (t) => {setRuleTime(`Rule Execution Time: ${performance.now() - t}  ms.`)}

    const runPolicy = () => { 
        policy.InvestorNumber = InvestorNumber; policy.InvestorSub = InvestorSub; policy.LineOfBusiness = LineOfBusiness; policy.Brand = Brand
        policy.ChargeType = ChargeType; policy.ProductCode = ProductCode; policy.TrancheID = TrancheID; policy.SourceOfFunds = SourceOfFunds	
        policy.BorrowerContractDate = BorrowerContractDate; policy.CommitmentIssueDate = CommitmentIssueDate; policy.ProductID = ProductID; policy.InsuranceType = InsuranceType
        policy.BasisPoints = ""; policy.FixedAmount = ""
        var t = ruleStartT();
        let returnPolicyData = window.runMCAPPolicy(policy);
        ruleStopT(t)
        setBasisPoints(returnPolicyData.BasisPoints); setFixedAmount(returnPolicyData.FixedAmount)
        ruleStopT(t)

    }
    const runXTimes = () => { 
        policy.InvestorNumber = InvestorNumber; policy.InvestorSub = InvestorSub; policy.LineOfBusiness = LineOfBusiness; policy.Brand = Brand
        policy.ChargeType = ChargeType; policy.ProductCode = ProductCode; policy.TrancheID = TrancheID; policy.SourceOfFunds = SourceOfFunds	
        policy.BorrowerContractDate = BorrowerContractDate; policy.CommitmentIssueDate = CommitmentIssueDate; policy.ProductID = ProductID; policy.InsuranceType = InsuranceType
        policy.BasisPoints = ""; policy.FixedAmount = ""
        var returnPolicyData = {}
        var t = ruleStartT();
        for (var i = 0; i < runCount; i++) { returnPolicyData = window.runMCAPPolicy(policy); }
        setBasisPoints(returnPolicyData.BasisPoints); 
        setFixedAmount(returnPolicyData.FixedAmount)
        ruleStopT(t)
    }

    const loadFile = () => {
        policy.InvestorNumber = InvestorNumber; policy.InvestorSub = InvestorSub; policy.LineOfBusiness = LineOfBusiness; policy.Brand = Brand
        policy.ChargeType = ChargeType; policy.ProductCode = ProductCode; policy.TrancheID = TrancheID; policy.SourceOfFunds = SourceOfFunds	
        policy.BorrowerContractDate = BorrowerContractDate; policy.CommitmentIssueDate = CommitmentIssueDate; policy.ProductID = ProductID; policy.InsuranceType = InsuranceType
        policy.BasisPoints = ""; policy.FixedAmount = ""
        getData()
    }
    const runFile = () => {
        policy.BasisPoints = ""; policy.FixedAmount = ""
        var returnPolicyData = {}
        var t = ruleStartT();
        for (var i = 0; i < data.length; i++) {
            policy.InvestorNumber = data[i].InvestorNumber; 
            policy.InvestorSub = data[i].InvestorSub; 
            policy.LineOfBusiness = data[i].LineOfBusiness; 
            policy.Brand = data[i].Brand
            policy.ChargeType = data[i].ChargeType; 
            policy.ProductCode = data[i].ProductCode; 
            policy.TrancheID = data[i].TrancheID; 
            policy.SourceOfFunds = data[i].SourceOfFunds	
            policy.BorrowerContractDate = data[i].BorrowerContractDate; 
            policy.CommitmentIssueDate = data[i].CommitmentIssueDate; 
            policy.ProductID = data[i].ProductID; 
            policy.InsuranceType = data[i].InsuranceType
            
            returnPolicyData = window.runMCAPPolicy(policy); 
            setBasisPoints(returnPolicyData.BasisPoints); 
            setFixedAmount(returnPolicyData.FixedAmount)
        }
        ruleStopT(t)

    }
    const clearForm = () => { setRunCount("")
        setInvestorNumber(""); setInvestorSub(""); setLineOfBusiness(""); setBrand(""); setChargeType(""); setProductCode(""); setTrancheID(""); setSourceOfFunds(""); 
        setBorrowerContractDate(""); setCommitmentIssueDate(""); setProductID(""); setInsuranceType(""); setBasisPoints(""); setFixedAmount("")
    
    }
    const preset1 = () => { 
    setInvestorNumber(1); setInvestorSub(""); setLineOfBusiness("RA"); setBrand("MA"); setChargeType(""); setProductCode(""); setTrancheID(""); setSourceOfFunds(""); 
    setBorrowerContractDate(""); setCommitmentIssueDate(""); setProductID(""); setInsuranceType(""); setBasisPoints(""); setFixedAmount("")

}
    return (
        <Container className={classes.container}>
      
        <Typography component="h3" variant="h6" className = {classes.PageTopText}> {intl.formatMessage({ id: 'paymentSummary', 
           defaultMessage: 'Use the fields below to test the performance of irJS when running rules.' })} </Typography>
          <br/>

            <TextField className={classes.textField} id="outlined-textarea" label="Investor Number" variant="outlined"
                value={InvestorNumber} onInput={(e) => setInvestorNumber(e.target.value)} />
                <br/><br/>
            <TextField className={classes.textField} id="outlined-textarea" label="Investor Sub"   variant="outlined"
                value={InvestorSub} onInput={(e) => setInvestorSub(e.target.value)} />
                <br/><br/>
            <TextField className={classes.textField} id="outlined-textarea" label="Line Of Business"   variant="outlined"
                value={LineOfBusiness} onInput={(e) => setLineOfBusiness(e.target.value)} />
                <br/><br/>
            <TextField className={classes.textField} id="outlined-textarea" label="Brand"   variant="outlined"
                value={Brand} onInput={(e) => setBrand(e.target.value)} />
                <br/><br/>
            <TextField className={classes.textField} id="outlined-textarea" label="ChargeType"   variant="outlined"
                value={ChargeType} onInput={(e) => setChargeType(e.target.value)} />
                <br/><br/>
            <TextField className={classes.textField} id="outlined-textarea" label="Product Code"   variant="outlined"
                value={ProductCode} onInput={(e) => setProductCode(e.target.value)} />
                <br/><br/>
            <TextField className={classes.textField} id="outlined-textarea" label="Tranche ID"   variant="outlined"
                value={TrancheID} onInput={(e) => setTrancheID(e.target.value)} />
                <br/><br/>
            <TextField className={classes.textField} id="outlined-textarea" label="Source Of Funds"   variant="outlined"
                value={SourceOfFunds} onInput={(e) => setSourceOfFunds(e.target.value)} />
                <br/><br/>
            <TextField id="BorrowerContractDate" label="Borrower Contract Date" type="date" defaultValue= {todaysDate} 
                className={classes.dateField} InputLabelProps={{ shrink: true, }} onInput={(e) => setCommitmentIssueDate(e.target.value)}/>
                <br/><br/>
            <TextField id="CommitmentIssueDate" label="Commitment Issue Date" type="date" defaultValue= {todaysDate} 
                className={classes.dateField} InputLabelProps={{ shrink: true, }}  onInput={(e) => setCommitmentIssueDate(e.target.value)}/>
                <br/><br/>
            <TextField className={classes.textField} id="outlined-textarea" label="Product ID"   variant="outlined"
                value={ProductID} onInput={(e) => setProductID(e.target.value)} />
                <br/><br/>
            <TextField className={classes.textField} id="outlined-textarea" label="Insurance Type"   variant="outlined"
                value={InsuranceType} onInput={(e) => setInsuranceType(e.target.value)} />
                <br/><br/>
            <Button onClick={runPolicy} className={classes.button} variant="contained" color="primary" > {intl.formatMessage({ id: 'PolicyButton', defaultMessage: 'Run Policy' })} </Button>
            <Button onClick={clearForm} className={classes.button} variant="contained" color="primary" > {intl.formatMessage({ id: 'ClearForm', defaultMessage: 'Clear Form' })} </Button>
         
                <div className={classes.logging}><p className={classes.Results}> Results: </p>
                    <div> 
                        <span className={classes.BasisPoints}>BasisPoints: {BasisPoints}</span><br/>
                        <span className={classes.FixedAmount}>FixedAmount: {FixedAmount}</span><br/>  
                    </div>
                <div>{ruleTime} </div> <div>{funcTime} </div> <br/>
            
                <br/><br/>
                <div ><p className={classes.runCountText}> Use the "Policy Run Count" field below to run the policy by the amount of times entered: </p> </div>
            <TextField className={classes.textField} id="outlined-textarea" label="Policy Run Count" variant="outlined"
                value={runCount}  onInput={(e) => setRunCount(e.target.value)} />
                <br/> <br/>
                <br/>
            <Button onClick={runXTimes} className={classes.buttonRunX} variant="contained" color="primary" > {intl.formatMessage({ id: 'runXTimes', defaultMessage: `Run policy ${runCount} times` })} </Button> <br/> <br/>
            
            <div> <br/><br/>
              <Button onClick={loadFile} className={classes.presets1} variant="contained" color="primary" > {intl.formatMessage({ id: 'runFile', defaultMessage: "Load JSON file" })} </Button> <br/> <br/>
            <Button onClick={runFile} className={classes.presets1} variant="contained" color="primary" > {intl.formatMessage({ id: 'runFile1', defaultMessage: "Run JSON file" })} </Button> <br/> <br/>
            <Button onClick={preset1} className={classes.presets1} variant="contained" color="primary" > {intl.formatMessage({ id: 'preset1', defaultMessage: "Preset 1" })} </Button> <br/> <br/>
        
            </div>
            </div>
           </Container>

     
        )
}
export default MCAPPolicy