//This file uses Cohere-AI's sentiment classification API to determine whether
//the speech 
async function sentiment(speech){
    require('dotenv').config();
    const cohere = require('cohere-ai');

    const api = process.env.COHERE_AI_KEY;
    const arrOfExamples = process.env.EXAMPLES.split(':');
    let examples = [];
    let features = {
        text : '',
        label : '',
    }
    for (let i = 0; i < arrOfExamples.length; i = i+ 2) {
        features.text = arrOfExamples[i];
        features.label = arrOfExamples[i+1];
        examples.push(features);
        features = {
            text : '',
            label : '',
        }
    }

    console.log(examples);
    cohere.init(api)

    const inputs = speech;

    const response = await cohere.classify({
        inputs: inputs,
        examples: examples,
    });

    for (let i = 0; i < inputs.length; i++) {
        if(response['body']['classifications'][i]['prediction'] == 'Crime' && response['body']['classifications'][i]['confidence'] < 0.6){
            response['body']['classifications'][i]['prediction'] = 'Non-Violent';
        }
    }
    return response;
}

input = [
    'quack quack quack',
    'Hey give me your wallet',
    'How is your day today',
]

sentiment(input).then(response => {
    console.log(response['body']['classifications']);
})