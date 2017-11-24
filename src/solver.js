const Logic = require('logic-solver');

/* The range function generates an array containing integers
 * ranging from zero to n-1.
 * This is often used in this module to iterate a block of code n times.
 * */
function range(n) {
  return Array(n).fill().map((x, i) => (i));
}

/* The genVars function generates variable names
 * each of which is indexed by a triple (r, c, s)
 * where r, c and s each indicates a row index, a column index
 * and a symbol respectively.
 * An index has the dimension of size x size x size.
 * A pair (r, c) specifies a cell in a Latin square.
 * Only one variable for each cell can have a true value.
 * A set of (r, c, s) triples for all the true variables
 * is the orthogonal array representation of a Latin square.
 * */
function genVars(prefix, size) {
  return range(size).map((i) => (
    range(size).map((j) => (
      range(size).map((k) => (
        prefix + i.toString() + j.toString() + k.toString()
      ))
    ))
  ));
}

/* A Latin square is an n x n array filled with n different symbols.
 * Each symbol must occur exactly once in each row.
 * Each symbol must occur exactly once in each column.
 * Each cell of a square must have exactly one symbol.
 * The function latinSquare constructs a logical formula
 * expressing the conjunction of the above logical conditions.
 * */
function latinSquare(solver, vars) {
  const n = vars.length;
  range(n).forEach((i) => {
    range(n).forEach((j) => {
      solver.require(Logic.exactlyOne(range(n).map((k) => (vars[k][i][j]))));
      solver.require(Logic.exactlyOne(range(n).map((k) => (vars[i][k][j]))));
      solver.require(Logic.exactlyOne(range(n).map((k) => (vars[i][j][k]))));
    });
  });
}

/*
  const orthLatinSquares = (solver, vars1, vars2) => {
    latinSquare(solver, vars1);
    latinSquare(solver, vars2);
    const n = vars1.length;
    range(n).forEach((k) => {
      range(n).forEach((l) => {
        solver.require(
          Logic.atMostOne(range(n*n).map((x, index) => {
            const i = Math.floor(index/n);
            const j = index%n;
            return Logic.and(vars1[i][j][k], vars2[i][j][l]);
          }))
        );
      });
    });
  }
*/

function reduceCondition(vars) {
  const r = vars.map((_, i) => (vars[0][i][i]));
  const c = vars.map((_, i) => (vars[i][0][i]));
  return Logic.and(r.concat(c));
}

class LatinSquare {

  constructor(n) {
    this.size = n;
    this.vars = genVars('v', n);
  }

  getVarName(i, j, k) {
    return this.vars[i][j][k];
  }

  solve(limit) {
    const solver = new Logic.Solver();
    const vars = this.vars;
    latinSquare(solver, vars);
    let sols = [];
    for (var i = 0; i < limit; i++) {
      const sol = solver.solveAssuming(reduceCondition(vars));
      if (!sol) break;
      sols.push(sol);
      solver.forbid(sol.getFormula());
    }
    return sols;
  }

  getSymbolTable(solution) {
    const n = this.size;
    const vs = this.vars;
    const m = solution.getMap();
    return range(n).map((i) => (
      range(n).map((j) => (
        vs[i][j].indexOf(vs[i][j].find((v) => (m[v])))
      ))
    ));
  }

  /* The OAR function generates an orthogonal array representation of
   * a solution to a problem.
   * */
  OAR(solution) {
    const n = this.size;
    const vs = this.vars;
    const m = solution.getMap();
    return range(n).reduce((oar, i) => (
      oar.concat(
        range(n).reduce((row, j) => (
          row.concat([[i, j, vs[i][j].indexOf(vs[i][j].find((v) => (m[v])))]])
        ), [])
      )
    ), []);
  }

}

module.exports = { range, LatinSquare };

