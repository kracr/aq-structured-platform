export const aqi_sparql_avg = async function (location, fromDate, toDate) {
    return `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT (AVG(?pm10Instance) AS ?pm_10) (AVG(?pm25Instance) AS ?pm_25) ?source WHERE {
    ?pm a saqi:ParticulateMatter;	
    saqi:particulateMatter10Concentration ?pm10Instance ;
    saqi:particulateMatter2_5Concentration ?pm25Instance .
    ?pm saqi:hasObservation ?obs .
    ?obs saqi:atTime ?time ;
    saqi:atPlace ?place ;
    saqi:dataSource ?source .
    ?place saqi:hasName ?placeName .
    
    FILTER (?time > "${convertToXSDdatetime(fromDate)}"^^xsd:dateTime && ?time < "${convertToXSDdatetime(toDate)}"^^xsd:dateTime)
} 
GROUP BY ?source
LIMIT 10000
`
}

export const aqi_sparql_day = async function (location, fromDate, toDate) {
    return `
# The query returns average pollutants concentration in a time interval grouped by source
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT (AVG(?pm10Instance) AS ?pm_10) (AVG(?pm25Instance) AS ?pm_25) ?timesofday WHERE {
    ?pm a saqi:ParticulateMatter;	
    saqi:particulateMatter10Concentration ?pm10Instance ;
    saqi:particulateMatter2_5Concentration ?pm25Instance .

    ?pm saqi:hasObservation ?obs .
    ?obs saqi:atTime ?time ;
    saqi:atPlace ?place ;
    saqi:dataSource ?source .
    ?place saqi:hasName ?placeName .

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
} 
GROUP BY ?timesofday
LIMIT 10000
`
}

export const get_perception_literacy = async function () {
    return `
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
    PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
    PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX ns0: <https://kracr.iiitd.edu.in/ontology/>
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