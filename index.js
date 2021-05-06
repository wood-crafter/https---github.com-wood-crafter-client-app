const res = fetch('http://localhost:8081/texts')
const song = fetch('http://localhost:8081/mp4')

res.then(res => {
  if (res.ok) {
    return res.json()
  }
}).then(files => {
  files.forEach(filename => {
    const a = document.createElement('a')
    const fileUrl = `http://localhost:8081/downloadText/${filename}`

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
        case filename.endsWith('.json'): {
          getJSON(filename)
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
        // case filename.endsWith('.mp4'): {
        //   getAudio(filename)
        // }
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
  const fileUrl = `http://localhost:8081/downloadText/${filename}`
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
  const fileUrl = `http://localhost:8081/downloadText/${filename}`

  document.querySelector("#img").src = fileUrl
}

function getVideo(filename) {
  const fileUrl = `http://localhost:8081/downloadText/${filename}`

  document.querySelector("#video").src = fileUrl
  document.querySelector("#video").type = "video/mp4"
}

function getAudio(filename) {
  const fileUrl = `http://localhost:8081/downloadText/${filename}`

  document.querySelector("#audio").src = fileUrl
  document.querySelector("#audio").type = "audio/ogg"
}

function getJSON(filename) {
  const fileUrl = `http://localhost:8081/downloadText/${filename}`
  const getContent = fetch(fileUrl)
  getContent.then(res => {
    if (res.ok) {
      return res.json()
    }
  }).then(content => {
    document.querySelector("#text").innerText = content
  })
}