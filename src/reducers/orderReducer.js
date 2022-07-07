import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_MY_SUCCESS,

} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const orderListReducer = (state = [], action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return { loading: true };
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_LIST_MY_RESET:
      return [];

    default:
      return state;
  }
};
