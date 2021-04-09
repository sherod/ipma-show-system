import { createSlice } from "@reduxjs/toolkit";
import { Auth, API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";

const initialStateValues = {
  cost: 0.0,
  entryCount: 0,
  entrant: {},
  entries: [],
  hasEntrant: true,
  awaitingEntrant: true,
  loading: false,
  saving: false,
  hasErrors: false,
  loggedOut: true,
  isAdmin: false,
};

export const entriesSlice = createSlice({
  name: "entries",
  initialState: initialStateValues,
  reducers: {
    makeAdmin: (state, { payload }) => {
      state.isAdmin = payload;
    },
    logout: (state, { payload }) => {
      Object.assign(state, initialStateValues);
    },
    commitWork: (state) => {
      state.saving = true;
    },
    workSaved: (state) => {
      state.saving = false;
    },
    getEntries: (state) => {
      state.loading = true;
    },
    getEntrantSuccess: (state, { payload }) => {
      state.loggedOut = false;
      state.entrant = payload;
      state.loading = false;
      state.hasErrors = false;
      state.awaitingEntrant = false;
      state.hasEntrant = true;
    },
    getEntriesSuccess: (state, { payload }) => {
      state.entries = payload;
      state.entryCount = payload.length;
      state.cost = state.entryCount * 3;
      state.loading = false;
      state.hasErrors = false;
    },
    getEntriesFailure: (state, { payload }) => {
      //state.entries = payload
      state.loading = false;
      state.hasErrors = false;
      state.awaitingEntrant = false;
      state.hasEntrant = false;
    },
    getEntrantFailure: (state, { payload }) => {
      state.entrant = {};
      state.entries = [];
      state.hasEntrant = false;
      state.awaitingEntrant = true;
      state.loading = false;
      state.hasErrors = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getEntries,
  getEntriesSuccess,
  getEntriesFailure,
  getEntrantFailure,
  getEntrantSuccess,
  commitWork,
  workSaved,
  logout,
  makeAdmin,
} = entriesSlice.actions;

export default entriesSlice.reducer;

export function fetchEntries(entrantId) {
  return async (dispatch) => {
    dispatch(commitWork());
    try {
      API.graphql(
        graphqlOperation(queries.byEntrant, { entrantID: entrantId })
      ).then((result) => {
        dispatch(getEntriesSuccess(result.data.byEntrant.items));
        dispatch(workSaved());
      });
    } catch (error) {
      dispatch(getEntriesFailure());
    }
  };
}

export function fetchEntrant(user) {
  return async (dispatch) => {
    // dispatch(getEntries())

    try {
      if (user.attributes["custom:entrantID"] !== undefined) {
        API.graphql(
          graphqlOperation(queries.getEntrant, {
            id: user.attributes["custom:entrantID"],
          })
        ).then((entrant) => {
          if (entrant.data.getEntrant !== null) {
            API.graphql(
              graphqlOperation(queries.byEntrant, {
                entrantID: entrant.data.getEntrant.id,
              })
            ).then((result) => {
              let newEntrant = entrant.data.getEntrant;
              newEntrant.emailAddress = user.attributes["email"];
              dispatch(getEntriesSuccess(result.data.byEntrant.items));
              dispatch(getEntrantSuccess(newEntrant));
              dispatch(workSaved());
            });
          } else {
            dispatch(getEntrantFailure());
          }
        });
      } else {
        dispatch(getEntrantFailure());
      }
    } catch (error) {
      dispatch(getEntriesFailure());
    }
  };
}

export function updateEntrant(entrant) {
  return async (dispatch) => {
    dispatch(commitWork());
    try {
      API.graphql(
        graphqlOperation(mutations.updateEntrant, { input: entrant })
      ).then((result) => {
        //dispatch(getEntriesSuccess(result.data.byEntrant.items));

        dispatch(workSaved());
        dispatch(getEntrantSuccess(result.data.updateEntrant));
      });
    } catch (error) {
      dispatch(getEntriesFailure());
    }
  };
}

export function createEntrant(entrant) {
  return async (dispatch) => {
    dispatch(commitWork());
    try {
      const type = "entrant";
      let getCounter = await API.graphql(
        graphqlOperation(queries.byType, { name: type })
      );

      let getNextId = await API.graphql(
        graphqlOperation(mutations.updateCounter, {
          input: { id: getCounter.data.byType.items[0].id },
        })
      );
      entrant.entrantNumber = getNextId.data.updateCounter.count;
      API.graphql(
        graphqlOperation(mutations.createEntrant, { input: entrant })
      ).then((entrant) => {
        Auth.currentAuthenticatedUser().then((user) => {
          Auth.updateUserAttributes(user, {
            "custom:entrantID": entrant.data.createEntrant.id,
          }).then(() => {
            dispatch(workSaved());
            dispatch(getEntrantSuccess(entrant.data.createEntrant));
          });
        });
      });
    } catch (error) {
      dispatch(getEntriesFailure());
    }
  };
}

export function createOfflineEntrant(entrant) {
  return async (dispatch) => {
    dispatch(commitWork());
    try {
      const type = "entrant";
      let getCounter = await API.graphql(
        graphqlOperation(queries.byType, { name: type })
      );

      let getNextId = await API.graphql(
        graphqlOperation(mutations.updateCounter, {
          input: { id: getCounter.data.byType.items[0].id },
        })
      );
      entrant.entrantNumber = getNextId.data.updateCounter.count;
      API.graphql(
        graphqlOperation(mutations.createEntrant, { input: entrant })
      ).then((entrant) => {
        dispatch(workSaved());
        dispatch(getEntrantSuccess(entrant.data.createEntrant));
      });
    } catch (error) {
      dispatch(getEntriesFailure());
    }
  };
}

export function withdrawEntry(entry) {
  return async (dispatch) => {
    dispatch(commitWork());
    try {
      let entryToDelete = {
        id: entry.id,
      };

      await API.graphql(
        graphqlOperation(mutations.deleteEntry, { input: entryToDelete })
      );
      return dispatch(fetchEntries(entry.entrantID));
    } catch (error) {
      dispatch(getEntriesFailure());
    }
  };
}

export function createEntry(entry) {
  return async (dispatch) => {
    dispatch(commitWork());
    try {
      const type = "entry";
      let getCounter = await API.graphql(
        graphqlOperation(queries.byType, { name: type })
      );

      let getNextId = await API.graphql(
        graphqlOperation(mutations.updateCounter, {
          input: { id: getCounter.data.byType.items[0].id },
        })
      );
      entry.entryNumber = getNextId.data.updateCounter.count;

      await API.graphql(
        graphqlOperation(mutations.createEntry, { input: entry })
      );

      return dispatch(fetchEntries(entry.entrantID));
    } catch (error) {
      dispatch(getEntriesFailure());
    }
  };
}

export function updateEntry(entry) {
  return async (dispatch) => {
    dispatch(commitWork());
    try {
      await API.graphql({
        query: mutations.updateEntry,
        variables: { input: entry },
      });

      return dispatch(fetchEntries(entry.entrantID));
    } catch (error) {
      dispatch(getEntriesFailure());
    }
  };
}

export function checkInEntrant(entrant) {
  return async (dispatch) => {
    dispatch(commitWork());
    try {
      let value = {
        id: entrant.id,
        checkedIn: true,
      };
      await API.graphql({
        query: mutations.updateEntrant,
        variables: { input: value },
      }).then((entrant) => {
        dispatch(getEntrantSuccess(entrant.data.updateEntrant));
        dispatch(workSaved());
      });
    } catch (error) {
      dispatch(getEntriesFailure());
    }
  };
}
