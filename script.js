
let countries = []
const inp = document.querySelector('input')
let order = "desc"

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
           <th data-column="Country" data-order=${order}>Country <i class="bi bi-arrow-down-up"></i></th>
           <th data-column="NewConfirmed" data-order=${order}>Daily Cases <i class="bi bi-arrow-down-up"></i> </th>
           <th data-column="TotalConfirmed" data-order=${order}>Total Cases <i class="bi bi-arrow-down-up"></i> </th>
           <th data-column="NewDeaths" data-order=${order}>Daily Deaths <i class="bi bi-arrow-down-up"></i> </th>
           <th data-column="TotalDeaths" data-order=${order}>Total Deaths <i class="bi bi-arrow-down-up"></i> </th>
        </tr>
    </thead>

    `
    const filterCountries = countries.filter(country => country.Country.toLowerCase().includes(inp.value.toLowerCase()))

    if (!filterCountries.length) {
        table.innerHTML = `
        <thead>
        <tr>
        <th>couldn't find ${inp.value}</th>
        </tr>
        </thead>
        `
    }

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
    SortBy()
}
//----Sort-----------------------
function SortBy() {

    $('th').on("click", function () {
        order = $(this).data('order')
        let column = $(this).data('column')
        console.log("you clicked me🤗", order, column);

        if (order == 'desc') {
            order = "asc"
            $(this).data('order', "asc")
            countries = countries.sort((a, b) => a[column] > b[column] ? 1 : -1)
        } else {
            order = "desc"
            $(this).data('order', "desc")
            countries = countries.sort((a, b) => a[column] < b[column] ? 1 : -1)

        }
        displayCountriesTable()

    })

}
let p = document.querySelector(".moment")
const getData = async () => {
    try {
        const res = await fetch("https://api.covid19api.com/summary")
        const data = await res.json()
        countries = data.Countries
        updateGlobalData(data.Global)
        displayCountriesTable()

        let m = moment(countries[0].Date)
        console.log(m.startOf('hour').fromNow())
        p.textContent = "last update was " + m.startOf('hour').fromNow()
    } catch (error) {
        console.log(error)
    }
}

getData()

inp.addEventListener("keyup", displayCountriesTable)

