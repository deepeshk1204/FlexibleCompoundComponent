import React, { useContext, useEffect, useState, useReducer } from "react";
import styled from "@emotion/styled";
import { Input } from "antd";

import ShellContext from "../context/shellContext";

const CardContainer = styled.div`
  padding: 24px;
  background-color: #fff !important;
  margin-bottom: 1em !important;
  border-radius: 10px !important;
  border: 1px solid green;
  box-shadow: 0px 1px 4px rgba(184, 193, 205, 0.2),
    1px 4px 6px rgba(235, 239, 248, 0.1);
`;

/**
 *
 * @param {*} param0
 * <ShellMain value={}, onChange=() => {}>
 *  XYZ...
 * </ShellMain>
 */
export const ShellMain = ({ props, children }) => {
  const [contextValue] = useState(props);
  useEffect(() => {}, [contextValue]);
  const getContextValue = () => contextValue;
  return (
    <ShellContext.Provider
      value={{
        props,
        getContextValue
      }}
    >
      <ShellContext.Consumer>
        {(value) => {
          console.log("ShellMain inside consumer", value);
          return children;
        }}
      </ShellContext.Consumer>
    </ShellContext.Provider>
  );
};

const Shell = ({ data, children }) => {
  const parsedData = {
    ...data
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        // eslint-disable-next-line no-case-declarations
        const {
          payload: { field, data }
        } = action;
        return { ...state, [field]: data };
      default:
        return { ...state };
    }
  };

  const [contextState, dispatch] = useReducer(reducer, parsedData);
  const value = { contextState, dispatch };
  return (
    <ShellContext.Provider value={value}>{children}</ShellContext.Provider>
  );
};

Shell.Group = (props) => {
  const { children } = props;
  return <CardContainer>{children}</CardContainer>;
};

const CtrlInput = () => {
  const { contextState, dispatch } = useContext(ShellContext);
  const updateName = (data) => {
    dispatch({
      type: "update",
      payload: {
        field: "name",
        data
      }
    });
  };
  return (
    <CardContainer>
      <label>This is controlled input</label>
      <br />
      <Input
        onChange={(e) => updateName(e.target.value)}
        value={contextState.name}
      />
    </CardContainer>
  );
};

Shell.CtrlInput = CtrlInput;

const CtrlInputOne = () => {
  const { contextState, dispatch } = useContext(ShellContext);
  const updateName = (data) => {
    dispatch({
      type: "update",
      payload: {
        field: "name1",
        data
      }
    });
  };
  return (
    <CardContainer>
      <label>This is controlled input</label>
      <br />
      <Input
        onChange={(e) => updateName(e.target.value)}
        value={contextState.name1}
      />
    </CardContainer>
  );
};

Shell.CtrlInputOne = CtrlInputOne;

export default Shell;
