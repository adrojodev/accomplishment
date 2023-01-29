import { forwardRef } from "react";

export const TaskInput = forwardRef((props, ref) => {
  const placeholder = props.placeholder;
  const type = props.type;

  return (
    <input
      className="border-b-2 px-2 py-2 focus:border-b-green-500 outline-none transition-all"
      placeholder={placeholder}
      ref={ref}
      type={type}
    />
  );
});
