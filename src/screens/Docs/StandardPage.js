import React from 'react';
import Markdown from 'components/Markdown';
import Heading from './Heading';
import 'github-markdown-css';
import { enrichMarkdown } from 'utils/markdown';

import './table.less';
import { Context } from './Context';

export default class StandardPage extends React.Component {
  static contextType = Context;

  state = {
    application: undefined,
  };

  render() {
    const { page } = this.props;
    let markdown = enrichMarkdown(
      page.markdown,
      null,
      null,
      this.props.substitutions
    );

    return (
      <div className="docs markdown-body">
        <Markdown
          trusted
          source={markdown}
          components={{
            heading: Heading,
          }}
        />
      </div>
    );
  }
}
