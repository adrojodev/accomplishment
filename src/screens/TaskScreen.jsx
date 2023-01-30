import { useState } from "react";
import { useEffect } from "react";

import Confetti from "react-confetti";

import Button from "../components/Button";

export default function TaskScreen(props) {
  const taskStatus = props.taskStatus;
  const setTaskStatus = props.setTaskStatus;
  const task = props.tasks;
  const taskTime = props.taskTime;
  const userStatus = props.userStatus;
  const setUserStatus = props.setUserStatus;
  const setTaskTime = props.setTaskTime;
  const starter = props.starter;

  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [time, setTime] = useState("00:00");

  // prettier-ignore
  const text = `#DailyAccomplishment ${task.number} 
  
I ${task.accomplishedTask}!

${task.emoji} ${task.emoji} ${task.emoji}`;

  useEffect(() => {
    const timer = setInterval(() => {
      if (taskStatus) {
        setTaskTime(taskTime - 1);
        if (taskTime >= 1) {
          if (`${Math.floor(taskTime / 60)}`.length <= 1) {
            setMinutes(`0${Math.floor(taskTime / 60)}`);
          } else {
            setMinutes(`${Math.floor(taskTime / 60)}`);
          }

          if (`${taskTime % 60}`.length <= 1) {
            setSeconds(`0${taskTime % 60}`);
          } else {
            setSeconds(`${taskTime % 60}`);
          }

          setTime(`${minutes}:${seconds}`);
        } else {
          setTime("00:00");
          setTaskStatus(false);
          localStorage.setItem("userStatus", "not completed");
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      setUserStatus(localStorage.getItem("userStatus"));
    };
  });

  const win = () => {
    setTime("00:00");
    setTaskStatus(false);
    localStorage.setItem("userStatus", task.key);
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
      className="bg-black text-white absolute h-screen w-screen flex flex-col items-center justify-center px-8 transition-all"
      style={{
        display:
          userStatus === task.key || userStatus === "not completed"
            ? "flex"
            : starter
            ? "flex"
            : "none",
      }}
    >
      <div
        className="flex flex-col items-center gap-8"
        style={{
          display:
            userStatus === task.key || userStatus === "not completed"
              ? "none"
              : "flex",
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <h3
            className="text-lg"
            style={{ color: time !== "99:99" ? "white" : "black" }}
          >
            {time}
          </h3>
          <h1 className="text-4xl font-bold text-center">{task.task}</h1>
          <p className="text-lg text-center">{task.phrase}</p>
        </div>
        <Button handleClick={win} className="bg-green-500 text-white text-xl">
          Finished
        </Button>
      </div>

      <div
        className="flex flex-col items-center text-center gap-10"
        style={{
          display:
            userStatus === task.key || userStatus === "not completed"
              ? userStatus === task.key
                ? "flex"
                : "none"
              : "none",
        }}
      >
        <div className="flex flex-col gap-2 text-white">
          <h1 className="text-4xl font-bold">Congrats! 🎉</h1>
          <h2 className="text-2xl">You {task.accomplishedTask}!</h2>
          <p className="text-md">Now share it as the winner you're!</p>
        </div>
        <Confetti run={userStatus === task.key}></Confetti>
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
        style={{
          display:
            userStatus === task.key || userStatus === "not completed"
              ? userStatus !== task.key
                ? "flex"
                : "none"
              : "none",
        }}
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
