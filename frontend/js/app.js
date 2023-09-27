import handleHambuger from "./menu.js";
import { activeNavbar } from "./navbar.js";
import { readUrl } from "./utils.js";
import { aboutUrl, sanityUrl } from "./env.js";
import { handleParagraphs } from "./utils.js";

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

function customizeById(id) {
  const contentDiv = document.getElementById(id);

  if (contentDiv) {
    const h3Classes = [
      "mt-4",
      "text-3xl",
      "font-light",
      "mb-5",
      "leading-6",
      "text-black",
      "hover:none"
    ];

    const pClasses = [
      "mb-4"
    ];

    const h3Elements = contentDiv.querySelectorAll("h3");
    h3Elements.forEach((h3Element) => {
      h3Element.classList.add(...h3Classes);
    });

    const pElements = contentDiv.querySelectorAll("p");
    pElements.forEach((pElement) => {
      pElement.classList.add(...pClasses);
    });
  }
}

async function getProject() {
  const response = await fetch(`${sanityUrl}${encodeURI(querySingleProject)}`);
  const { result } = await response.json();
  renderSingleProject(result);
}

function renderSingleProject(result) {
  console.log("result[0]", result[0])
  const titleEl = document.querySelector(".single-project__title");
  titleEl.textContent = result[0].title;
  titleEl.classList.add("text-6xl", "font-semibold", "mt-6");
  const coverProjectEl = document.querySelector(".project__cover");
  coverProjectEl.setAttribute("src", result[0].cover);

  // const tilteDetails = document.querySelector('.project__details');
  // titleEl.textContent = result[0].details
  handleParagraphs(result[0].details, "detailContent");

  handleParagraphs(result[0].shortdescription, "briefContent");
  customizeById("briefContent")
  handleParagraphs(result[0].projectDetails, "project_details");
  // plotTools(result[0].tools, 'toolIcons');
  handleParagraphs(result[0].problem, "problemContent");
  customizeById("problemContent")

  handleParagraphs(result[0].userReasearch, "userResearchContent");
  customizeById("userResearchContent")

  const researchImgEl = document.querySelector(".research-img");
  researchImgEl.setAttribute("src", result[0].researchimg);

  handleParagraphs(result[0].comeptitor, "competitorAnalysisContent");
  customizeById("competitorAnalysisContent");

  handleImgGalleries(result[0].competitorimage, "competitorGallery");

  handleParagraphs(result[0].findings, "findingsContent");
  customizeById("findingsContent");
  handleImgGalleries(result[0].findingsimg, "findingsGallery");

  handleParagraphs(result[0].targetGroupsContainer, "targetContent");
  customizeById("targetContent");

  handleParagraphs(result[0].personas, "personaContent");
  customizeById("personaContent");
  handleImgGalleries(result[0].personasGallery, "persona-Img");

  handleParagraphs(result[0].wireframeDescription, "wireframesContent");
  customizeById("wireframesContent");
  handleImgGalleries(result[0].wireframegallery, "wireframes-images");
  
  handleParagraphs(result[0].styleContent, "styleContent");
  customizeById("styleContent");
  handleImgGalleries(result[0].styleguide, "style-images");

  handleParagraphs(result[0].icons, "iconsContent");
  customizeById("iconsContent");
  handleImgGalleries(result[0].iconsImg, "icons-images");

  handleParagraphs(result[0].moodboard, "moodboard");
  customizeById("moodboard");

  if (result[0].hifiprototypeimg) {
    const prototypeCover = document.getElementById("prototype-cover");
    //const prototypeCoverEL = document.createElement('img') // if you build in img tag
    prototypeCover.setAttribute("src", result[0].hifiprototypeimg);
    prototypeCover.setAttribute("alt", "prototype bilde");
    //prototypeCover.append(prototypeCoverEL);
  }

  handleParagraphs(result[0].hifiprototype, "hifi-Content");
  customizeById("hifi-Content");
  handleImgGalleries(result[0].hifigallery, "hifi-images");

  handleParagraphs(result[0].discoverFigma, "discover-content");
  customizeById("discover-Content");

  handleParagraphs(result[0].reflection, "reflection");
  customizeById("reflection");
}

function handleImgGalleries(gallery, container) {
  if (gallery && gallery.length > 0) {
    const galleryContainer = document.getElementById(container);
    gallery.map((img) => {
      const imgContainer = document.createElement("img");
      imgContainer.setAttribute("src", img);
      imgContainer.classList.add("gallery-img");
      galleryContainer.append(imgContainer);
    });
  }
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
  console.log("urlString", urlString)
  getProject();
}

// Define a function to fetch and render projects
async function getAllProjects() {
  const response = await fetch(`${sanityUrl}${encodeURI(queryAllProjects)}`);
  const { result } = await response.json();

  renderProjectsList(result);
}

function renderProjectsList(result) {
  const projectsEl = document.getElementById("project-wrapper");
  console.log("projectsEl", projectsEl)

  result.forEach((project) => {
    const cardEl = document.createElement("a");
    cardEl.setAttribute("href", `/projects/?${project.slug.current}`);
    cardEl.classList.add("p-3", "group");

    const coverEl = document.createElement("img");
    coverEl.setAttribute("src", project.bilde);
    coverEl.classList.add(
      "aspect-[16/9]",
      "w-full",
      "rounded-2xl",
      "bg-gray-100",
      "object-cover",
      "sm:aspect-[2/1]",
      "lg:aspect-[3/2]",
      "group-hover:opacity-90"
    );

    const contentEl = document.createElement("div");
    contentEl.classList.add("max-w-xl");

    const h3El = document.createElement("h3");
    h3El.textContent = project.title;
    h3El.classList.add(
      "mt-4",
      "text-2xl",
      "font-medium",
      "leading-6",
      "text-white",
      "group-hover:underline"
    );

    const pEl = document.createElement("p");
    pEl.textContent = project.ProjectPitch;
    pEl.classList.add("text-sm", "leading-6", "text-gray-600"); // Apply Tailwind CSS classes for the paragraph

    const spanEl = document.createElement("span");
    spanEl.textContent = project.text;

    // Append all elements to the card element
    contentEl.append(h3El, pEl);
    cardEl.append(coverEl, contentEl, spanEl);

    // Append the card element to the projects container
    projectsEl.append(cardEl);
  });
}

// Call the function to fetch and render projects when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  getAllProjects();
});
