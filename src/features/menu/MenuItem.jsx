import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItems, getQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantity from "../cart/UpdateQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();
  const currentQuantity = useSelector(getQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    // Add pizza to cart
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItems(newItem));
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-80 grayscale" : ""}`}
      />

      <div className="flex flex-col grow">
        <p className="font-medium ">{name}</p>
        <p className="text-sm italic capitalize">{ingredients.join(", ")}</p>
        <div className="flex items-center justify-between mt-auto">
          {!soldOut ? (
            <p className="text-sm ">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase">Sold out</p>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateQuantity pizzaId={id} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <>
              <Button type="small" onClick={handleAddToCart}>
                Add to cart
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
