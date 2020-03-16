/**
 * ThreadListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import ThreadLink from './ThreadLink';
import Wrapper from './Wrapper';

export function ThreadListItem(props) {
  const { item = {} } = props;
  let threadPrefix = '';

  // Highlight currently-active thread
  if (item.id === props.currentThread) {
    threadPrefix = `+`;
  }

  // Put together the content of the thread
  const content = (
    <Wrapper>
      <ThreadLink href={item.html_url} target="_blank">
        {threadPrefix + item.name}
      </ThreadLink>
    </Wrapper>
  );

  // Render the content into a list item
  return <ListItem key={`thread-list-item-${item.id}`} item={content} />;
}

ThreadListItem.propTypes = {
  item: PropTypes.object,
  currentThread: PropTypes.number,
};

export default connect(
  createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
  }),
)(ThreadListItem);
