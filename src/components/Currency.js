import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './styles.css';


const Currency = () => {
    const { dispatch } = useContext(AppContext);
    //const [newCurrency, setCurrency] = useState('$ Dollar')
    
    const OnSelect = (event) => {
        let currency = event.target.value;
        dispatch({
            type: 'CHG_CURRENCY',
            payload: currency
        });
        //setCurrency(currency)
    };
    //<span>Currency in ({newCurrency})  </span>
    return(
        <div className='currencyDiv' style={{ marginLeft: '2rem' }}>
             
             <div className="currencyLabel-prepend">
                <label id= 'currencyLabel' className="currency-select-text" htmlFor="currencySelect">Currency in</label>
            </div>
        <select className="custom-select" id="currencySelect" onChange={OnSelect}>
                <option defaultValue value="$ Dollar" name="$ Dollar">$ Dollar</option>
                <option value="£ Pound" name="£ Pound">£ Pound</option>
                <option value="€ Euro" name="€ Euro">€ Euro</option>
                <option value="₹ Ruppee" name="₹ Ruppee">₹ Ruppee</option>
        </select>
        
        </div>
    );
}

export default Currency;