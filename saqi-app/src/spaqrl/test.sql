  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
  PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  SELECT ?pm10conc ?time ?placeName WHERE {
    ?pm a saqi:ParticulateMatter;
    saqi:particulateMatter10Concentration ?pm10conc .
    ?pm saqi:hasObservation ?obs .
    ?obs saqi:atTime ?time ;
    saqi:atPlace ?place .
    ?place saqi:hasName ?placeName .
  } LIMIT 1000

PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT (AVG(?pm10conc) AS ?pm_10) ?placeName WHERE {
  ?pm a saqi:ParticulateMatter;
  saqi:particulateMatter10Concentration ?pm10conc .
  ?pm saqi:hasObservation ?obs .
  ?obs saqi:atTime ?time ;
  saqi:atPlace ?place .
  ?place saqi:hasName ?placeName .
} 
GROUP BY ?placeName
LIMIT 1000


?placeNameLocal="ShaheenBagh"^^rdfs:Literal && 


DELETE WHERE { 
     ?sub ?pred ?type .
}


PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?obs ?obj ?time ?place WHERE {
  ?obs a aq:Observation;
  aq:atTime ?time ;
  aq:atPlace ?place .
} LIMIT 1000



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
  
  FILTER (?placeName="ShaheenBagh"^^rdfs:Literal && ?time > "2021-11-01T00:00:00+05:30"^^xsd:dateTime && ?time < "2021-11-10T00:00:00+05:30"^^xsd:dateTime)
} 
GROUP BY ?source
LIMIT 10000


PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX aq: <http://www.semanticweb.org/saadf/ontologies/2021/2/AirQualityOntology#>
PREFIX saqi: <https://kracr.iiitd.edu.in/ontology/saqi#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX ns0: <https://kracr.iiitd.edu.in/ontology/>
SELECT  ?cohort ?rating (COUNT( ?rating) as ?count_rating) WHERE {
  ?person rdf:type saqi:Person ;

  saqi:hasIndividualPerception ?perception ;
  saqi:isPartOfSocialCohort ?cohort ;
  saqi:hasAirPollutionLiteracy ?literacy .
  ?perception saqi:localAirQualityRating ?rating .
  ?literacy ns0:hasAQILiteracy ?hasliteracy .
} 
GROUP BY ?cohort ?rating
ORDER BY ?cohort ?rating