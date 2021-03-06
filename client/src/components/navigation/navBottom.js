import React, { Component } from 'react';
import { Link } from 'react-router';
import Camera from '../Camera';
import { connect } from 'react-redux';

class NavigationBar extends Component {
  render() {
    const { url } = this.props;
    const nearbyOpacity = url === 'nearby' ? 'glyphicon glyphicon-record' : 'glyphicon glyphicon-record button-opacity';
    const mapOpacity = url === 'googleMap' ? 'glyphicon glyphicon-map-marker' : 'glyphicon glyphicon-map-marker button-opacity';
    const chatOpacity = url === 'rooms' ? 'glyphicon glyphicon-envelope' : 'glyphicon glyphicon-envelope button-opacity';
    return (
      <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className="container-fluid">
          <div className="navbar-header justify-content">
            <Camera />
            <Link to="/"><span className={ nearbyOpacity } aria-hidden="true"></span></Link>
            <Link to="/googleMap"><span className={ mapOpacity } aria-hidden="true"></span></Link>
            {/* <Link to="/rooms"><span className={ chatOpacity }></span></Link> */}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url
  };
};

export default connect(mapStateToProps)(NavigationBar);
