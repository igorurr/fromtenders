import React, {Component} from 'react';

class ListVacancies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          name: 'ds5f',
          position: [55.75, 37.57],
          description: 'dfdfgfdfgdfgfg'
        },
        {
          name: 'ds4f',
          position: [55.75, 38.57],
          description: 'dfdfgfdfgdfgfg'
        },
        {
          name: 'dsf6',
          position: [56.75, 37.57],
          description: 'dfdfgfdfgdfgfg'
        }
      ]
    };
  }

  render() {
    return (
      <p />
    );
  }
};

export default ListVacancies;