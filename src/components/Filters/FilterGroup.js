import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import Filter from './Filter';
import '../../styles/FilterGroup.css';

class FilterGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeValue: '',
      showGroup: true,
    };

    this.updateFilter = this.updateFilter.bind(this);
    this.showGroup = this.showGroup.bind(this);
  }

  updateFilter(value) {
    this.setState({ activeValue: value });
    this.props.handleChange(value);
  }

  showGroup() {
    this.setState({ showGroup: !this.state.showGroup })
  }

  render() {
    const { activeValue, showGroup } = this.state;
    const { header, parameter } = this.props;

    const defaultStyle = {
      transition: 'height 300ms ease-out',
      height: 0,
      overflow: 'hidden',
    }

    const transitionStyle = {
      entering: { height: 0 },
      entered:  { height: `${parameter.length * 20 + 10}px` }
    };

    return (
      <div className='filter-group'>

        <header onClick={() => this.showGroup()}>
          <b>{header}</b>
          <div className={ showGroup ? 'up' : 'down' } />
        </header>

        <content>
          <Transition in={showGroup} timeout={50}>
            {state => (
              <div
                style={{
                  ...defaultStyle,
                  ...transitionStyle[state]
                }}
              >
                <Filter
                  item={parameter}
                  activeValue={activeValue}
                  updateFilter={this.updateFilter}
                />
              </div>
            )}
          </Transition>
        </content>

      </div>
    );
  }
};

export default FilterGroup;
