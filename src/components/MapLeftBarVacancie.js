import React, {Component} from 'react';


class MapLeftBarVacancie extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;

    return (
      <article>
        <a href={item.alternate_url} target={"blank"}>
          <content>
            {item.name}
          </content>
          <footer>
            {item.employer.name}
          </footer>
        </a>
      </article>
    );
  }
};

export default MapLeftBarVacancie;