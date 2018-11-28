import React, {Component} from 'react'

class TextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue,
      type: ['date','number'].indexOf(props.type)!=-1 ? props.type : 'text'
    };

    this.updateInputValue = this.updateInputValue.bind(this);
  }

  updateInputValue(evt) {
    this.setState({
      value: evt.target.value
    });

    if( 'onChange' in this.props )
      this.props.onChange(evt.target.value);
  }

  render() {
    return (
      <input
        type={this.state.type}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.updateInputValue}
      />
    );
  }
};

export default TextField;