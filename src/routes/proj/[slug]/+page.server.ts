import type { PageServerLoad } from "./$types";
import { stateObj } from "../../state.svelte.ts";

export const load: PageServerLoad = async ({ params }) => {
  const id = stateObj.projects[params.slug];
  const baseURL = "http://localhost:8080/proj/";
  const fetchURL = baseURL + id;
  const response = await fetch(fetchURL);
  const responseBody = await response.json();

  return {
    proj: responseBody,
  };
};
