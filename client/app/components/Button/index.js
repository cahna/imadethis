/**
 *
 * Button.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { Children } from 'react';
import PropTypes from 'prop-types';

import A from './A';
import StyledButton from './StyledButton';
import StyledInputButton from './StyledInputButton';
import Wrapper from './Wrapper';

/* eslint-disable react/jsx-props-no-spreading */
function Button(props) {
  const { href, children, onClick, handleRoute, ...rest } = props;

  // Render an anchor tag
  let button = (
    <A href={href} onClick={onClick}>
      {Children.toArray(children)}
    </A>
  );

  // If the Button has a handleRoute prop, we want to render a button
  if (handleRoute) {
    button = (
      <StyledButton onClick={handleRoute}>
        {Children.toArray(children)}
      </StyledButton>
    );
  } else if (props.type && props.type === 'submit') {
    button = <StyledInputButton type="submit" onClick={onClick} {...rest} />;
  }

  return <Wrapper>{button}</Wrapper>;
}

Button.propTypes = {
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export default Button;
