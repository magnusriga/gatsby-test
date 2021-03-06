import React from 'react';
import GlobalStyle from '../models/GlobalStyle';
// import determineTheme from '../utils/determineTheme';
import css from './css';
import hashCode from '../utils/hashCode';

export default function createGlobalStyle(strings, ...interpolations) {
  const rules = css(strings, ...interpolations);
  const id = `gatsby-plugin-global-styles${hashCode(JSON.stringify(rules))}`;
  const style = new GlobalStyle(rules, id);

  const GlobalStyleComponent = props => {
    const globalStyle = style;
    const elementId = id;
    const { children } = props;

    if (process.env.NODE_ENV !== 'production' && React.Children.count(children)) {
      // eslint-disable-next-line no-console
      console.warn(
        `The global style component ${elementId} was given child JSX. createGlobalStyle does not render children.`
      );
    }

    const context = props;

    globalStyle.createStyles(context);
    return <>{null}</>;
  };

  // Useful if we choose not to render GlobalStyleComponent,
  // and instead inject manually.
  GlobalStyleComponent.globalStyle = style;
  GlobalStyleComponent.elementId = id;

  return GlobalStyleComponent;
}
