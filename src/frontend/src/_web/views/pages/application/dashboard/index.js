import {css, StyleSheet} from 'aphrodite';
import React from 'react';
import {withRouter} from 'react-router-dom';
import DetaineeTile from './DetaineeTile';
import PaginationBar from './PaginationBar';

const DashboardView = ({...props}) => {

  return (
    <section className={css(styles.container)}>
      <div className={css(styles.content)}>
        <h3>Dashboard</h3>
        {
          props.detainees.map((detainee, key) => {
            return <DetaineeTile key={key} detainee={detainee}/>
          })
        }
        <PaginationBar callback="" page="" pages=""/>
      </div>
    </section>
  );
}

DashboardView.propTypes = {};

DashboardView.defaultProps = {};

export default withRouter(DashboardView);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    display        : 'flex',
    justifyContent : 'center',
    textAlign      : 'center',
    height         : '100vh',
  },
  content  : {},
  text     : {
    display: 'block',
    color  : '#0F0',
  },
});