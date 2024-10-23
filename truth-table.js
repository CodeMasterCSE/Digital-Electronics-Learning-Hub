function generateTruthTable() {
    const expression = document.getElementById('expressionInput').value;
    const errorDiv = document.getElementById('error');
    const tableContainer = document.getElementById('tableContainer');
    errorDiv.textContent = '';
    tableContainer.innerHTML = '';
  
    const variables = [...new Set(expression.match(/\b[A-Z]\b/g) || [])];
    if (variables.length === 0) {
        errorDiv.textContent = 'Please enter a valid boolean expression using uppercase letters as variables.';
        return;
    }
  
    try {
      const rows = Math.pow(2, variables.length);
      const table = [];
  
      for (let i = 0; i < rows; i++) {
        const row = {};
        variables.forEach((variable, index) => {
          row[variable] = Number(Boolean(i & (1 << (variables.length - 1 - index))));
        });
        row.result = evaluateExpression(expression, row);
        table.push(row);
      }
  
      renderTable(variables, table);
    } catch (err) {
      errorDiv.textContent = err.message || 'An unknown error occurred';
    }
  }
  
  function evaluateExpression(expr, values) {
    const tokenize = (str) => {
      const regex = /\s*(AND|OR|NOT|[A-Z])\s*/g;
      return (str.match(regex) || []).map(token => token.trim()).filter(token => token !== '');
    };
  
    const applyOperator = (op, a, b) => {
      switch (op) {
        case 'AND': return Number(Boolean(a && b));
        case 'OR': return Number(Boolean(a || b));
        case 'NOT': return Number(!a);
        default: throw new Error(`Unknown operator: ${op}`);
      }
    };
  
    const evaluate = (tokens) => {
      const output = [];
      const operators = [];
      const precedence = { 'NOT': 3, 'AND': 2, 'OR': 1 };
  
      const applyTop = () => {
        const op = operators.pop();
        if (op === 'NOT') {
          const a = output.pop();
          output.push(applyOperator(op, a));
        } else {
          const b = output.pop();
          const a = output.pop();
          output.push(applyOperator(op, a, b));
        }
      };
  
      for (const token of tokens) {
        if (token in values) {
          output.push(values[token]);
        } else if (token === '(') {
          operators.push(token);
        } else if (token === ')') {
          while (operators.length && operators[operators.length - 1] !== '(') {
            applyTop();
          }
          if (!operators.length) throw new Error('Mismatched parentheses');
          operators.pop();
        } else if (token in precedence) {
          while (operators.length && operators[operators.length - 1] !== '(' && precedence[operators[operators.length - 1]] >= precedence[token]) {
            applyTop();
          }
          operators.push(token);
        } else {
          throw new Error(`Invalid token: ${token}`);
        }
      }
  
      while (operators.length) {
        if (operators[operators.length - 1] === '(') throw new Error('Mismatched parentheses');
        applyTop();
      }
  
      if (output.length !== 1) throw new Error('Invalid expression');
      return output[0];
    };
  
    const tokens = tokenize(expr);
    return evaluate(tokens);
  }
  
  function renderTable(variables, truthTable) {
    const tableContainer = document.getElementById('tableContainer');
    let tableHTML = '<table><thead><tr>';
    variables.forEach(variable => {
      tableHTML += `<th>${variable}</th>`;
    });
    tableHTML += '<th>Result</th></tr></thead><tbody>';
  
    truthTable.forEach(row => {
      tableHTML += '<tr>';
      variables.forEach(variable => {
        tableHTML += `<td>${row[variable]}</td>`;
      });
      tableHTML += `<td>${row.result}</td></tr>`;
    });
  
    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
  }  