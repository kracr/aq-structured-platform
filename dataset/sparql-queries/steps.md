I did not make any changes to pyLODE script, rather I found editing the compiled html file to add more sections to be faster. I have a separate HTML file where I have all the changes/additions saved. In case of updating ontology source code, the changes can be merged easily.

Steps for webvowl to work with some pre-loaded data - 
1. Used https://github.com/VisualDataWeb/OWL2VOWL to generate json for combined ontology in turtle format.
2. Webvowl provides a route to load an ontology from its cache using {URL}#file=filename, which loads the ontology in filename but it has to be loaded in cache already (by using GUI), to bypass this step, Overridden the function loadingModule.from_FileUpload that loads ontology file and create an if block and load ontology from local source if it matches with your ontology.
I won't be surprised if there is an easy/intentional way to do this, but its not documented on their page.

One more thing, are we having a meeting today, or in the future. If not, can we remove the recurring meeting now and plan one when we need it.

