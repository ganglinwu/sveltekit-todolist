<script>
export let task 
export let proj
let editable = false
//
// utility function to determine tag color of task
import {tagColor} from './util.ts'

let name = ''
let description = ''
let dueDateString = ''
let priority = ''
let completed = false

async function handleUpdateTodo(evt, todoID) {
    const url = "http://localhost:8080/todo/" + todoID

    const className = evt.target.className

    let formState = {
    name,
    description,
    dueDateString,
    priority,
    completed
  }

    try {
      const response = await fetch(url, {
        method: "PATCH",
        header: {
          "Content-Type": "application/json"
      },
        body: JSON.stringify(formState)
      })

    if (response.ok) {
        alert('Todo updated successfully!')
        window.location.reload()
      } else {
        alert('Something went wrong')
      }
    }
    catch (err) {
      console.error('Error:', err)
    }
}

function randomPromptOrConfirm() {
    if ((Math.random()*2) > 1) {
     let userReply = prompt("Please type in <delete> (without the brackets) to confirm delete");
     if (userReply !== "delete") {
     alert('Delete cancelled')
       return false
    } else {
      return true
    }
  } else {
    if (!confirm("Are you sure you want to delete?")) {
      alert('Delete cancelled')
      return
    } else {
      return true
    }
  }
}

async function handleDeleteTodo(todoID) {
    if (!randomPromptOrConfirm()) {
    return
  }
    const url = "http://localhost:8080/todo/" + todoID

    try {
      const response = await fetch(url, {
        method: "DELETE",
      })

    if (response.ok) {
        alert('Todo deleted successfully!')
        window.location.reload()
      } else {
        alert('Something went wrong')
      }
    }
    catch (err) {
      console.error('Error:', err)
    }
}

function handleNameInput(e) {
  name = e.currentTarget.textContent
}

function handleDescriptionInput(e) {
  description = e.currentTarget.textContent
}

function handleDueDateInput(e) {
  const dueDate = new Date(e.target.value)
  dueDateString = dueDate.toISOString()
}

function handlePriorityInput(e) {
  priority = e.target.value
}

function handleCompletedInput(e) {
  completed = e.target.checked
}


function toggleEditable() {
  editable = !editable
}

function convertUpdateAtToDateString(updated_at) {
  let updated_at_date = new Date(updated_at.T * 1000 + 8*60 *60*1000)
  return updated_at_date.toISOString()
  // return "2025-03-20"
}

</script>

<ul>
{#if task.completed}
  <div class="tagColor" style="background-color:grey;"></div>
{/if}
{#if !task.completed}
  <div class="tagColor" style:background-color={tagColor(task.priority)}></div>
{/if}
  {#if !task.completed}
  <div style="width:100%;">
    <!--
        because li element is not input/select element. onChange and onInput does not work
        we have to use onBlur which is is the event where the li element loses focus
        note: the handleNameInput and handleDescriptionInput is also different from the rest of the handle functions
    -->
    <li class="taskname" contenteditable={editable} onblur={(e)=>handleNameInput(e)}>{task.name}</li>
    <li class="taskdesc" contenteditable={editable} onblur={(e)=>handleDescriptionInput(e)}>{task.description}</li>
    <li class="dateandproj">
    {#if editable}
       <div style="display:flex; justify-content:space-between; width:100%; margin-right:5rem;">
         <input type='date' class="datePicker" name='dueDate' onchange={(e)=>handleDueDateInput(e)}>
         <div style="display:flex; gap:1rem;">
           <legend>Priority</legend>
             {#each ['low', 'medium', 'high'] as prty, index}
               <label>
                 <input type="radio" name="priority" value={prty} bind:group={priority}>
               </label>
             {/each}
          </div>
          <div style="display:flex; gap:1rem;">
            <legend>Completed?</legend>
              <input type="checkbox" id='completed' onchange={(e)=>handleCompletedInput(e)}/>
          </div>
        </div>
    {/if}
    {#if !editable}
      <div>{task.dueDate}</div>
    {/if}
    </li>
  </div>
  <div>
     <div>
     {#if editable} 
       <button type="button" onclick={(e)=> handleUpdateTodo(e, task._id)}>
         Save
        </button>
     {/if}
     {#if !editable}
       <button type="button" onclick={() => toggleEditable()}>
         Edit
       </button>
      {/if}
     </div>
     <button type="button" onclick={()=> handleDeleteTodo(task._id)}>
        delete
     </button>
     <div>
     {#if !editable}
        <a href={`/proj/`+proj.projname}>
         {proj.projname}
        </a>
     {/if}
     {#if editable}
       {proj.projname}
     {/if}
      </div>
   </div>
  {/if}
  {#if task.completed}
    <div style="width:100%; color:grey">
     <li class="taskname" contenteditable={editable} onblur={(e)=>handleNameInput(e)}><s>{task.name}</s></li>
     <li class="taskdesc" contenteditable={editable} onblur={(e)=>handleDescriptionInput(e)}><s>{task.description}</s></li>
     <li class="dateandproj" style="display:flex; justify-content:space-between; padding-right:2rem;">
        <div>{`due : ` + task.dueDate}</div>
        <div>{`completed : ` + convertUpdateAtToDateString(task.updated_at)}</div>
        {#if !editable}
        <div>{` `}</div>
        {/if}
        {#if editable}
          <div style="display:flex; gap:1rem;">
            <legend>Completed?</legend>
              <input type="checkbox" id='completed' checked={task.completed} onchange={(e)=>handleCompletedInput(e)}/>
          </div>
        {/if}
      </li>
    </div>  
    <div>
     <div>
     {#if editable} 
       <button type="button" onclick={(e)=> handleUpdateTodo(e, task._id)}>
         Save
        </button>
     {/if}
     {#if !editable}
       <button type="button" onclick={() => toggleEditable()}>
         Edit
       </button>
      {/if}
     </div>
     <button type="button" disabled style="color:grey">
        delete
     </button>
      <div>{proj.projname}</div>
    </div>
  {/if}
</ul>
<style>
  .tagColor{
    width:1%;
    height:90%;
    margin-left:1%;
    margin-right:1%;
    algin-self:center;
  }
  ul {
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
