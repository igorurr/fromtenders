import React, {Component} from 'react';

class RowComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>{this.props.item.name} from {this.props.item.position} to {this.props.item.description}</li>
      <button onClick={this.props.onAdd}>Add</button>
      <button onClick={this.props.onRemove}>Remove</button>
    )
  }
}

class ListVacancies extends React.Component {
  constructor(props) {
    super(props);
    const {isFetching, 
      page, 
      items, 
      loadNextPage, 
      addIfNotExist, 
      removeIfExist} = this.props;

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const root = document.getElementById('root');
    const bottomScrollMark = 200;
    const currentBottomScroll = root.scrollHeight - root.scrollTop - root.clientHeight;

    if (isFetching || currentBottomScroll > bottomScrollMark) {
      return;
    }
    loadNextPage(page + 1);
  }

  render() {
    return (
      <div onScroll={this.handleScroll}>
        <ul>
          {this.props.items.map(
            item => (
              <RowComponent key={item.id} item={item} onAdd={addIfNotExist} onRemove={this.removeIfExist}/>
            ))}
        </ul>
      </div>
    );
  }
};

export default ListVacancies;