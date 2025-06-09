<script>
export let task
export let proj
let editable = false
//
// utility function to determine tag color of task
import {tagColor} from './util.ts'

async function handleUpdateTodo(evt, todoID) {
    const url = "http://localhost:8080/todo/" + todoID

    

    try {
      const response = await fetch(url, {
        method: "PATCH",
        header: {
          "Content-Type": "application/json"
      },
        body: JSON.stringify(formData)
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

async function handleDeleteTodo(todoID) {
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

</script>

<ul>
      <div class="tagColor" style:background-color={tagColor(task.priority)}>
      </div>
      <div style="width:100%;">
        <li class="taskname" contenteditable={editable}>{task.name}</li>
        <li class="taskdesc" contenteditable={editable}>{task.description}</li>
        <li class="dateandproj">
          <div contenteditable={editable}>{task.dueDate}</div>
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
            edit
          {/if}
        </div>
        <button type="button" onclick={()=> handleDeleteTodo(task._id)}>
          delete
        </button>
        <div>
          <a href={`/proj/`+proj._id}>
            {proj.projname}
          </a>
        </div>
      </div>
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
