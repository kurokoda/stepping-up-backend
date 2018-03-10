import {css, StyleSheet} from 'aphrodite';
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

class FacilityView extends Component {

  render() {
    const textString = 'Facilitys';

    return (
      <section className={css(styles.container)}>
        <div className={css(styles.content)}>
          <h2 className={css(styles.text)}>{textString}</h2>
          <br/>
          <Button block onClick={() => this.props.getFacilitys()}>Show All Facilitys</Button>
          <Button block onClick={() => this.props.getFacility({id: 1})}>Show Facility</Button>
          <Button block onClick={() => this.props.postFacility({id: 1})}>Create Facility</Button>
          <Button block onClick={() => this.props.patchFacility({id: 1})}>Edit Facility</Button>
          <Button block bsStyle='danger' onClick={() => this.props.deleteFacility({id: 1})}>Delete Facility</Button>
        </div>
      </section>
    );
  }
}

FacilityView.propTypes = {};

FacilityView.defaultProps = {};

export default withRouter(FacilityView);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    display        : 'flex',
    justifyContent : 'center',
    textAlign      : 'center',
    height         : '100vh',
  },
  content  : {
    WebkitBoxFlex: 0,
    WebkitFlex   : 'none',
    MsFlex       : 'none',
    flex         : 'none',
    minWidth     : '300px',
    maxWidth     : '50%',
  },
  text     : {
    display: 'block',
  },
});