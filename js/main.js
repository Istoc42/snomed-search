// Grab DOM elements

// Get search bar
const search = document.getElementById('search')

// Get dropdown output
const matchList = document.getElementById('match-list')

// Create a function to search the JSON and filter it
const searchCodes = async (searchText) => {
  const res = await fetch('https://istoc42.github.io/snomed-api/codes.json')
  const snomeds = await res.json()

  // Get matches to current text input
  let matches = snomeds.filter((snomed) => {
    const regex = new RegExp(`^${searchText}`, 'gi')
    return snomed.name.match(regex) || snomed.code.match(regex)
  })

  // Conditional to clear
  if (searchText.length === 0) {
    matches = []
  }

  outputHtml(matches)
}

// Show results in HTML
const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
      <div class="card card-body mb-1 result">
        <span id="${match.code}" class="fs-2 mb-2 p-0 copy" style="cursor: copy; color: white; padding: 0;">${match.code}</span>
        <span id="${match.name}" class="copy " style="cursor: copy;">${match.name}</span>
      </div>
    `
      )
      .join('')

    matchList.innerHTML = html
  } else {
    matchList.innerHTML = ''
  }
}

// Detect input in the search bar
search.addEventListener('input', () => searchCodes(search.value))

// Reads the innerText of element that was clicked and logs it in the console
function detectInnerText() {
  document.addEventListener('click', (e) => {
    var clickTarget = e.target

    if (clickTarget.classList.contains('copy')) {
      let result = clickTarget.id
      navigator.clipboard.writeText(result)
      let copiedText = clickTarget.innerText
      clickTarget.innerText = 'Copied!'
      console.log(copiedText)
      // Set timeout
      setTimeout(() => {
        clickTarget.innerText = copiedText
      }, 1500)

      console.log('"' + result + '"' + ' was copied to clipboard')
    }
  })
}

detectInnerText()
