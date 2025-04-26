import axios from 'axios';
import React, { useContext, useState } from 'react';

// Base URL for the API
const BASE_URL = "http://localhost:5000/api/v1/";

// Create Context
const GlobalContext = React.createContext();

// Global Provider Component
export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Add Income Function
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            if (response.status === 200 || response.status === 201) {
                // Reload incomes after successful addition
                await getIncomes();
            }
        } catch (err) {
            console.error("Add Income Error:", err);
            setError(err.response?.data?.message || "An error occurred while adding income.");
        }
    };

    // Get Incomes Function
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            if (response.status === 200) {
                setIncomes(response.data || []); // Ensure data is valid
                console.log("Incomes:", response.data);
            }
        } catch (err) {
            
            setError(err.response?.data?.message || "An error occurred while fetching incomes.");
        }
    };

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = ()=>{
        let totalIncome = 0;
        incomes.forEach((income)=>{
            totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }
    console.log('total',totalIncome())

    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = ()=>{
        const history = [...incomes,...expenses]
        history.sort((a,b)=>{
            return new Date(b.CreatedAt) - new Date(a.createdAt)
        })
        return history.slice(0,3)
    }

    // Return Context Provider
    return (
        <GlobalContext.Provider
            value={{
                addIncome,
                getIncomes,
                incomes,
                deleteIncome,
                totalIncome,
                expenses,
                getExpenses,
                addExpense,
                deleteExpense,
                totalExpenses,
                totalBalance,
                transactionHistory,
                error,
                setError
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

// Custom Hook for Global Context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
