import Button from "../components/Button";
import Pill from "../components/Pill";

export default function WelcomeScreen(props) {
  const task = props.task;
  const setModalVisibility = props.setModalVisibility;
  const start = props.start;
  const starter = props.starter;
  const userStatus = props.userStatus;

  const openModal = () => {
    setModalVisibility(true);
  };

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center gap-8 px-5"
      style={{
        display:
          userStatus === task.key || userStatus === "not completed"
            ? "none"
            : starter
            ? "none"
            : "flex",
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <h4 className="text-sm text-center">
          Become better, complete a task today
        </h4>
        <h1 className="text-3xl font-bold text-center">
          This is what you need for today task:
        </h1>
      </div>
      <div className="flex flex-col items-center gap-2 bg-gray-100 rounded-xl px-3 py-3">
        {task
          ? task.requirements.map((requirement, index) => {
              return <Pill key={index}>{requirement}</Pill>;
            })
          : null}
      </div>
      <div className="flex flex-col gap-3">
        <Button
          className="bg-purple-500 text-white text-xl"
          handleClick={start}
        >
          Reveal the task
        </Button>
        <Button handleClick={openModal} className="text-sm underline" isText>
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
