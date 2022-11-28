import classes from './TotalExpenses.module.css';
import {CSVLink} from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import { premiumActions } from '../../../Store/PremiumBtn';
import axios from "axios";

const TotalExpenses =() => {
    const items = useSelector((state) =>state.itemsData.itemList);
    const isPremium = useSelector((state)=>state.premium.isPremium)
    const pActive= useSelector((state)=>state.premium.preminumValue)
    const dispatch = useDispatch();
    let totalAmount=0;

    const token = localStorage.getItem("JWTTOKEN");
    const userName = localStorage.getItem('username');
    const userEmail = localStorage.getItem('email');


  items.map((element) => {
    totalAmount += Number(element.amount);
  });

  const activatePreminum = () => {
    console.log("activate");
    dispatch(premiumActions.activatePremium()); 
  };

  const csvData = [...items];

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("http://localhost:3000/auth/api/payment",'',{ headers: { Authorization: token } });
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.RAZORPAY_KEY_SECRET, 
      amount: amount.toString(),
      currency: currency,
      name: userName,
      description: "Test Transaction",
      
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:7777/auth/api/payment/sucess",
          data,
          { headers: { Authorization: token } }
        );
        activatePreminum()
        alert(result.data.msg);
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: "",
      },
      notes: {
        address: "",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

    return (
            <div className={classes.maindiv}>
                <div>
                <h2>Total Expenses</h2>
            </div>
            <div className={classes.amountdiv}>
                <label>{totalAmount}.00</label>
            </div>
            {true && (
              <div className={classes.preminumDiv}>
              <button className={classes.preminumBTN} onClick={displayRazorpay}>{false ? "Premium Button." : "Buy Premium Features"}</button>
            </div>)}

            {pActive && (<div className={classes.downloadBtnDiv}><CSVLink data={csvData}><button className={classes.downloadBtn}>🡇 Download File</button></CSVLink>{" "}</div>)}
        </div>
    );
};

export default TotalExpenses;