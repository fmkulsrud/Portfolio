const projectID = 'zrhjodfw';

const query = `
*[_type =="project"]{
    title,
    slug,
    _id,
  }
`;

//Her lager vi en url variabel. kopier api link fra sanity.io. 
const url = `https://${projectID}.api.sanity.io/v2021-10-21/data/query/production?query=${query}`;

//vi må ha await fordi det tar så kort tid før data i console log dukker opp. Hvis vi ikke har await funksjon
//dukker det opp en feil
async function getData() {
    const response =await fetch(url)
    const data = await response.json();
    console.log(data);
}

getData();



