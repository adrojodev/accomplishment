import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCbFEOSBNcZeQ7qV9q4AW3kRDdhNRntHR4",
  authDomain: "daily-accomplishment-a5a0d.firebaseapp.com",
  databaseURL: "https://daily-accomplishment-a5a0d-default-rtdb.firebaseio.com",
  projectId: "daily-accomplishment-a5a0d",
  storageBucket: "daily-accomplishment-a5a0d.appspot.com",
  messagingSenderId: "372709106276",
  appId: "1:372709106276:web:0970eb42303750adbeb571",
};

initializeApp(firebaseConfig);

const database = getDatabase();

//function that format a date to dd/mm/yyyy format
export function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${formatDateNumber(day)}/${formatDateNumber(month)}/${year}`;
}

//function that adds a day to a date formatted as dd/mm/yyyy
export function addDate(date) {
  const dateArray = date.split("/");
  const day = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1]);
  const year = parseInt(dateArray[2]);
  const newDate = new Date(year, month - 1, day + 1);

  return formatDate(newDate);
}

//function that format numbers on 00 format
export function formatDateNumber(number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
}

//function that format numbers on 000 format
export function formatNumber(number) {
  if (number < 10) {
    return "00" + number;
  } else if (number < 100) {
    return "0" + number;
  } else {
    return number;
  }
}

//create a random key for the task combining numbers and letters
export function createKey() {
  let key = "";
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  for (let i = 0; i < 5; i++) {
    key += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  for (let i = 0; i < 5; i++) {
    key += numbers.charAt(Math.floor(Math.random() * numbers.length));

    if (i === 2) {
      key += "-";
    }
  }

  return key;
}

//create a new task and add it to the database function with parameters accomplishedTask, date, emoji, number, phrase, requirements, task, time
export function createTask(
  accomplishedTask,
  date,
  emoji,
  number,
  phrase,
  requirements,
  feeling,
  task,
  time
) {
  const newTask = {
    accomplishedTask,
    date: addDate(date),
    emoji,
    number,
    phrase,
    requirements: [
      `⏰ ${Math.floor(time / 60)} minutes`,
      requirements,
      feeling,
    ],
    task,
    time,
    key: createKey(),
  };
  //create a new task in the database
  push(ref(database, "accomplishment/"), newTask);
}
