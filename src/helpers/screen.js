import React from 'react';
import { startCase } from 'lodash';
import { Helmet } from 'react-helmet-async';
import { wrapComponent, getWrappedComponent } from 'utils/hoc';

// Note: Ideally the screen helper would be agnostic to specific
// layouts and instead allow them to be defined by an app wiring
// them together, however react-hot-reloader has issues with this.

export default function (Component) {
  const Wrapped = getWrappedComponent(Component);
  const title = Wrapped.title || startCase(Wrapped.name.replace(/Screen$/, ''));

  class Screen extends React.PureComponent {
    render() {
      return (
        <React.Fragment>
          <Helmet>
            {this.renderTitle()}
            {this.renderCanonical()}
          </Helmet>
          <Component {...this.props} />
        </React.Fragment>
      );
    }

    renderTitle() {
      const parts = [];
      parts.push(Component.title || title);
      return <title>{parts.join(' | ')}</title>;
    }

    renderCanonical() {
      const url = `${location.origin}${location.pathname}`;
      return <link rel="canonical" href={url} />;
    }
  }
  return wrapComponent(Component, Screen);
}
