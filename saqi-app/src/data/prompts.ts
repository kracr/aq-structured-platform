export const data = {
    'AQIFaqs': {
        "WhatAQI": {
            "name": "WhatAQI",
            "question": "What is AQI?",
            "question_Hin": "AQI क्या है?",
            "answer": "The air quality index (AQI) is an index for reporting air quality on a daily basis. It is a measure of how air pollution affects one's health witHin a short time period. The purpose of the AQI is to help people know how the local air quality impacts their health. The higher the AQI value, the greater the level of air pollution and the greater the health concerns. The concept of AQI has been widely used in many developed countries for over the last three decades. AQI quickly disseminates air quality information in real-time.",
            "answer_Hin": "वायु गुणवत्ता सूचकांक (AQI) दैनिक आधार पर वायु गुणवत्ता की रिपोर्ट करने के लिए एक सूचकांक है। यह इस बात का पैमाना है कि वायु प्रदूषण कम समय में किसी के स्वास्थ्य को कैसे प्रभावित करता है। AQI का उद्देश्य लोगों को यह जानने में मदद करना है कि स्थानीय वायु गुणवत्ता उनके स्वास्थ्य को कैसे प्रभावित करती है। एक्यूआई मान जितना अधिक होगा, वायु प्रदूषण का स्तर उतना ही अधिक होगा और स्वास्थ्य संबंधी चिंताएं भी उतनी ही अधिक होंगी। पिछले तीन दशकों में कई विकसित देशों में AQI की अवधारणा का व्यापक रूप से उपयोग किया गया है। AQI वास्तविक समय में वायु गुणवत्ता की जानकारी को तुरंत प्रसारित करता है।",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'WhatAirPollution',
                'HowToReadAQI'
            ]
        },
        "HowToUseApp": {
            "name": "HowToUseApp",
            "question": "Know how to use this app?",
            "question_Hin": "जानिए  इस ऐप को कैसे इस्तेमाल करें?",
            "answer": "Click show me more to get discover new prompts and know more about the AQI in your area.",
            "answer_Hin": "नए तथ्य खोजने के लिए \"और दिखाइए\" पर क्लिक करें",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'WhatAQI',
                'WhatAirPollution'
            ]
        },
        // https://www.environmentalpollutioncenters.org/air/
        "WhatAirPollution": {
            "name": "WhatAirPollution",
            "question": "What is air pollution?",
            "question_Hin": "वायु प्रदूषण क्या है?",
            "answer": "Air pollution is contamination of the indoor or outdoor environment by any chemical, physical or biological agent that modifies the natural characteristics of the atmosphere. Household combustion devices, motor vehicles, industrial facilities and forest fires are common sources of air pollution. Pollutants of major public health concern include particulate matter, carbon monoxide, ozone, nitrogen dioxide and sulfur dioxide. Outdoor and indoor air pollution cause respiratory and other diseases, which can be fatal.",
            "answer_Hin": "वायु प्रदूषण किसी भी रासायनिक, भौतिक या जैविक एजेंट द्वारा इनडोर या बाहरी वातावरण का संदूषण (कंटैमिनेशन) है जो वातावरण की प्राकृतिक विशेषताओं को संशोधित करता है। घरेलू दहन उपकरण, मोटर वाहन, औद्योगिक सुविधाएं और जंगल की आग वायु प्रदूषण के सामान्य स्रोत हैं। प्रमुख सार्वजनिक स्वास्थ्य चिंता के प्रदूषकों में पार्टिकुलेट मैटर, कार्बन मोनोऑक्साइड, ओजोन, नाइट्रोजन डाइऑक्साइड और सल्फर डाइऑक्साइड शामिल हैं। बाहरी और इनडोर वायु प्रदूषण श्वसन और अन्य बीमारियों का कारण बनता है, जो घातक हो सकता है।",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'WhatSourcesGeneral',
                'IsPollutionIndoors'
            ]
        },
        // https://aqicn.org/faq/2015-05-15/india-national-air-quality-index/
        "HowToReadAQI": {
            "name": "HowToReadAQI",
            "question": "How to understand AQI measurement?",
            "question_Hin": "एक्यूआई (AQI) माप को कैसे समझें?",
            "answer": "AQI is a number which is different for each place. <br/> The higher the AQI value, the greater the level of air pollution and the greater the health concern <br/> <ul> <li>0-50 : Good</li> <li>0-50 : Satisfactory</li> <li>100-200 : Moderate</li> <li>200-300 : Poor</li> <li>300-400 : Very Poor</li> <li>400-500 : Severe</li> </ul>",
            "answer_Hin": "AQI एक संख्या है जो हर जगह के लिए अलग होती है। <br/> AQI मान जितना अधिक होगा, वायु प्रदूषण का स्तर उतना ही अधिक होगा और स्वास्थ्य पर नुकसान उतना ही अधिक होगी  <br/> <ul> <li>0-50 : अच्छा</li> <li>0-50 : संतोषजनक</li> <li>100-200 : मध्यम</li> <li>200-300 : घटिया</li> <li>300-400 : बहुत खराब</li> <li>400-500 : गंभीर</li> </ul>",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'HealthRisks',
                'WhatSourcesGeneral'
            ]
        },
        "WhatSourcesGeneral": {
            "name": "WhatSourcesGeneral",
            "question": "What causes the pollution in general?",
            "question_Hin": "सामान्य रूप से प्रदूषण का क्या कारण है?",
            "answer": "Household combustion devices, motor vehicles, industrial facilities, crop and waste burning and forest fires are common sources of air pollution.",
            "answer_Hin": "घरेलू दहन उपकरण जैसे चुहला, मोटर वाहन, औद्योगिक फ़ैक्टरी, फसल और कूड़ा जलना और जंगल की आग वायु प्रदूषण के सामान्य स्रोत हैं।",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'WhatArePolluters',
            ]
        },
        "WhatSourcesSpatial": {
            "name": "WhatSourcesSpatial",
            "question": "What are the sources of pollution in your locality?",
            "question_Hin": "आपके इलाके में प्रदूषण के स्रोत क्या हैं?",
            "answer": "Vehicular traffic, waste burning, wood burning, industrial emmisions.",
            "answer_Hin": "वाहनों का आवागमन, कचरा जलाना, लकड़ी जलाना, औद्योगिक उत्सर्जन.",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'WhatArePolluters',
            ]
        },
        // https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health
        "WhatArePolluters": {
            "name": "WhatArePolluters",
            "question": "What are these particulate matter and polluting gases?",
            "question_Hin": "ये पार्टिकुलेट मैटर और प्रदूषणकारी गैसें कौन सी हैं?",
            "answer": "Particulat matter consists of substances suspended in the air with a diameter of 10 microns or less, (≤ PM10) they can penetrate and lodge deep inside the lungs, the even more health-damaging particles are those with a diameter of 2.5 microns or less, (≤ PM2.5). PM2.5  can penetrate the lung barrier and enter the blood system. Chronic exposure to particles contributes to the risk of developing cardiovascular and respiratory diseases, as well as of lung cancer.",
            "answer_Hin": "पार्टिकुलेट मैटर 10 (PM 10) हवा में 10 माइक्रोन या उससे कम व्यास वाले पदार्थ होते हैं, वे फेफड़ों के अंदर गहराई तक प्रवेश कर सकते हैं और इससे भी अधिक स्वास्थ्य-हानिकारक कण 2.5 माइक्रोन (PM 2.5) या उससे कम व्यास वाले होते हैं। PM2.5 फेफड़ों की बाधा में प्रवेश कर सकता है और रक्त प्रणाली में प्रवेश कर सकता है। इन कणों के लगातार संपर्क से हृदय और श्वसन संबंधी बीमारियों के साथ-साथ फेफड़ों के कैंसर के विकास के संभावना हो पैदा सकती है।",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'WhatArePollutingGases'
            ]
        },
        "WhatArePollutingGases": {
            "name": "WhatArePollutingGases",
            "question": "What are the different polluting gases in the air?",
            "question_Hin": "वायु में विभिन्न प्रदूषणकारी गैसें कौन-सी हैं?",
            "answer": "Ozone (O3), Nitrogen Dioxide (NO2) and Sulphur Dioxide (SO2) are some of the primary pollutant gases in the air.",
            "answer_Hin": "ओजोन (O3), नाइट्रोजन डाइऑक्साइड (NO2) और सल्फर डाइऑक्साइड (SO2) हवा में मौजूद कुछ प्राथमिक प्रदूषक गैसें हैं।",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'WhatOzone',
                'WhatNO2',
                'WhatSO2'
            ]
        },
        // https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health
        "WhatOzone": {
            "name": "WhatOzone",
            "question": "What is ozone?",
            "question_Hin": "Ozone (O3) क्या है??",
            "answer": "Ozone at ground level is one of the major constituents of photochemical smog. It is formed by the reaction with sunlight of pollutants such as nitrogen oxides from vehicle and industry emissions. As a result, the highest levels of ozone pollution occur during periods of sunny weather. Excessive ozone in the air can have a marked effect on human health. It can cause breatHing problems, trigger asthma, reduce lung function and cause lung diseases.",
            "answer_Hin": "जमीनी स्तर पर ओजोन फोटोकैमिकल स्मॉग का एक प्रमुख हिस्सा है। यह वाहन और उद्योग उत्सर्जन से नाइट्रोजन ऑक्साइड जैसे प्रदूषकों के सूर्य के प्रकाश की प्रतिक्रिया से बनता है। नतीजतन, ओजोन प्रदूषण का उच्चतम स्तर धूप के मौसम में होता है। हवा में अत्यधिक ओजोन मानव स्वास्थ्य पर एक उल्लेखनीय प्रभाव डाल सकता है। यह सांस लेने में समस्या पैदा कर सकता है, अस्थमा को ट्रिगर कर सकता है, फेफड़ों के कार्य को कम कर सकता है और फेफड़ों की बीमारियों का कारण बन सकता है।",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'IsPollutionIndoors',
                'WhatIndoorPollution',
                'WhatSO2',
                'WhatNO2'
            ]
        },
        // https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health
        "WhatNO2": {
            "name": "WhatNO2",
            "question": "What is Nitrogen Dioxide (NO2)",
            "question_Hin": "नाइट्रोजन डाइऑक्साइड (NO2) क्या है?",
            "answer": "NO2 contributes to generation of nitrate aerosol which results in Particulate Matter and it combines with sunlight to form ozone. NO2 is are emitted from combustion process in vehicle Engines and heating devices. Exposure to NO2 causes symptoms of bronchitis in asthmatic children and reduced lung function growth.",
            "answer_Hin": "NO2 नाइट्रेट एरोसोल के उत्पादन में योगदान देता है जिसके परिणामस्वरूप पार्टिकुलेट मैटर उत्त्पन्न होता है और यह सूर्य के प्रकाश के साथ मिलकर ओजोन भी बनाता है। NO2 वाहन के इंजन और हीटिंग उपकरणों में दहन प्रक्रिया से उत्सर्जित होता है। NO2 के संपर्क में आने से दमा के रोगी (ashtma) बच्चों में ब्रोंकाइटिस के लक्षण पैदा होते हैं और फेफड़ों की कार्यक्षमता कम हो जाती है।",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'IsPollutionIndoors',
                'WhatIndoorPollution',
                'WhatSO2',
                'WhatOzone'
            ]
        },
        // https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health
        "WhatSO2": {
            "name": "WhatSO2",
            "question": "What is Sulphur Dioxide (SO2)",
            "question_Hin": "सल्फर डाइऑक्साइड (SO2) क्या है?",
            "answer": "SO2 is a colourless gas with a sharp odour. It is produced from the burning of sulfur-containing fossil fuels for domestic heating, power generation and motor vehicles. SO2 can affect the respiratory system and the functions of the lungs, and causes irritation of the eyes. Inflammation of the respiratory tract causes cougHing, mucus secretion, aggravation of asthma and chronic bronchitis and makes people more prone to infections of the respiratory tract.",
            "answer_Hin": "SO2 एक तीखी गंध वाली रंगहीन गैस है। यह घरेलू हीटिंग, बिजली उत्पादन और मोटर वाहनों से उत्पन्न होता है। SO2 श्वसन प्रणाली (respiratory system) और फेफड़ों के कार्यों को प्रभावित कर सकता है और आंखों में जलन पैदा कर सकता है। श्वसन पथ की सूजन के कारण खांसी, बलगम स्राव, अस्थमा और क्रोनिक ब्रोन्काइटिस की वृद्धि होती है और लोगों को श्वसन पथ के संक्रमण का खतरा अधिक होता है।",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'IsPollutionIndoors',
                'WhatIndoorPollution',
                'WhatNO2',
                'WhatOzone'
            ]
        },
        // https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4311076/
        "IsPollutionIndoors": {
            "name": "IsPollutionIndoors",
            "question": "Does being indoor prevent exposure to air pollution?",
            "question_Hin": "क्या घर के अंदर रहने से वायु प्रदूषण से बचा जा सकता है?",
            "answer": "Indoor pollution increases with outdoor pollution because of outdoor pollution infiltrating indoors through doors and windows, however spending time indoors generally reduces exposure to ambient air pollutants. Indoor pollution may also come from indoor source, in that case it is advised to have proper ventillation to disperse the pollutants.",
            "answer_Hin": "घर के अंदर का प्रदूषण बाहरी प्रदूषण के साथ बढ़ता है क्योंकि बाहरी प्रदूषण दरवाजे और खिड़कियों के माध्यम से घर के अंदर घुस जाता है, हालांकि घर के अंदर समय बिताने से आम तौर पर परिवेशी वायु प्रदूषकों के संपर्क में कमी आती है। इनडोर प्रदूषण भी इनडोर स्रोत से आ सकता है, उस स्थिति में प्रदूषकों को फैलाने के लिए उचित वेंटिलेशन की सलाह दी जाती है।",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'WhenToGoOutside',
                'WhatIndoorPollution'
            ]
        },
        // https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4311076/
        "WhatIndoorPollution": {
            "name": "WhatIndoorPollution",
            "question": "What causes Indoor pollution?",
            "question_Hin": "इनडोर प्रदूषण के कारण क्या हैं?",
            "answer": "Indoor pollution is primarily caused by using solid fuels such as wood, crop waste, charcoal, dung and kerosene in open fires. These fuels are inefficiently burnt, causing soot particles to enter the lungs. These particles are more dangerous than any outside sources and lead to lung diseases and deaths.",
            "answer_Hin": "इनडोर प्रदूषण मुख्य रूप से लकड़ी, फसल के कचरे, लकड़ी का कोयला, गोबर और मिट्टी के तेल जैसे ठोस ईंधन का उपयोग खुली आग में करने के कारण होता है। ये ईंधन अक्षम रूप से जलाए जाते हैं, जिससे कालिख के कण फेफड़ों में प्रवेश कर जाते हैं। ये कण किसी भी बाहरी स्रोत से ज्यादा खतरनाक होते हैं और फेफड़ों की बीमारियों और मौतों का कारण बनते हैं।",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'WhenToGoOutside',
                'HealthRisks'
            ]
        },
        "WhenToGoOutside": {
            "name": "WhenToGoOutside",
            "question": "What is the best time to go outside for outdoor activities?",
            "question_Hin": "बाहरी गतिविधियों के लिए बाहर जाने का सबसे अच्छा समय क्या है?",
            "answer": "Generally, pollution levels are high during the evenings and early mornings. Avoid going outside at early mornings near 5 to 8 AM for walk, rather, go after the sun has risen up at 11 AM to 2 PM, when pollution levels are nearly 50% lower compared to evenings and morning. Always check the AQI levels either through this app or the AQI india app before heading out.",
            "answer_Hin": "आमतौर पर शाम और सुबह के समय प्रदूषण का स्तर अधिक होता है। सुबह 5 से 8 बजे के आसपास टहलने के लिए बाहर जाने से बचें, बल्कि सुबह 11 बजे से दोपहर 2 बजे तक सूरज उगने के बाद जाएं, जब शाम और सुबह की तुलना में प्रदूषण का स्तर लगभग 50% कम होता है। बाहर जाने से पहले हमेशा इस ऐप या AQI India ऐप के माध्यम से AQI स्तर देखें।",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'WhenToGoOutside',
                'WhatIndoorPollution'
            ]
        },
        // http://berkeleyearth.org/air-pollution-and-cigarette-equivalence/
        // https://www.who.int/news-room/fact-sheets/detail/household-air-pollution-and-health
        "HealthRisks": {
            "name": "HealthRisks",
            "question": "What are the health risks of air pollution?",
            "question_Hin": "वायु प्रदूषण के स्वास्थ्य जोखिम क्या हैं?",
            "answer": "According to research by Berkeley Earth, Exposure to 22 micrograms of PM 2.5 is equivalent to smoking 1 cigarette a day. During the worst days, delhi reaches 300-400 micrograms of PM 2.5 levels, which is same as smoking 13 to 18 cigarettes. Pollution damages our lungs and causes early deaths, especially in poor households using domestic fuels for cooking. These deaths are caused by penumonia, ischaemic heart diseases, lung cancer and pulmonary diseases.",
            "answer_Hin": "बर्कले अर्थ के शोध के अनुसार, हवा में 22 माइक्रोग्राम PM 2.5 का होना एक दिन में 1 सिगरेट पीने के बराबर है। प्रदुषण के सबसे खराब दिनों में, दिल्ली 300-400 माइक्रोग्राम पीएम 2.5 के स्तर तक पहुंच जाती है, जो कि एक दिन में 13 से 18 सिगरेट पीने के बराबर है। प्रदूषण हमारे फेफड़ों को नुकसान पहुंचाता है और जल्दी मौत का कारण बनता है, खासकर गरीब घरों में खाना पकाने के लिए घरेलू ईंधन का उपयोग करते हुए। ये मौतें पेनुमोनिया, इस्केमिक हृदय रोग, फेफड़ों के कैंसर और फुफ्फुसीय रोगों के कारण होती हैं।",
            weights: [
                {
                    type: 'spatial',
                    key: 'ShaheenBagh',
                    value: '2'
                }
            ],
            gotoLinks: [
                'IsPollutionIndoors',
            ]
        },
    },
    // Use placeholders for location e.g.   "_location"
    'AQINearMe':
    {
        "name": "AQINearMe",
        "question": "What is the AQI near me?",
        "question_Hin": "मेरे घर के पास एक्यूआई क्या है?",
        "type": "AQINearMe",
        "sparql_query": "query",
        "endpoint": "url"
    },
    'PlayInteractiveQuiz':
        [
            {
                "name": "WhatAQI",
                "question": "What is AQI?",
                "question_Hin": "AQI क्या है?",
                "options": ['a', 'b', 'c', 'd'],
                "options_Hin": ['a', 'b', 'c', 'd'],
                "answer": 0
            }
        ],
    // Use placeholders for location e.g. "_location"
    'PollutionSourcesNearMe':
    {
        "sparql_query": "query",
        "endpoint": "url"
    },
    // View AQI Readings
    'ViewAQIReadings':
    {
        "sparql_query": "query",
        "endpoint": "url"
    },
    // View AQI Readings
    'LocalPerceptionNearMe':
    {
        "sparql_query": "query",
        "endpoint": "url"
    },
    // View AQI Readings
    'recommendation':
    {
        "question": "What should I do?",
        "question_Hin": "मुझे क्या करना चाहिए?",
        "name": "recommendation",
        "type": "recommendation",
        "answer": "Visit office nearby",
        "answer_Hin": "visit office nearby",
        "special_jump": {
            "type": "LocalPerceptionNearMe",
            "name": "councillor's office list"
        }
    }
}
export type biString = {
    Hin: string;
    Eng: string;
}
export type Prompt = {
    id: string;
    title: biString;
    description: biString;
    url: string;
};

