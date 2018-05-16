import React from 'react';
import PropTypes from 'prop-types';
import './VideoPlayer.css';

class VideoPlayer extends React.Component {
  constructor(...props) {
    super(...props);

    this.state = {
      currentTime: 0,
      duration: null,
    };

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.addEventListenersToVideoRef();
    if (this.props.playing) this.playVideo();
  }

  componentDidUpdate(prevProps) {
    const playInitiated = Boolean(this.props.playing && !prevProps.playing);
    const pauseInitiated = Boolean(!this.props.playing && !prevProps.playing);

    if (playInitiated) {
      this.playVideo();
    }
    if (pauseInitiated) {
      this.pauseVideo();
    }
  }

  getTimeRemaining = () => this.state.duration - this.state.currentTime;

  playVideo = () => {
    this.playVideoPromise = this.videoRef.current.play();
  };

  pauseVideo = () => {
    this.pauseVidePromise = this.videoRef.current.pause();
  };

  addEventListenersToVideoRef = () => {
    this.videoRef.current.addEventListener(
      'timeupdate',
      e => {
        this.handleVideoTimeUpdate(e.target.currentTime, e.target.duration);
      },
      true,
    );
    this.videoRef.current.addEventListener(
      'ended',
      () => {
        this.handleVideoEnded();
      },
      true,
    );
    this.videoRef.current.addEventListener(
      'durationchange',
      e => {
        this.handleDurationChange(e.target.duration);
      },
      true,
    );
  };

  handleVideoEnded = () => {
    this.props.onVideoEnd();
  };

  handleDurationChange = duration => {
    this.props.onDurationChange(duration);
  };

  handleVideoTimeUpdate = currentTime => {
    this.props.onTimeUpdate(currentTime);
  };

  renderControls = () => (
    <React.Fragment>
      <button onClick={this.playVideo}>PLAY!</button>
      <button onClick={this.pauseVideo}>PAUSE!</button>
    </React.Fragment>
  );

  render() {
    return (
      <div className="VideoPlayer_root">
        {this.props.controls && this.renderControls()}
        <div className="VideoPlayer_Container">
          <video
            style={{ height: this.props.height }}
            ref={this.videoRef}
            src={this.props.src}
            height={this.props.height}
            poster={this.props.posterUrl}
            preload="auto"
          >
            Sorry, your browser doesn't support embedded videos, but don't
            worry, you can{' '}
            <a href="https://archive.org/details/BigBuckBunny_124">
              download it
            </a>
            and watch it with your favorite video player!
          </video>
        </div>
      </div>
    );
  }
}

VideoPlayer.defaultProps = {
  height: '500',
  playing: false,
  onVideoEnd: () => {},
  onDurationChange: () => {},
  onTimeUpdate: () => {},
  controls: false,
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.string,
  posterUrl: PropTypes.string.isRequired,
  playing: PropTypes.bool,
  onVideoEnd: PropTypes.func,
  controls: PropTypes.bool,
  onDurationChange: PropTypes.func,
  onTimeUpdate: PropTypes.func,
};

export { VideoPlayer as default };
