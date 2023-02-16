
// plugins/axios.js
export default function ({ $axios, $auth, redirect, store }) {
  $axios.onRequest((config) => {
      config.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Basic enVja2VyOjEyMzQ1Ng==', // refers to nuxt.config.js->auth.token
      }
  })

      $axios.onError((error) => {
          if (error.response.status === 500) {
              redirect('/error')
          }
      })
  }
