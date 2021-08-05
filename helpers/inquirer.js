const inquirer = require("inquirer");
require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "Select an option",
    choices: [
      {
        value: 1,
        name: `${"1.".yellow} Search city`,
      },
      {
        value: 2,
        name: `${"2.".yellow} History`,
      },
      {
        value: 0,
        name: `${"0.".yellow} Exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".green);
  console.log(" Select an option ".yellow);
  console.log("==========================\n".green);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async () => {
  const questions = [
    {
      input: "input",
      name: "enter",
      message: `Press ${"enter".green} to contunue...`,
    },
  ];

  await inquirer.prompt(questions);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Enter a value";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listPlaces = async (places = []) => {
  const choices = places.map((place, key) => {
    const id = `${key + 1}`.green;
    return {
      value: place.id,
      name: `${id.yellow} ${place.name}`,
    };
  });

  choices.unshift({
    value: 0,
    name: "0.".green + "Cancel",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Select place",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const showListCheckList = async (tasks = []) => {
  const choices = tasks.map((task, key) => {
    const id = `${key + 1}`.green;

    return {
      value: task.id,
      name: `${id.yellow} ${task.desc}`,
      checked: !!task.completedAt,
    };
  });

  // choices.unshift({
  //   value: 0,
  //   name: "0.".green + "Cancel",
  // });

  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select...",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(questions);
  return ids;
};

const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
  confirm,
  showListCheckList,
};
