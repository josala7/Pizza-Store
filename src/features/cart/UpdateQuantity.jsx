import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseQuantity, increaseQuantity } from "./cartSlice";

function UpdateQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-3">
      <Button type="round" onClick={() => dispatch(decreaseQuantity(pizzaId))}>
        -
      </Button>
      <span className="text-sm font-semibold">{currentQuantity}</span>

      <Button type="round" onClick={() => dispatch(increaseQuantity(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateQuantity;
