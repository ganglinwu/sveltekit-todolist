export let stateObj = $state({
  showAddNewTask: false,
  showAddNewProject: false,
  showSideNavRecent: false,
  showSideNavProjects: false,
  tags: {
    highPriority: "#ff0000",
    midPriority: "#ffff00",
    lowPriority: "#00ff00",
  },
  sortBy: "",
  sortByStringValue: "",
  sortByBooleanValue: false,
  projects: {},
});

export function getProjectState() {
  return stateObj.projects;
}

export function setProjectState([key, value]) {
  stateObj.projects[key] = value;
}

export function setSortBy(str) {
  stateObj.sortBy = str;
}

export function getSortBy() {
  return stateObj.sortBy;
}

export function setSortByStringValue(str) {
  stateObj.sortByStringValue = str;
}

export function getSortByStringValue() {
  return stateObj.sortByStringValue;
}

export function setSortByBooleanValue(bool) {
  stateObj.sortByBooleanValue = bool;
}

export function getSortByBooleanValue() {
  return stateObj.sortByBooleanValue;
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
