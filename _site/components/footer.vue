<template lang="html">
  <footer>
    <div class="container inner-footer c-blue">
      <div class="top">
        <viewfinder class="viewfinder"/>
      </div>
      <div class="middle">
        <div class="newsletter">
          this is the newsletter area
        </div>
        <div class="contact">
          this is the contact area
        </div>
        <div class="social">
          this is the social area
        </div>
      </div>
      <div class="bottom">
        <span class="copyright">© {{new Date().getFullYear()}} toddstreet prductions inc., all rights reserved</span>
      </div>
    </div>
  </footer>
</template>

<script>
import viewfinder from '@/assets/icons/viewfinder'
export default {
  components: {
    viewfinder
  }
}
</script>

<style lang="css">
footer{
  background: #222;
  padding: 60px 0px;
}

footer span{
  display: block;
  font-size:1em
}


footer .middle{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 60px 0px;
}

footer .middle div{
  flex: 0 0 33.333%;
  text-align: center;
  padding: 0px 20px;
}

footer .viewfinder{
  width: 100px;
  display: block;
  margin: 0px auto;
}

footer .copyright{
  text-transform: uppercase;
  font-size: .8em;
  text-align: center;
}

</style>
