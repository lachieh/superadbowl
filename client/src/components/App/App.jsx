import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

import Card from '../Card';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videos: [],
      user: null,
    }

    this.getUser = this.getUser.bind(this);
    this.getVideos = this.getVideos.bind(this);
  }

  componentDidMount() {
    const socket = socketIOClient();
    socket.on('videoUpdated', data => {
      console.log(data);
      this.setState({ videos: data.videos });
    });
    this.getUser();
    this.getVideos();
  }

  getUser() {
    axios.get('/api/user')
      .then(res => {
        this.setState({
          user: res.data.user,
        })
      })
  }

  getVideos() {
    axios.get('/api/videos')
      .then(res => {
        this.setState({
          videos: res.data.videos,
        })
      })
  }

  render() {
    const { user, videos } = this.state;
    return (
      <div className="App">
        <div className="Card">
          <div className="Card__content">
            <h1 className="Card__title Card__title--center">Super(Ad)Bowl</h1>
            <p className="Card__copy">Watch and react to all (well, most) of the Super Bowl ads for
              2019. New commercials are added as soon as I can find them after they air and reactions
              from other users are updated in real time! Go anyone-but-the-patriots!</p>
            <p className="Card__copy Card__copy--end">
              <span role="img" aria-label="Love">❤️</span>Lachlan</p>
          </div>
          <div className="Card__bottom">
            {user ?
              (<div className="Profile">
                <span className="Profile__user">{user.name}</span>
                <a href="/api/user/logout" className="Profile__button Profile__button--logout">Log Out</a>
              </div>)
              :
              (<div className="Profile">
                <a href="/api/user/login" className="Profile__button">Log In</a>
              </div>)
            }
          </div>
        </div>
        <main className="Cards">
            {videos.map(video => {
              const props = { ...video };
              props.key = video.id;
              props.loggedIn = user ? true : false;
              return (
                <Card {...props} />
              )
            })}
        </main>
      </div>
    );
  }
}

export default App;
