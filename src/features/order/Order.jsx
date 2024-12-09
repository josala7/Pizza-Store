// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../service/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher]
  );
  console.log(fetcher.data);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-10">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-xl font-semibold">Order # {id} status</h2>

        <div>
          {priority && (
            <span className="px-4 py-2 m-3 font-semibold tracking-wide uppercase bg-red-500 rounded-full ">
              Priority
            </span>
          )}
          <span className="px-4 py-2 m-3 font-semibold tracking-wide uppercase bg-blue-500 rounded-full ">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between px-3 py-6 bg-stone-300">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y border-y divide-stone-300">
        {fetcher.data &&
          cart.map((item) => {
            const matchedPizza = fetcher.data.find(
              (el) => Number(el.id) === Number(item.pizzaId)
            );

            return (
              <OrderItem
                key={item.pizzaId}
                item={item}
                isLoadingIngredients={fetcher.state === "loading"}
                ingredients={matchedPizza?.ingredients ?? []}
              />
            );
          })}
      </ul>

      <div className="px-6 py-5 bg-stone-300 ">
        <p className="text-sm">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className="text-sm">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
