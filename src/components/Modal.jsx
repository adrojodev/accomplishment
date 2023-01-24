import Button from "./Button";

export default function Modal(props) {
  const visibility = props.visibility;
  const emoji = props.emoji;
  const title = props.title;
  const text = props.children;
  const buttonText = props.buttonText;
  const simple = props.simple;
  const handleConfirm = props.handleConfirm;
  const handleCancel = props.handleCancel;

  return (
    <div
      className="absolute z-20 bg-black bg-opacity-50 h-screen w-screen backdrop-blur-md flex items-center justify-center px-5"
      style={{ display: visibility ? "flex" : "none" }}
    >
      <div className="bg-white flex flex-col items-center gap-8 px-6 py-10 rounded-xl max-w-xl">
        <div className="flex flex-col gap-2 items-center">
          <h3
            className="text-3xl"
            style={{ display: emoji ? "block" : "none" }}
          >
            {emoji}
          </h3>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <p className="text-center">{text}</p>
        <div className="flex gap-3">
          <Button
            className="bg-purple-500 text-white"
            handleClick={handleConfirm}
          >
            {buttonText ? buttonText : "Okay"}
          </Button>
          <Button handleClick={handleCancel} isHidden={simple} isText>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
