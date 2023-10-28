import { readFileSync, writeFileSync } from "fs";
import { createInterface } from "readline";
import chalk from "chalk";

const tasks = [];
const DB_FILE = "tasks.txt";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {
  console.log(chalk.yellow.bold("🐶 To Do App 🐶"));
  console.log(chalk.blueBright("Menu de opciones:"));
  console.log("1. Agregar tarea");
  console.log("2. Listar tareas");
  console.log("3. Completar tarea");
  console.log("4. Salir");
  console.log("\n");
}

function loadTasks() {
  try {
    const data = readFileSync(DB_FILE, "utf8");
    const lines = data.split("\n");
    tasks.length = 0;

    lines.forEach((line) => {
      if (line.trim() !== "") {
        const [task, completed] = line.split("|");
        tasks.push({ task, completed: completed === "true" });
      }
    });

    console.log(chalk.green.bold("Tareas cargadas desde la BD\n"));
  } catch (err) {
    console.log(chalk.red.bold("No hay tareas por hacer 😀\n"));
  }
}

function saveTask() {
  const data = tasks.map((task) => `${task.task}|${task.completed}`).join("\n");
  writeFileSync(DB_FILE, data, "utf8");
  console.log(chalk.green.bold("Tareas guardadas en la BD\n"));
}

function addTask() {
  rl.question(chalk.bgMagentaBright("Escribe la tarea"), (task) => {
    tasks.push({ task, completed: false });
    console.log(chalk.green.bold("Tarea agregada con éxito\n"));
    saveTask();
    displayMenu();
    chooseOption();
  });
}

function listsTasks() {
  console.log(chalk.green.bold("\n🤖Tareas\n🦾"));

  if (tasks.length === 0) {
    console.log(chalk.bgRed("No hay tareas 😀\n"));
  } else {
    tasks.forEach((task, index) => {
      let status = task.completed ? chalk.green("✅") : chalk.red("❌");

      if (task.completed) {
        console.log(
          chalk.greenBright(`${index + 1}. ${task.task} - ${status}`)
        );
      } else {
        console.log(chalk.redBright(`${index + 1}. ${task.task} - ${status}`));
      }
    });
  }

  displayMenu();
  chooseOption();
}

function compleTask() {
  rl.question(
    chalk.bgMagentaBright("Escribe el número de la tarea a completar"),
    (taskNumber) => {
      const index = parseInt(taskNumber) - 1;
      if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        saveTask();
        console.log(chalk.green.bold("Tarea completada con éxito 😎\n"));
      } else {
        console.log(chalk.red.bold("Número de tarea inválida\n"));
      }
      displayMenu();
      chooseOption();
    }
  );
}

function chooseOption() {
  rl.question("Elige una opcion, digita el número de tu opción: ", (choice) => {
    switch (choice) {
      case "1":
        addTask();
        break;
      case "2":
        listsTasks();
        break;
      case "3":
        compleTask();
        break;
      case "4":
        console.log(chalk.yellow("Adios 🐶"));
        rl.close();
        break;
      default:
        console.log(chalk.red("Opción invalida. Intenta nuevamente \n"));
        displayMenu();
        chooseOption();
        break;
    }
  });
}

loadTasks();
displayMenu();
chooseOption();
