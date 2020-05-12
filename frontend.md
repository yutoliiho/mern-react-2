# ================ client install ================

cd root directory:
\$ create-react-app client

cd client:
$ npm init -y
$ npm install bootstrap reactstrap uuid react-transition-group axios
\$ npm i redux react-redux redux-thunk

create store file: client/src/store.js (entray point for redux store)

# ================ client ends ================

<!-- clean ups: client/src -->

delete:
index.css
logo

fix:
App.js | remove refereence to logo
index.js | remove reference to index.css, serviceWorker, and <React.StrictMode>

<!-- store.js -->

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
rootReducer,
initialState,
compose(
applyMiddleware(...middleware),
window.**REDUX_DEVTOOLS_EXTENSION** && window.**REDUX_DEVTOOLS_EXTENSION**()
)
);

export default store;

<!-- App.css -->

.remove-btn {
margin-right: 0.5rem;
}

.fade-enter {
opacity: 0.01;
}
.fade-enter-active {
opacity: 1;
transition: opacity 1000ms ease-in;
}
.fade-exit {
opacity: 1;
}
.fade-exit-active {
opacity: 0.01;
transition: opacity 1000ms ease-in;
}

<!-- App.js -->

import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './store';

import AppNavbar from './components/AppNavbar';
import ItemModal from '../src/components/ItemModal';
import ShoppingList from '../src/components/ShoppingList';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css';

function App() {
return (
<Provider store={store}>

<div>
<AppNavbar />
<ShoppingList />
<ItemModal />
</div>
</Provider>
);
}

export default App;

<!-- components/AppNavbar.js -->

import React, { Component } from 'react';
import {
Collapse,
Navbar,
NavbarToggler,
NavbarBrand,
Nav,
NavItem,
NavLink,
UncontrolledDropdown,
DropdownToggle,
DropdownMenu,
DropdownItem,
NavbarText,
Container,
} from 'reactstrap';

class AppNavbar extends Component {
state = {
isOpen: false,
};

toggle = () => {
this.setState({
isOpen: !this.state.isOpen,
});
};
render() {
return (

<div>
<Navbar color='dark' dark expand='sm' className='mb-5'>
<Container>
<NavbarBrand href='/'>Shopping List</NavbarBrand>
<NavbarToggler onClick={this.toggle}></NavbarToggler>
<Collapse isOpen={this.state.isOpen} navbar>
<Nav className='ml-auto' navbar>
<NavItem>
<NavLink href='https://github.com/yutoliiho'>Github</NavLink>
</NavItem>
</Nav>
</Collapse>
</Container>
</Navbar>
</div>
);
}
}

export default AppNavbar;

<!-- components/ShoppingList.js-1 -->

import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

// import { connect } from 'react-redux';
// import { getItems, deleteItem, addItem } from '../actions/itemActions';
// import PropTypes from 'prop-types';

class ShoppingList extends Component {
// componentDidMount() {
// this.props.getItems();
// }
// onDeleteClick = (id) => {
// this.props.deleteItem(id);
// };
// onAddClick = () => {
// this.props.addItem();
// };
state = {
items: [
{ id: uuidv4(), name: 'Eggs' },
{ id: uuidv4(), name: 'Milk' },
{ id: uuidv4(), name: 'Steak' },
{ id: uuidv4(), name: 'Water' },
],
};
render() {
const { items } = this.state;
return (
<Container>
<Button
color='dark'
style={{ marginBottom: '2rem' }}
onClick={() => {
const name = prompt('Enter Item');
if (name) {
this.setState((state) => ({
items: [...state.items, { id: uuidv4(), name }],
}));
}
}} >
Add Items
</Button>

        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    // onClick={this.onDeleteClick.bind(this, _id)}
                    onClick={() => {
                      this.setState((state) => ({
                        items: state.items.filter((item) => item.id !== id),
                      }));
                    }}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );

}
}
// ShoppingList.propTypes = {
// getItems: PropTypes.func.isRequired,
// item: PropTypes.object.isRequired,
// };
// const mapStateToProps = (state) => ({
// item: state.item,
// });
// export default connect(mapStateToProps, { getItems, deleteItem, addItem })(
// ShoppingList
// );

export default ShoppingList;

///
// <Container>
// <ListGroup>
// <TransitionGroup className='shopping-list'>
// {items.map(({ \_id, name }) => (
// <CSSTransition key={_id} timeout={500} classNames='fade'>
// <ListGroupItem>
// <Button
// className='remove-btn'
// color='danger'
// size='sm'
// onClick={this.onDeleteClick.bind(this, \_id)}
// >
// &times;
// </Button>
// {name}
// </ListGroupItem>
// </CSSTransition>
// ))}
// </TransitionGroup>
// </ListGroup>
// </Container>

<!-- components/ShoppingList.js -->

