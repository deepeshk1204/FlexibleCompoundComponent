import React from "react";
import ShellContext from "../context/shellContext";

// export const withHooksHOC = (Component) => (props) => {
//   let context = useContext(ShellContext);
//   context = {
//     ...context,
//     hocProp: "hi"
//   };
//   return <Component Shellcontext={context} {...props} />;
// };

export const withHooksHOC = (Component) => (props) => (
  <ShellContext.Consumer>
    {(value) => {
      const combine = {
        ...value,
        ...props
      };
      return (
        <Component {...combine}>{props ? props.children : null}</Component>
      );
    }}
  </ShellContext.Consumer>
);

export default withHooksHOC;
