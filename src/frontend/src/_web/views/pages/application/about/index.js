import {css, StyleSheet} from 'aphrodite';
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {Firebase} from '../../../../../shared/firebase';

class AboutView extends Component {

  // Props -------------------------------------------------------------

  static propTypes = {};

  static defaultProps = {};

  // React -------------------------------------------------------------

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentWillMount() {
    let messageRefs = Firebase.database().ref('messages').orderByKey().limitToLast(100);
    let messages    = [];
    messageRefs.on('child_added', message => {
      messages.push({text: message.val(), id: message.key});
      this.setState({messages});
    })
  }

  render() {
    const buttonTitle = 'Go To Home';
    const textString  = 'About View';

    return (
      <section className={css(styles.container)}>
        <div className={css(styles.content)}>
          <span className={css(styles.text)}>{textString}</span>
          <form onSubmit={this.onSubmit}>
            <input type="text" ref={ el => this.input = el }/>
            <input type="submit"/>
            {
              this.state.messages.map((message) => {
                return <p key={message.id}>{message.text}</p>
              })
            }
          </form>
          <Button onClick={this.onClick}>{buttonTitle}</Button>
        </div>
      </section>
    );
  }

  // Non-React -------------------------------------------------------------

  onSubmit = (event) => {
    Firebase.database().ref('messages').push(this.input.value);
    this.input.value = '';
    event.preventDefault();
  };

  onClick = () => {
    this.props.history.push('/')
  }
}

// Exports -------------------------------------------------------------

export default withRouter(AboutView);

// Styles -------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    display       : 'flex',
    flex          : '1 1 auto',
    alignItems    : 'center',
    justifyContent: 'center',
  },
  content  : {
    width  : '420px',
    outline: '1px solid gray',
    padding: '20px',
  },
  text     : {
    display: 'block',
    color  : '#0F0',
  },
});
