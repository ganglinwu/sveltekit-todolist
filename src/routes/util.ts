import { stateObj } from "./state.svelte.ts";

export function tagColor(priority: string | undefined, customTag = "") {
  if (customTag == "" || customTag == undefined) {
    if (priority == undefined) {
      return "#fffbfa";
    }
    switch (priority.toLowerCase()) {
      case "low":
        return stateObj.tags.lowPriority;
        break;
      case "medium":
        return stateObj.tags.midPriority;
        break;
      case "high":
        return stateObj.tags.highPriority;
        break;
      default:
        return "#fffbfa";
        break;
    }
  } else {
    return stateObj.tags[customTag];
  }
}
