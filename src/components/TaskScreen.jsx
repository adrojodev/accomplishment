import { useState } from "react";
import { useEffect } from "react";
import Button from "./Button";

export default function TaskScreen(props) {
  const taskStatus = props.taskStatus;
  const task = props.tasks;
  const seconds = props.seconds;
  const setSeconds = props.setSeconds;
  const minutes = props.minutes;
  const setMinutes = props.setMinutes;
  const time = props.time;
  const setTime = props.setTime;

  const [result, setResult] = useState(false);

  // prettier-ignore
  const text = `#DailyAccomplishment ${task.number}

${task.emoji} ${task.emoji} ${task.emoji}`;

  useEffect(() => {
    const timer = setInterval(() => {
      if (!result) {
        if (time !== "00:00") {
          if (parseInt(seconds) <= 10 && seconds !== "00") {
            setSeconds(`0${parseInt(seconds) - 1}`);
          } else {
            if (seconds === "00") {
              if (parseInt(minutes) <= 0) {
                setTime("00:00");
              } else {
                setSeconds("59");
                if (parseInt(minutes) <= 10) {
                  setMinutes(`0${parseInt(minutes) - 1}`);
                } else {
                  setMinutes(`${parseInt(minutes) - 1}`);
                }
              }
            } else {
              setSeconds(`${parseInt(seconds) - 1}`);
            }
          }
        }
      }

      if (result) {
        setTime("00:00");
        localStorage.setItem("status", `${task.key}`);
      } else {
        setTime(`${minutes}:${seconds}`);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  const win = () => {
    setTime("00:00");
    setResult(true);
  };

  const tweet = () => {
    window.location.href = `https://twitter.com/intent/tweet?text=${text
      .replace("#", "%23")
      .replace(/(?:\r\n|\r|\n)/g, "%0D%0A")
      .replace(" ", "%20")}`;
  };

  const copy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className="bg-black text-white absolute h-screen w-screen flex flex-col items-center justify-center px-8"
      style={{ display: taskStatus === "timer" ? "flex" : "none" }}
    >
      <div
        className="flex flex-col items-center gap-8"
        style={{
          display: time !== "00:00" ? "flex" : "none",
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <h3
            className="text-lg"
            style={{ color: time !== "99:99" ? "white" : "black" }}
          >
            {time}
          </h3>
          <h1 className="text-4xl font-bold">{task.task}</h1>
          <p className="text-lg">{task.phrase}</p>
        </div>
        <Button handleClick={win} className="bg-green-500 text-white text-xl">
          Finished
        </Button>
      </div>
      <div
        className="flex flex-col items-center text-center gap-10"
        style={{ display: time === "00:00" && result ? "flex" : "none" }}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Congrats! 🎉</h1>
          <h2 className="text-2xl">You {task.accomplishedTask}!</h2>
          <p className="text-md">Now share it as the winner you're!</p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Button handleClick={tweet} className="bg-blue-400 text-white">
            Tweet it!
          </Button>
          <Button handleClick={copy} className="bg-white text-black">
            Copy!
          </Button>
        </div>
      </div>
      <div
        className="flex flex-col items-center text-center gap-10"
        style={{ display: time === "00:00" && !result ? "flex" : "none" }}
      >
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold">Today was not the day 😭</h1>
          <h2 className="text-xl">
            You didn't make it on time, but you can still achieve it
          </h2>
        </div>

        <p className="text-md">Come tomorrow for a new task!</p>
      </div>
    </div>
  );
}
