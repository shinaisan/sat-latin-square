import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {
  Panel,
  Pagination
} from 'react-bootstrap';
import { range } from './solver';

const cell = (bgcolor, fgcolor, number) => (
  <div
    style={{
      width: "32px",
      height: "32px",
      backgroundColor: bgcolor,
      textAlign: 'center'
    }}
  >
    <span
      style={{color: fgcolor, lineHeight: "32px"}}
    >{number.toString()}</span>
  </div>
);

const rainbow = (index, size) => {
  index = (index % size);
  const d = Math.floor(index * 360 / size);
  return 'hsl(' + d.toString() + ',100%,70%)';
};

class ColorGrid extends React.Component {

  handlePageSelect(eventKey) {
    this.props.dispatch({
      type: 'PAGE_SET',
      page: eventKey - 1
    });
  }

  table(solutions, size, index) {
    const solution = solutions[index];
    return (
      <table>
        <tbody>
          {
            range(size).map((x, i) => (
              <tr>
                {
                  range(size).map((y, j) => (
                    <td>
                      {
                        cell(
                          rainbow(solution[i][j], size),
                          rainbow(solution[i][j] + Math.floor(size/2), size),
                          solution[i][j])
                      }
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }

  render() {
    const tables = 10;
    const busy = this.props.sat.busy;
    const problem = this.props.sat.problem;
    const solutions = this.props.sat.solutions;
    if (busy) {
      return (
        <div><FontAwesome name="spinner" /></div>
      );
    } else if (solutions) {
      const page = this.props.paginate.page;
      const pages = Math.floor((solutions.length + tables - 1) / tables);
      return (
        <div>
          <Pagination
            prev next first last ellipsis boundaryLinks
            items={pages}
            maxButtons={10}
            activePage={page + 1}
            onSelect={this.handlePageSelect.bind(this)}
          />
          <div>
            {
              range(tables).map((x, t) => {
                const index = t + page*tables;
                if (index < solutions.length) {
                  return (
                    <Panel
                      header={"#" + index.toString()}
                      style={{display: 'inline-block'}}
                    >
                      { this.table(solutions, problem.size, index) }
                    </Panel>
                  );
                } else {
                  return (<div/>);
                }
              })
            }
          </div>
        </div>
      );
    } else {
      return (
        <div>Nothing to show here.</div>
      );
    }
  }

}

ColorGrid = connect(
  state => ({ sat: state.sat, paginate: state.paginate })
)(ColorGrid);

export default ColorGrid;

