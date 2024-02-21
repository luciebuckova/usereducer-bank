import { useReducer } from 'react';

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  if (!state.isActive && action.type !== 'openAccount') return state;

  switch (action.type) {
    case 'openAccount':
      return {
        ...state,
        isActive: true,
        balance: state.isActive ? state.balance : action.payload,
      };
    case 'makeDeposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case 'makeWithdraw':
      return {
        ...state,
        balance:
          state.balance >= action.payload
            ? state.balance - action.payload
            : state.balance,
      };
    case 'getLoan':
      return {
        ...state,
        balance:
          state.loan === 0 ? state.balance + action.payload : state.balance,
        loan: state.loan === 0 ? action.payload : state.loan,
      };
    case 'payLoan':
      return {
        ...state,
        balance:
          state.loan !== 0 ? state.balance - action.payload : state.balance,
        loan: state.loan !== 0 ? 0 : state.loan,
      };
    case 'closeAccount':
      return {
        ...state,
        isActive:
          state.balance === 0 && state.loan === 0 ? false : state.isActive,
      };
    default:
      throw new Error('Unknown action');
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: 'openAccount', payload: 500 });
          }}
          disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'makeDeposit', payload: 150 });
          }}
          disabled={!isActive}>
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'makeWithdraw', payload: 50 });
          }}
          disabled={!isActive}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'getLoan', payload: 5000 });
          }}
          disabled={!isActive}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'payLoan', payload: 5000 });
          }}
          disabled={!isActive}>
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: 'closeAccount' });
          }}
          disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
