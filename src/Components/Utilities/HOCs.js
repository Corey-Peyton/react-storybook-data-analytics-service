import React from 'react';
import {withRouter} from 'react-router-dom';

export const withRouterAndRef = (WrappedComponent) => {
  class InnerComponentWithRef extends React.Component {
    render() {
      const {forwardRef, ...rest} = this.props;
      return <WrappedComponent {...rest} ref={forwardRef} />;
    }
  }
  const ComponentWithRouter = withRouter(InnerComponentWithRef, {
    withRef: true,
  });
  return React.forwardRef((props, ref) => {
    return <ComponentWithRouter {...props} forwardRef={ref} />;
  });
};
