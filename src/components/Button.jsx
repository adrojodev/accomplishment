export default function Button(props) {
  const text = props.children;
  const isText = props.isText;
  const className = props.className;
  const handleClick = props.handleClick;
  const isHidden = props.isHidden;

  return (
    <button
      onClick={() => handleClick()}
      className={
        isText
          ? `bg-transparent hover:underline ${className}`
          : `${className} outline-none px-5 py-2 rounded-full shadow-md font-bold hover:bg-opacity-90 hover:shadow-lg hover:scale-105 active:scale-95 active:shadow-sm transition-all`
      }
      style={{ display: isHidden ? "none" : "block" }}
    >
      {text}
    </button>
  );
}
