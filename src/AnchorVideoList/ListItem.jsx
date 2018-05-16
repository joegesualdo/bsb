import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.css';

class ListItem extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseEnter = () => {
    this.setState(() => ({
      isHovering: true,
    }));
  };

  handleMouseLeave = () => {
    this.setState(() => ({
      isHovering: false,
    }));
  };

  render() {
    return (
      <div
        ref={this.itemRef}
        style={{ width: 200 }}
        className="AnchorVideoList_ListItem"
        key={this.props.imageUrl}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {/* TODO: Move style out of html and into the stylesheet */}
        {/* TODO: Move the rendering login into seperate functions */}
        <div
          style={{ width: '100%' }}
          className="AnchorVideoList_ListItem_CoverArt"
        >
          <div style={{ height: 200, width: '100%' }}>
            <img
              className="AnchorVideoList_ListItem_CoverArt_Image"
              src={this.props.imageUrl}
              style={{ height: '100%', width: '100%' }}
            />
            {(this.state.isHovering || this.props.playing) && (
              <div className="AnchorVideoList_ListItem_CoverArt_Overlay">
                <div className="AnchorVideoList_ListItem_ActionButton">
                  {(() => {
                    if (this.props.playing) {
                      return (
                        <img
                          className="AnchorVideoList_ListItem_ActionButton_Image"
                          onClick={this.props.onPause}
                          src="https://cdn.onlinewebfonts.com/svg/img_189384.png"
                        />
                      );
                    }
                    return (
                      <img
                        className="AnchorVideoList_ListItem_ActionButton_Image"
                        onClick={this.props.onPlay}
                        src="https://image.flaticon.com/icons/svg/149/149125.svg"
                      />
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
        {this.props.title}
      </div>
    );
  }
}

ListItem.defaultProps = {
  playing: false,
  onPlay: () => {},
  onPause: () => {},
};

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  playing: PropTypes.bool,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
};

export { ListItem as default };
