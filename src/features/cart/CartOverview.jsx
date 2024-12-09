import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalPizzaQuantity = useSelector(getTotalQuantity);
  // const totalPizzaQuantity = useSelector((state) =>
  //   state.cart.cart.reduce((acc, pizza) => acc + pizza.quantity, 0));
  const totalPizzaPrice = useSelector(getTotalPrice);
  // console.log(totalPizzaPrice);

  // const totalPizzaPrice = useSelector((state) =>
  //   state.cart.cart.reduce((acc, pizza) => acc + pizza.totalPrice, 0));
  if (!totalPizzaQuantity && !totalPizzaPrice) return null;
  return (
    <div className="flex items-center justify-between p-6 text-sm uppercase md:text-base text-stone-200 bg-stone-800">
      <p className="space-x-4">
        <span>{totalPizzaQuantity} pizzas</span>
        <span> {formatCurrency(totalPizzaPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
