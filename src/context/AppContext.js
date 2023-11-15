import React, { createContext, useReducer } from 'react'; 
/*
React context allows us to pass down and use (consume) data in whatever component we need in our 
React app without using props.In other words, React context allows us to share data (state) across 
our components more easily.

The useReducer Hook is similar to the useState Hook. It allows for custom state logic.If you find 
yourself keeping track of multiple pieces of state that rely on complex logic, useReducer may be 
useful. useReducer(<reducer>, <initialState>)
*/

 // 5. The reducer - this is used to update the state, based on the action
 //action has a property type that is a string
 //action has a property payload and payload has a property cost;  
 //payload has name property
 //state has a property expenses that is an array; 
 //state has a property budget
export const AppReducer = (state, action) => {
    let budget = 0; //local variable
    switch(action.type){
        case 'ADD_EXPENSE':   //calculates total budget;if the total is less than budget update expense in expenses and returns expense item; if over budget send alert
            let total_budget = 0;   //local variable
            //each element in state.expenses has a cost property that gets added
            total_budget = state.expenses.reduce(       
                (previousExp, currentExp) => {
                    return previousExp + currentExp.cost
                },0     //0 is the intial value for previousExp
            );
            total_budget = total_budget + action.payload.cost;
            action.type = "DONE";
            if(total_budget <= state.budget) {  //compare calculated total to state.budget
                total_budget = 0;   //reset total_budget
                //The most notable difference between this operator and the equality (==) operator is that 
                //if the operands are of different types, the == operator attempts to convert them to the 
                //same type before comparing.  loop and find expense name equal to payload name and add
                //currentExp cost to payload cost to return; returns the new array does not overwrite
                state.expenses.map((currentExp)=> {  //doesn't seem like we are saving new expenses
                    if(currentExp.name === action.payload.name) {
                        currentExp.cost = action.payload.cost + currentExp.cost;
                    }
                    return currentExp 
                });
                return {
                    ...state, //Using ...state within the return of an update function would create a new object with the exact same properties and values as the original state object. 
                };
            } else {  //if total_budget is greater than state.budget send alert
                alert("Cannot increase the allocation! Out of funds");
                return {
                    ...state
                }
        }
        case 'RED_EXPENSE': //loop through and make new red_expense array check current expense minus new expense is positiove
            const red_expenses = state.expenses.map((currentExp)=> {
                if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                    currentExp.cost =  currentExp.cost - action.payload.cost;
                    budget = state.budget + action.payload.cost
                }
                return currentExp
            })
            action.type = "DONE";
            return {  
                ...state,
                expenses: [...red_expenses],  //return copy of state and and overwrites expenses
            };
        case 'DELETE_EXPENSE': 
        action.type = "DONE";   //loop through add money back to budget, set expense to 0, state not updated?
        state.expenses.map((currentExp)=> {
            if (currentExp.name === action.payload) {  //missing name?
                budget = state.budget + currentExp.cost
                currentExp.cost =  0;
            }
            return currentExp
        })
        action.type = "DONE";
        return {
            ...state,
            budget      //budget gets updated with budget; shorthand javascript assignment
        };
        case 'SET_BUDGET':
            action.type = "DONE";
            state.budget = action.payload;  //payload is an object itself; does this make sense?

            return {
                ...state,
            };
        case 'CHG_CURRENCY':  //functionality does not look implemented
            action.type = "DONE";
            state.currency = action.payload;  
            return {
                ...state
            }
            default:
                return state;
    }

};
//this looks like the state object that gets past and updates
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState); //useReducer with AppReducer and initial state
    let remaining = 0;

    if (state.expenses) {
            const totalExpenses = state.expenses.reduce((total, item) => {
            return (total = total + item.cost);
        }, 0);
        remaining = state.budget - totalExpenses;  //where the remaining funds is calculated
    }

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: remaining,
                dispatch,
                currency: state.currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
