<script lang="ts">

// svelte components
import DisplayTask from "./DisplayTask.svelte"
import TopBar from "./TopBar.svelte"
import TitleBar from "./TitleBar.svelte"

// state object store
import {stateObj, setProjectState} from "./state.svelte.ts"


// title of the page
let title = $derived("All Todos ")
// data loaded (fetch API) from +page.server.ts
let {data} = $props()

for (const proj of data.projectlist) {
  setProjectState([proj.projname, proj._id])
}


// temporary stuff here
$inspect(stateObj)
</script>




<TopBar></TopBar>
<TitleBar {title}/>

<main>
  <div>
    {#each data.projectlist as proj (proj._id)}
      {#each proj.tasks as task (task._id)}
        <DisplayTask task={task} proj={proj} />
      {/each}
    {/each}
  </div>
</main>
<style>
  @media screen and (min-width: 48rem) {
    main {
      margin : 0px 84px;
    }
  }
  @media screen and (min-width: 64rem) {
    main {
      margin: 0px 112px;
    }
  }
  @media screen and (min-width: 80rem) {
    main  {
      margin: 0px 140px;
    }
  }
  main{
    display: flex;
    height:100dvh;
    justify-content: center;
  }
  main > div{
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-left: 2rem;
    padding-right: 2rem;
  }
</style>
