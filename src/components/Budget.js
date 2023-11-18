import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget,expenses,currency } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    let allocateAlready = expenses.reduce(
        (previousTotal, expense) => {
            return previousTotal + expense.cost
        },0
    );
    

    const handleBudgetChange = (event) => {
        let value = event.target.value;
        // If the input value exceeds 20000, limit it to 20000
        if (value > 20000) {

            window.alert("Budget cannot exceed 20000");
            value = 20000;
            
        }

        if (value < allocateAlready){
            window.alert("You cannot reduce budget value lower than spending!");
            value = allocateAlready

        }
        setNewBudget(value);
    }
    const isAtLimit = newBudget >= 20000; // Check if the budget is at the limit

    const scrollIndicatorStyles = {
        color: isAtLimit ? '#808080' : '#404040', // Light grey and dark grey colors
    };



    return (
        <div className='alert alert-secondary'>
        <span>Budget:{currency}</span>
        <input type="number" step="10" value={newBudget} onChange={handleBudgetChange} max={20000}></input>
        <span style={scrollIndicatorStyles}>↑↓</span> {/* Indicator arrows with conditional style */}
        </div>
        );
    };
    export default Budget;
    