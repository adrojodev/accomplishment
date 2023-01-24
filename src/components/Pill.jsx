export default function Pill(props) {
  const emoji = props.emoji;
  const index = props.index;
  const text = props.children;

  return (
    <div
      key={index}
      className="bg-gray-100 flex items-center px-3 py-2 rounded-full gap-2"
    >
      <p>{emoji}</p>
      <p>{text}</p>
    </div>
  );
}
