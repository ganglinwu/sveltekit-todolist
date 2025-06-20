<script lang="ts">
import {stateObj} from './state.svelte.ts'
import {slide} from 'svelte/transition'
import {elasticOut} from 'svelte/easing'


function showAddNewTaskForm() {
  stateObj.showAddNewTask = stateObj.showAddNewTask ? false : true;
  stateObj.showAddNewProject = false
}

function showAddNewProjForm() {
  stateObj.showAddNewProject = stateObj.showAddNewProject ? false : true;
  stateObj.showAddNewTask = false
}

function showSideNavRecent() {
  stateObj.showSideNavRecent = stateObj.showSideNavRecent ? false : true;
}

function showSideNavProjects() {
  stateObj.showSideNavProjects = stateObj.showSideNavProjects ? false : true;
}

</script>
<div class="sidenav">
  <ul>
    <li>
      <button class="dropdown-btn">
          <span>name of user</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-371.69 267.69-584 296-612.31l184 184 184-184L692.31-584 480-371.69Z"/></svg>
      </button>
    </li>
    <!-- sync with server
    <li>
    </li>
      --->
    <li>
      <button onclick={() => showAddNewTaskForm()}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M417-417H166v-126h251v-251h126v251h251v126H543v251H417v-251Z"/></svg>
      <span class="addTask">Add Task</span>
      </button>
    </li>
    <li>
      <a href="/">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m233.85-184.61-66.93-400.01h626.16l-66.93 400.01h-492.3ZM267-224.62h426l51-320H216l51 320Zm133-180h160q8.5 0 14.25-5.75 5.75-5.76 5.75-14.27t-5.75-14.24q-5.75-5.74-14.25-5.74H400q-8.5 0-14.25 5.76T380-424.59q0 8.51 5.75 14.24t14.25 5.73ZM240-640q-8.5 0-14.25-5.76T220-660.03q0-8.51 5.75-14.24T240-680h480q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T720-640H240Zm80-95.38q-8.5 0-14.25-5.76T300-755.41q0-8.51 5.75-14.24 5.75-5.74 14.25-5.74h320q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24-5.75 5.74-14.25 5.74H320Zm-53 510.76h426-426Z"/></svg>
      <span>All Tasks</span>
      </a>
    </li>
    <li>
      <button onclick={() => showAddNewProjForm()}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M417-417H166v-126h251v-251h126v251h251v126H543v251H417v-251Z"/></svg>
      <span class="addTask">Add Project</span>
      </button>
    </li>
    <li>
      <button class="dropdown-btn" onclick={()=> showSideNavProjects()}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M120-80q-33 0-56.5-23.5T40-160v-440h80v440h680v80H120Zm160-160q-33 0-56.5-23.5T200-320v-440h200v-80q0-33 23.5-56.5T480-920h160q33 0 56.5 23.5T720-840v80h200v440q0 33-23.5 56.5T840-240H280Zm0-80h560v-360H280v360Zm200-440h160v-80H480v80ZM280-320v-360 360Z"/></svg>
        <span>Projects</span>
        <svg class="dropdown-chev" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-371.69 267.69-584 296-612.31l184 184 184-184L692.31-584 480-371.69Z"/></svg>
      </button>
      {#if stateObj.showSideNavProjects}
          <div transition:slide>
        {#each Object.entries(stateObj.projects) as [key,value] (value)}
           <a href={`/proj/`+key} style="justify-content:center;">{key}</a>
        {/each}
           </div>
      {/if}
    </li>
    <li>
      <button class="dropdown-btn" onclick={()=> showSideNavRecent()}>
     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M720-80q-66.85 0-113.42-46.58Q560-173.15 560-240t46.58-113.42Q653.15-400 720-400t113.42 46.58Q880-306.85 880-240t-46.58 113.42Q786.85-80 720-80Zm66-72.15L807.85-174l-72.47-72.46v-108.92h-30.76v121.84L786-152.15ZM550.77-598.46H800v131.23q11.23 3.15 20.85 7.65 9.61 4.5 19.15 10.58v-246.38q0-27.62-18.5-46.12Q803-760 775.38-760H184.62q-27.62 0-46.12 18.5Q120-723 120-695.38v430.76q0 27.62 18.5 46.12Q157-200 184.62-200h298.92q-2.16-9.77-2.85-19.77T480-240H184.62q-9.24 0-16.93-7.69-7.69-7.69-7.69-16.93v-430.76q0-9.24 7.69-16.93 7.69-7.69 16.93-7.69h366.15v121.54ZM160-264.62V-240v-480 455.38Z"/></svg>
     <span>Recent</span> 
      <svg class="dropdown-chev" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-371.69 267.69-584 296-612.31l184 184 184-184L692.31-584 480-371.69Z"/></svg>
      </button>
      {#if stateObj.showSideNavRecent}
        <div transition:slide>
          <a>Due in 7 days</a>
          <a>Due this month</a>
        </div>
      {/if}
    </li>
    <li>
      <a href="#">
     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M268-267.69 69.69-466l28.54-28.31 170 170L295.92-352l28.31 28.31-56.23 56Zm226 0L295.69-466 324-494.54l170 170 368-368L890.31-664 494-267.69ZM466.31-466l-28.54-28.31 198-198L664.31-664l-198 198Z"/></svg>
     <span>Completed</span> 
    </a>
    </li>
  </ul>
</div>

<style>
  .sidenav {
    background-color: var(--base-clr);
    height: 100dvh;

  }
    .sidenav ul{
    list-style: none;
  }
    .sidenav > ul > li:first-child > button {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
    .sidenav ul li.active a{
    color: var(--acccent-clr);

    svg{
      fill: var(--acccent-clr)
    }
  }
    .sidenav a, .sidenav button {
    width: 100%;
    border-radius: .5em;
    padding: .85em;
    text-decoration: none;
    color: var(--text-clr);
    display: flex;
    align-items: center;
    gap: 1em;
    cursor: pointer;
    &:hover{
      background-color: var(--hover-clr);
    }
  }
    .dropdown-chev{
    margin-left: auto;
    background: none;
    border: none;
    font: inherit;
    cursor: pointer;
  }
    .addTask{
    font-weight: 700;
  }
</style>
