import { useReducer, useEffect } from "react";

function reducer(state, { type, data, error }) {
  switch (type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: error,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

function useAsync(callback, deps=[], skip=false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      dispatch({ type: "SUCCESS", data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    if(skip) return;
    fetchData();
  }, deps);

  return [state, fetchData];
}

export default useAsync;
