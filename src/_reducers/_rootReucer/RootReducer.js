import { initialState } from "../../_constants/initialState";

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "add_product":
      const array = [...state.productList];
      array.push(action.payload);
      return {
        ...state,
        productList: array,
      };

    case "delete_product":
      const arrayB = [...state.productList];
      let id = action.payload;
      const remain = arrayB.filter((item) => item.id !== id);
      return {
        ...state,
        productList: remain,
      };

    case "edit_product":
      const arrayC = [...state.productList];
      let data = action.payload;
      const index = arrayC.findIndex((item) => item.id === data.id);
      arrayC[index] = data;
      return {
        ...state,
        productList: arrayC,
      };
    default:
      return state;
  }
};

export default AdminReducer;
