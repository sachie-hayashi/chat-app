import PropTypes from 'prop-types';
import { ReactComponent as ThreeDots } from '../../assets/icon-three-dots.svg';
import { ReactComponent as Paperclip } from '../../assets/icon-paperclip.svg';
import { ReactComponent as SmileySmile } from '../../assets/icon-smiley-smile.svg';
import { ReactComponent as PaperPlane } from '../../assets/icon-paper-plane.svg';

/**
 * Renders a SVG icon
 * @param {string} props.name Icon name
 * @param {object} props.attr Attributes for a SVG element. (All props other than props.name)
 * @returns Icon component to display a SVG
 * @usage e.g. <Icon name="cart" width="30" height="30" className="shopping-cart"/>
 */

const Icon = ({ name, ...attr }) => {
  switch (name) {
    case 'three-dots':
      return <ThreeDots {...attr} />;
    case 'paperclip':
      return <Paperclip {...attr} />;
    case 'smiley-smile':
      return <SmileySmile {...attr} />;
    case 'paper-plane':
      return <PaperPlane {...attr} />;
    default:
      return;
  }
};

Icon.propTypes = {
  name: PropTypes.string,
};

Icon.defaultProps = {
  name: '',
};

export default Icon;
