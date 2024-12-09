import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../service/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();

  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalPrice);

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalprice = totalCartPrice + priorityPrice;

  // const username = useSelector((state) => state.user.username);
  // const address = useSelector((state) => state.user.address);
  // const position = useSelector((state) => state.user.position); ....

  const {
    username,
    address,
    position,
    status: addressStatus,
    error: addressError,
  } = useSelector((state) => state.user);
  console.log(position);

  const isLoadingAddress = addressStatus === "loading";
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-9">
      <h2 className="mb-5 text-xl font-semibold">Ready to order? Lets go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="flex flex-col items-center w-full gap-3 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            defaultValue={username}
            name="customer"
            required
          />
        </div>

        <div className="flex flex-col items-center w-full gap-3 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className=" grow">
            <input className="w-full input" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="p-2 mt-2 text-red-700 bg-red-200 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative flex flex-col items-center w-full gap-3 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow ">
            <input
              className="w-full input"
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoadingAddress}
              required
            />
            {addressStatus === "error" && (
              <p className="p-2 mt-2 text-red-700 bg-red-200 rounded-md">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[5px] top-10 z-20 md:right-[4px] md:top-[3px] ">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();

                  dispatch(fetchAddress());
                }}
              >
                Get the position
              </Button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-5 mb-10">
          <input
            className="w-6 h-6 focus:outline-none focus:ring focus:ring-green-300 accent-green-500"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium ">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `  ${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? ` placing order ...`
              : `Order now with $${totalprice}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data, // spread
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);
  console.log(newOrder);
  console.log(order, "order");

  // Do NOT overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder?.id}`);
  // console.log(order);
  // return null;
}

export default CreateOrder;
