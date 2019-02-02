import React, { Component } from 'react';
import Card from '../Card';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videos: [
        {
          key: '1',
          title: 'Wind Never Felt Better',
          company: 'Budweiser',
          url: 'https://www.youtube.com/watch?v=B6VciSoR1iQ',
        },
        {
          key: '2',
          title: 'Wind Never Felt Better',
          company: 'Budweiser',
          url: 'https://www.youtube.com/watch?v=B6VciSoR1iQ',
        },
      ],
      user: {
        name: 'Clarence',
      },
    }
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
                <button className="Profile__button Profile__button--logout">Log Out</button>
              </div>)
              :
              (<div className="Profile">
                <button className="Profile__button">Log In</button>
              </div>)
            }
          </div>
        </div>
        <main className="Cards">
            {videos.map(video => {
              return (
                <Card url={video.url}
                  title={video.title}
                  company={video.company}
                  key={video.key}
                  id={video.key} />
              )
            })}
        </main>
      </div>
    );
  }
}

export default App;
