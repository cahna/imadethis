import React from 'react';
import { render } from '@testing-library/react';

import Section from '../index';

describe('<Section />', () => {
  it('should render a prop', () => {
    const id = 'testId';
    const { container } = render(<Section id={id} />);
    expect(container.querySelector('Section').id).toEqual(id);
  });

  it('should render its text', () => {
    const children = 'Text';
    const { container, queryByText } = render(<Section>{children}</Section>);
    const { childNodes } = container.querySelector('Section');
    expect(childNodes).toHaveLength(1);
    expect(queryByText(children)).not.toBeNull();
  });
});
