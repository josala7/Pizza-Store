import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(getCart);

  // const cart = useSelector((state) => state.cart.cart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-3 py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="font-semibold mt-7">Your cart, {username}</h2>
      <ul className="mt-3 border-b divide-y divide-stone-300">
        {cart.map((item) => {
          return <CartItem item={item} key={item.pizzaId} />;
        })}
      </ul>
      <div className="mt-6 space-x-9">
        {/* <Link to="/order/new">Order pizzas</Link> */}
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
