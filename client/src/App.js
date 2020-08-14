import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavBar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import {Provider} from 'react-redux';
import store from './store';
import ItemModel from './components/ItemModel';
import {Container} from 'reactstrap';
import {loadUser} from './actions/authActions';

function App() {

  
  useEffect(() =>{
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar/>
        <Container>
          <ItemModel/>
          <ShoppingList/>
        </Container>
     </div>
    </Provider>
    );
}

export default App;
