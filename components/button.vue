<template lang="html">
  <button
    type="button"
    name="button"
    :class="{ red, white, caps, medium, big }"
  >
    <p><slot /></p>
  </button>
</template>

<script>
export default {
  props: {
    red: Boolean,
    white: Boolean,
    big: Boolean,
    medium: Boolean,
    caps: Boolean
  }
};
</script>

<style lang="css">
button{
  border: none;
  color: white;
  padding: 4px 8px;
  background: black;
  transition: .25s;
}

button p{
  font-size: .8em;
  text-shadow: 1px 1px 0px rgba(0,0,0,.1);
}

button.medium{
  padding: 10px 18px;
  border-radius: 25px;
}

button.medium p{
  font-size: 1em;
  font-weight: 700;
}

button.big{
  padding: 12px 24px;
  border-radius: 20px;
  border-radius: 20px;
}

button.big p{
  font-size: 1em;
  font-weight: bold;
  letter-spacing: 1px;
}

button.red{
  background: #ff3d00;
}

button.white{
  background: white;
  color: black;
}

button.caps p{
  text-transform: uppercase;
}

button:hover{
  background: #ff1e1e
}

button:active{
  transform: scale(.95);
}

button:focus {outline:0;}
</style>
