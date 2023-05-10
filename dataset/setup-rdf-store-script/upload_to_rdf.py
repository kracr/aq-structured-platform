import os
import pathlib
import subprocess
import shutil
import requests
import json
import sys
from urllib.parse import unquote

# This upload file assumes following directory structure to function -

# 1. mapping files eziostat.rml, questionnaire.rml and cpcb.yml in ./mapping dir

# 2. All static turtle files in static_turtle

# 3. local sensor data named by IRI of location in ./sensor_data

# 4. Single csv for questionnaire in ./questionnaire_data dir

# 5. CPCB csv data under ./cpcb_data, file name should be IRI 

RDF_STORE_URL = "http://localhost:3030/"
if len(sys.argv) > 1:
    RDF_STORE_URL = sys.argv[1]

base_dir = pathlib.Path(__file__).parent.resolve()
mapping_dir = base_dir / "mappings"

def create_temp_dir():
    temp_dir = base_dir / "tmp"
    if temp_dir.is_dir():
        shutil.rmtree(temp_dir)
    temp_dir.mkdir(parents=True, exist_ok=True)
    return temp_dir

def upload_static_rdf_data():
    static_turtle_path = base_dir / "static_turtle"

    turtle_files = [file for file in os.listdir(static_turtle_path)]
    for file in turtle_files:
        turtle_path = static_turtle_path / file
        with open(turtle_path) as f:
            turtle_data=f.read()
            headers = {
            "Content-Type": "text/turtle;charset=utf-8"
            }
            print("Sending turtle payload for file: ",file)
            response = requests.request("POST",f"{RDF_STORE_URL}aq-store/data?default",headers=headers, data=turtle_data.encode('utf-8'))
            
            response_json = json.loads(response.text)
            if(response_json is not None and response_json["count"]>0):
                print("Upload to RDF store is successful, Triples uploaded :",response_json["count"])
            else:
                raise Exception("Zero triples uploaded to graph")

def upload_saqi_sensors_data():
    temp_dir = create_temp_dir()
    sensor_data_path = base_dir / "sensor_data"
    sensor_csv_files = [os.path.splitext(file)[0] for file in os.listdir(sensor_data_path)]

    eziostat_map_file = mapping_dir / "eziostat.rml"
    for file in sensor_csv_files:
        original_file_path = sensor_data_path / f"{file}.csv"
        copied_file_path = temp_dir / f"{file}.csv"

        trimmed_csv = []
        with open(original_file_path) as f:
            original_data=[line.strip() for line in f.readlines()]
            for line_num in range(len(original_data)):
                if(line_num % 10==0):
                    trimmed_csv.append(original_data[line_num])

        with open(copied_file_path, "w") as f:
            f.write("\n".join(trimmed_csv))
        
        with open(eziostat_map_file) as f:
            mapping_text=f.read().replace('_locname',file)
            mapping_text=mapping_text.replace('_filename',str(copied_file_path))

        copied_map_file = temp_dir / f"map_{file}.rml"

        with open(copied_map_file, "w") as f:
            f.write(mapping_text)

        rdf_output_path = temp_dir/ f"map_{file}.turtle"

        print("Starting RML mapper for mapping :",copied_map_file,copied_file_path)
        java_mapper_path = base_dir / "rmlmapper-6.0.0-r363-all.jar"
        cmd = subprocess.Popen(["java","-jar",java_mapper_path,"-s","turtle","-m",copied_map_file,"-o",rdf_output_path], stdout=subprocess.PIPE)
        print(cmd.communicate()[0])

        print("RML Mapper completed :",copied_map_file,copied_file_path)


        rdf_store_url = 'http://localhost:3030/aq-store/data?default'

        with open(rdf_output_path) as f:
            turtle_data=f.read()
            headers = {
            "Content-Type": "text/turtle;charset=utf-8"
            }
            print("Sending turtle payload")
            response = requests.request("POST",f"{RDF_STORE_URL}aq-store/data?default",headers=headers, data=turtle_data)
            response_json = json.loads(response.text)
            print("Response from RDF store",response.text)
            if(response_json is not None and response_json["count"]>0):
                print("Upload to RDF store is successful, Triples uploaded :",response_json["count"])
            else:
                raise Exception("Zero triples uploaded to graph")


