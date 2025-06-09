<script lang="ts">
	import '../app.css';
import SideNav from "./SideNav.svelte"
import TopBar from "./TopBar.svelte"
import { stateObj, getProjectState, formState, getFormState } from './state.svelte.ts'
	let { children } = $props();

function showAddNewTaskUI() {
  stateObj.showAddNewTask = stateObj.showAddNewTask ? false : true;
}

  const projectState = getProjectState()

  let projID = $state('')
  let name = $state('')
  let description = $state('')
  let dueDate = $state('')
  let priority = $state('')
  let completed = $state(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const dueDateParsed = new Date(dueDate)
    const dueDateString = dueDateParsed.toISOString()
    const todoData = {
    name,
    description,
      dueDateString,
    priority,
    completed
    }

    const url = "http://localhost:8080/proj/" + projID

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(todoData),
        headers: {
        "Content-Type": "application/json"
      }
      })

    if (response.ok) {
        alert('Todo submitted successfully!')
        window.location.reload()
      } else {
        alert('Something went wrong')
      }
    }
    catch (err) {
      console.error('Error:', err)
    }
  }
</script>

<nav>
  <SideNav />
</nav>
<main>
{@render children()}
{#if stateObj.showAddNewTask}
  <form onsubmit={(e)=>handleSubmit(e)}>
    <input type='text' id='taskname' name='taskname' bind:value={name} style="font-size:60px" placeholder='Name of task'>
    <input type='text' id='description' name='description' bind:value={description} style="font-size:30px; vertical-align:top;" placeholder='describe task'>
    <div class='formBottom'style="font-size=20px;">
      <div class='formBottom-l'>
          <div style="display:flex;">
            <select name="project" bind:value={projID}>
                <option value="">Please choose project</option>
              {#each Object.entries(projectState) as [key,value] (value)}
                <option value={value}>{key}</option>
              {/each}
            </select>
            </div>
          <div style="display:flex; gap:1rem;">
      <legend>Priority</legend>
            {#each ['low', 'medium', 'high'] as prty, index}
              <label>
                <input type="radio" name="priority" value={prty} bind:group={priority}>
              </label>
            {/each}
          </div>
      </div>
      <div class='formBottom-m'>
          <div style="display:flex; gap:0.5rem;">
          <legend>Completed?</legend>
      <input type="checkbox" id='completed' checked={completed} name='completed'/>
          </div>
      <input type='date' class="datePicker" name='dueDate' bind:value={dueDate}>
        </div>
      <div class='formBottom-r'>
      <button onclick ={() => showAddNewTaskUI()} class='cancelBtn'>Cancel</button>
      <button type='submit' class='saveBtn'>Save</button>
        </div>
    </div>
  </form>
{/if}
  </main>

<style>
  nav{
  box-sizing: border-box;
  width: 100%;
  padding: 5px 1em;
  border-right: 1px solid black;
  position: sticky;
  top: 0;
    align-items: start;
}
  main{
  padding: min(30px, 7%);
    position:relative;
    overflow:visible;
}
  @media screen and (min-width: 48rem) {
    form {
      margin : 0px 84px;
    }
  }
  @media screen and (min-width: 64rem) {
    form {
      margin: 0px 112px;
    }
  }
  @media screen and (min-width: 80rem) {
    form  {
      margin: 0px 140px;
    }
  }
  form {
    background-color: var(--base-clr);
    position:absolute;
    top:10%;
    left: 5%;
    width:80%;
    padding: 1em;
    box-shadow: -20px 15px 5px grey; 
    display: grid;
    grid-template-rows: 2fr 2fr 1fr;
    z-index: 50;
  }
  #taskname {
    padding-left: 10px;
    border: blue;
    font-size: large;
  &:focus {
    color: var(--text-clr);
  }
  }
  #description {
    vertical-align: top;
    padding-left: 10px;
    font-size: smaller;
    border: red;
  &:focus {
    color: var(--text-clr);
  }
  }
  .formBottom {
    display: flex;
    justify-content: space-between;
  }
  .formBottom-l, .formBottom-m, .formBottom-r {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
  }
  .datePicker {
    cursor:pointer;
    margin-left: minmax(0.5rem, 5rem);
  }
  .cancelBtn {
    margin-left: auto;
    justify-content: end;
    padding: 2px 10px;
    border-radius: 10% 25%;
    border: solid 1px red;
    &:hover {
      cursor: pointer;
      background-color: pink;
      color: white;
    }
  }
  .saveBtn {
    justify-content: end;
    padding: 2px 10px;
    border-radius: 25% 10%;
    border: solid 1px var(--accent-clr);
    &:hover {
      cursor: pointer;
      background-color: var(--text-clr);
      color: white;
    }
  }

</style>
