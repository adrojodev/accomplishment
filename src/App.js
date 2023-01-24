import "./App.css";

import { useState } from "react";

import WelcomeScreen from "./components/WelcomeScreen";
import Modal from "./components/Modal";
import TaskScreen from "./components/TaskScreen";
import { useEffect } from "react";

function App() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [taskStatus, setTaskStatus] = useState(false);
  const [today, setToday] = useState();
  const [starter, setStarter] = useState();
  const [userStatus, setUserStatus] = useState(false);
  const [taskTime, setTaskTime] = useState();
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
    setUserStatus(localStorage.getItem("userStatus"));

    const date = new Date();
    const today = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    if (localStorage.getItem("lastDate") !== today) {
      localStorage.setItem("lastDate", today);
      localStorage.removeItem("userStatus");
    }

    fetch(
      "https://daily-accomplishment-a5a0d-default-rtdb.firebaseio.com/accomplishment.json"
    )
      .then((response) => response.json())
      .then((data) => {
        data.map((task) => {
          if (task.date == today) {
            setTask(task);
            setTaskTime(task.time);
          } else {
            setTask({
              task: "Today is your free day",
              emoji: "🏖️",
              number: "000",
              requirements: [
                { emoji: "⏰", text: "No worries" },
                { emoji: "😎", text: "Attitude" },
                { emoji: "🥰", text: "Self love" },
              ],
              time: 300,
              phrase: "Happy free day!",
              accomplishedTask: "had a free day",
            });
          }
        });
      });
  }, []);

  const confirm = () => {
    setModalVisibility(false);
  };

  const start = () => {
    setTaskStatus(true);
    setStarter(true);
  };

  return (
    <div className="flex">
      <WelcomeScreen
        task={task}
        setModalVisibility={setModalVisibility}
        start={start}
        starter={starter}
        userStatus={userStatus}
      />
      <div
        className="flex flex-col items-center justify-center w-screen h-screen text-center px-4 gap-2"
        style={{ display: userStatus === task.key ? "flex" : "none" }}
      >
        <h1 className="text-3xl">✅</h1>
        <h1 className="font-bold text-3xl">You already accomplished today!</h1>
        <p className="mt-8">Come tomorrow for a new challenge!</p>
      </div>
      <TaskScreen
        starter={starter}
        setStarter={setStarter}
        taskStatus={taskStatus}
        setTaskStatus={setTaskStatus}
        userStatus={userStatus}
        setUserStatus={setUserStatus}
        tasks={task}
        taskTime={taskTime}
        setTaskTime={setTaskTime}
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