def upload_cpcb_sensors_data():
    temp_dir = create_temp_dir()
    cpcb_data_path = base_dir / "cpcb_data"
    cpcb_csv_files = [os.path.splitext(file)[0] for file in os.listdir(cpcb_data_path)]

    cpcb_map_file = mapping_dir / "cpcb.rml"

    for file in cpcb_csv_files:
        original_file_path = cpcb_data_path / f"{file}.csv"
        copied_file_path = temp_dir / f"{file}.csv"
        cmd = subprocess.Popen(["cp","-f",original_file_path,copied_file_path], stdout=subprocess.PIPE)
        print(cmd.communicate()[0])
        
        with open(cpcb_map_file) as f:
            mapping_text=f.read().replace('_locname',file)
            mapping_text=mapping_text.replace('_filename',str(copied_file_path))

        copied_map_file = temp_dir / f"map_{file}.rml"

        with open(copied_map_file, "w") as f:
            f.write(mapping_text)

        rdf_output_path = temp_dir/ f"map_{file}.turtle"

        print("Starting RML mapper for mapping :",copied_map_file,copied_file_path)
        java_mapper_path = base_dir / "rmlmapper-6.0.0-r363-all.jar"
        cmd = subprocess.Popen(["java","-jar",java_mapper_path,"-s","turtle","-m",copied_map_file,"-o",rdf_output_path], stdout=subprocess.PIPE)
        print(cmd.communicate()[0])

        print("RML Mapper completed :",copied_map_file,copied_file_path)


        with open(rdf_output_path) as f:
            turtle_data=f.read()
            headers = {
            "Content-Type": "text/turtle;charset=utf-8"
            }
            print("Sending turtle payload")
            response = requests.request("POST",f"{RDF_STORE_URL}aq-store/data?default",headers=headers, data=turtle_data)
            response_json = json.loads(response.text)
            print("Response from RDF store",response.text)
            if(response_json is not None and response_json["count"]>0):
                print("Upload to RDF store is successful, Triples uploaded :",response_json["count"])
            else:
                raise Exception("Zero triples uploaded to graph")


def upload_survey_data():
    temp_dir = create_temp_dir()
    cpcb_data_path = base_dir / "questionnaire_data"
    cpcb_csv_files = [os.path.splitext(file)[0] for file in os.listdir(cpcb_data_path)]

    cpcb_map_file = mapping_dir / "questionnaire.rml"

    for file in cpcb_csv_files:
        original_file_path = cpcb_data_path / f"{file}.csv"
        copied_file_path = temp_dir / f"{file}.csv"
        cmd = subprocess.Popen(["cp","-f",original_file_path,copied_file_path], stdout=subprocess.PIPE)
        print(cmd.communicate()[0])
        
        with open(cpcb_map_file) as f:
            mapping_text=f.read().replace('_locname',file)
            mapping_text=mapping_text.replace('_filename',str(copied_file_path))

        copied_map_file = temp_dir / f"map_{file}.rml"

        with open(copied_map_file, "w") as f:
            f.write(mapping_text)

        rdf_output_path = temp_dir/ f"map_{file}.turtle"

        print("Starting RML mapper for mapping :",copied_map_file,copied_file_path)
        java_mapper_path = base_dir / "rmlmapper-6.0.0-r363-all.jar"
        cmd = subprocess.Popen(["java","-jar",java_mapper_path,"-s","turtle","-m",copied_map_file,"-o",rdf_output_path], stdout=subprocess.PIPE)
        print(cmd.communicate()[0])

        print("RML Mapper completed :",copied_map_file,copied_file_path)


        with open(rdf_output_path) as f:
            turtle_data=f.read()
            headers = {
            "Content-Type": "text/turtle;charset=utf-8"
            }
            print("Sending turtle payload")
            response = requests.request("POST",f"{RDF_STORE_URL}aq-store/data?default",headers=headers, data=turtle_data.encode('utf-8'))
            response_json = json.loads(response.text)
            print("Response from RDF store",response.text)
            if(response_json is not None and response_json["count"]>0):
                print("Upload to RDF store is successful, Triples uploaded :",response_json["count"])
            else:
                raise Exception("Zero triples uploaded to graph")

# create_temp_dir()
upload_static_rdf_data()
upload_saqi_sensors_data()
upload_cpcb_sensors_data() 
upload_survey_data()