import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import { connect } from 'react-redux';
import { getItems, deleteItem, addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
componentDidMount() {
this.props.getItems();
}
onDeleteClick = (id) => {
this.props.deleteItem(id);
};
// onAddClick = () => {
// this.props.addItem();
// };

// state = {
// items: [
// { id: uuidv4(), name: 'Eggs' },
// { id: uuidv4(), name: 'Milk' },
// { id: uuidv4(), name: 'Steak' },
// { id: uuidv4(), name: 'Water' },
// ],
// };
render() {
const { items } = this.props.item;
return (
<Container>
<ListGroup>
<TransitionGroup className='shopping-list'>
{items.map(({ \_id, name }) => (
<CSSTransition key={_id} timeout={500} classNames='fade'>
<ListGroupItem>
<Button
className='remove-btn'
color='danger'
size='sm'
onClick={this.onDeleteClick.bind(this, \_id)} >
&times;
</Button>
{name}
</ListGroupItem>
</CSSTransition>
))}
</TransitionGroup>
</ListGroup>
</Container>
);
}
}
ShoppingList.propTypes = {
getItems: PropTypes.func.isRequired,
item: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
item: state.item,
});
export default connect(mapStateToProps, { getItems, deleteItem, addItem })(
ShoppingList
);

// export default ShoppingList;
// , deleteItem, addItem

<!-- components/ItemModal.js -->

import React, { Component } from 'react';
import {
Button,
Modal,
ModalHeader,
ModalBody,
Form,
FormGroup,
Label,
Input,
} from 'reactstrap';
// import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
state = {
modal: false,
name: '',
};
toggle = () => {
this.setState({
modal: !this.state.modal,
});
};

onChange = (e) => {
this.setState({ [e.target.name]: e.target.value });
};
onSubmit = (e) => {
e.preventDefault();
const newItem = {
// name: this.state.name,
// id: uuidv4(),
name: this.state.name,
};

    // add item via addItem action
    this.props.addItem(newItem);

    // close modal
    this.toggle();

};
render() {
return (

<div>
<Button
color='dark'
style={{ marginBottom: '2rem' }}
onClick={this.toggle} >
Add Item
</Button>
<Modal isOpen={this.state.modal} toggle={this.toggle}>
<ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
<ModalBody>
<Form onSubmit={this.onSubmit}>
<FormGroup>
<Label for='item'>Item</Label>
<Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Add shopping item'
                  onChange={this.onChange}
                ></Input>
<center>
<Button color='dark' style={{ marginBottom: '2rem' }} block>
Add Item
</Button>
</center>
</FormGroup>
</Form>
</ModalBody>
</Modal>
</div>
);
}
}
const mapStateToProps = (state) => ({
item: state.item,
});
export default connect(mapStateToProps, { addItem })(ItemModal);

<!-- actions/types.js -->

export const GET_ITEMS = 'GET_ITEMS';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const ITEM_LOADING = 'ITEM_LOADING';

<!-- actions/itemActions.js -->

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEM_LOADING } from './types';
import axios from 'axios';

// export const getItems = () => {
// return {
// type: GET_ITEMS,
// // payload: res.data,
// };
// };
export const getItems = () => (dispatch) => {
dispatch(setItemsLoading());
axios.get('http://localhost:5000/').then((res) =>
// (res) => console.log(res.data)
dispatch({
type: GET_ITEMS,
payload: res.data,
})
);
};

// export const deleteItem = (id) => {
// return {
// type: DELETE_ITEM,
// payload: id,
// };
// };

export const deleteItem = (id) => (dispatch) => {
console.log(id);
// return {
// type: DELETE_ITEM,
// payload: id,
// };
axios.delete(`http://localhost:5000/${id}`).then((res) =>
dispatch({
type: DELETE_ITEM,
payload: id,
})
);
};

// export const addItem = (item) => {
// return {
// type: ADD_ITEM,
// payload: item,
// };
// };
export const addItem = (item) => (dispatch) => {
axios.post('http://localhost:5000/', item).then((res) =>
dispatch({
type: ADD_ITEM,
payload: res.data,
})
);
};
export const setItemsLoading = () => {
return {
type: ITEM_LOADING,
};
};

<!-- reducers/index.js -->

import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
item: itemReducer,
// auth: authReducer....
// error: errorReducer...
// todo: todoReducer...
});

<!-- reducers/itemReducer.js -->

// import { v4 as uuidv4 } from 'uuid';
import {
GET_ITEMS,
ADD_ITEM,
DELETE_ITEM,
ITEM_LOADING,
} from '../actions/types';
// import Axios from 'axios';

const initialState = {
// items: [
// { id: uuidv4(), name: 'Eggs' },
// { id: uuidv4(), name: 'Milk' },
// { id: uuidv4(), name: 'Steak' },
// { id: uuidv4(), name: 'Orange' },
// ],
items: [],
loading: false,
};

export default function (state = initialState, action) {
switch (action.type) {
case GET_ITEMS:
return {
...state,
items: action.payload,
loading: false,
};
case DELETE_ITEM:
return {
...state,
items: state.items.filter((item) => item.id !== action.payload),
};
case ADD_ITEM:
return {
...state,
items: [action.payload, ...state.items],
};
case ITEM_LOADING:
return {
...state,
loading: true,
};
default:
return state;
}
}

// Axios.delete(`api/items/${id}`).then(res => {
// dispatch({
// type: DELETE_ITEM,
// payload: id
// })
// })

# overall structure:

client/src/actions/types.js
client/src/actions/itemActions.js

client/src/components/AppNavbar.js
client/src/components/ShoppingList.js
client/src/components/ItemModal.js

client/src/reducers/index.js
client/src/components/itemReducer.js

client src/App.js
client src/App.css
client src/index.js
client src/store.js

# proxy

cd client: in package.js ~ line 19
"proxy": "http://localhost:5000/",
这个对我来说没有 apply，但是以后可能会用得到。。！
