let countries = []
const inp = document.querySelector('input')

const updateGlobalData = ({ TotalDeaths, TotalConfirmed, NewDeaths, NewConfirmed }) => {
    document.querySelector('#gct').textContent = TotalConfirmed.toLocaleString('en-IL')
    document.querySelector('#gcd').textContent = NewConfirmed.toLocaleString('en-IL')
    document.querySelector('#gdt').textContent = TotalDeaths.toLocaleString('en-IL')
    document.querySelector('#gdd').textContent = NewDeaths.toLocaleString('en-IL')
}
const displayCountriesTable = () => {
    const table = document.querySelector('table')

    table.innerHTML = `
    <thead>
        <tr>
         <th>Country</th>
         <th>Daily Cases</th>
         <th>Total Cases</th>
         <th>Daily Deaths</th>
         <th>Total Deaths</th>
        </tr>
    </thead>
    `
    const filterCountries = countries.filter(country => country.Country.includes(inp.value))

    for (const country of filterCountries) {

        table.innerHTML += `
        <tr>
        <td>${country.Country}</td>
        <td>${country.NewConfirmed.toLocaleString('en-IL')}</td>
        <td>${country.TotalConfirmed.toLocaleString('en-IL')}</td>
        <td>${country.NewDeaths.toLocaleString('en-IL')}</td>
        <td>${country.TotalDeaths.toLocaleString('en-IL')}</td>
        </tr>
        `
    }


}
const getData = async () => {
    try {
        const res = await fetch("https://api.covid19api.com/summary")
        const data = await res.json()
        countries = data.Countries
        updateGlobalData(data.Global)
        displayCountriesTable()

    } catch (error) {
        console.log(error)
    }
}

getData()

inp.addEventListener("keyup", displayCountriesTable)