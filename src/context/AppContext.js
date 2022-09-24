import moment from 'moment';
import React, {createContext, useState} from 'react';
import axiosClient from '../config/axiosClient';

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [visitorUser, setVisitorUser] = useState({});

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
  return (
    <AppContext.Provider value={{users, userLogin, visitorUser}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

export {AppProvider};
