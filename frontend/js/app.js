const projectID = 'zrhjodfw';

const query = `
*[_type =="project"]{
    title,
    slug,
    "bilde": cover.asset->url,
    _id,
  }
`;

//Her lager vi en url variabel. kopier api link fra sanity.io. 
const url = `https://${projectID}.api.sanity.io/v2021-10-21/data/query/production?query=${query}`;

//vi må ha await fordi det tar så kort tid før data i console log dukker opp. Hvis vi ikke har await funksjon
//dukker det opp en feil
async function getData() {
    const response =await fetch(url)
    const {result}  = await response.json();
    console.log(result);

    const projectList = document.getElementById('project-list');
    console.log(projectList)
    const ulList = document.createElement('ul');
    console.log(ulList)

    result.forEach(project => {
        const liEl = document.createElement('li');
        liEl.textContent = project.title;
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', project.bilde);
        imgEl.setAttribute('width', '200');
        liEl.append(imgEl);
        ulList.append(liEl);
    });

  projectList.append(ulList);
}


getData();



