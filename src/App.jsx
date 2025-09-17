import './App.css';
import Approutes from './component/routes/Approutes.jsx'
import { Provider, useDispatch } from 'react-redux';
import store from './redux/stores';
import { fetchCurrentUser } from './API/userApi.jsx';
import { useEffect } from 'react';
import { USER_LOGIN_SUCCESS } from './redux/reducers/types';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchCurrentUser();
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
      } catch (err) {
        console.log("No logged in user");
      }
    };
    fetchUser();
  }, [dispatch]);

  return <Approutes />;
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
