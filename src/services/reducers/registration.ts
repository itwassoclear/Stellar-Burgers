import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_FAILED,
  SET_REGISTRATION,
} from "../actions/registration";
import type { TRegistrationActions } from "../actions/registration";
import type { TRegisterForm } from "../types/data";

type TRegistrationState = {
  form: TRegisterForm;
  registrationRequest: boolean;
  registrationFailed: boolean;
};

const initialState: TRegistrationState = {
  form: { email: "", password: "", name: "" },
  registrationRequest: false,
  registrationFailed: false,
};

export const registrationReducer = (
  state = initialState,
  action: TRegistrationActions
): TRegistrationState => {
  switch (action.type) {
    case GET_REGISTRATION_REQUEST:
      return {
        ...state,
        registrationRequest: true,
      };
    case GET_REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationRequest: false,
        form: action.form,
      };
    case GET_REGISTRATION_FAILED:
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: true,
      };
    case SET_REGISTRATION:
      return {
        ...state,
        form: action.payload,
      };

    default:
      return state;
  }
};
