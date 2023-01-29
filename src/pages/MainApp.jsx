import { useState, useEffect } from "react";

import WelcomeScreen from "../screens/WelcomeScreen";
import Modal from "../components/Modal";
import TaskScreen from "../screens/TaskScreen";
import Button from "../components/Button";

import { formatDate } from "../firebase/utils";

export default function MainApp() {
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
    requirements: ["", "", ""],
    time: 0,
    phrase: "",
    accomplishedTask: "",
  });

  useEffect(() => {
    setUserStatus(localStorage.getItem("userStatus"));

    const date = new Date();
    const today = formatDate(date);

    if (localStorage.getItem("lastDate") !== today) {
      localStorage.setItem("lastDate", today);
      localStorage.removeItem("userStatus");
    }

    fetch(
      "https://daily-accomplishment-a5a0d-default-rtdb.firebaseio.com/accomplishment.json"
    )
      .then((response) => response.json())
      .then((data) => {
        Object.values(data).map((task) => {
          if (task.date === today) {
            setTask(task);
            setTaskTime(task.time);
          } else {
            setTask({
              task: "Today is your free day",
              emoji: "🏖️",
              number: "000",
              requirements: ["⏰ No worries", "😎 Attitude", "🥰 Self love"],
              time: 300,
              phrase: "Happy free day!",
              accomplishedTask: "had a free day",
              key: "cuidhiucnewiucbwein",
            });
          }

          return task;
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
          emoji="💜"
          title="What is this all about?"
          buttonText="Great!"
          handleConfirm={confirm}
          simple
        >
          Improve your mindset by reaching something new everyday. <br />
          Daily accomplishment is an app that will give you a daily task to
          complete!
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
