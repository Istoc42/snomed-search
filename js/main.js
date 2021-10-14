// Grab DOM elements

// Get search bar
const search = document.getElementById('search')

// Get dropdown output
const matchList = document.getElementById('match-list')

// Create a function to search the JSON and filter it
const searchCodes = async (searchText) => {
  const res = await fetch('data/codes.json')
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
      <div class="card card-body mb-1">
        <h4>${match.code}</h4>
        <small>${match.name}</small>
      </div>
    `
      )
      .join('')

    matchList.innerHTML = html
  }
}

// Detect input in the search bar
search.addEventListener('input', () => searchCodes(search.value))
