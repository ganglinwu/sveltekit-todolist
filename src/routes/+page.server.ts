import type { PageServerLoad, Actions } from "./$types";
import { getFormState, getProjectState } from "./state.svelte.ts";

export const load: PageServerLoad = async () => {
  const response = await fetch("http://localhost:8080/proj");
  const responseBody = await response.json();

  return {
    projectlist: responseBody,
  };
};
/*
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    for (const [key, value] of formData) {
      console.log(key, value);
    }

    const project = formData.get("project");

    const url = "http://localhost:8080/proj/" + project;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.ok) {
        console.log("request sent");
      } else {
        console.log("Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  },
};
*/
