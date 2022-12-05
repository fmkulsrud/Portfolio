import handleHambuger from './menu.js';
import { readUrl } from './utils.js';
import { sanityUrl } from './env.js';
import {handleParagraphs} from './utils.js';

handleHambuger();
const urlString = readUrl();

//querystring for sanity

const queryAllProjects = `
*[_type =="project"]{
    title,
    slug,
    "bilde": heroimg.asset->url,
    _id,
    shortProjectPitch
  }
`;

const querySingleProject = `
  *[slug.current == "${urlString}"] {
    title,
    "cover":  heroimg.asset->url,
    projectPitch,
    shortProjectPitch,
    shortdescription,
    projectDetails,
    tools
  }
`;

// end of queries

async function getProject() {
    const response = await fetch(`${sanityUrl}${encodeURI(querySingleProject)}`);
    const { result } = await response.json();
    console.log(result);
    renderSingleProject(result);
}

function renderSingleProject (result) {
  const titleEl = document.querySelector('.single-project__title')
  console.log(titleEl)
  titleEl.textContent = result[0].title
  const coverProjectEl = document.querySelector('.project__cover');
  coverProjectEl.setAttribute('src', result[0].cover);


  handleParagraphs(result[0].shortdescription, 'briefContent');
  handleParagraphs(result[0].projectDetails, 'project_details');
  handleParagraphs(result[0].tools, 'toolIcons');

  


}

if (urlString !== undefined) {
  getProject();
}

// vi må ha await fordi det tar så kort tid før data i console log dukker opp. Hvis vi ikke har await funksjon
// dukker det opp en feil
async function getAllProjects() {
  const response =await fetch(`${sanityUrl}${encodeURI(queryAllProjects)}`);
  const {result}  = await response.json();

    renderProjectsList(result);
  }

  function renderProjectsList(result) {
      const projectsEl = document.querySelector('.projects-wrapper');
    
      result.forEach(project => {
      const cardEl = document.createElement('a');
      cardEl.classList.add('card');
      cardEl.setAttribute('href', `/projects/?${project.slug.current}`);
      const coverEl = document.createElement('img');
      coverEl.setAttribute('src', project.bilde)
      cardEl.append(coverEl);

      const contentEl = document.createElement('div');
      contentEl.classList.add('card--content');

      const h3El = document.createElement('h3');
      h3El.textContent = project.title;
      contentEl.append(h3El);

      const pEl = document.createElement('p');
      pEl.textContent = project.ProjectPitch;
      contentEl.append(pEl);

      const buttonEl = document.createElement('button');
      buttonEl.classList.add('button--read');

      const spanEl = document.createElement('span');
      spanEl.textContent = project.text;
      buttonEl.append(spanEl);

      const imageEl = document.createElement('img');
      imageEl.setAttribute('src', './assets/arrow_b.svg')
      buttonEl.innerText = 'Read more'
      buttonEl.append(imageEl)
      contentEl.append(buttonEl)
      cardEl.append(contentEl);
      projectsEl.append(cardEl);
      
      })
  }

if (urlString === undefined) {
  getAllProjects();
}






