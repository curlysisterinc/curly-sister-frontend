import { addDays } from "date-fns";

// const stylistId = localStorage.getItem("createdStylist");

const availablehours = {
  rangeid: Math.floor(Math.random() * 10000),
  days: [],
  time_range: { from: "", to: "" },
};

export const initialState = {
  stylistId: "",
  timezone: "",
  range: [availablehours],
  blocked_dates: [],
};

export default function reducer(state, { type, payload }) {
  switch (type) {
    case "ADD_STYLISTID":
      return {
        ...state,
        stylistId: payload,
      };
    case "CHANGE_TIMEZONE":
      return {
        ...state,
        timezone: payload,
      };
    case "ADD_RANGE":
      return {
        ...state,
        range: [
          ...state.range,
          {
            rangeid: Math.floor(Math.random() * 10000),
            days: [],
            time_range: { from: "", to: "" },
          },
        ],
      };
    case "CLEAR_INITIAL_RANGE":
      return {
        ...state,
        range: [],
      };
    case "ADD_OLD_RANGE":
      return {
        ...state,
        range: [
          ...state.range,
          {
            rangeid: Math.floor(Math.random() * 10000),
            days: payload.olddays,
            time_range: payload.oldtimes,
          },
        ],
      };
    case "REMOVE_RANGE":
      return {
        ...state,
        range: [...state.range.filter((itm) => itm.rangeid !== payload)],
      };
    case "REMOVE_EMPTY_RANGE":
      return {
        ...state,
        range: [...state.range.filter((itm) => itm.days.length !== 0)],
      };
    case "ADD_DAY":
      return {
        ...state,
        range: [
          ...state.range.map((itm) => {
            if (itm.rangeid !== payload.id) {
              return { ...itm };
            }
            return { ...itm, days: [...itm.days, payload.value] };
          }),
        ],
      };
    case "REMOVE_DAY":
      return {
        ...state,
        range: [
          ...state.range.map((itm) => {
            if (itm.rangeid !== payload.id) {
              return itm;
            }
            return {
              ...itm,
              days: [...itm.days.filter((val) => val !== payload.value)],
            };
          }),
        ],
      };
    case "ADD_START_TIME":
      return {
        ...state,
        range: [
          ...state.range.map((itm) => {
            if (itm.rangeid !== payload.id) {
              return itm;
            }
            return {
              ...itm,
              time_range: { from: payload.value1, to: payload.value2 },
            };
          }),
        ],
      };
    case "END_START_TIME":
      return {
        ...state,
        range: [
          ...state.range.map((itm) => {
            if (itm.rangeid !== payload.id) {
              return itm;
            }
            return {
              ...itm,
              time_range: { ...itm.time_range, to: payload.value },
            };
          }),
        ],
      };
    case "UPDATE_BLOCK":
      return {
        ...state,
        blocked_dates: [
          ...state.blocked_dates.map((dateblock) => {
            const { id, value } = payload;

            if (dateblock[0] !== id) {
              return dateblock;
            }
            console.log({ value });
            return [id, { ...value }];
          }),
        ],
      };
    case "CLEAR_INITIAL_BLOCK":
      return {
        ...state,
        blocked_dates: [],
      };
    case "ADD_BLOCK":
      console.log({ payload });
      return {
        ...state,
        blocked_dates: [...state.blocked_dates, payload],
      };
    case "REMOVE_BLOCK":
      return {
        ...state,
        blocked_dates: [
          ...state.blocked_dates.filter(
            (dateblock) => dateblock[0] !== payload
          ),
        ],
      };

    default:
      throw new Error();
  }
}
