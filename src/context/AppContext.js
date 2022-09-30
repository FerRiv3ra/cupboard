import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {createContext, useState} from 'react';
import axiosClient from '../config/axiosClient';

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [visitorUser, setVisitorUser] = useState({});
  const [adminUser, setAdminUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [report, setReport] = useState({});

  const selectUser = uid => {
    if (!uid) {
      setVisitorUser({});
    } else {
      setVisitorUser(users.filter(user => user.uid === uid)[0]);
    }
  };

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

  const updateAdmin = async (user, uid) => {
    const token = await AsyncStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
    };

    try {
      const {data} = await axiosClient.put(`/admins/${uid}`, user, config);

      setAdminUser(data.user);
      return {ok: true};
    } catch (error) {
      return {
        ok: false,
        msg: error.response.data.msg || error.response.data.errors[0].msg,
      };
    }
  };

  const deleteAdmin = async uid => {
    const token = await AsyncStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
    };

    try {
      await axiosClient.delete(`/admins/${uid}`, config);

      setAdminUser({});
      return {ok: true};
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

  const getAllVisitors = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const {data} = await axiosClient('/users', config);

      setUsers(data.users);
      setIsLoading(false);
      return {ok: true, user: data};
    } catch (error) {
      setIsLoading(false);
      return {ok: false, msg: error.response.data.msg};
    }
  };

  const getOneVisitor = async uid => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const {data} = await axiosClient(`/users/${uid}`, config);

      return {ok: true, user: data};
    } catch (error) {
      return {ok: false, msg: error.response.data.msg};
    }
  };

  const verifyCanTake = async id => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const {data} = await axiosClient(`/visits/${id}`, config);

      return data;
    } catch (error) {
      return {ok: false, msg: error.response.data.msg};
    }
  };

  const unblockUser = async id => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = {blocked: false};

      const {data} = await axiosClient.put(`/users/${id}`, body, config);

      setUsers(
        users.map(user => {
          if (user.uid === id) {
            return data;
          }
          return user;
        }),
      );

      return data;
    } catch (error) {
      return error.response.data;
    }
  };

  const editUser = async (body, id) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const {data} = await axiosClient.put(`/users/${id}`, body, config);

      setUsers(
        users.map(user => {
          if (user.uid === id) {
            return data;
          }
          return user;
        }),
      );

      return {ok: true, user: data};
    } catch (error) {
      return {
        ok: false,
        msg: error.response.data.msg || error.response.data.errors[0].msg,
      };
    }
  };

  const deleteVisitor = async uid => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
    };

    try {
      const {data} = await axiosClient.delete(`/users/${uid}`, config);

      setUsers(users.filter(user => user.uid !== data.uid));
      return {ok: true, user: data};
    } catch (error) {
      return {ok: false, msg: error.response.data.msg};
    }
  };

  const saveVisit = async dataVisit => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
    };

    try {
      const {data} = await axiosClient.post('/visits', dataVisit, config);

      return data;
    } catch (error) {
      console.log(error.response.data);
      return {ok: false, msg: error.response.data.msg};
    }
  };

  const createUser = async user => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const {data} = await axiosClient.post('/users', user, config);

      setUsers([data, ...users]);

      return {ok: true, user: data};
    } catch (error) {
      return {ok: false, msg: error.response.data.errors[0].msg};
    }
  };

  const getAllVisits = async (start, final) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const {data} = await axiosClient(
        `/visits?startDate=${start}&finalDate=${final}`,
        config,
      );

      setReport(data);

      return {ok: true, data};
    } catch (error) {
      return {
        ok: false,
        msg: error.response.data.errors[0].msg || error.response.data.msg,
      };
    }
  };

  const sendEmail = async dates => {
    const token = await AsyncStorage.getItem('token');
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
      };

      const {data} = await axiosClient.post('/visits/email', dates, config);

      return {ok: true, msg: data.msg};
    } catch (error) {
      return {
        ok: false,
        msg: error.response.data.errors[0].msg || error.response.data.msg,
      };
    }
  };

  return (
    <AppContext.Provider
      value={{
        adminLogin,
        adminUser,
        createAdminUser,
        createUser,
        deleteAdmin,
        deleteVisitor,
        editUser,
        forgotPasswordRequest,
        getAllVisitors,
        getAllVisits,
        getOneVisitor,
        isLoading,
        report,
        saveVisit,
        selectUser,
        sendEmail,
        setIsLoading,
        unblockUser,
        updateAdmin,
        updatePassword,
        userLogin,
        users,
        verifyCanTake,
        verifyTokenForgot,
        verifyTokenLogin,
        visitorUser,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

export {AppProvider};
