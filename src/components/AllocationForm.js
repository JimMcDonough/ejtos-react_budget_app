import React, { useContext, useState } from 'react'; //useContest and useState to share state in nested components
import { AppContext } from '../context/AppContext';  //import AppContext for use

const AllocationForm = (props) => {
    const { dispatch,remaining,currency  } = useContext(AppContext);  //use dispatch and remaining from context

    const [name, setName] = useState('');  //function setName that updates name
    const [cost, setCost] = useState(''); //function setCost that updates cost
    const [action, setAction] = useState('');  //function setAction that updates action

    const submitEvent = () => {  //compare cost to remaining value; alert if too much money

        if(cost > remaining) {
            alert("The value cannot exceed remaining funds  £"+remaining);
            setCost("");
            return;
        }
        
        const expense = {  //use name state and turn cost to int
            name: name,
            cost: parseInt(cost),
        };
        if(action === "Reduce") {  //use dispatch to call reducer function from context
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
                dispatch({
                    type: 'ADD_EXPENSE',
                    payload: expense,
                });
            }
    };

    return (  //This html returms the bottom portion of the page
        <div>
            <div className='row'>

            <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Marketing" name="marketing"> Marketing</option>
                <option value="Sales" name="sales">Sales</option>
                <option value="Finance" name="finance">Finance</option>
                <option value="HR" name="hr">HR</option>
                <option value="IT" name="it">IT</option>
                <option value="Admin" name="admin">Admin</option>
                  </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add" name="Add">Add</option>
                <option value="Reduce" name="Reduce">Reduce</option>
                  </select>

                  <div className="currencyAllocationGroup" style={{ marginLeft: '2rem' }}>
                  <label className="currencyAllocationLabel" htmlFor="currencyAllocationLabel">{currency}</label>
                    </div>
                    <input
                        required='required'
                        type='number'  //already forced to be a number
                        id='cost'
                        value={cost}
                        style={{ size: 10}}
                        onChange={(event) => setCost(event.target.value)}>
                    </input>

                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
                </div>

        </div>
    );
};

export default AllocationForm