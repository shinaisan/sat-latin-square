import React from 'react';
import { connect } from 'react-redux';
import OptionsForm from './OptionsForm';
import ColorGrid from './ColorGrid';
import { LatinSquare } from './solver';

class SolverControl extends React.Component {

  handleSubmit(values) {
    const size = values.size = Number(values.size);
    const problem = new LatinSquare(size);
    const dispatch = this.props.dispatch;
    dispatch({
      type: 'OPTIONS_SET',
      options: values
    });
    dispatch({
      type: 'SOLVER_START',
      problem
    });
    dispatch({
      type: 'PAGE_SET',
      page: 0
    });
    setTimeout(() => {
      const solutions = problem.solve(100);
      const st = solutions.map((s) => (problem.getSymbolTable(s)));
      dispatch({
        type: 'SOLVER_STOP',
        problem,
        solutions: st
      });
    }, 0);
  }

  render() {
    const onSubmit = this.handleSubmit.bind(this);
    return (
      <div>
        <OptionsForm onSubmit={onSubmit} />
        <ColorGrid />
      </div>
    );
  }

}

SolverControl = connect()(SolverControl);

export default SolverControl;

