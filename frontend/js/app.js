import handleHambuger from './menu.js';
import { activeNavbar } from './navbar.js';
import { readUrl } from './utils.js';
import { aboutUrl, sanityUrl } from './env.js';
import {handleParagraphs} from './utils.js';

handleHambuger();
window.onload = function () {
  activeNavbar();
};
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
    subtext,
    details,
    "cover":  heroimg.asset->url,
    projectPitch,
    
    shortdescription,
    problem,
    goals,
    userReasearch,
    "researchimg": researchimg.asset->url,
    comeptitor,
    findings,
    "findingsimg": findingsGallery[].asset->url,
    "competitorimage": competitorimage[].asset->url,
    targetGroupsContainer,
    personas,
    "personasGallery": personasGallery[].asset->url,
    wireframeDescription,
    "wireframegallery": wireframegallery[].asset->url,
    styleContent,
    "styleguide": styleguide[].asset->url,
    icons,
    "iconsImg": iconsImg[].asset->url,
    hifiprototype,
    "hifiprototypeimg": hifiprototypeimg.asset->url,
    "hifigallery": hifigallery[].asset->url,
    discoverFigma,
    figmalink,
    reflection,
    moodboard

  }
`;

const queryAboutMe = `
  *[_type == "about"]{
    _id,
    age,
    bio[],
    slug,

  }
`;


// end of queries

async function getProject() {
    const response = await fetch(`${sanityUrl}${encodeURI(querySingleProject)}`);
    const { result } = await response.json();
    renderSingleProject(result);
}

function renderSingleProject (result) {
  const titleEl = document.querySelector('.single-project__title');
  titleEl.textContent = result[0].title
  const coverProjectEl = document.querySelector('.project__cover');
  coverProjectEl.setAttribute('src', result[0].cover);
  
  // const tilteDetails = document.querySelector('.project__details');
  // titleEl.textContent = result[0].details
  handleParagraphs(result[0].details, 'detailContent');

  handleParagraphs(result[0].shortdescription, 'briefContent');
  handleParagraphs(result[0].projectDetails, 'project_details');
  // plotTools(result[0].tools, 'toolIcons');
  handleParagraphs(result[0].problem, 'problemContent')
  handleParagraphs(result[0].userReasearch, 'userResearchContent');
  
  const researchImgEl = document.querySelector(".research-img");
  researchImgEl.setAttribute('src', result[0].researchimg);

  handleParagraphs(result[0].comeptitor, 'competitorAnalysisContent');
  handleImgGalleries(result[0].competitorimage, 'competitorGallery');

  handleParagraphs(result[0].findings, 'findingsContent');
  handleImgGalleries(result[0].findingsimg, 'findingsGallery');
  
  handleParagraphs(result[0].targetGroupsContainer, 'targetContent');
  handleParagraphs(result[0].personas, 'personaContent');
  handleImgGalleries(result[0].personasGallery, 'persona-Img');

  handleParagraphs(result[0].wireframeDescription, 'wireframesContent');
  handleImgGalleries(result[0].wireframegallery, 'wireframes-images');
  
  handleParagraphs(result[0].styleContent, 'styleContent');
  handleImgGalleries(result[0].styleguide, 'style-images');

  handleParagraphs(result[0].icons, 'iconsContent');
  handleImgGalleries(result[0].iconsImg, 'icons-images');

  handleParagraphs(result[0].moodboard, 'moodboard');

  if(result[0].hifiprototypeimg) {
    const prototypeCover = document.getElementById('prototype-cover');
    //const prototypeCoverEL = document.createElement('img') // if you build in img tag
    prototypeCover.setAttribute('src', result[0].hifiprototypeimg);
    prototypeCover.setAttribute('alt', 'prototype bilde');
    //prototypeCover.append(prototypeCoverEL);
  }

  handleParagraphs(result[0].hifiprototype, 'hifi-Content');
  handleImgGalleries(result[0].hifigallery, 'hifi-images');

  handleParagraphs(result[0].discoverFigma, 'discover-content');
  
  handleParagraphs(result[0].reflection, 'reflection');
  
  
}

function handleImgGalleries(gallery, container) {
  if(gallery && gallery.length > 0) {
    const galleryContainer = document.getElementById(container);
    gallery.map(img => {
      const imgContainer = document.createElement('img');
      imgContainer.setAttribute('src', img);
      imgContainer.classList.add('gallery-img');
      galleryContainer.append(imgContainer);
    });
  };
}

// function plotTools (data, container) {
//   const toolsContainer = document.getElementById(container);
//   data.map(tool => {
//     const toolImg = document.createElement('img');
//     toolImg.setAttribute('src', `/assets/icons/${tool.slug.current}.svg`);
//     toolImg.setAttribute('alt', `icon of ${tool.software}`);
//     toolsContainer.append(toolImg);
//   })
// }

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
      buttonEl.innerText = 'Continue to case'
      buttonEl.append(imageEl)
      contentEl.append(buttonEl)
      cardEl.append(contentEl);
      projectsEl.append(cardEl);
      
      })
  }

if (urlString === undefined) {
  getAllProjects();
}


//USE THIS CODE LATER TO CREATE A SCROLL TO TOP FUNCTION
// //Get the button:
// let mybutton = document.getElementById("myBtn");
// // mybutton.setAttribute('onclick', 'topFunction()')

// //When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// };


// //When the user click on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0; // For Safari
//   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera  
// }





