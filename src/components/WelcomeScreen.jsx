import Button from "./Button";
import Pill from "./Pill";

export default function WelcomeScreen(props) {
  const task = props.task;
  const userStatus = props.userStatus;
  const setModalVisibility = props.setModalVisibility;
  const start = props.start;
  const taskStatus = props.taskStatus;

  const openModal = () => {
    setModalVisibility(true);
  };

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center gap-6 px-5"
      style={{
        display:
          userStatus !== task.key ? (taskStatus ? "none" : "flex") : "none",
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <h4 className="text-sm text-center">
          Become better, complete a task today
        </h4>
        <h1 className="text-3xl font-bold text-center">
          What you need for today task?
        </h1>
      </div>
      <div className="flex flex-col items-center gap-2">
        {task.requirements.map((requirement, index) => {
          return (
            <Pill emoji={requirement.emoji} key={index}>
              {requirement.text}
            </Pill>
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className="bg-purple-500 text-white text-xl"
          handleClick={start}
        >
          Start task
        </Button>
        <Button handleClick={openModal} className="text-sm" isText>
          What is this?
        </Button>
      </div>
      <p className="absolute bottom-5">
        Made with 💜 by{" "}
        <a
          className="hover:underline"
          href="https://adrojo.art"
          target="_blank"
          rel="noreferrer"
        >
          adrojo
        </a>
      </p>
    </div>
  );
}
