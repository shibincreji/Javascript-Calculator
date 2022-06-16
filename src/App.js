//COMPONENTS

//DISPLAY
const Display = (props) => {
    return (
        <div className="display-container" id="display-container">
            <div id="display-input" className="display">
                {props.input}
            </div>
            <div id="display" className="display">
                {props.operation}
            </div>
        </div>
    )
}

const contains_decimal = (/\./)

//NUMPAD
const NumPad = (props) => {

    function handleNumPadClick(e) {
        if (e.target.value == "." && !contains_decimal.test(props.input)) {
            props.addNewDecimal()
        } else if (e.target.value == "0") {
            props.addNewZero()
        } else if (props.input.length == 1 && props.input == 0) {
            props.addFirstNumber_dispatched(e.target.value)
        } else if((/[0-9]/).test(e.target.value)){ 
            props.addNewNumber(e.target.value)
        }
    }


    return (
        <div className="keypad numpad" onClick={handleNumPadClick}>
            <button id="one" value="1">1</button>
            <button id="two" value="2">2</button>
            <button id="three" value="3">3</button>
            <button id="four" value="4">4</button>
            <button id="five" value="5">5</button>
            <button id="six" value="6">6</button>
            <button id="seven" value="7">7</button>
            <button id="eight" value="8">8</button>
            <button id="nine" value="9">9</button>
            <button id="zero" value="0">0</button>
            <button id="decimal" tabIndex="0" value=".">.</button>
        </div>
    )
}

//OPERATOR PAD
const Operators = (props) => {
    function handleOperatorsClick(e) {
        if (e.target.value == "=") {
            props.evaluateOperation_dispatched(props.operation)
        } else if (e.target.value == "clear") {
            props.clearResultAndOperation_dispatched()
        } else {
            props.addNewOperator(e.target.value)
        }
    }

    return (
        <div className="keypad operators" onClick={handleOperatorsClick} tabIndex="1">
            <button id="add" value="+">+</button>
            <button id="subtract" value="-">-</button>
            <button id="multiply" value="*">x</button>
            <button id="divide" value="/">/</button>
            <button id="equals" value="=">=</button>
            <button id="clear" value="clear">AC</button>
        </div>
    )
}

//PRESENTATIONAL COMPONENT

class Presentational extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    handleKeyDown(e) {
        if (e.key == "." && !contains_decimal.test(this.props.input)) {
            this.props.addNewDecimal()
        } else if (e.key == "0") {
            this.props.addNewZero()
        } else if (this.props.input.length == 1 && this.props.input == 0) {
            this.props.addFirstNumber_dispatched(e.key)
        } else if ((/[0-9]/).test(e.key)){
            this.props.addNewNumber(e.key)
        } else if (e.key == "=") {
            this.props.evaluateOperation_dispatched(this.props.operation)
        } else if(e.key =="C" || e.key == "c") {
            this.props.clearResultAndOperation_dispatched()
        } else if ((/\/|\*|\-|\+/).test(e.key)){
            this.props.addNewOperator(e.key)
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyDown, false);
      }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.handleKeyDown, false);
    }
    

    render() {
        return (
            <div className="container">
                <Display
                    input={this.props.input}
                    operation={this.props.operation}
                    result={this.props.result} />
                <div className="keypad-container">
                    <NumPad
                        input={this.props.input} addFirstNumber_dispatched={this.props.addFirstNumber_dispatched} addNewNumber={this.props.addNewNumber} addNewDecimal={this.props.addNewDecimal} addNewZero={this.props.addNewZero} />

                    <Operators
                        operation={this.props.operation}
                        addNewOperator={this.props.addNewOperator}
                        evaluateOperation_dispatched={this.props.evaluateOperation_dispatched}
                        result={this.props.result}
                        clearResultAndOperation_dispatched={this.props.clearResultAndOperation_dispatched} />
                </div>
            </div >
        )
    }
}

////////////////////////////////////////////////
// REDUX

const FIRST_NUMBER = 'FIRST_NUMBER'
const ADD_NUMBER = 'ADD_NUMBER'
const ADD_DECIMAL = 'ADD_DECIMAL'
const ADD_ZERO = 'ADD_ZERO'
const ADD_OPERATOR = 'ADD_OPERATOR'
const EVALUATE = 'EVALUATE'
const CLEAR = 'CLEAR'

