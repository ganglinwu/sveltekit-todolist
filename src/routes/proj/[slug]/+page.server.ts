import type { PageServerLoad } from "./$types";
import { getProjectState } from "../../state.svelte.ts";

export const load: PageServerLoad = async ({ params }) => {
  const baseURL = "http://localhost:8080/proj/";
  const id = params.slug;
  const fetchURL = baseURL + id;
  const response = await fetch(fetchURL);
  const responseBody = await response.json();

  return {
    proj: responseBody,
  };
};
