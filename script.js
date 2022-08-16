const load_view = (view, args = {}) => {
  const response = await fetch(
    `/wp-admin/admin-ajax.php?action=load_view&view=${view}&` +
      new URLSearchParams(args)
  )
  const text = await response.text()
  document.getElementById('app').innerHTML = text
}

const login = event => {
  event.preventDefault()

  const form = document.getElementById('login-form')
  const errorWrapper = document.getElementById('response-error')
  const email = form.querySelector('#email')
  const password = form.querySelector('#password')

  errorWrapper.classList.add('d-none')

  const requestBody = {
    email: email.value,
    password: password.value,
    action: 'login'
  }

  fetch('/wp-admin/admin-ajax.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(async resposnse => {
      if (resposnse.status !== 200) {
        errorWrapper.classList.remove('d-none')
        errorWrapper.innerHTML = await resposnse.text()
        return
      }
      load_view('dashboard')
    })
    .catch(error => {
      console.log(error)
      errorWrapper.classList.remove('d-none')
      errorWrapper.innerHTML = error
    })
}

function deletePost (event, post_id) {
  event.preventDefault()
  const errorWrapper = document.getElementById('response-error')
  errorWrapper.classList.add('d-none')

  fetch('/wp-admin/admin-ajax.php?action=post_delete&post=' + post_id, {
    method: 'GET'
  })
    .then(async resposnse => {
      if (resposnse.status !== 200) {
        errorWrapper.classList.remove('d-none')
        errorWrapper.innerHTML = await resposnse.text()
        return
      }
      load_view('dashboard')
    })
    .catch(error => {
      console.log(error)
      errorWrapper.classList.remove('d-none')
      errorWrapper.innerHTML = error
    })
}

const logout = event => {
  event.preventDefault()

  fetch('/wp-admin/admin-ajax.php?action=logout')
    .then(async resposnse => {
      if (resposnse.status !== 200) {
        return
      }
      load_view('login')
    })
    .catch(error => {
      console.log(error)
    })
}

const insertPost = event => {
  event.preventDefault()

  const form = document.getElementById('edit-form')
  const formData = new FormData(form)

  const errorWrapper = document.getElementById('response-error')
  errorWrapper.classList.add('d-none')

  const requestData = {
    ...Object.fromEntries(formData),
    action: 'post_insert'
  }

  fetch('/wp-admin/admin-ajax.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
    .then(async resposnse => {
      if (resposnse.status !== 200) {
        errorWrapper.classList.remove('d-none')
        errorWrapper.innerHTML = await resposnse.text()
        return
      }
      load_view('dashboard')
    })
    .catch(error => {
      console.log(error)
      errorWrapper.classList.remove('d-none')
      errorWrapper.innerHTML = error
    })
}
