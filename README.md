# JavaScript Calculator

 ## [Codepen](https://codepen.io/lezojeda/pen/JjPXPpP)

Project for the FreeCodeCamp ["Build a JavaScript Calculator"](https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-javascript-calculator) challenge from the Front End Libraries section.
The project consists of several react components wrapped inside one (Presentational) connected to a redux store.


### React

The components wrapped are:

* **Display**: receives input, operation and results as props and displays the last input (props.input) in a first div (#display-input) and the operation (props.operation) in a second div (#display) which after clicking the = button (or pressing the key in the keyboard) displays the result and continues a new operation in this result if desired.

* **NumPad**: receives input and the functions addFirstNumber_dispatched, addNewNumber, addNewDecimal and addNewZero as props. Contains the numbers 0 through 9 and the decimal. It also contains the method handleNumPadClick(e) which controls the functionality of clicking around the NumPad (e.g. if the event target value is 0, execute addNewZero())

* **Operators**: receives operation, result and the functions addNewOperator, evaluateOperation_dispatched and clearResultAndOperation_dispatched as props. Contains the operators (+, -, / and \*) as well as the clear button (AC) and the equals (=). As in NumPad, it containas handleOperatorsClick(e) that controls the functionality of clicking around the operators pad.

Finally, in the **Presentational** component we find the three components rendered within a div with class "container" with 3 methods as well:

* handleKeyDown(e): keyboard functionality to control the calculator
* componentDidMount(): let the user start using the keyboard just as the component gets mounted
* componentWillUnmount(): remove event listener in case component is unmounted. 

### Redux

The store has two reducers (inputReducer and outputReducer) each with a single state on its own consisting of a string with an initial value of 0. As their names imply, the first one controls what is, in the end, shown in the upper display and the outputReducer what is shown in the lower display

