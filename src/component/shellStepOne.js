import React, {
  useContext,
  useCallback,
  useEffect,
  useState,
  useReducer,
  useMemo
} from "react";
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

const Shell = ({ value, onChange, campaignData, children }) => {
  const parsedData = !value
    ? {
        ...campaignData
      }
    : {
        ...value
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
  const props = { contextState, dispatch };
  onChange(contextState);
  return (
    <ShellContext.Provider value={props}>{children}</ShellContext.Provider>
  );
};

Shell.Group = React.memo((props) => {
  const { children } = props;
  console.log("Render Shell.Group");
  return <CardContainer>{children}</CardContainer>;
});

const CtrlInput = () => {
  const { contextState, dispatch } = useContext(ShellContext);
  const { name } = contextState;
  const updateName = useCallback((data) => {
    dispatch({
      type: "update",
      payload: {
        error: "",
        field: "name",
        data
      }
    });
  }, []);
  console.log("render CtrlInput outer");
  return useMemo(() => {
    console.log("render CtrlInput Inner");
    return (
      <CardContainer>
        <label>This is controlled input</label>
        <br />
        <Input onChange={(e) => updateName(e.target.value)} value={name} />
      </CardContainer>
    );
  }, [name]);
  // return (
  //   <CardContainer>
  //     <label>This is controlled input</label>
  //     <br />
  //     <Input onChange={(e) => updateName(e.target.value)} value={name} />
  //   </CardContainer>
  // );
};

const areEqual = (prevMovie, nextMovie) => {
  console.log("prevMovie", prevMovie.name);
  console.log("nextMovie", nextMovie.name);
  if (prevMovie.name !== nextMovie.name) {
    return false;
  } else {
    return true;
  }
};

Shell.CtrlInput = CtrlInput;

const CtrlInputOne = (props) => {
  const { contextState, dispatch } = useContext(ShellContext);
  const updateName = useCallback(
    (data) => {
      dispatch({
        type: "update",
        payload: {
          error: "",
          field: "name1",
          data
        }
      });
    },
    [contextState.name1]
  );
  console.log("render CtrlInputOne");
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

Shell.CtrlInputOne = React.memo(CtrlInputOne);

export default Shell;
