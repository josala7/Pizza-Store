import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault;
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="search for pizza"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 text-sm transition-all duration-300 rounded-full sm:focus:w-72 sm:w-64 w-28 focus:ring focus:ring-green-300 focus:outline-none placeholder:text-stone-400"
      />
    </form>
  );
}

export default SearchOrder;
