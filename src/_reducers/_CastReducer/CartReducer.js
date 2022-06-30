const cartState = {
  item: [],
};

const CartReducer = (state = cartState, action) => {
  switch (action.type) {
    case "add_to_card":
      const array = [...state.item, action.payload];
      return {
        ...state,
        item: array,
      };
    case "remove_cart_item":
      const arrayB = [...state.item];
      let id = action.payload;
      const index = arrayB.findIndex((item) => item.id === id);
      arrayB.splice(index, 1);
      return {
        ...state,
        item: arrayB,
      };
    default:
      return state;
  }
};
export default CartReducer;
