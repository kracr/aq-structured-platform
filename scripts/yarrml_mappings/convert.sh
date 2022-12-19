# npm i -g @rmlio/yarrrml-parser
rm ./mappings/eziostat.rml
yarrrml-parser -i ./yarrml_mappings/eziostat.yml -o ./mappings/eziostat.rml
rm ./mappings/cpcb.rml
yarrrml-parser -i ./yarrml_mappings/cpcb.yml -o ./mappings/cpcb.rml
rm ./mappings/questionnaire.rml
yarrrml-parser -i ./yarrml_mappings/questionnaire.yml -o ./mappings/questionnaire.rml