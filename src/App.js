import './App.css';
import {BrowserRouter,Link,Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signOut } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';

function App() {

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const userSignIn = useSelector(state => state.userSignIn);
  const {userInfo} = userSignIn;
  const dispatch = useDispatch();

  const signOutHandler = () => {
    console.log("Signing Out App");
    dispatch(signOut());
    //window.location.reload();
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
            <header className="row">
                <div>
                    <Link className="brand" to="/">amazona</Link>
                </div>
                <div>
                    <Link to="/cart">
                      Cart
                      {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                      )}
                    </Link>
                    {
                      userInfo!=null ? (
                        <div className="dropdown">
                        <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                        <ul className="dropdown-content">
                          <Link to="#signOut" onClick={signOutHandler}>Sign Out</Link>
                        </ul>
                        </div>
                      ):
                      (
                        <Link to="/signin">Sign In</Link>
                      )
                    }
                </div>
            </header>
            <main>
              <Route path="/product/:id" component={ProductScreen}></Route>
              <Route path="/" component={HomeScreen} exact></Route>
              <Route path="/cart/:id?" component={CartScreen}></Route>
              <Route path="/signin" component={SigninScreen}></Route>
              <Route path="/register" component={RegisterScreen}></Route>
            </main>
            <footer className="row center">All Rights Reserved</footer>
        </div>
        </BrowserRouter>
  );
}

export default App;
