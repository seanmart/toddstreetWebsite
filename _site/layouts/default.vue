<template>
  <div >
    <viewfinder class="secret-viewfinder c-blue"/>
    <navigation/>
    <div class="page-content">
      <nuxt/>
    </div>
    <theFooter></theFooter>
  </div>
</template>

<script>
import theFooter from '@/components/footer'
import navigation from '@/components/navigation'
import viewfinder from '@/assets/icons/viewfinder'
export default {
  components: { theFooter, navigation, viewfinder },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Karla:400,400i,500,600,700,700i'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Barlow+Condensed:400,600,700'
      }
    ]
  }
}
</script>

<style>
.secret-viewfinder {
  position: fixed;
  height: 23vh;
  left: 50%;
  top: 5vh;
  transform: translateX(-50%);
  z-index: -1;
}

.page-content {
  position: relative;
  z-index: 1;
  background: #2f3339;
}

html {
  font-family: 'Karla', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  color: #2f3339;
  fill: #2f3339;
  background: #2f3339;
}

img {
  width: 100%;
  display: block;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.page-content > section {
  min-height: 100vh;
}

.container {
  width: 85vw;
  max-width: 120rem;
  margin: 0px auto;
}

.spacer {
  padding-top: 8rem;
  padding-bottom: 8rem;
}

.bg-lg {
  background: #d6d6d6;
  background: -moz-linear-gradient(45deg, #eeeeee 0%, #ffffff 100%);
  background: -webkit-linear-gradient(45deg, #ffffff 0%, #eeeeee 100%);
  background: linear-gradient(45deg, #ffffff 0%, #eeeeee 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#eeeeee',GradientType=1 );
}

.bg-dg {
  background: #333333;
  background: -moz-linear-gradient(45deg, #444444 0%, #222222 100%);
  background: -webkit-linear-gradient(45deg, #444444 0%, #222222 100%);
  background: linear-gradient(45deg, #444444 0%, #222222 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#444444', endColorstr='#222222',GradientType=1 );
}

.bg-0 {
  background: #2f3339;
}

.bg-20 {
  background: #43484f;
}

.bg-40 {
  background: #56626d;
}

.bg-60 {
  background: #6b7582;
}

.bg-80 {
  background: #8a96a7;
}

.bg-90 {
  background: #bfcad8;
}

.bg-100 {
  background: white;
}

.c-0 {
  color: #2f3339;
  fill: #2f3339;
}
.c-20 {
  color: #43484f;
  fill: #43484f;
}
.c-40 {
  color: #56626d;
  fill: #56626d;
}

.c-60 {
  color: #6b7582;
  fill: #6b7582;
}

.c-80 {
  color: #8a96a7;
  fill: #8a96a7;
}

.c-90 {
  color: #bfcad8;
  fill: #bfcad8;
}

.c-100 {
  color: white;
  fill: white;
}

.c-blue {
  color: #41526d;
  fill: #41526d;
}

.line {
  border-bottom: 1px solid #eee;
  padding: 20px 0px;
}

/* -----------------------text----------------------- */
a {
  text-decoration: none;
  color: inherit;
}

h1 {
  font-family: 'Barlow Condensed', sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 0.9em;
  font-weight: 700;
  font-size: calc(3em + 1vw);
  margin: 0px 0px 10px;
}

h2 {
  font-family: 'Barlow Condensed', sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.9em;
  font-weight: 700;
  font-size: calc(2.5em + 1vw);
  margin: 0px 0px 15px;
}

h3 {
  font-family: 'Barlow Condensed', sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 0.9em;
  font-weight: 700;
  font-size: calc(2em + 1vw);
  margin: 0px 0px 10px;
}

h4 {
  font-family: 'Barlow Condensed', sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  font-size: calc(1.5em + 1vw);
  line-height: 0.9em;
  margin: 0px 0px 10px;
}

h5 {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: calc(1em + 1vw);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 0.9em;
  margin: 0px;
}

h6 {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: calc(0.5em + 1vw);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 0.9em;
  margin: 0px 0px 10px;
}

p,
li,
b {
  font-family: 'Karla', sans-serif;
  font-weight: 500;
  font-size: calc(1.1em + 1vw);
  letter-spacing: -0.03em;
  line-height: 1.3em;
  margin: 5px 0px;
}

b {
  font-weight: bold;
}

span {
  font-family: 'Karla', sans-serif;
  font-weight: 500;
  font-size: calc(1em + 0.3vw);
  letter-spacing: -0.02em;
  margin: 0px;
}

@media screen and (max-width: 850px) {
  .markdown section,
  .spacer {
    padding-top: 20vw;
    padding-bottom: 20vw;
  }
}

@media screen and (min-width: 1300px) {
  h1 {
    font-size: ;
  }
  h2 {
  }
  h3 {
  }
  h4 {
  }
  h5 {
  }
  p {
  }
  span {
  }
}

/* -----------------------animation----------------------- */

@keyframes fade-on {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slide-on-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes slide-on-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes slide-on-left {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}

@keyframes slide-on-right {
  0% {
    opacity: 0;
    transform: translateX(50px);
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
