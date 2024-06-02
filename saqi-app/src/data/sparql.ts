export const aqi_sparql_avg = async function (location, fromDate, toDate) {
    return `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>

SELECT (AVG(?pm10Instance) AS ?pm_10) (AVG(?pm25Instance) AS ?pm_25) ?source WHERE {

    ?obs_pm_25 a sosa:Observation .
    ?obs_pm_25 sosa:resultTime ?time .
    ?obs_pm_25 saqi:atPlace ?place .
    ?obs_pm_25 saqi:madeBySensor ?source .
    
    ?obs_pm_10 a sosa:Observation .
    ?obs_pm_10 sosa:resultTime ?time .
    ?obs_pm_10 saqi:atPlace ?place .
    ?obs_pm_10 saqi:madeBySensor ?source .
  
    ?obs_pm_25 sosa:observedProperty saqi:ParticulateMatter2_5Concentration .
    ?obs_pm_25 sosa:hasResult ?pm25Instance .
  
    ?obs_pm_10 sosa:observedProperty saqi:ParticulateMatter10Concentration .
    ?obs_pm_10 sosa:hasResult ?pm10Instance .
    
    FILTER (?time > "${convertToXSDdatetime(fromDate)}"^^xsd:dateTime && ?time < "${convertToXSDdatetime(toDate)}"^^xsd:dateTime)
} 
GROUP BY ?source
LIMIT 10000
`
}

export const aqi_sparql_day = async function (location, fromDate, toDate) {
    return `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX sosa: <http://www.w3.org/ns/sosa/>

SELECT (AVG(?pm10Instance) AS ?pm_10) (AVG(?pm25Instance) AS ?pm_25) ?timesofday WHERE {
    ?obs_pm_25 a sosa:Observation .
    ?obs_pm_25 sosa:resultTime ?time .
    ?obs_pm_25 saqi:atPlace ?place .
    ?obs_pm_25 saqi:madeBySensor ?source .

    ?obs_pm_10 a sosa:Observation .
    ?obs_pm_10 sosa:resultTime ?time .
    ?obs_pm_10 saqi:atPlace ?place .
    ?obs_pm_10 saqi:madeBySensor ?source .

    ?obs_pm_25 sosa:observedProperty saqi:ParticulateMatter2_5Concentration .
    ?obs_pm_25 sosa:hasResult ?pm25Instance .
    
    ?obs_pm_10 sosa:observedProperty saqi:ParticulateMatter10Concentration .
    ?obs_pm_10 sosa:hasResult ?pm10Instance .
    
    BIND (hours(?time) AS ?hour)

    OPTIONAL { FILTER (?hour <= 8)
        BIND("Morning" AS ?timesofday)
    }
    OPTIONAL { FILTER (?hour > 8 && ?hour <= 16)
        BIND("Afternoon" AS ?timesofday)
    }
    OPTIONAL { FILTER (?hour > 16 && ?hour <= 20)
        BIND("Evening" AS ?timesofday)
    }
    OPTIONAL { FILTER (?hour > 20)
        BIND("Night" AS ?timesofday)
    }
            FILTER(
        ?time > "2021-11-01T00:00:00+05:30"^^xsd:dateTime &&
        ?time < "2022-01-01T00:00:00+05:30"^^xsd:dateTime
    )
} 
GROUP BY ?timesofday
LIMIT 1000
`
}

export const get_perception_literacy = async function () {
    return `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX sosa: <http://www.w3.org/ns/sosa/>
    ?person rdf:type owl:NamedIndividual ;
    ns0:SAQIOntologyhasIndividualPerception ?perception ;
    ns0:SAQIOntologyisPartOfSocialCohort ?cohort ;
    ns0:SAQIOntologyhasAirPollutionLiteracy ?literacy .
    ?perception ns0:SAQIOntologylocalAirQualityRating ?rating .
    ?literacy ns0:SAQIOntologyhasAQILiteracy ?hasliteracy .
`
}

export const get_grouped_perception = async function () {
    return `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  
    PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    
    SELECT  ?cohort ?rating (COUNT( ?rating) as ?count_rating) WHERE {
      ?person rdf:type owl:NamedIndividual ;
      ns0:SAQIOntologyhasIndividualPerception ?perception ;
      ns0:SAQIOntologyisPartOfSocialCohort ?cohort ;
      ns0:SAQIOntologyhasAirPollutionLiteracy ?literacy .
      ?perception ns0:SAQIOntologylocalAirQualityRating ?rating .
    #  ?literacy ns0:SAQIOntologyhasAQILiteracy ?hasliteracy .
    } 
    GROUP BY ?cohort ?rating
    ORDER BY ?cohort ?rating
`
}


function convertToXSDdatetime(datetime) {
    return datetime.toISOString().replace("Z", "+05:30")
}

// (SAMPLE(?rating) AS ?rating_type)