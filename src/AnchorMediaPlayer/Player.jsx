import React from 'react';
import PropTypes from 'prop-types';
import './Player.css';
import AnchorVideoPlayer from './VideoPlayer';

const MediaPlayer = props => (
  <AnchorVideoPlayer
    key={props.mediaUrl}
    src={props.mediaUrl}
    posterUrl={props.posterUrl}
    height="300"
    playing={props.playing}
    onVideoEnd={props.onEnd}
    onDurationChange={props.onDurationChange}
    onTimeUpdate={props.onTimeUpdate}
  />
);

MediaPlayer.defaultProps = {
  onEnd: () => {},
  playing: false,
  onDurationChange: () => {},
  onTimeUpdate: () => {},
};

MediaPlayer.propTypes = {
  mediaUrl: PropTypes.string.isRequired,
  posterUrl: PropTypes.string.isRequired,
  playing: PropTypes.bool,
  onEnd: PropTypes.func,
  onDurationChange: PropTypes.func,
  onTimeUpdate: PropTypes.func,
};

export { MediaPlayer as default };
