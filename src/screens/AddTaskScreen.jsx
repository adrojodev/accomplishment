import { useRef, useState, useEffect } from "react";

import { createTask, formatNumber } from "../firebase/utils";

import { TaskInput } from "../components/TaskInput";
import Button from "../components/Button";

export default function AddTaskScreen() {
  const accomplishedTask = useRef();
  const emoji = useRef();
  const phrase = useRef();
  const requirements = useRef();
  const feeling = useRef();
  const task = useRef();
  const time = useRef();

  const [numberOfTasks, setNumberOfTasks] = useState(0);
  const [lastDate, setLastDate] = useState("");

  useEffect(() => {
    fetch(
      "https://daily-accomplishment-a5a0d-default-rtdb.firebaseio.com/accomplishment.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setNumberOfTasks(Object.values(data).length);
        //Console log last task
        setLastDate(Object.values(data)[Object.values(data).length - 1].date);
      });
  }, []);

  const handleSendTask = () => {
    createTask(
      accomplishedTask.current.value,
      lastDate,
      emoji.current.value,
      formatNumber(numberOfTasks + 1),
      phrase.current.value,
      requirements.current.value,
      feeling.current.value,
      task.current.value,
      time.current.value * 60 + 30
    );
  };

  return (
    <div className="flex flex-col gap-4 h-screen min-w-full justify-center">
      <h1 className="text-3xl font-bold">Create a task</h1>
      <div className="flex flex-col gap-2 mb-4">
        <TaskInput placeholder="Task" ref={task} type="text" />
        <TaskInput
          placeholder="Accomplished task"
          ref={accomplishedTask}
          type="text"
        />
        <TaskInput placeholder="Emoji" ref={emoji} type="text" />
        <TaskInput placeholder="Phrase" ref={phrase} type="text" />
        <TaskInput placeholder="Requirement" ref={requirements} type="text" />
        <TaskInput placeholder="Feeling" ref={feeling} type="text" />
        <TaskInput placeholder="Minutes" ref={time} type="number" />
      </div>
      <Button handleClick={handleSendTask} className="bg-purple-500 text-white">
        Add task
      </Button>
    </div>
  );
}
