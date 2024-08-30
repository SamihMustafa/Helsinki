const Country = ({country}) => {
    console.log('displaying country', country)
    if(country == null){
        return
    }

    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.population}</p>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt="flag" />
        </div>
    )
}

export default Country