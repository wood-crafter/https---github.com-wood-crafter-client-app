const API_ROOT = 'http://localhost:8081'
const res = fetch(`${API_ROOT}/texts`)
const song = fetch(`${API_ROOT}/mp4`)

res.then(res => {
  if (res.ok) {
    return res.json()
  }
}).then(files => {
  files.forEach(filename => {
    const a = document.createElement('a')
    const fileUrl = `${API_ROOT}/download/${filename}`

    a.href = fileUrl
    a.download = filename
    a.innerText = filename

    a.style.display = 'block'

    document.querySelector("#getTexts").appendChild(a)

    a.addEventListener('click', (e) => {
      let canBeOpened = true

      switch (true) {
        case filename.endsWith('.txt'): {
          getContent(filename)
          break
        }
//TODO- Format JSON file
        case filename.endsWith('.json'): {
          displayJSON(filename)
          break
        }
        case filename.endsWith('.jpg'): {
          getImage(filename)
          break
        }
        case filename.endsWith('.mp4'): {
          getVideo(filename)
          break
        }
        case filename.endsWith('.mp3'): {
          getAudio(filename)
          break
        }
        default:
          canBeOpened = false
      }

      if (canBeOpened) {
        e.preventDefault()
      }
    })
  })
}).catch(e => {
  console.error(e)
})

function getContent(filename) {
  const fileUrl = `${API_ROOT}/download/${filename}`
  const getContent = fetch(fileUrl)
  getContent.then(res => {
    if (res.ok) {
      return res.text()
    }
  }).then(content => {
    document.querySelector("#text").innerText = content
  })
}

function getImage(filename) {
  const fileUrl = `${API_ROOT}/download/${filename}`

  document.querySelector("#img").src = fileUrl
}

function getVideo(filename) {
  const fileUrl = `${API_ROOT}/download/${filename}`

  document.querySelector("#video").src = fileUrl
  document.querySelector("#video").type = "video/mp4"
}

function getAudio(filename) {
  const fileUrl = `${API_ROOT}/download/${filename}`

  document.querySelector("#audio").src = fileUrl
  document.querySelector("#audio").type = "audio/ogg"
}

function displayJSON(filename) {
  const fileUrl = `${API_ROOT}/download/${filename}`
  const getContent = fetch(fileUrl)
  getContent.then(res => {
    if (res.ok) {
      return res.json()
    }
  }).then(content => {
    document.querySelector("#text").innerText = content
  })
}