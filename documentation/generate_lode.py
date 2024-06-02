from pylode import OntPub
from bs4 import BeautifulSoup

od = OntPub("saqi.ttl")
html_raw = od.make_html()

soup = BeautifulSoup(html_raw,'html.parser')

# Add styles
head = soup.head
head.append(soup.new_tag('style', type='text/css'))
head.style.append("""
    a:visited {
      color: #5988e0;
      text-decoration: none;
    }
    #content{
        width: 70%;
        margin-right: 20%;
        margin-left: auto;
    }
        a:visited {
      color: #5988e0;
      text-decoration: none;
    }

    dt {
      margin-bottom: 5px;
    }

    .orig-table {
      border: 1px solid;
    }

    caption {
      margin-bottom: 10px;
    }
""")

introduction_text="""
    <h1>SAQI</h1>
    <h2>Ontology to model Social Air Quality</h2>
    <div>
        <dt>Latest version: <a href="https://saqi-er24.netlify.app/saqi">https://saqi-er24.netlify.app/saqi</a></dt>
        <dt>Revision: 0.2</dt>
        <dt>Author: XXXX XXXX and XXXX XXXXX <a href="https://XXXX.XXXXX.XXX.XX/">(XXXXX XXXX, XXXXX, XXXXX)</a>
        </dt>
        <dt>Contributors:
        <dd>XXXXX XXXXXXX <a href="https://XXX.XX.XX/">(XXXXX)</a></dd>
        <dt>Resource type:Ontology, Knowledge Graph, SAQI Application</dt>
        
        <dt>Download serialization:
            <span><a href="saqi.json" target="_blank"><img src="https://img.shields.io/badge/Format-JSON_LD-blue.svg" alt="JSON-LD"></a> 
            </span><span><a href="saqi.xml" target="_blank"><img src="https://img.shields.io/badge/Format-RDF/XML-blue.svg" alt="RDF/XML"></a> 
            </span><span><a href="saqi.ttl" target="_blank"><img src="https://img.shields.io/badge/Format-TTL-blue.svg" alt="TTL"></a> </span>
        </dt>
        <dt>License: <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"><img src="https://img.shields.io/badge/License-CC_by_4.0-blue.svg" alt="https://creativecommons.org/licenses/by/4.0/"></a></dt>
        <dt>Visualization: <a href="#visualization"><img src="https://img.shields.io/badge/Visualize_with-WebVowl-blue.svg" alt="Visualize with WebVowl"></a></dt>

        <dt>DOI : <a href="https://doi.org/10.5281/zenodo.10300235">dx.doi.org/10.5281/zenodo.XXXXXXX</a></dt>
        <dt>URL : <a href="https://github.com/XXXX/XX-XXXXXXXX-XXXXXXX">github.com/XXXX/XX-XXXXXXXX-XXXXXXX</a>
        <hr>
        </dt>
    </div>
    <h2 id="abstract">Abstract</h2>
    <div>
        <p>
          Air Quality Index (AQI) is a number aggregated from several air quality sensors deployed in an area. AQI is
          useful in communicating the air quality to the general public and for taking governance decisions to tackle
          air
          pollution. However, our ethnographic surveys revealed the existence of a knowledge barrier in interpreting the
          AQI and data illiteracy to understand AQI related charts and trends commonly facilitated through government
          organizations. This knowledge gap is wider for the marginalized sections of the society, who, it turns out,
          are
          more exposed to pollution. We use an ontological approach to homogenize the air quality data with social and
          spatial aspects. The Social Air Quality Index(SAQI) ontology is used to integrate the data from local and
          central monitoring sensors, meteorological data, and data from field surveys.This data is converted into a
          Knowledge Graph, which in turn is used to build an application for civic engagement with the public on
          pollution in order to improve community participation of the local institutions and individuals.
        </p>
    </div>
    <h2 id="introduction">Introduction</h2>
    <div>
        <p>Air pollution is a significant problem across the major cities of the
          World and is also a part of the sustainable development goals. Tackling it, however, is a rather
          complex task as the solution lies at the intersection of society,
          politics, science and technology. Air pollution has substantial spatial
          variance. Even within one city, air quality can vary a lot depending on
          the locality, close proximity with industrial areas, population density
          etc.</p>
        <p>In order to tackle air pollution, the government agencies frame
          policies for mitigating the sources of pollution, increasing the civic
          engagement and promoting the standardized air quality indices such as
          the Air Quality Index (AQI). In this work, we delve into the latter two
          aspects, i.e., improving the community engagement and studying AQI from
          the perspective of different social cohorts. This lead to a socially
          relevant AQI, which we named, Social AQI (SAQI).</p>
        <p>We conducted an ethnographic survey at six different locations in
          Delhi, India, which is one of the most polluted cities in the World. At
          these six locations, we have also deployed air quality sensors to record
          the hyperlocal AQI. The details of the data collection and the survey
          results are discussed in Section. In
          order to model and integrate these disparate and heterogenous datasets,
          we built a SAQI Ontology (SAQI). This ontology<span class="citation" data-cites="Ont-NG-2009"></span>
          captures the
          relationship between the
          seemingly unrelated concepts in the datasets, which in turn are used to
          construct a Knowledge Graph (KG) <span class="citation" data-cites="KG-ACMSurvey2021"></span> from these
          datasets. A
          SAQI app is
          built on top of the KG. This app takes into account the different social
          cohorts and their understanding of the AQI. The following are our
          contributions.</p>
        <ol>
          <li>
            <p>An ontology (SAQI) that models the data from the air quality
              sensors and the ethnographic survey data. SAQI is built using our
              Pollution ontology design pattern<a href="#fn2" class="footnote-ref" id="fnref2" role="doc-noteref">.
                SAQI
                is available at <a href="https://github.com/XXXX/XX-XXXXXXXX-XXXXXXX"
                  class="uri">https://github.com/XXXX/XX-XXXXXXXX-XXXXXXX</a> and the
                documentation is at <a href="https://saqi-er24.netlify.app/saqi"
                  class="uri">https://saqi-er24.netlify.app/saqi</a>.</p>
          </li>
          <li>
            <p>An SAQI KG that integrates the air pollution data from local and
              central sensors with the data from the ethnographic survey. YARRML is used to convert the sensor and
              survey data into a KG. These mappings, along with the SHACL constraints and SPARQL queries on
              the KG, are available at <a href="https://doi.org/10.5281/zenodo.10300235"
                class="uri">https://doi.org/10.5281/zenodo.10300235</a>. The SPARQL
              endpoint over the KG is available at <a href="https://saqi-er24.netlify.app/sparql"#/dataset/aq-store/query"
                class="uri">https://https://saqi-er24.netlify.app/saqi/sparql/#/dataset/aq-store/query</a>.</p>
          </li>
          <li>
            <p>An SAQI App that is built using the KG to encourage community
              engagement and response. This is available at <a href="https://saqi-er24.netlify.app/"
                class="uri">https://saqi-er24.netlify.app/</a>.</p>
          </li>
          <li>
            <p>The two datasets – ethnographic survey questionnaire and
              responses and the hyperlocal air quality data from six different
              locations in Delhi. This is available at <a href="https://doi.org/10.5281/zenodo.10300235"
                class="uri">https://doi.org/10.5281/zenodo.10300235</a>. These
              datasets will be helpful to social scientists, environmental scientists,
              biophysicists and biochemists.</p>
          </li>
        </ol>
    </div>
    <h2 id="methodology">Methodology</h2>
    <div>
        <p>The methodology of building the SAQI ontology revolved around
          continual iterative development. We developed the ontology in two phases
          – building a barebones ontology consisting of classes and properties
          that were minimally essential and, later on, iteratively extending it
          based on the feedback and the requirements of the SAQI application. The
          former has led to the development of the Pollution ontology design
          pattern. In the latter phase,
          feedback on the ontology is obtained from the social scientists and the
          field workers in our team. An example of the importance of their
          feedback is the presence of the <code>Person</code> class. Since most of
          the survey responses are connected to the people living in a locality,
          the feedback was that it would be an important concept in the SAQI
          ontology.</p>
        <p>Since reusing existing ontologies and vocabularies is a good
          practice, we reused three ontologies that are widely known. We reused
          the <a href="http://xmlns.com/foaf/0.1/">foaf</a>,
          <a href="https://www.auto.tuwien.ac.at/downloads/thinkhome/ontology/WeatherOntology.owl">WeatherOntology</a>
          and
          <a href="https://schema.org/">schema.org</a>
          ontologies as shown in Table below
        </p>
        <div id="tab:ont-reused">
          <table class="orig-table">
            <caption>The ontologies and the concepts in those ontologies that were
              reused in the SAQI ontology.</caption>
            <tbody>
              <tr class="odd orig-table">
                <th class="orig-table" style="text-align: center;"><strong>Ontology reused</strong></th>
                <th class="orig-table" style="text-align: center;"><strong>Concepts reused</strong></th>
              </tr>
              <!-- <tr class="even">
                <td style="text-align: center;"><strong></strong></td>
                <td style="text-align: center;"><strong></strong></td>
              </tr> -->
              <tr class="odd">
                <td class="orig-table" style="text-align: center;">WeatherOntology</td>
                <td class="orig-table" style="text-align: center;">AirPollution, Irridance,</td>
              </tr>
              <tr class="even">
                <td class="orig-table" style="text-align: center;"></td>
                <td class="orig-table" style="text-align: center;">Precipitation</td>
              </tr>
              <tr class="odd">
                <td class="orig-table" style="text-align: center;">foaf</td>
                <td class="orig-table" style="text-align: center;">Person</td>
              </tr>
              <tr class="even">
                <td class="orig-table" style="text-align: center;">schema.org</td>
                <td class="orig-table" style="text-align: center;">Organization, Place,</td>
              </tr>
              <tr class="odd">
                <td class="orig-table" style="text-align: center;"></td>
                <td class="orig-table" style="text-align: center;">Event</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    <h2 id="visualization">Visualization</h2>
    <div style="width: 100%;margin: 0 auto">
            <iframe align="center" width="100%" height="500px" src="./webvowl/index.html#file=combined.json"></iframe>
    </div>
"""

metadata_div = soup.find("div", {"id": "metadata"})
introduction_section = BeautifulSoup(str(introduction_text), "html.parser")
metadata_div.insert_before(introduction_section)

metadata_title = list(metadata_div.children)[1]
metadata_title.clear()

open("output.html","w+").write(str(soup))