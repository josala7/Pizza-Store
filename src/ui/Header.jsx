import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className=" flex items-center justify-between text-[20px] uppercase bg-green-500 py-4 px-3 border-b border-stone-300 sm:px-7">
      <Link to="/" className="tracking-widest">
        Pizza Store
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
