type sparql = {
  title: string;
  query: string;
};
export const queries: sparql[] = [
  {
    title: "Get AQI Literacy across different social cohorts [Survey Data][CQ1]",
    query: `#Get AQI Literacy across different social cohorts [Survey Data][CQ1]
    # The query returns percentage count of rating groups across different spatial locations
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?PMLiteracy ?cohort (xsd:integer(COUNT( ?PMLiteracy) *100 / ?count2) as ?PMLiteracyPercentage)
    WHERE {
      ?person rdf:type saqi:Person ;
      saqi:hasAirPollutionLiteracy ?literacy ;
      saqi:isPartOfSocialCohort ?cohort ;
      saqi:livesIn ?place .
      ?literacy saqi:hasParticulateMatterLiteracy ?PMLiteracy .

      ?place saqi:hasName ?placeName .
      {
        SELECT (COUNT( ?cohort) as ?count2) ?cohort
        WHERE {
                ?person rdf:type saqi:Person ;
                saqi:hasAirPollutionLiteracy ?literacy ;
                saqi:isPartOfSocialCohort ?cohort ;
                saqi:livesIn ?place .
                ?literacy saqi:hasParticulateMatterLiteracy ?PMLiteracy .
                ?place saqi:hasName ?placeName .
        }
        GROUP BY ?cohort
      }	
    } 
GROUP BY ?PMLiteracy ?cohort ?count2
HAVING (?PMLiteracy='Yes')
ORDER BY ?PMLiteracy ?PMLiteracyPercentage
    `
  },
  {
    title: "Perception of people living in different regions toward steps taken by Delhi Govt [Survey Data][CQ4]",
    query: `#Perception of people living in different regions toward steps taken by Delhi Govt [Survey Data][CQ4]
    # The query returns percentage count of rating groups across different spatial locations
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  
    PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    
    SELECT ?percption_govt ?placeName (xsd:integer(COUNT( ?percption_govt) *100 / ?count2) as ?perceptionPercentage)
        WHERE {
          ?person rdf:type saqi:Person ;
          saqi:hasIndividualPerception ?perception ;
          saqi:isPartOfSocialCohort ?cohort ;
          saqi:livesIn ?place .
          ?perception saqi:delhiGovtWorkPerception ?percption_govt .
          ?place saqi:hasName ?placeName .
          {
            SELECT (COUNT( ?placeName) as ?count2) ?placeName
            WHERE {
                    ?person rdf:type saqi:Person ;
                    saqi:hasIndividualPerception ?perception ;
                    saqi:isPartOfSocialCohort ?cohort ;
                    saqi:livesIn ?place .
                ?perception saqi:delhiGovtWorkPerception ?percption_govt .
                    ?place saqi:hasName ?placeName .
            }
            GROUP BY ?placeName
          }	
    
        } 
    GROUP BY ?percption_govt ?placeName ?count2
    ORDER BY ?placeName ?percption_govt ?perceptionPercentage
    `
  },
  {
    title: "Perception of people living in different regions towards air quality compared to their region [Survey Data][CQ5]",
    query: `#Perception of people living in different regions towards air quality compared to their region [Survey Data][CQ5]
    # The query returns percentage count of rating groups across different spatial locations
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  
    PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    
    SELECT ?perceptaion_compared_to_other_areas ?placeName (xsd:integer(COUNT( ?perceptaion_compared_to_other_areas) *100 / ?count2) as ?perceptionPercentage)
        WHERE {
          ?person rdf:type saqi:Person ;
          saqi:hasIndividualPerception ?perception ;
          saqi:isPartOfSocialCohort ?cohort ;
          saqi:livesIn ?place .
          ?perception saqi:howIsYourLocalityComparedToOtherAreas ?perceptaion_compared_to_other_areas .
          ?place saqi:hasName ?placeName .
          {
            SELECT (COUNT( ?placeName) as ?count2) ?placeName
            WHERE {
                    ?person rdf:type saqi:Person ;
                    saqi:hasIndividualPerception ?perception ;
                    saqi:isPartOfSocialCohort ?cohort ;
                    saqi:livesIn ?place .
                ?perception saqi:howIsYourLocalityComparedToOtherAreas ?perceptaion_compared_to_other_areas .
                    ?place saqi:hasName ?placeName .
            }
            GROUP BY ?placeName
          }	
    
        } 
    GROUP BY ?perceptaion_compared_to_other_areas ?placeName ?count2
    ORDER BY ?perceptaion_compared_to_other_areas ?perceptionPercentage
    `
  },
  {
    title: "Get all sensor values obtained from local pollution sensors [Local Sensors]",
    query: `# The query returns all sensor values obtained from local pollution sensors
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  
    PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX sosa: <http://www.w3.org/ns/sosa/>
  
    SELECT ?pm10 ?pm25 ?temp ?humid ?placeName ?temp ?time WHERE {
    
      ?obs_pm_25 a sosa:Observation .
      ?obs_pm_25 sosa:resultTime ?time .
      ?obs_pm_25 saqi:atPlace ?place .
      ?obs_pm_25 saqi:madeBySensor ?source .
  
      ?obs_pm_10 a sosa:Observation .
      ?obs_pm_10 sosa:resultTime ?time .
      ?obs_pm_10 saqi:atPlace ?place .
      ?obs_pm_10 saqi:madeBySensor ?source .
      
      ?obs_humid a sosa:Observation .
      ?obs_humid sosa:resultTime ?time .
      ?obs_humid saqi:atPlace ?place .
      ?obs_humid saqi:madeBySensor ?source .
    
      ?obs_temp a sosa:Observation .
      ?obs_temp sosa:resultTime ?time .
      ?obs_temp saqi:atPlace ?place .
      ?obs_temp saqi:madeBySensor ?source .
    
      ?obs_pm_25 sosa:observedProperty saqi:ParticulateMatter2_5Concentration .
      ?obs_pm_25 sosa:hasResult ?pm25 .
    
      ?obs_pm_10 sosa:observedProperty saqi:ParticulateMatter10Concentration .
      ?obs_pm_10 sosa:hasResult ?pm10 .
    
      ?obs_humid sosa:observedProperty saqi:RelativeHumidity .
      ?obs_humid sosa:hasResult ?humid .
    
      ?obs_temp sosa:observedProperty saqi:AmbientTemperature .
      ?obs_temp sosa:hasResult ?temp .
    
      ?place saqi:hasName ?placeName .
    ?source rdf:type ?data_source_type .
    
      # Add location name or time interval filter
      FILTER (
        ?data_source_type = saqi:LocalSensor &&
        ?time > "2021-11-01T00:00:00+05:30"^^xsd:dateTime &&
        ?time < "2021-11-10T00:00:00+05:30"^^xsd:dateTime
      )
    } 
    LIMIT 10000`
  },
  {
    title: "Get all parameters obtained from CPCB sensors [CPCB][CQ3]",
    query: `# The query returns all parameters obtained from CPCB sensors
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  
    PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX sosa: <http://www.w3.org/ns/sosa/>
  
    SELECT ?pm10 ?pm25 ?NO2 ?NO ?SO2 ?humid ?placeName ?time WHERE {
    
      ?obs_pm_25 a sosa:Observation .
      ?obs_pm_25 sosa:resultTime ?time .
      ?obs_pm_25 saqi:atPlace ?place .
      ?obs_pm_25 saqi:madeBySensor ?source .
  
      ?obs_pm_10 a sosa:Observation .
      ?obs_pm_10 sosa:resultTime ?time .
      ?obs_pm_10 saqi:atPlace ?place .
      ?obs_pm_10 saqi:madeBySensor ?source .
    
      ?obs_no2 a sosa:Observation .
      ?obs_no2 sosa:resultTime ?time .
      ?obs_no2 saqi:atPlace ?place .
      ?obs_no2 saqi:madeBySensor ?source .
    
      ?obs_no a sosa:Observation .
      ?obs_no sosa:resultTime ?time .
      ?obs_no saqi:atPlace ?place .
      ?obs_no saqi:madeBySensor ?source .
    
      ?obs_so2 a sosa:Observation .
      ?obs_so2 sosa:resultTime ?time .
      ?obs_so2 saqi:atPlace ?place .
      ?obs_so2 saqi:madeBySensor ?source .
    
       ?obs_humid a sosa:Observation .
      ?obs_humid sosa:resultTime ?time .
      ?obs_humid saqi:atPlace ?place .
      ?obs_humid saqi:madeBySensor ?source .
    
      ?obs_pm_25 sosa:observedProperty saqi:ParticulateMatter2_5Concentration .
      ?obs_pm_25 sosa:hasResult ?pm25 .
    
      ?obs_pm_10 sosa:observedProperty saqi:ParticulateMatter10Concentration .
      ?obs_pm_10 sosa:hasResult ?pm10 .
    
      ?obs_no2 sosa:observedProperty saqi:NitrogenDiOxideConcentration .
      ?obs_no2 sosa:hasResult ?NO2 .
    
      ?obs_no sosa:observedProperty saqi:NitrogenMonoOxideConcentration .
      ?obs_no sosa:hasResult ?NO .
    
      ?obs_so2 sosa:observedProperty saqi:SulphurDiOxideConcentration .
      ?obs_so2 sosa:hasResult ?SO2 .
  
    
      ?obs_humid sosa:observedProperty saqi:RelativeHumidity .
      ?obs_humid sosa:hasResult ?humid .
    
      ?place saqi:hasName ?placeName .
    ?source rdf:type ?data_source_type .
    
      
      # Add location name or time interval filter
      FILTER (
        ?data_source_type = saqi:CPCBSensor &&
        ?time > "2021-11-01T00:00:00+05:30"^^xsd:dateTime &&
        ?time < "2021-11-10T00:00:00+05:30"^^xsd:dateTime
      )
    } 
    LIMIT 10000`
  },
  {
    title: "Compare Particulate matter concentrations by source CBCB vs Local sensors [CPCB,Local Sensors]",
    query: `  # The query returns average pollutants concentration in a time interval grouped by source
    # Can use filters for location and time range
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  
    PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX sosa: <http://www.w3.org/ns/sosa/>
    
    SELECT (AVG(?pm10Instance) AS ?pm_10) (AVG(?pm25Instance) AS ?pm_25) ?dataSource WHERE {
  
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
      
      ?place saqi:hasName ?placeName .
      ?source rdfs:label ?dataSource .
   
      # Add location name or time interval filter
      FILTER (
        ?time > "2021-11-01T00:00:00+05:30"^^xsd:dateTime &&
        ?time < "2021-11-10T00:00:00+05:30"^^xsd:dateTime
      )
    } 
    GROUP BY ?dataSource
    LIMIT 10000`
  },
  {
    title: "Get pollution perception across different spatial locations [Survey Data][CQ2]",
    query: `# The query returns percentage count of rating groups across different spatial locations
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

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

PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

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
    PREFIX sosa: <http://www.w3.org/ns/sosa/>
    PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    
      SELECT  ?pm_10 ?pm_25 ?placeName ?PMLiteracyPercentage{
        {
          SELECT (AVG(?pm10Instance) AS ?pm_10) (AVG(?pm25Instance) AS ?pm_25) ?placeName ?source WHERE {
          
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
  
    PREFIX saqi: <https://saqi-er24.netlify.app/saqi#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX sosa: <http://www.w3.org/ns/sosa/>
  
    SELECT  ?pm_10 ?pm_25 ?placeName ?rating ?ratingPercentage{
      {
        SELECT (AVG(?pm10Instance) AS ?pm_10) (AVG(?pm25Instance) AS ?pm_25) ?placeName ?source WHERE {
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
        
        ?place saqi:hasName ?placeName .
        ?source rdfs:label ?dataSource .
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
        
        # Add location name or time interval filter
        FILTER (
          ?time > "2021-11-01T00:00:00+05:30"^^xsd:dateTime &&
          ?time < "2021-11-10T00:00:00+05:30"^^xsd:dateTime
        )
      
        ?obs_pm_25 sosa:observedProperty saqi:ParticulateMatter2_5Concentration .
        ?obs_pm_25 sosa:hasResult ?pm25Instance .
        ?obs_pm_10 sosa:observedProperty saqi:ParticulateMatter10Concentration .
        ?obs_pm_10 sosa:hasResult ?pm10Instance .
        
        ?place saqi:hasName ?placeName .
        ?source rdfs:label ?dataSource .
      
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