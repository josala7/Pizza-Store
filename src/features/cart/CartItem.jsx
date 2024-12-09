import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateQuantity from "./UpdateQuantity";
import { getQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  // const dispatch = useDispatch();
  const currentQuantity = useSelector(getQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-5">
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
