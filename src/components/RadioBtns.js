import React, {Component} from 'react'

class RadioBtns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      active: props.default
    };

    this.updateInputValue = this.updateInputValue.bind(this);
  }

  updateInputValue(evt) {
    this.setState({
      active: evt.target.value
    });

    if( 'onChange' in this.props )
      this.props.onChange(evt.target.value);
  }

  render() {
    return (
      <content className={"input-radio"}>
        {this.state.data.map((el,i,arr) => (
          <label
            key={el.value}
            className={"input-radio-elem"}>
              <input
                type={"radio"}
                checked={this.state.active==el.value}
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

export default RadioBtns;