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
    tags,
    title,
    slug,
    subtext,
    "bilde": heroimg.asset->url,
    _id,
    shortProjectPitch
  }
`;

const querySingleProject = `
  *[slug.current == "${urlString}"] {
    title,
    subtext,
    tags,
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
    solution,
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
      "md:text-3xl",
      "text-2xl",
      "font-medium",
      "mb-5",
      "leading-6",
      "text-black",
      "hover:none",
    ];

    const h4Classes = ["md:text-xl", "text-lg", "text-[#505050]", "mb-2"];

    const pClasses = ["mb-3", "md:text-lg", "text-base", "font-light"];

    const h3Elements = contentDiv.querySelectorAll("h3");
    h3Elements.forEach((h3Element) => {
      h3Element.classList.add(...h3Classes);
    });

    const h4Elements = contentDiv.querySelectorAll("h4");
    h4Elements.forEach((h4Element) => {
      h4Element.classList.add(...h4Classes);
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
  console.log("result[0]", result[0]);
  const titleEl = document.querySelector(".single-project__title");
  titleEl.textContent = result[0].title;
  titleEl.classList.add(
    "text-4xl",
    "md:text-6xl",
    "font-semibold",
    "mt-6",
    "md:mx-2",
    "mx-0",
  );
  const coverProjectEl = document.querySelector(".project__cover");
  coverProjectEl.setAttribute("src", result[0].cover);

  // const tilteDetails = document.querySelector('.project__details');
  // titleEl.textContent = result[0].details
  handleParagraphs(result[0].details, "detailContent");
  customizeById("detailContent");

  handleParagraphs(result[0].subtext, "subContent");

  handleParagraphs(result[0].shortdescription, "briefContent");
  customizeById("briefContent");
  handleParagraphs(result[0].projectDetails, "project_details");
  // plotTools(result[0].tools, 'toolIcons');
  handleParagraphs(result[0].problem, "problemContent");
  customizeById("problemContent");

  handleParagraphs(result[0].userReasearch, "userResearchContent");
  customizeById("userResearchContent");

  const researchImgEl = document.querySelector(".research-img");
  researchImgEl.setAttribute("src", result[0].researchimg);

  handleParagraphs(result[0].comeptitor, "competitorAnalysisContent");
  customizeById("competitorAnalysisContent");

  handleImgGalleries(result[0].competitorimage, "competitorGallery");

  handleParagraphs(result[0].findings, "findingsContent");
  customizeById("findingsContent");
  handleImgGalleries(result[0].findingsimg, "findingsGallery");

  // handleParagraphs(result[0].targetGroupsContainer, "targetContent");
  // customizeById("targetContent");

  handleParagraphs(result[0].personas, "personaContent");
  customizeById("personaContent");
  handleImgGalleries(result[0].personasGallery, "persona-Img");

  handleParagraphs[(result[0].solution, "solutionContent")];
  customizeById("solutionContent");

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
  customizeById("discover-content");

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
  console.log("urlString", urlString);
  getProject();
}

// Define a function to fetch and render projects
async function getAllProjects() {
  try {
    const response = await fetch(`${sanityUrl}${encodeURI(queryAllProjects)}`);
    const { result } = await response.json();

    console.log("result", result);
    renderProjectsList(result);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}

function renderProjectsList(result) {
  const projectsEl = document.getElementById("project-wrapper");
  console.log("projectsEl", projectsEl);

  result.forEach((project) => {
    const cardEl = document.createElement("a");
    cardEl.setAttribute("href", `/projects/?${project.slug.current}`);
    cardEl.classList.add(
      "p-3",
      "flex",
      "md:flex-row",
      "flex-col",
      "items-center",
    );

    const coverEl = document.createElement("img");
    coverEl.setAttribute("src", project.bilde);
    coverEl.classList.add(
      "aspect-[16/11]",
      "md:w-1/2",
      // "w-1/2",
      "rounded-xl",
      "bg-gray-100",
      "object-cover",
      // "md:aspect-[2/1]",
      "lg:aspect-[3/2]",
      "group-hover:opacity-90",
    );

    const contentWrapperEl = document.createElement("div");
    contentWrapperEl.classList.add(
      "md:w-1/2",
      "w-full",
      "m-7",
      "flex",
      "flex-col",
      "content-center",
    );

    const contentEl2Wrapper = document.createElement("div");
    contentEl2Wrapper.classList.add("flex", "gap-3"); // This div will make contentEl2 stack vertically

    project.tags &&
      project.tags.forEach((tag) => {
        const pillEl = document.createElement("p");
        pillEl.textContent = tag;
        pillEl.classList.add(
          "rounded-3xl",
          "md:text-base",
          "text-sm", //This is the text size
          "font-normal", //This is the font weight
          "text-[#0B0B0B]",
          "bg-[#BCDDE2]", // You can add background color or any other styles for the pill
          "p-2", //Padding to pill
          "border-solid",
          "border-black",
          "border-1",
          // "mb-8" // Adding margin-bottom to separate pills (adjust as needed)
        );

        contentEl2Wrapper.appendChild(pillEl);
      });

    const contentEl = document.createElement("div");
    contentEl.classList.add("flex", "flex-col", "mt-4");

    const h3El = document.createElement("h3");
    h3El.textContent = project.title;
    h3El.classList.add(
      "md:text-3xl",
      "text-2xl",
      "font-medium",
      "leading-6",
      "text-white",
      "group-hover:underline",
      "md:mt-2",
      "mt-1",
    );

    const pEl = document.createElement("p");
    pEl.textContent = project.subtext;
    pEl.classList.add(
      "md:text-lg",
      "text-base",
      "leading-6",
      "text-[#FBFBFB]",
      "mt-3",
      "font-light",
    );

    const spanEl = document.createElement("span");
    spanEl.textContent = project.text;

    // Append all elements to the card element
    contentEl.append(h3El, pEl);
    contentWrapperEl.append(contentEl2Wrapper, contentEl);
    cardEl.append(coverEl, contentWrapperEl, spanEl);

    // Append the card element to the projects container
    projectsEl.append(cardEl);
  });
}

// Call the function to fetch and render projects when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  getAllProjects();
});
