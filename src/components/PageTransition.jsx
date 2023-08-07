import React from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

const PageTransition = ({ children }) => {
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={window.location.pathname}
        classNames="page"
        timeout={300}
      >
        <div className="page">{children}</div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default PageTransition;