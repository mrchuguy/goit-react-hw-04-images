import { Component } from 'react';
import { ImgModalWrap, Overlay } from './Modale.styled';
import PropTypes from 'prop-types';

export class Modale extends Component {
  static propTypes = {
    image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyup);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyup);
  }

  handleKeyup = event => {
    if (event.code === 'Escape') this.props.onClose();
  };

  handleClick = event => {
    if (event.target.tagName !== 'IMG') this.props.onClose();
  };

  render() {
    const {
      image: { largeImageURL, tags },
    } = this.props;

    return (
      <Overlay onClick={this.handleClick}>
        <ImgModalWrap>
          <img src={largeImageURL} alt={tags} />
        </ImgModalWrap>
      </Overlay>
    );
  }
}
