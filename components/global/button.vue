<template lang="html">
  <button
    class="button"
    type="button"
    name="button"
    :class="{ red, white, caps, medium, big, small, outline }"
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
    small: Boolean,
    caps: Boolean,
    outline: Boolean
  }
};
</script>

<style lang="css">
.button{
  border: none;
  color: white;
  padding: 4px 8px;
  background: black;
  transition: transform .25s;
  cursor: pointer;
}

.button p{
  font-size: .8em;
}

.button.small{
  padding: 7px 12px;
  border-radius: 25px;
}

.button.medium{
  padding: 10px 18px;
  border-radius: 25px;
}

.button.big{
  padding: 12px 24px;
  border-radius: 20px;
  border-radius: 20px;
}

.button.small p{
  font-size: .8em;
  font-weight: 700;
}

.button.medium p{
  font-size: 1em;
  font-weight: 700;
}

.button.big p{
  font-size: 1em;
  font-weight: bold;
  letter-spacing: 1px;
}

.button.red{
  background: #ff3d00;
}

.button.white{
  background: white;
  color: black;
}

.button.white.outline{
  border: 1px solid black;
}

.button.caps p{
  text-transform: uppercase;
}

.button.red:hover{
  background: #ff1e1e
}

.button:active{
  transform: scale(.95);
}

.button:focus {outline:0;}
</style>
