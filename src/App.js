import "./App.css";

import { useState } from "react";

import WelcomeScreen from "./components/WelcomeScreen";
import Modal from "./components/Modal";
import TaskScreen from "./components/TaskScreen";
import { useEffect } from "react";

function App() {
  const [minutes, setMinutes] = useState("99");
  const [seconds, setSeconds] = useState("99");
  const [time, setTime] = useState("99:100");
  const [modalVisibility, setModalVisibility] = useState(false);
  const [taskStatus, setTaskStatus] = useState(false);
  const [userStatus, setUserStatus] = useState("not");
  const [task, setTask] = useState({
    task: "",
    emoji: "",
    date: "",
    number: "",
    requirements: [
      { emoji: "", text: "" },
      { emoji: "", text: "" },
      { emoji: "", text: "" },
    ],
    time: 0,
    phrase: "",
    accomplishedTask: "",
  });

  useEffect(() => {
    setUserStatus(localStorage.getItem("status"));
    fetch(
      "https://daily-accomplishment-a5a0d-default-rtdb.firebaseio.com/accomplishment.json"
    )
      .then((response) => response.json())
      .then((data) => setTask(data));
  }, []);

  const confirm = () => {
    setModalVisibility(false);
  };

  const start = () => {
    if (`${Math.floor(task.time / 60)}`.length <= 1) {
      setMinutes(`0${Math.floor(task.time / 60)}`);
    } else {
      setMinutes(`${Math.floor(task.time / 60)}`);
    }

    if (`${task.time % 60}`.length <= 1) {
      setSeconds(`0${task.time % 60}`);
    } else {
      setSeconds(`${task.time % 60}`);
    }

    setTime(`${minutes}:${seconds}`);

    setTaskStatus("timer");
  };

  return (
    <div className="flex">
      <WelcomeScreen
        task={task}
        userStatus={userStatus}
        setModalVisibility={setModalVisibility}
        start={start}
      />
      <div
        className="flex flex-col items-center justify-center w-screen h-screen text-center px-4 gap-2"
        style={{ display: userStatus == task.key ? "flex" : "none" }}
      >
        <h1 className="text-3xl">✅</h1>
        <h1 className="font-bold text-3xl">You already accomplished today!</h1>
        <p className="mt-8">Come tomorrow for a new challenge!</p>
      </div>
      <TaskScreen
        userStatus={userStatus}
        taskStatus={taskStatus}
        setTaskStatus={setTaskStatus}
        tasks={task}
        seconds={seconds}
        setSeconds={setSeconds}
        minutes={minutes}
        setMinutes={setMinutes}
        time={time}
        setTime={setTime}
      ></TaskScreen>
      <Modal
        visibility={modalVisibility}
        emoji="🤔"
        title="What is this all about?"
        buttonText="Great!"
        handleConfirm={confirm}
        simple
      >
        Daily accomplishment is an app that will give you a daily task to
        complete. This will help you improve your mindset by reaching something
        new everyday.
      </Modal>
    </div>
  );
}

export default App;
