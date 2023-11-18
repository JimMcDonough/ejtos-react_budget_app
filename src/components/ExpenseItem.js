import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';
import './styles.css';
const ExpenseItem = (props) => {
    const { dispatch,currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });

    }

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'RED_EXPENSE',
            payload: expense
        });

    }

    return (
        <tr>
        <td>{props.name}</td>
        <td>{currency}{props.cost}</td>
        <td><button id='increase' onClick={event=> increaseAllocation(props.name)} style={{
            height: '40px', 
            width: '40px', 
            borderRadius: '50%',  
            backgroundColor: 'green',   
            color: 'white', 
            fontWeight: 'bold',
            fontSize: '28px', 
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex' }}>+</button></td>
         <td><button id='increase' onClick={event=> decreaseAllocation(props.name)} style={{
            height: '40px', 
            width: '40px', 
            borderRadius: '50%',  
            backgroundColor: 'red',   
            color: 'white', 
            fontWeight: 'bold',
            fontSize: '28px', 
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex' }}>-</button></td>
        <td><TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete></td>
        </tr>
    );
};

export default ExpenseItem;
