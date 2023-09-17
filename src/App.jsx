import React, { useReducer } from "react";

const initialState = {
  prevOperand: "",
  currentOperand: "0",
  operator: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "DIGIT":
      return {
        ...state,
        currentOperand:
          state.currentOperand === "0"
            ? action.payload
            : state.currentOperand + action.payload,
      };
    case "OPERATOR":
      return {
        ...state,
        operator: action.payload,
        prevOperand: state.currentOperand,
        currentOperand: "0",
      };
    case "EQUALS":
      const prev = parseFloat(state.prevOperand);
      const current = parseFloat(state.currentOperand);
      let result;
      switch (state.operator) {
        case "+":
          result = prev + current;
          break;
        case "-":
          result = prev - current;
          break;
        case "*":
          result = prev * current;
          break;
        case "/":
          result = prev / current;
          break;
        default:
          result = current;
          break;
      }
      return {
        ...state,
        prevOperand: "",
        currentOperand: result.toString(),
        operator: null,
      };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDigitClick = (digit) => {
    dispatch({ type: "DIGIT", payload: digit });
  };

  const handleOperatorClick = (operator) => {
    dispatch({ type: "OPERATOR", payload: operator });
  };

  const handleEqualsClick = () => {
    dispatch({ type: "EQUALS" });
  };

  const handleClearClick = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <div className="flex ">
    <div className="calculator-grid">
      <div className="output">
        <div className="prev-operand">{state.prevOperand}</div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <button className="span-two" onClick={handleClearClick}>
        AC
      </button>
      <button>DEL</button>
      <button onClick={() => handleOperatorClick("/")}>/</button>
      <button onClick={() => handleDigitClick("1")}>1</button>
      <button onClick={() => handleDigitClick("2")}>2</button>
      <button onClick={() => handleDigitClick("3")}>3</button>
      <button onClick={() => handleOperatorClick("*")}>*</button>
      <button onClick={() => handleDigitClick("4")}>4</button>
      <button onClick={() => handleDigitClick("5")}>5</button>
      <button onClick={() => handleDigitClick("6")}>6</button>
      <button onClick={() => handleOperatorClick("+")}>+</button>
      <button onClick={() => handleDigitClick("7")}>7</button>
      <button onClick={() => handleDigitClick("8")}>8</button>
      <button onClick={() => handleDigitClick("9")}>9</button>
      <button onClick={() => handleOperatorClick("-")}>-</button>
      <button onClick={() => handleDigitClick(".")}>.</button>
      <button onClick={() => handleDigitClick("0")}>0</button>
      <button onClick={handleEqualsClick} className="span-two">
        =
      </button>
    </div>
    </div>
  );
};

export default App;
