import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block  text-sm font-semibold tracking-wide uppercase transition-colors duration-300 bg-green-400 rounded-full disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-green-300 focus:ring-offset-3 transition- hover:bg-green-500 text-stone-800";
  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-3 py-2 md:px-5 md:py-3 text-xs",
    round: base + " px-1 py-1 md:px-3 md:py-2 text-xs",
    secondary:
      "hover:text-stone-800 text-sm border-2 border-stone-300 px-4 py-3 md:px-6 md:py-4 inline-block  font-semibold tracking-wide uppercase transition-colors duration-300 bg-transparent rounded-full disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-stone-400 focus:ring-offset-3 transition hover:bg-stone-300 text-stone-400",
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button
        to={to}
        className={styles[type]}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return (
    <button to={to} className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
