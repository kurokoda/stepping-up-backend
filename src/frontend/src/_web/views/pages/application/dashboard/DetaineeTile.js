import {css, StyleSheet} from 'aphrodite';
import React from 'react';
import COLOR from '../../../../../shared/constants/colors';

const DetaineeTile = ({...props}) => {

  const nameFirst = props.detainee.get('name').get('first');
  const nameLast  = props.detainee.get('name').get('last');

  return (
    <div className={css(styles.container)}>
      <div>{`${nameLast}, ${nameFirst}`}</div>
    </div>
  );
};

DetaineeTile.propTypes = {};

DetaineeTile.defaultProps = {};

export default DetaineeTile;

const styles = StyleSheet.create({
  container: {
    outline     : `${COLOR.GREEN_LIGHT} 1px solid`,
    textAlign   : 'left',
    padding     : '10px',
    borderRadius: '10px',
    height      : '40px',
    width       : '300px',
    //marginBottom: '10px',
  },
});