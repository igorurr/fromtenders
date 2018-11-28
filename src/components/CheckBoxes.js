import React, {Component} from 'react'

import { tryRemoveFromArray, tryPushToArray } from '../helpers'

class CheckBoxes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      actives: 'default' in props ? props.default : []
    };

    this.updateInputValue = this.updateInputValue.bind(this);
  }

  getNewStateActive( elem, state )
  {
    let newState = this.state.actives.slice();

    if( state==true )
      tryPushToArray(newState,elem);
    else
      tryRemoveFromArray(newState,elem);

    return newState;
  }

  updateInputValue(evt) {
    const newActives = this.getNewStateActive(evt.target.value, evt.target.checked);

    this.setState({
      actives: newActives
    });

    if( 'onChange' in this.props )
      this.props.onChange(newActives);
  }

  render() {
    return (
      <content className={"input-checkbox"}>
        {this.state.data.map((el,i,arr) => (
          <label
            key={el.value}
            className={"input-checkbox-elem"}>
              <input
                type={"checkbox"}
                checked={this.state.actives.indexOf(el.value)!==-1}
                onChange={this.updateInputValue}
                value={el.value}
              />
              {el.text}
          </label>
        ))}
      </content>
    );
  }
};

export default CheckBoxes;