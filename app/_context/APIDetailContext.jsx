"use client";
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    // Authentication APIs
    const registerUser = async (registrationData) => {
        try {
            const response = await axios.post('http://localhost:7000/api/auth/v1/register', registrationData);
            setUser(response.data);
            console.log(response.data);
            return true; // Indicate success
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
            return false; // Indicate failure
        }
    };

    const loginUser = async (loginData) => {
        console.log(user);
        try {
            const response = await axios.post('http://localhost:7000/api/auth/v1/login', loginData);
            const { token } = response.data; // the token is in response.data.token
            localStorage.setItem('token', token);
            setUser(response.data);
            return true; // Indicate success
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
            return false; // Indicate failure
        }
    };

    // Home Page API
    const claimPoints = async (pointsData) => {
        try {
            const response = await axios.patch('http://localhost:7000/api/user/v1/claim-points', pointsData);
            const updatePoints = await response.json();
            return updatePoints;
        } catch (error) {
            setError('Error claiming points');
        }
    };

    // Leaderboard APIs
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:7000/api/user/v1/get-users");
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error("Error in fetchUsers:", error);
            return [];
        }
    };

    const fetchUserHistory = async (historyData) => {
        try {
            const response = await axios.post('http://localhost:7000/api/user/v1/your-history', historyData);
            // Assuming we want to set this to the leaderboard or handle it separately
            return response.data.data;
        } catch (error) {
            setError('Error fetching user history');
        }
    };

    // User Info API
    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await axios.post('http://localhost:7000/api/user/v1/get-users-info', {}, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token in the Authorization header
                },
            });

            return response.data;
        } catch (error) {
            setError('Error fetching user info');
            console.error('Error:', error);
        }
    };


    return (
        <ApiContext.Provider
            value={{
                user,
                error,
                leaderboard,
                userInfo,
                registerUser,
                loginUser,
                claimPoints,
                fetchUsers,
                fetchUserHistory,
                fetchUserInfo,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => useContext(ApiContext);
