import React from 'react';
import PropTypes from 'prop-types';
import './List.css';
import ListItem from './ListItem';

const VideoList = props => (
  <div className="AnchorVideoList_root">
    {props.videos.map((video, index) => {
      const isPlaying =
        props.isCurrentVideoPlaying && props.currentVideoIndex === index;
      return (
        <ListItem
          key={video.mediaUrl}
          title={video.title}
          imageUrl={video.imageUrl}
          playing={isPlaying}
          onPlay={() => props.onPlay(index)}
          onPause={() => props.onPause(index)}
        />
      );
    })}
  </div>
);

VideoList.defaultProps = {
  videos: [],
  isCurrentVideoPlaying: false,
  currentVideoIndex: null,
  onPlay: () => {},
  onPause: () => {},
};

VideoList.propTypes = {
  videos: PropTypes.array,
  isCurrentVideoPlaying: PropTypes.bool,
  currentVideoIndex: PropTypes.number,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
};

export { VideoList as default };
