import { database } from "../config/config";

export const GET_EYE_TEST_RECORDS = "GET_EYE_TEST_RECORDS";
export const UPDATE_EYE_TEST_RECORDS = "UPDATE_EYE_TEST_RECORDS";

/* export const setRecordStore = (records, uid, inactive) => {
  return {
    type: GET_EYE_TEST_RECORDS,
    payload: {
      records,
      uid,
      inactive,
    },
  };
}; */

export const updateRecords = (dateList, records) => {
  return {
    type: UPDATE_EYE_TEST_RECORDS,
    payload: {
      dateList: dateList,
      records: records,
    },
  };
};

export const getRecordsUpdate = (uid) => {
  return (dispatch) => {
    let recordsRef = database.ref("/users/" + uid + "/records");
    recordsRef
      .orderByKey()
      .once("value")
      .then((snap) => {
        let date = [];
        snap.forEach((data) => {
          date.push(data.key);
        });
        dispatch(updateRecords(date, snap.toJSON()));
      });
  };
};

/* export const watchRecordsUpdate = () => {
  return (dispatch) => {
    let recordsRef = database.ref("/users/" + uid + "/records");
    if (inactive) {
      recordsRef = database.ref("/userInfo/" + uid + "/records");
    }
    recordsRef.once("value").then((snap) => {
      let records = [];
      snap.forEach((data) => {
        records.push(data.val());
      });
      dispatch(updateRecords(records));
    });
  };
}; */

const initialState = {};
export const records = (state = initialState, { type, payload }) => {
  switch (type) {
    /* case GET_EYE_TEST_RECORDS:
      return {
        records: payload.records,
        uid: payload.uid,
        inactive: payload.inactive,
      }; */
    case UPDATE_EYE_TEST_RECORDS:
      return {
        dateList: payload.dateList,
        records: payload.records,
      };
    default:
      return state;
  }
};
