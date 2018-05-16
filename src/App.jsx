import React, { Component } from 'react';
import axios from 'axios';
import BSBApi from './BSBApi';

import './App.css';
import AnchorMediaPlayer from './AnchorMediaPlayer/Player';
import AnchorVideoList from './AnchorVideoList/List';

class App extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      currentVideoIndex: 0,
      isCurrentVideoPlaying: true,
      tracks: [],
      loading: true,
      errorMessage: '',
      currentTime: 0,
      duration: 0,
    };
  }
  componentWillMount() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  componentDidMount() {
    BSBApi.getTracks()
      .then(tracks => {
        this.setState(() => ({
          tracks,
          loading: false,
        }));
      })
      .catch(() => {
        this.setState(() => ({
          errorMessage:
            'There was an issue requesting the tracks. May I suggest trying Firefox?',
          loading: false,
        }));
      });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleKeyDown.bind(this));
  }

  getCurrentVideo = () => this.state.tracks[this.state.currentVideoIndex];

  getRemainingSeconds = () =>
    Math.ceil(this.state.duration - this.state.currentTime);

  handleRequestPreviousSong = () => {
    this.setState(prevState => {
      const nextIndex =
        prevState.currentVideoIndex === 0
          ? this.state.tracks.length - 1
          : prevState.currentVideoIndex - 1;
      return {
        currentVideoIndex: nextIndex,
      };
    });
  };

  handleRequestNextSong = () => {
    this.setState(prevState => {
      const nextIndex =
        prevState.currentVideoIndex === this.state.tracks.length - 1
          ? 0
          : prevState.currentVideoIndex + 1;
      return {
        currentVideoIndex: nextIndex,
      };
    });
  };

  _handleKeyDown = event => {
    const SPACE_KEY_CODE = 32;
    const RIGHT_ARROW_KEY_CODE = 39;
    const LEFT_ARROW_KEY_CODE = 37;
    switch (event.keyCode) {
      case SPACE_KEY_CODE:
        event.preventDefault();
        this.handleTogglePlay();
        break;
      case RIGHT_ARROW_KEY_CODE:
        event.preventDefault();
        this.handleRequestNextSong();
        break;
      case LEFT_ARROW_KEY_CODE:
        event.preventDefault();
        this.handleRequestPreviousSong();
        break;
      default:
        break;
    }
  };

  handleTogglePlay = () => {
    this.setState(prevState => ({
      isCurrentVideoPlaying: !prevState.isCurrentVideoPlaying,
    }));
  };

  handlePlayRequest = index => {
    this.setState(() => ({
      currentVideoIndex: index,
      isCurrentVideoPlaying: true,
    }));
  };

  handlePauseRequest = index => {
    this.setState(() => ({
      currentVideoIndex: index,
      isCurrentVideoPlaying: false,
    }));
  };

  handleDurationChange = duration => {
    this.setState(() => ({
      duration,
    }));
  };

  handleTimeUpdate = currentTime => {
    this.setState(() => ({
      currentTime,
    }));
  };
  handleEnd = () => {
    this.handleRequestNextSong();
  };

  fetchTracks = () =>
    axios.get(
      'https://s3-us-west-2.amazonaws.com/anchor-website/challenges/bsb.json',
    );

  render() {
    return (
      <div className="App">
        {this.state.loading && 'loading'}
        {this.state.errorMessage}

        {!this.state.loading &&
          !this.state.errorMessage && (
            <div>
              <div className="App_MediaPlayerSection">
                <div className="App_MediaTitle">
                  {this.getCurrentVideo().title}
                </div>
                <AnchorMediaPlayer
                  mediaUrl={this.getCurrentVideo().mediaUrl}
                  posterUrl={this.getCurrentVideo().imageUrl}
                  playing={this.state.isCurrentVideoPlaying}
                  onEnd={this.handleEnd}
                  onDurationChange={this.handleDurationChange}
                  onTimeUpdate={this.handleTimeUpdate}
                />
                <button onClick={this.handleRequestPreviousSong}>
                  Previous
                </button>
                <button onClick={this.handleTogglePlay}>
                  {this.state.isCurrentVideoPlaying ? 'Pause' : 'Play'}
                </button>
                <button onClick={this.handleRequestNextSong}>Next</button>
                <br />
                Remaining: {`${this.getRemainingSeconds()} seconds`}
              </div>
              <div className="App_ListSection">
                <AnchorVideoList
                  videos={this.state.tracks}
                  isCurrentVideoPlaying={this.state.isCurrentVideoPlaying}
                  currentVideoIndex={this.state.currentVideoIndex}
                  onPlay={this.handlePlayRequest}
                  onPause={this.handlePauseRequest}
                />
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default App;
