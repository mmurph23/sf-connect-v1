//Action creator
const INITIAL_STATE = "INITIAL_STATE";




//Reducer Action
export const loadAccounts = (accounts) => ({type: INITIAL_STATE, payload: accounts})

//helper functions

//actually get the accounts
export const getAccounts = () => {
     return fetch('/api/accounts', {credentials: "include"})
               .then(res => res.json())
}

//Action dispatch function, links the fetch call to the the reducer action, which calls the reducer
export const fetchAccounts = () => {
     return (dispatch) => {
          getAccounts()
          .then(accounts => dispatch(loadAccounts(accounts)))
     }
}
//Reducer functions

//Reducer
export default (state = [], action) => {
  let newState = [];

  switch (action.type) {
    case INITIAL_STATE:
      return {...state, accounts: action.payload}
    default:
      return state;
  }
};
