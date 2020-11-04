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

  Step2Comp = (props) => {
    const { contextState } = props;
    const { contextValue, setOnce } = this.state;
    this.setState({ contextValue: contextState });
    // if (
    //   contextValue &&
    //   (contextState.name !== contextValue.name ||
    //     contextState.name1 !== contextValue.name1) &&
    //   setOnce
    // ) {
    //   this.setState({ contextValue: contextState });
    // }
    // if (!contextValue && !setOnce) {
    //   this.setState({ contextValue: contextState, setOnce: true });
    // }
    return null;
  };

  WrapWithShellContext = withHooksHOC(this.Step2Comp);

  emittedValue = (inputValue, dispatch) => {
    this.setState({ dispatch: dispatch, contextValue: inputValue });
  };

  render() {
    const { contextValue } = this.state;
    console.log("render ShellContainer", contextValue);
    return (
      <div style={{ border: "1px solid red", padding: "5px" }}>
        <Shell
          value={contextValue || null}
          campaignData={{ name: "john doe", name1: "jane doe" }}
          onChange={(e) => this.emittedValue(e)}
          showError={false}
        >
          <Shell.Group>
            <h4>This is Shell Group</h4>
            <Shell.CtrlInput 
              name={contextValue ? contextValue.name : ""} 
              onChange={() => {}}
            />
            <Shell.CtrlInputOne />
            <WrappedContextValueLabel />
          </Shell.Group>
          <Shell.Group>Render Once</Shell.Group>
          {/* {this.WrapWithShellContext()} */}
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
