import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-4">
      <div className="flex items-center justify-between gap-5 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm italic capitalize text-stone-700">
        {isLoadingIngredients
          ? "Loading..."
          : ingredients.length > 0
            ? ingredients.join(", ")
            : "No ingredients available"}
      </p>
    </li>
  );
}

export default OrderItem;
