type sparql = {
  title: string;
  query: string;
};
export const queries: sparql[] = [
  {
    title: "Get all sensor values obtained from local pollution sensors [Local Sensors]",
    query: `# The query returns all sensor values obtained from local pollution sensors
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?pm10 ?pm25 ?humid ?temp ?placeName ?time WHERE {
  ?pm a saqi:ParticulateMatter;	
  saqi:particulateMatter10Concentration ?pm10 ;
  saqi:particulateMatter2_5Concentration ?pm25 .

  ?pm saqi:hasObservation ?obs1 .
  ?obs1 saqi:atTime ?time ;
  saqi:atPlace ?place ;
  saqi:dataSource ?source .
  ?place saqi:hasName ?placeName .
  
  # 2 observations are joined together using common entity ?time and ?place
  ?mc a saqi:MeteorologicalCharacterstic;
          saqi:relativeHumidity ?humid ;
          saqi:ambientTemperature ?temp .
  ?mc saqi:hasObservation ?obs2 .
  ?obs2 saqi:atTime ?time ;
        saqi:atPlace ?place ;
  
  # Add location name or time interval filter
  FILTER (
    ?source="SAQI Local Sensors"^^rdfs:Literal &&
    ?time > "2021-11-01T00:00:00+05:30"^^xsd:dateTime &&
    ?time < "2021-11-10T00:00:00+05:30"^^xsd:dateTime
  )
} 
LIMIT 10000`
  },
  {
    title: "Get all parameters obtained from CPCB sensors [CPCB]",
    query: `# The query returns all parameters obtained from CPCB sensors
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?pm10 ?pm25 ?NO2 ?NO ?SO2 ?humid ?windSpeed ?placeName ?time WHERE {
  ?pm a saqi:ParticulateMatter;	
  saqi:particulateMatter10Concentration ?pm10 ;
  saqi:particulateMatter2_5Concentration ?pm25 .

  ?pm saqi:hasObservation ?obspm .
  ?obspm saqi:atTime ?time ;
  saqi:atPlace ?place ;
  saqi:dataSource ?source .
  ?place saqi:hasName ?placeName .
  
  # Join with oxides of Nitrogen
  ?no a saqi:OxideOfNitrogen ;
  saqi:nitrogenDiOxideConcentration ?NO2 ;
  saqi:nitrogenMonoOxideConcentration ?NO .
  ?no saqi:hasObservation ?obsno .
  ?obsno saqi:atTime ?time ;
  saqi:atPlace ?place ;
  saqi:dataSource ?source .
  
    # Join with Oxides of Sulphur
  ?so a saqi:OxideOfSulphur ;
  saqi:sulphurDiOxideConcentration ?SO2 .
  ?so saqi:hasObservation ?obsso .
  ?obsso saqi:atTime ?time ;
  saqi:atPlace ?place ;
  saqi:dataSource ?source .
  
    # Join with Wind Characterstic
  ?wc a saqi:WindCharacterstic ;
  saqi:windDirection ?windDir ;
  saqi:windSpeed ?windSpeed .
  ?wc saqi:hasObservation ?obswc .
  ?obswc saqi:atTime ?time ;
  saqi:atPlace ?place ;
  saqi:dataSource ?source .
  
  # Join with metrological parameters observation
  ?mc a saqi:MeteorologicalCharacterstic ;
  saqi:relativeHumidity ?humid .
  ?mc saqi:hasObservation ?obsmc .
  ?obsmc saqi:atTime ?time ;
  saqi:atPlace ?place ;
  saqi:dataSource ?source .
  
  # Add location name or time interval filter
  FILTER (
    ?source="Central Pollution Control Board"^^rdfs:Literal &&
    ?time > "2021-11-01T00:00:00+05:30"^^xsd:dateTime &&
    ?time < "2021-11-10T00:00:00+05:30"^^xsd:dateTime
  )
} 
LIMIT 10000`
  },
  {
    title: "Compare Particualte matter concentrations by source CBCB vs Local sensors [CPCB,Local Sensors]",
    query: `# The query returns average pollutants concentration in a time interval grouped by source
# Can use filters for location and time range
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
  
  # Add location name or time interval filter
  FILTER (
    ?time > "2021-11-01T00:00:00+05:30"^^xsd:dateTime &&
    ?time < "2021-11-10T00:00:00+05:30"^^xsd:dateTime
  )
} 
GROUP BY ?source
LIMIT 10000`
  },
  {
    title: "Get pollution perception across different spatial locations [Survey Data]",
    query: `# The query returns percentage count of rating groups across different spatial locations
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ns0: <https://kracr.iiitd.edu.in/ontology/>
SELECT ?rating ?placeName (xsd:integer(COUNT( ?rating) *100 / ?count2) as ?ratingPercentage)
    WHERE {
      ?person rdf:type saqi:Person ;
      saqi:hasIndividualPerception ?perception ;
      saqi:isPartOfSocialCohort ?cohort ;
      saqi:livesIn ?place .
      ?perception saqi:localAirQualityRating ?rating .

      ?place saqi:hasName ?placeName .
      {
        SELECT (COUNT( ?placeName) as ?count2) ?placeName
        WHERE {
                ?person rdf:type saqi:Person ;
                saqi:hasIndividualPerception ?perception ;
                saqi:isPartOfSocialCohort ?cohort ;
                saqi:livesIn ?place .
                ?perception saqi:localAirQualityRating ?rating .
                ?place saqi:hasName ?placeName .
        }
        GROUP BY ?placeName
      }	

    } 
GROUP BY ?rating ?placeName ?count2
ORDER BY ?rating ?ratingPercentage`
  },
  {
    title: "Get AQI Literacy across different spatial locations [Survey Data]",
    query: `# The query returns percentage count of rating groups across different spatial locations
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ns0: <https://kracr.iiitd.edu.in/ontology/>
SELECT ?PMLiteracy ?placeName (xsd:integer(COUNT( ?PMLiteracy) *100 / ?count2) as ?PMLiteracyPercentage)
    WHERE {
      ?person rdf:type saqi:Person ;
      saqi:hasAirPollutionLiteracy ?literacy ;
      saqi:isPartOfSocialCohort ?cohort ;
      saqi:livesIn ?place .
      ?literacy saqi:hasParticulateMatterLiteracy ?PMLiteracy .

      ?place saqi:hasName ?placeName .
      {
        SELECT (COUNT( ?placeName) as ?count2) ?placeName
        WHERE {
                ?person rdf:type saqi:Person ;
                saqi:hasAirPollutionLiteracy ?literacy ;
                saqi:isPartOfSocialCohort ?cohort ;
                saqi:livesIn ?place .
                ?literacy saqi:hasParticulateMatterLiteracy ?PMLiteracy .
                ?place saqi:hasName ?placeName .
        }
        GROUP BY ?placeName
      }	
    } 
GROUP BY ?PMLiteracy ?placeName ?count2
HAVING (?PMLiteracy='Yes')
ORDER BY ?PMLiteracy ?PMLiteracyPercentage`
  },
  {
    title: "Compare AQI literacy to pollution levels in an area [Survey Data, Local Sensors]",
    query: `# The query returns average pollutants concentration in a time interval grouped by source
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT  ?pm_10 ?pm_25 ?placeName ?PMLiteracyPercentage{
  {
    SELECT (AVG(?pm10Instance) AS ?pm_10) (AVG(?pm25Instance) AS ?pm_25) ?placeName ?source WHERE {
      ?pm a saqi:ParticulateMatter;	
      saqi:particulateMatter10Concentration ?pm10Instance ;
      saqi:particulateMatter2_5Concentration ?pm25Instance .
      
      ?pm saqi:hasObservation ?obs .
      ?obs saqi:atTime ?time ;
      saqi:atPlace ?place ;
      saqi:dataSource ?source .
      ?place saqi:hasName ?placeName .
    } 
    GROUP BY ?source ?placeName
    LIMIT 10000
  }
  {
    SELECT ?PMLiteracy ?placeName (xsd:integer(COUNT( ?PMLiteracy) *100 / ?count2) as ?PMLiteracyPercentage) WHERE {
      ?person rdf:type saqi:Person ;
      saqi:hasIndividualPerception ?perception ;
      saqi:isPartOfSocialCohort ?cohort ;
      saqi:livesIn ?place ;
      saqi:hasAirPollutionLiteracy ?literacy .
      ?perception saqi:localAirQualityRating ?rating .
      ?literacy saqi:hasAQILiteracy ?PMLiteracy .

      ?place saqi:hasName ?placeName .
      {
        SELECT (COUNT( ?placeName) as ?count2) ?placeName
        WHERE {
                ?person rdf:type saqi:Person ;
                saqi:hasAirPollutionLiteracy ?literacy ;
                saqi:isPartOfSocialCohort ?cohort ;
                saqi:livesIn ?place .
                ?literacy saqi:hasParticulateMatterLiteracy ?PMLiteracy .
                ?place saqi:hasName ?placeName .
        }
        GROUP BY ?placeName
      }	
    } 
    GROUP BY ?PMLiteracy ?placeName ?count2
    HAVING (?PMLiteracy='Yes')
    ORDER BY ?PMLiteracy ?PMLiteracyPercentage
  }
}
ORDER BY ?pm_10 ?hasliteracy`
  },
  {
    title: "Compare pollution perception to pollution levels in an area [Survey Data, Local Sensors]",
    query: `# The query returns average pollutants concentration in a time interval grouped by source
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT  ?pm_10 ?pm_25 ?placeName ?rating ?ratingPercentage{
  {
    SELECT (AVG(?pm10Instance) AS ?pm_10) (AVG(?pm25Instance) AS ?pm_25) ?placeName ?source WHERE {
      ?pm a saqi:ParticulateMatter;	
      saqi:particulateMatter10Concentration ?pm10Instance ;
      saqi:particulateMatter2_5Concentration ?pm25Instance .
      
      ?pm saqi:hasObservation ?obs .
      ?obs saqi:atTime ?time ;
      saqi:atPlace ?place ;
      saqi:dataSource ?source .
      ?place saqi:hasName ?placeName .
    } 
    GROUP BY ?source ?placeName
    LIMIT 10000
  }
  {
    SELECT ?rating ?placeName (xsd:integer(COUNT( ?rating) *100 / ?count2) as ?ratingPercentage) WHERE {
      ?person rdf:type saqi:Person ;
      saqi:hasIndividualPerception ?perception ;
      saqi:isPartOfSocialCohort ?cohort ;
      saqi:livesIn ?place ;
      saqi:hasIndividualPerception ?perception .
      ?perception saqi:localAirQualityRating ?rating .

      ?place saqi:hasName ?placeName .
      {
        SELECT (COUNT( ?placeName) as ?count2) ?placeName
        WHERE {
                ?person rdf:type saqi:Person ;
                saqi:hasIndividualPerception ?perception ;
                saqi:isPartOfSocialCohort ?cohort ;
                saqi:livesIn ?place .
                ?perception saqi:localAirQualityRating ?rating .
                ?place saqi:hasName ?placeName .
        }
        GROUP BY ?placeName
      }	
    } 
    GROUP BY ?rating ?placeName ?count2
    ORDER BY ?rating ?ratingPercentage
  }
}
ORDER BY ?pm_10 ?ratingPercentage`
  },
  {
    title: "Compare pollution levels against time of day [Local Sensors]",
    query: `
        # The query returns average pollutants in specific time bands
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
LIMIT 10000`
  }
]