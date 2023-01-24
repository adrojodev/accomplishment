import "./App.css";

import { useState } from "react";

import WelcomeScreen from "./components/WelcomeScreen";
import Modal from "./components/Modal";
import TaskScreen from "./components/TaskScreen";
import { useEffect } from "react";
import Button from "./components/Button";

function App() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [taskStatus, setTaskStatus] = useState(false);
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
      })
      .catch(() => {
        setTask(false);
      });
  }, []);

  const confirm = () => {
    setModalVisibility(false);
  };

  const start = () => {
    setTaskStatus(true);
    setStarter(true);
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="flex" style={{ display: task ? "flex" : "none" }}>
        <WelcomeScreen
          task={task}
          setModalVisibility={setModalVisibility}
          start={start}
          starter={starter}
          userStatus={userStatus}
        />
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
          complete. This will help you improve your mindset by reaching
          something new everyday.
        </Modal>
      </div>
      <div
        className="flex-col items-center justify-center h-screen w-screen text-center px-4 gap-2"
        style={{ display: task.task ? "none" : "flex" }}
      >
        <h1 className="text-3xl font-bold">
          🥲 <br />
          Something went wrong
        </h1>
        <p className="text-lg">
          We could not load the site, sorry about that. Please refresh to try
          again!
        </p>
        <Button className="bg-purple-500 text-white mt-8" handleClick={refresh}>
          Refresh site
        </Button>
      </div>
    </div>
  );
}

export default App;
