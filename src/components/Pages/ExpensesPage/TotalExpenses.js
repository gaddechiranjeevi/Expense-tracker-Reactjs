import classes from './TotalExpenses.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { premiumActions } from '../../../Store/PremiumBtn';

const TotalExpenses =(props) => {
    const items = useSelector(state=>state.itemsData.itemList);
    const isPremium = useSelector(state=>state.premium.isPremium)
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
        </div>
    );
};

export default TotalExpenses;