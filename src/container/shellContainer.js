import React, { PureComponent } from "react";
import Shell from "../component/shellStepOne";
import withHooksHOC from "../hoc/shell.hoc";
import ShellContext from "../context/shellContext";

const ContextValueLabel = (props) => {
  const {
    contextState: { name, name1 }
  } = props;
  return (
    <div>
      <h4> ContextValue for Input1: {name || "Empty"}</h4>
      <h4> ContextValue for Input2: {name1 || "Empty"}</h4>
    </div>
  );
};

const WrappedContextValueLabel = withHooksHOC(ContextValueLabel);

class ShellContainer extends PureComponent {
  state = {
    setOnce: false,
    contextValue: null
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log({ prevProps });
    // console.log("props", this.props);
    // console.log({ prevState });
    // console.log("state", this.state);
  }

  Step2Comp = (props) => {
    const { contextState } = props;
    const { contextValue, setOnce } = this.state;
    if (
      contextValue &&
      (contextState.name !== contextValue.name ||
        contextState.name1 !== contextValue.name1) &&
      setOnce
    ) {
      this.setState({ contextValue: contextState });
    }
    if (!contextValue && !setOnce) {
      this.setState({ contextValue: contextState, setOnce: true });
    }
    return null;
    // return (
    //   <div>
    //     {contextValue && (
    //       <h4>
    //         Inside Shell Provider <br /> ContextValue via stateObject:{" "}
    //         {contextValue.name || "Empty"}
    //       </h4>
    //     )}
    //   </div>
    // );
  };

  WrapWithShellContext = withHooksHOC(this.Step2Comp);

  render() {
    const { contextValue } = this.state;
    console.log("Render", contextValue);
    return (
      <div style={{ border: "1px solid red", padding: "5px" }}>
        <Shell data={{ name: "john doe", name1: "Jane doe" }}>
          <Shell.Group>
            <h4>This is Shell Group</h4>
            <Shell.CtrlInput />
            <Shell.CtrlInputOne />
            <WrappedContextValueLabel />
          </Shell.Group>
          {this.WrapWithShellContext()}
        </Shell>
        <div style={{ border: "1px solid red", padding: "5px" }}>
          <h4>Step 2 component</h4>
          {contextValue && (
            <div>
              <h4> Value from purely State: {contextValue.name}</h4>
              <h4> Value from purely State: {contextValue.name1}</h4>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ShellContainer;
