import classes from './TotalExpenses.module.css';
import {CSVLink} from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { premiumActions } from '../../../Store/PremiumBtn';

const TotalExpenses =(props) => {
    const items = useSelector(state=>state.itemsData.itemList);
    const isPremium = useSelector(state=>state.premium.isPremium)
    const pActive= useSelector(state=>state.premium.preminumValue)
    const dispatch = useDispatch();
    let totalAmount=0;
    items.map((element)=>{
     totalAmount += Number(element.enteredMoney);
    })

  if(totalAmount>10000 ){
    dispatch(premiumActions.PremiumBtnActive());
  }else{
    dispatch(premiumActions.PremiumBtnDeactive())
  }

  const csvData = [...items];
    return (
            <div className={classes.maindiv}>
                <div>
                <h2>Total Expenses</h2>
            </div>
            <div className={classes.amountdiv}>
                <label>{totalAmount}.00</label>
            </div>
            {isPremium && <div className={classes.preminumDiv}>
            <button className={classes.preminumBTN}>Premium Button.</button>
            </div>}

            {pActive && <div className={classes.downloadBtnDiv}><CSVLink data={csvData}><button className={classes.downloadBtn}>🡇 Download File</button></CSVLink></div>}
        </div>
    );
};

export default TotalExpenses;