<script lang="ts">

// svelte components
import TopBar from "../../TopBar.svelte"
import TitleBar from "../../TitleBar.svelte"

// state object store
import {stateObj} from "../../state.svelte.ts"

// utility function to determine tag color of task
import {tagColor} from '../../util.ts'

// data loaded (fetch API) from +page.server.ts
let {data} = $props()

// title of the page
let title = data.proj.projname

for (const task of data.proj.tasks) {
  task.project = title
}

$inspect(data)
</script>

<TopBar></TopBar>
<TitleBar {title}/>

<main>
  <div>
      {#each data.proj.tasks as task (task._id)}
        <p style="display:none;">{task.project = data.proj.projname}</p>
        {@render displayTasks(task)}
      {/each}
  </div>
</main>
{#snippet displayTasks(task)}
    <ul>
      <div class="tagColor" style:background-color={tagColor(task.priority)}>
      </div>
      <div style="width:100%;">
    <li class="taskname">{task.name}</li>
      <li class="taskdesc">{task.description}</li>
      <li class="dateandproj">
      <div>{task.dueDate}</div>
      <a href={`/proj/`+task.project}>
      <div>{task.project}</div>
      </a>
    </li>
      </div>
    </ul>
{/snippet}
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
  }
  .tagColor{
    width:3%;
    height:90%;
    margin-left:1%;
    margin-right:1%;
    algin-self:center;
  }
  main > div ul {
    display:flex;
    padding-top: 1%;
    padding-right: 3%;
    width:100%;
    border: 1px solid grey;
    border-left: 0;
    border-right: 0;
    border-top:0;
    &:hover {
      opacity: 1;
    }
  }
  .taskname{
    display:flex;
    align-self:top;
  }
  .taskdesc{
    font-size:x-large;
    opacity: 0.7;
  }
  .dateandproj{
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: x-large;
    opacity: 0.7;
  }
</style>
