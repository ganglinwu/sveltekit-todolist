<script>
import {stateObj, setSortBy, setSortByBooleanValue, setSortByStringValue } from './state.svelte.ts'
import {slide} from 'svelte/transition'

let sortByItems = [
  {
    "completed":true,
  },
  {
    "completed":false,
  },
  {
    "priority": "high",
  },
]

function toggleShowTopNavSortBy() {
  showTopNavSortBy = showTopNavSortBy ? false : true;
}

let showTopNavSortBy = $state(false)

</script>
<div class="top-bar">
  <div class="top-bar-left">
      <button class="dropdown-btn" style="display:flex; align-items:center;" onclick={()=> toggleShowTopNavSortBy()} onblur={()=>toggleShowTopNavSortBy()}>
     <span>Sort By</span> 
      <svg class="dropdown-chev" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-371.69 267.69-584 296-612.31l184 184 184-184L692.31-584 480-371.69Z"/></svg>
      </button>
      {#if showTopNavSortBy}
      <div transition:slide style="position:fixed; box-shadow: 10px 5px 5px grey; margin:1rem; z-index:20; background-color:var(--base-clr);">
        <div>
          <button onclick={() => {
            setSortBy("completed")
            setSortByBooleanValue(true)
          }}>completed</button>
        </div>
        <div>
          <button onclick={() => {
            setSortBy("completed")
            setSortByBooleanValue(true)
            }}>uncompleted</button>
        </div>
        <div>
          <button onclick={() => {
            setSortBy("priority")
            setSortByStringValue("high")
            }}>high priority</button>
        </div>
      </div>
      {/if}
  </div>
  <div class="top-bar-mid">Mid </div>
  <div class="top-bar-right">
  </div>
</div>

<style>
  .top-bar {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 10%;
    width: max-width;
  }
  .top-bar-left {
    width: 33%;
    position:relative;
  }
  .top-bar-mid {
    width: 33%;
  }
  .top-bar-right {
    align-items: right;
  }
  button {
    margin: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
  button:hover {
    background-color: var(--text-clr);
    color: var(--base-clr);
  }

</style>
