import { createSlice } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as myqueries from "../../graphql/myqueries";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    entrants: [],
    entries: [],
  },
  reducers: {
    setEntrants: (state, { payload }) => {
      state.entrants = payload;
    },
    setEntries: (state, { payload }) => {
      state.entries = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEntrants, setEntries } = adminSlice.actions;

export default adminSlice.reducer;

export function fetchEntrants() {
  return async (dispatch) => {
    API.graphql(graphqlOperation(myqueries.listEntrantsWithEntries)).then(
      (results) => {
        let items = results.data.listEntrants.items;

        dispatch(setEntrants(items));
      }
    );
  };
}

export function fetchEntries() {
  return async (dispatch) => {
    API.graphql(graphqlOperation(queries.listEntrys)).then((results) => {
      let items = results.data.listEntrys.items;

      dispatch(setEntries(items));
    });
  };
}
