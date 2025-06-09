<script lang="ts">
let {title}: {
  title:string;
} = $props()
</script>
<div class="titlebar"></div>

<h1> {title}</h1>

<style>
  @media screen and (min-width: 48rem) {
    h1 {
      margin : 0px 84px;
    }
  }
  @media screen and (min-width: 64rem) {
    h1 {
      margin: 0px 112px;
    }
  }
  @media screen and (min-width: 80rem) {
    h1 {
      margin: 0px 140px;
    }
  }
  .titlebar {
    background-color: var(--base-clr);
    flex-grow: 1;
  }
  h1{
    display:flex;
    justify-content: start;
  }
</style>
