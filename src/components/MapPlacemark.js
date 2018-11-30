import React, {Component} from 'react'
import { Placemark } from 'react-yandex-maps';
import ReactDOM from 'react-dom';

import { MapBaloon } from './index'

import { cleareNullAddress, latLngToString, mapObj } from '../helpers/map'

class MapPlacemark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPlacemark: null
    };

    this.addres = [props.items[0].address.lat, props.items[0].address.lng];

    this.getrefs = this.getrefs.bind(this);
    this.balloonOpen = this.balloonOpen.bind(this);
    this.balloonClose = this.balloonClose.bind(this);
    this.renderBalloon = this.renderBalloon.bind(this);
  }

  renderBalloon() {
    if(this.state.currentPlacemark==null)
      return;

    let body = document.createElement('content');
    ReactDOM.render(
      this.props.items.map( (el,i,arr)=>(
        <MapBaloon
          key={latLngToString( el.address.lat, el.address.lng )}
          item={el}
        />
      ) ),
      body
    );
    console.log(body.outerHTML, body);
    this.state.currentPlacemark.properties.set('balloonContentBody', body.outerHTML);
    body.remove();

    let header = document.createElement('div');
    ReactDOM.render(
      <p>пидрила ебаная</p>,
      header
    );
    this.state.currentPlacemark.properties.set('balloonContentHeader', header.outerHTML);
    header.remove();
  }

  balloonOpen(e) {
    let body = document.createElement('div');
    ReactDOM.render(
      this.props.items.map( (el,i,arr)=>(
        <MapBaloon
          key={latLngToString( el.address.lat, el.address.lng )}
          item={el}
        />
      ) ),
      body
    );
    console.log(body.outerHTML, body);
    e.get("target").properties.set('balloonContentBody', body.outerHTML);
    body.remove();

    let header = document.createElement('div');
    ReactDOM.render(
      <p>пидрила ебаная</p>,
      header
    );
    e.get("target").properties.set('balloonContentHeader', header.outerHTML);
    header.remove();

    /*console.log(e.get("target"));


    let hhh = ()=>{
      this.setState({
        currentPlacemark: e.get("target")
      });
    };
    hhh = hhh.bind(this);
    setTimeout(hhh,2000);*/
    /*this.setState({
      currentPlacemark: e.get("target")
    });*/
  }

  balloonClose(e) {
    //console.log('balloonClose');
    this.setState({
      currentPlacemark: null
    });
  }

  getrefs(Placemark){
    console.log('df');
    Placemark.events.add('balloonopen', this.balloonOpen);
    Placemark.events.add('balloonclose', this.balloonClose);
  }

  render() {
    return (
      <Placemark
        instanceRef={this.getrefs}
        modules={['geoObject.addon.balloon']}
        defaultGeometry={this.addres}
        properties={{
          balloonContentHeader : '<div id="balloon-content-header"></div>',
          balloonContentBody : '<div id="balloon-content-body"></div>'
        }}
      />
    );
  }

  componentDidUpdate(){
    console.log('componentDidUpdate', this.state);
    //this.renderBalloon();
  }

  shouldComponentUpdate(){
    return true;
  }
};

export default MapPlacemark;