const Country = ({country}) => {

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

const CountryList = ({countries}) => {  
    return(
        <>
        {countries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
        </>
    )

}



const Countries = ({countries}) => {   

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
               <CountryList countries={countries} />
            </div>
        )
    }
    if(countries.length === 1){
        return(
            <div>
                <Country country={countries[0]} />
            </div>
        )
    }
    else{
        return(
            <div>
                no matches
            </div>
        )
    }

}


export default Countries