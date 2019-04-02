function validateMathExpression(expression) {

	if(!checkParentheses(expression)) {
		return false;
	}
	if(!checkOperationOrder(expression)) {
		return false;
	}

	return true;
}

function checkParentheses(expression) {
	var parenthesesOpen = 0;
	var right = 0;
	for(var i=0;i<expression.length; i++) {
		if(expression[i] == ')') {
			parenthesesOpen--;
		}
		else if(expression[i] == '(') {
			parenthesesOpen++;
		}
		else if(expression[i] == '=') {
			if(parenthesesOpen != 0) {
				return false;
			}
		}
		if(parenthesesOpen < 0) {
			return false;
		}
	}
	if(parenthesesOpen != 0) {
		return false;
	}
	return true;
}

function checkOperationOrder(expression) {
	var lastWasOperator = true;
	var lastWasMinus = false;

	for(var i=0;i<expression.length;i++) {

		if(expression[i] == '=') {
			if(lastWasOperator) {
				return false;
			}
			lastWasOperator = true;
		}
		else if(isOperator(expression[i])) {
			if(lastWasOperator && lastWasMinus) {
				return false;
			}
			else if(lastWasOperator && expression[i] == '-') {
				lastWasMinus = true;
			}
			else if(lastWasOperator) {
				return false;
			}
			else {
				lastWasOperator = true;
			}
		}
		else if(expression[i] == '(' || expression[i] == ')') {

		}
		else {
			if(!lastWasOperator) {
				return false;
			}
			else {
				lastWasOperator = false;
				if(isCaracter(expression[i])) {
					i++;
					while(isCaracter(expression[i])) {
						i++;
					}
					i--;
				}
				else if(isNumber(expression[i])) {
					i++;
					while(isNumber(expression[i])) {
						i++;
					}
					i--;
				}
			}
		}

	}


	return true;
}

function isCaracter(character) {
	return ((character >= 'A' && character <= 'Z')||(character >= 'a' && character <= 'z'));
}

function isNumber(character) {
	return (character >= '0' && character <= '9');
}

function isOperator(character) {
	switch(character) {
		case '+':
			return true;
		case '-':
			return true;
		case '*':
			return true;
		case '^':
			return true;
		case '/':
			return true;
		default:
			return false;
	}
	return false;
}

function testValidator() {
	console.log("Expect true - " + validateMathExpression("a+b=c"));
	console.log("Expect false - " + validateMathExpression("a++b=c"));
	console.log("Expect true - " + validateMathExpression("console+123456789=c"));
	console.log("Expect false - " + validateMathExpression("a+b-=c"));
	console.log("Expect true - " + validateMathExpression("(a+b)=(c)"))
	console.log("Expect false - " + validateMathExpression("()a+b)(=(c)"))
	console.log("Expect false - " + validateMathExpression("(a+b)=(c))"))
	console.log("Expect true - " + validateMathExpression("(a+b)=(c)"))
}

testValidator()