export const faq_prompt_data: Prompt[] = [
    {
        id: "WhatAQI",
        title: { Eng: "What is AQI?", Hin: "AQI क्या है?" },
        description: {
            Eng: "The air quality index (AQI) is an index for reporting air quality on a daily basis. It is a measure of how air pollution affects one's health witHin a short time period. The purpose of the AQI is to help people know how the local air quality impacts their health. The higher the AQI value, the greater the level of air pollution and the greater the health concerns. The concept of AQI has been widely used in many developed countries for over the last three decades. AQI quickly disseminates air quality information in real-time.",
            Hin: "वायु गुणवत्ता सूचकांक (AQI) दैनिक आधार पर वायु गुणवत्ता की रिपोर्ट करने के लिए एक सूचकांक है। यह इस बात का पैमाना है कि वायु प्रदूषण कम समय में किसी के स्वास्थ्य को कैसे प्रभावित करता है। AQI का उद्देश्य लोगों को यह जानने में मदद करना है कि स्थानीय वायु गुणवत्ता उनके स्वास्थ्य को कैसे प्रभावित करती है। एक्यूआई मान जितना अधिक होगा, वायु प्रदूषण का स्तर उतना ही अधिक होगा और स्वास्थ्य संबंधी चिंताएं भी उतनी ही अधिक होंगी। पिछले तीन दशकों में कई विकसित देशों में AQI की अवधारणा का व्यापक रूप से उपयोग किया गया है। AQI वास्तविक समय में वायु गुणवत्ता की जानकारी को तुरंत प्रसारित करता है।"
        },
        url: "/prompt/faq/WhatAQI"
    },
    {
        id: "HowToUseApp",
        title: { Eng: "Know how to use this app?", Hin: "जानिए  इस ऐप को कैसे इस्तेमाल करें?" },
        description: {
            Eng: "Click show me more to get discover new prompts and know more about the AQI in your area.",
            Hin: "नए तथ्य खोजने के लिए \"और दिखाइए\" पर क्लिक करें"
        },
        url: "/prompt/faq/HowToUseApp"
    },
    {
        id: "WhatAirPollution",
        title: { Eng: "What is air pollution?", Hin: "वायु प्रदूषण क्या है?" },
        description: {
            Eng: "Air pollution is contamination of the indoor or outdoor environment by any chemical, physical or biological agent that modifies the natural characteristics of the atmosphere. Household combustion devices, motor vehicles, industrial facilities and forest fires are common sources of air pollution. Pollutants of major public health concern include particulate matter, carbon monoxide, ozone, nitrogen dioxide and sulfur dioxide. Outdoor and indoor air pollution cause respiratory and other diseases, which can be fatal.",
            Hin: "वायु प्रदूषण किसी भी रासायनिक, भौतिक या जैविक एजेंट द्वारा इनडोर या बाहरी वातावरण का संदूषण (कंटैमिनेशन) है जो वातावरण की प्राकृतिक विशेषताओं को संशोधित करता है। घरेलू दहन उपकरण, मोटर वाहन, औद्योगिक सुविधाएं और जंगल की आग वायु प्रदूषण के सामान्य स्रोत हैं। प्रमुख सार्वजनिक स्वास्थ्य चिंता के प्रदूषकों में पार्टिकुलेट मैटर, कार्बन मोनोऑक्साइड, ओजोन, नाइट्रोजन डाइऑक्साइड और सल्फर डाइऑक्साइड शामिल हैं। बाहरी और इनडोर वायु प्रदूषण श्वसन और अन्य बीमारियों का कारण बनता है, जो घातक हो सकता है।"
        },
        url: "/prompt/faq/WhatAirPollution"
    },
    {
        id: "HowToReadAQI",
        title: { Eng: "How to understand AQI measurement?", Hin: "एक्यूआई (AQI) माप को कैसे समझें?" },
        description: {
            Eng: "AQI is a number which is different for each place. <br/> The higher the AQI value, the greater the level of air pollution and the greater the health concern <br/> <ul> <li>0-50 : Good</li> <li>0-50 : Satisfactory</li> <li>100-200 : Moderate</li> <li>200-300 : Poor</li> <li>300-400 : Very Poor</li> <li>400-500 : Severe</li> </ul>",
            Hin: "AQI एक संख्या है जो हर जगह के लिए अलग होती है। <br/> AQI मान जितना अधिक होगा, वायु प्रदूषण का स्तर उतना ही अधिक होगा और स्वास्थ्य पर नुकसान उतना ही अधिक होगी  <br/> <ul> <li>0-50 : अच्छा</li> <li>0-50 : संतोषजनक</li> <li>100-200 : मध्यम</li> <li>200-300 : घटिया</li> <li>300-400 : बहुत खराब</li> <li>400-500 : गंभीर</li> </ul>"
        },
        url: "/prompt/faq/HowToReadAQI"
    },
    {
        id: "WhatSourcesGeneral",
        title: { Eng: "What causes the pollution in general?", Hin: "सामान्य रूप से प्रदूषण का क्या कारण है?" },
        description: {
            Eng: "Household combustion devices, motor vehicles, industrial facilities, crop and waste burning and forest fires are common sources of air pollution.",
            Hin: "घरेलू दहन उपकरण जैसे चुहला, मोटर वाहन, औद्योगिक फ़ैक्टरी, फसल और कूड़ा जलना और जंगल की आग वायु प्रदूषण के सामान्य स्रोत हैं।"
        },
        url: "/prompt/faq/WhatSourcesGeneral"
    },
    {
        id: "WhatArePolluters",
        title: { Eng: "What are these particulate matter and polluting gases?", Hin: "ये पार्टिकुलेट मैटर और प्रदूषणकारी गैसें कौन सी हैं?" },
        description: {
            Eng: "Particulat matter consists of substances suspended in the air with a diameter of 10 microns or less, (≤ PM10) they can penetrate and lodge deep inside the lungs, the even more health-damaging particles are those with a diameter of 2.5 microns or less, (≤ PM2.5). PM2.5  can penetrate the lung barrier and enter the blood system. Chronic exposure to particles contributes to the risk of developing cardiovascular and respiratory diseases, as well as of lung cancer.",
            Hin: "पार्टिकुलेट मैटर 10 (PM 10) हवा में 10 माइक्रोन या उससे कम व्यास वाले पदार्थ होते हैं, वे फेफड़ों के अंदर गहराई तक प्रवेश कर सकते हैं और इससे भी अधिक स्वास्थ्य-हानिकारक कण 2.5 माइक्रोन (PM 2.5) या उससे कम व्यास वाले होते हैं। PM2.5 फेफड़ों की बाधा में प्रवेश कर सकता है और रक्त प्रणाली में प्रवेश कर सकता है। इन कणों के लगातार संपर्क से हृदय और श्वसन संबंधी बीमारियों के साथ-साथ फेफड़ों के कैंसर के विकास के संभावना हो पैदा सकती है।"
        },
        url: "/prompt/faq/WhatArePolluters"
    },
    {
        id: "WhatArePollutingGases",
        title: { Eng: "What are the different polluting gases in the air?", Hin: "वायु में विभिन्न प्रदूषणकारी गैसें कौन-सी हैं?" },
        description: {
            Eng: "Ozone (O3), Nitrogen Dioxide (NO2) and Sulphur Dioxide (SO2) are some of the primary pollutant gases in the air.",
            Hin: "ओजोन (O3), नाइट्रोजन डाइऑक्साइड (NO2) और सल्फर डाइऑक्साइड (SO2) हवा में मौजूद कुछ प्राथमिक प्रदूषक गैसें हैं।"
        },
        url: "/prompt/faq/WhatArePollutingGases"
    },
    {
        id: "WhatOzone",
        title: { Eng: "What is ozone?", Hin: "Ozone (O3) क्या है?" },
        description: {
            Eng: "Ozone at ground level is one of the major constituents of photochemical smog. It is formed by the reaction with sunlight of pollutants such as nitrogen oxides from vehicle and industry emissions. As a result, the highest levels of ozone pollution occur during periods of sunny weather. Excessive ozone in the air can have a marked effect on human health. It can cause breathing problems, trigger asthma, reduce lung function and cause lung diseases.",
            Hin: "ओजोन फोटोकैमिकल स्मॉग के प्रमुख घटकों में से एक है। यह वाहन और उद्योग के उत्सर्जन से नाइट्रोजन ऑक्साइड जैसे प्रदूषकों की सूर्य के प्रकाश के साथ प्रतिक्रिया से बनता है। नतीजतन, ओजोन प्रदूषण का उच्चतम स्तर धूप वाले मौसम की अवधि के दौरान होता है। हवा में अत्यधिक ओजोन का मानव स्वास्थ्य पर गहरा प्रभाव पड़ सकता है। यह सांस लेने की समस्या पैदा कर सकता है, अस्थमा को ट्रिगर कर सकता है, फेफड़ों के कार्य को कम कर सकता है और फेफड़ों के रोग पैदा कर सकता है।"
        },
        url: "/prompt/faq/WhatOzone"
    },
    {
        id: "WhatNO2",
        title: { Eng: "What is Nitrogen Dioxide (NO2)", Hin: "नाइट्रोजन डाइऑक्साइड (NO2) क्या है?" },
        description: {
            Eng: "NO2 contributes to generation of nitrate aerosol which results in Particulate Matter and it combines with sunlight to form ozone. NO2 is are emitted from combustion process in vehicle engines and heating devices. Exposure to NO2 causes symptoms of bronchitis in asthmatic children and reduced lung function growth.",
            Hin: "NO2 नाइट्रेट एरोसोल के उत्पादन में योगदान देता है जिसके परिणामस्वरूप पार्टिकुलेट मैटर उत्त्पन्न होता है और यह सूर्य के प्रकाश के साथ मिलकर ओजोन भी बनाता है। NO2 वाहन के इंजन और हीटिंग उपकरणों में दहन प्रक्रिया से उत्सर्जित होता है। NO2 के संपर्क में आने से दमा के रोगी (ashtma) बच्चों में ब्रोंकाइटिस के लक्षण पैदा होते हैं और फेफड़ों की कार्यक्षमता कम हो जाती है।"
        },
        url: "/prompt/faq/WhatNO2"
    },
    {
        id: "WhatSO2",
        title: { Eng: "What is Sulphur Dioxide (SO2)", Hin: "सल्फर डाइऑक्साइड (SO2) क्या है?" },
        description: {
            Eng: "SO2 is a colourless gas with a sharp odour. It is produced from the burning of sulfur-containing fossil fuels for domestic heating, power generation and motor vehicles. SO2 can affect the respiratory system and the functions of the lungs, and causes irritation of the eyes. Inflammation of the respiratory tract causes coughing, mucus secretion, aggravation of asthma and chronic bronchitis and makes people more prone to infections of the respiratory tract.",
            Hin: "SO2 एक तीखी गंध वाली रंगहीन गैस है। यह घरेलू हीटिंग, बिजली उत्पादन और मोटर वाहनों से उत्पन्न होता है। SO2 श्वसन प्रणाली (respiratory system) और फेफड़ों के कार्यों को प्रभावित कर सकता है और आंखों में जलन पैदा कर सकता है। श्वसन पथ की सूजन के कारण खांसी, बलगम स्राव, अस्थमा और क्रोनिक ब्रोन्काइटिस की वृद्धि होती है और लोगों को श्वसन पथ के संक्रमण का खतरा अधिक होता है।"
        },
        url: "/prompt/faq/WhatSO2"
    },
    {
        id: "IsPollutionIndoors",
        title: { Eng: "Does being indoor prevent exposure to air pollution?", Hin: "क्या घर के अंदर रहने से वायु प्रदूषण से बचा जा सकता है?" },
        description: {
            Eng: "Indoor pollution increases with outdoor pollution because of outdoor pollution infiltrating indoors through doors and windows, however spending time indoors generally reduces exposure to ambient air pollutants. Indoor pollution may also come from indoor source, in that case it is advised to have proper ventillation to disperse the pollutants.",
            Hin: "घर के अंदर का प्रदूषण बाहरी प्रदूषण के साथ बढ़ता है क्योंकि बाहरी प्रदूषण दरवाजे और खिड़कियों के माध्यम से घर के अंदर घुस जाता है, हालांकि घर के अंदर समय बिताने से आम तौर पर परिवेशी वायु प्रदूषकों के संपर्क में कमी आती है। इनडोर प्रदूषण भी इनडोर स्रोत से आ सकता है, उस स्थिति में प्रदूषकों को फैलाने के लिए उचित वेंटिलेशन की सलाह दी जाती है।"
        },
        url: "/prompt/faq/IsPollutionIndoors"
    },
    {
        id: "WhatIndoorPollution",
        title: { Eng: "What causes Indoor pollution?", Hin: "इनडोर प्रदूषण के कारण क्या हैं?" },
        description: {
            Eng: "Indoor pollution is primarily caused by using solid fuels such as wood, crop waste, charcoal, dung and kerosene in open fires. These fuels are inefficiently burnt, causing soot particles to enter the lungs. These particles are more dangerous than any outside sources and lead to lung diseases and deaths.",
            Hin: "इनडोर प्रदूषण मुख्य रूप से लकड़ी, फसल के कचरे, लकड़ी का कोयला, गोबर और मिट्टी के तेल जैसे ठोस ईंधन का उपयोग खुली आग में करने के कारण होता है। ये ईंधन अक्षम रूप से जलाए जाते हैं, जिससे कालिख के कण फेफड़ों में प्रवेश कर जाते हैं। ये कण किसी भी बाहरी स्रोत से ज्यादा खतरनाक होते हैं और फेफड़ों की बीमारियों और मौतों का कारण बनते हैं।"
        },
        url: "/prompt/faq/WhatIndoorPollution"
    },
    {
        id: "WhenToGoOutside",
        title: { Eng: "What is the best time to go outside for outdoor activities?", Hin: "बाहरी गतिविधियों के लिए बाहर जाने का सबसे अच्छा समय क्या है?" },
        description: {
            Eng: "Generally, pollution levels are high during the evenings and early mornings. Avoid going outside at early mornings near 5 to 8 AM for walk, rather, go after the sun has risen up at 11 AM to 2 PM, when pollution levels are nearly 50% lower compared to evenings and morning. Always check the AQI levels either through this app or the AQI india app before heading out.",
            Hin: "आमतौर पर शाम और सुबह के समय प्रदूषण का स्तर अधिक होता है। सुबह 5 से 8 बजे के आसपास टहलने के लिए बाहर जाने से बचें, बल्कि सुबह 11 बजे से दोपहर 2 बजे तक सूरज उगने के बाद जाएं, जब शाम और सुबह की तुलना में प्रदूषण का स्तर लगभग 50% कम होता है। बाहर जाने से पहले हमेशा इस ऐप या AQI India ऐप के माध्यम से AQI स्तर देखें।"
        },
        url: "/prompt/faq/WhenToGoOutside"
    },
    {
        id: "HealthRisks",
        title: { Eng: "What are the health risks of air pollution?", Hin: "वायु प्रदूषण के स्वास्थ्य जोखिम क्या हैं?" },
        description: {
            Eng: "According to research by Berkeley Earth, Exposure to 22 micrograms of PM 2.5 is equivalent to smoking 1 cigarette a day. During the worst days, delhi reaches 300-400 micrograms of PM 2.5 levels, which is same as smoking 13 to 18 cigarettes. Pollution damages our lungs and causes early deaths, especially in poor households using domestic fuels for cooking. These deaths are caused by penumonia, ischaemic heart diseases, lung cancer and pulmonary diseases.",
            Hin: "बर्कले अर्थ (Berkeley Earth) के शोध के अनुसार, हवा में 22 माइक्रोग्राम PM 2.5 का होना एक दिन में 1 सिगरेट पीने के बराबर है। प्रदुषण के सबसे खराब दिनों में, दिल्ली 300-400 माइक्रोग्राम पीएम 2.5 के स्तर तक पहुंच जाती है, जो कि एक दिन में 13 से 18 सिगरेट पीने के बराबर है। प्रदूषण हमारे फेफड़ों को नुकसान पहुंचाता है और जल्दी मौत का कारण बनता है, खासकर गरीब घरों में खाना पकाने के लिए घरेलू ईंधन का उपयोग करते हुए। ये मौतें पेनुमोनिया, इस्केमिक हृदय रोग, फेफड़ों के कैंसर और फुफ्फुसीय रोगों के कारण होती हैं।"
        },
        url: "/prompt/faq/HealthRisks"
    },
]
export const aqi_prompt_data: Prompt[] = [
    {
        id: "AQINearMe",
        title: { Eng: "What is the AQI near me?", Hin: "मेरे घर के पास एक्यूआई क्या है?" },
        description: {
            Eng: "Get pollution measure from your nighbourhood",
            Hin: "अपने आस-पड़ोस से प्रदूषण माप प्राप्त करें"
        },
        url: "/prompt/aqi/avg"
    },
    {
        id: "AQINearMe",
        title: { Eng: "Pollution variation by time of the day", Hin: "दिन के समय के अनुसार प्रदूषण कैसे बदलता है" },
        description: {
            Eng: "Get morning, afternoon and evening pollution levels in your neighborhood",
            Hin: "अपने आस-पड़ोस पर सुबह, दोपहर और शाम को प्रदूषण का स्तर प्राप्त करें"
        },
        url: "/prompt/aqi/day"
    }
]

export const sparql_prompt_data: Prompt[] = [
    {
        id: "PollutionSourcesNearMe",
        title: { Eng: "Pollution source", Hin: "प्रदूषण के स्रोत" },
        description: {
            Eng: "Learn about pollution sources from your nighbourhood",
            Hin: "अपने आस-पास के प्रदूषण स्रोतों के बारे में जानें"
        },
        url: "/prompt/sparql/PollutionSourcesNearMe"
    }
]

