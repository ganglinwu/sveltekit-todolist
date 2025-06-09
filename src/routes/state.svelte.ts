export const stateObj = $state({
  showAddNewTask: false,
  tags: {
    highPriority: "#ff0000",
    midPriority: "#ffff00",
    lowPriority: "#00ff00",
  },
  projects: {},
});

export function getProjectState() {
  return stateObj.projects;
}

export function setProjectState([key, value]) {
  stateObj.projects[key] = value;
}

export const formState = $state({
  project: "",
  taskname: "",
  description: "",
  dueDate: "",
  priority: "",
  completed: false,
});

export function getFormState() {
  return formState;
}