//ACTION CREATOR
const addFirstNumber = (number) => {
    return {
        type: FIRST_NUMBER,
        number: number
    }
}

const addNumber = (number) => {
    return {
        type: ADD_NUMBER,
        number: number
    }
}

const addDecimal = () => {
    return {
        type: ADD_DECIMAL
    }
}

const addZero = (number) => {
    return {
        type: ADD_ZERO,
        number: number
    }
}

const addOperator = (operator) => {
    return {
        type: ADD_OPERATOR,
        operator: operator
    }
}

const evaluateOperation = (operation) => {
    return {
        type: EVALUATE,
        operation: operation
    }
}

const clearResultAndOperation = () => {
    return {
        type: CLEAR,
    }
}

//REDUCER     

const inputReducer = (state = '0', action) => {
    switch (action.type) {
        case FIRST_NUMBER:
            return eval(parseInt(state + action.number))
        case ADD_NUMBER:
            return state + action.number
        case ADD_DECIMAL:
            if (state.toString().length == 1) {
                console.log("asd")
                return state + '.'//if it's first number just add the decimal
            } else if (state[state.length - 1].indexOf('.') == -1) {
                return state + '.'//if it's not the first number, check that the last character is not a decimal to avoid repetition
            }
            return state
        case ADD_ZERO:
            if (contains_decimal.test(state) || state != "0") {
                return state + "0"
            }
            return state
        case ADD_OPERATOR:
            return action.operator
        case EVALUATE:
            try {
                return eval(state)
            } catch (err) {
                return state
            }
        case CLEAR:
            state = '0'
        default:
            return state
    }
}

const outputReducer = (state = '0', action) => {
    switch (action.type) {
        case FIRST_NUMBER:
            return eval(parseInt(state + action.number))
        case ADD_NUMBER:
            return state + action.number
        case ADD_DECIMAL:
            if (state.toString().length == 1) {
                return state + '.' 
            } else if (state[state.length - 1].indexOf('.') == -1) {
                return state + '.'
            }
            return state
        case ADD_ZERO:
            if (contains_decimal.test(state) || state != "0") {
                return state + "0"
            }
            return state
        case ADD_OPERATOR:
            var is_operator = (/\/|\*|\-|\+/)
            var is_number = (/[0-9]/)
            var two_operators = /(\/|\*|\-|\+){2}/

            if (two_operators.test(state.toString().slice(-2))) {
                return state.replace(state.toString().slice(-2), action.operator)
            } else if (is_number.test(state) && state.toString().length == 1 || is_number.test(state[state.length - 1])) {
                return state + action.operator

            } else if (is_operator.test(state[state.length - 1]) && action.operator != "-") {
                return state.substring(0, state.length - 1) + action.operator
            } else if (is_operator.test(state[state.length - 1]) && state[state.length - 1] != "-") {
                return state + action.operator
            }
            return state + action.operator

        case EVALUATE:
            try {
                return eval(state)
            } catch (err) {
                alert("Please finish the operation or clear input (AC)")
                return state
            }
        case CLEAR:
            state = '0'
        default:
            return state
    }
}

//STORE

const rootReducer = Redux.combineReducers({ input: inputReducer, operation: outputReducer });

const store = Redux.createStore(rootReducer);

//CONNECT TO REACT-REDUX
const Provider = ReactRedux.Provider;

//MAP STATE AND PROPS
function mapStateToProps(state) {
    return ({
        input: state.input,
        operation: state.operation,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        addFirstNumber_dispatched: (number) => {
            dispatch(addFirstNumber(number))
        },
        addNewNumber: (number) => {
            dispatch(addNumber(number))
        },
        addNewDecimal: () => {
            dispatch(addDecimal())
        },
        addNewZero: (number) => {
            dispatch(addZero(number))
        },
        addNewOperator: (operator) => {
            dispatch(addOperator(operator))
        },
        evaluateOperation_dispatched: (operation) => {
            dispatch(evaluateOperation(operation))
        },
        clearResultAndOperation_dispatched: () => {
            dispatch(clearResultAndOperation())
        }
    })
}

const Container = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Presentational)

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        )
    }
}

ReactDOM.render(<AppWrapper />, document.getElementById("root"))