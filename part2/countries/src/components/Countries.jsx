const Countries = ({countries, showCountry}) => {   
    console.log('countries', countries.length)
    if(countries.length > 10){
        return(
            <div>
                too many matches, specify another filter
            </div>
        )
    }
    if(countries.length > 1){
        return(
            <div>
              {countries.map(country => <p key={country.name.common}>{country.name.common}<button onClick={() => showCountry(country.name.common)}>show</button></p>)}
            </div>
        )
    }
}


export default Countries