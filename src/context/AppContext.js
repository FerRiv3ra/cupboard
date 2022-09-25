import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {createContext, useState} from 'react';
import axiosClient from '../config/axiosClient';

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [visitorUser, setVisitorUser] = useState({});
  const [adminUser, setAdminUser] = useState({});

  const userLogin = async (customerId, date) => {
    const dob = moment(date.toISOString().slice(0, 10), 'YYYY-MM-DD').format(
      'DD/MM/YYYY',
    );

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-token': token,
      },
    };

    try {
      const {data} = await axiosClient.post(
        '/auth/login-user',
        {customerId, dob},
        config,
      );

      setVisitorUser(data.user);

      return data;
    } catch (error) {
      return {ok: false, msg: error.response.data.msg};
    }
  };

  const createAdminUser = async user => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-token': token,
      },
    };

    try {
      const {data} = await axiosClient.post('/admins', user, config);

      return data;
    } catch (error) {
      return {
        ok: false,
        msg: error.response.data.msg || error.response.data.errors[0].msg,
      };
    }
  };

  const adminLogin = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-token': token,
      },
    };

    try {
      const {data} = await axiosClient.post(
        '/auth/login',
        {email, password},
        config,
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const verifyTokenLogin = async token => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-token': token,
      },
    };

    try {
      const {data} = await axiosClient(`/auth/login/${token}`, config);

      await AsyncStorage.setItem('token', data.token);

      setAdminUser(data.user);

      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const forgotPasswordRequest = async email => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-token': token,
      },
    };

    try {
      const {data} = await axiosClient.post(
        '/admins/forgot-password',
        {email},
        config,
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const verifyTokenForgot = async token => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-token': token,
      },
    };

    try {
      const {data} = await axiosClient(
        `/admins/forgot-password/${token}`,
        config,
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const updatePassword = async (password, token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'x-token': token,
      },
    };

    try {
      const {data} = await axiosClient.post(
        `/admins/forgot-password/${token}`,
        {password},
        config,
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <AppContext.Provider
      value={{
        users,
        userLogin,
        visitorUser,
        adminLogin,
        verifyTokenLogin,
        createAdminUser,
        verifyTokenForgot,
        forgotPasswordRequest,
        updatePassword,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

export {AppProvider};
