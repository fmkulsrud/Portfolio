import { cdnUrl } from "./env.js";


export function readUrl() {
    const urlString = window.location.search;
    if (urlString) {
        return(urlString.slice(1));
    }
    return undefined;
}

//her setter vi inn body tekst fra sanity
export function handleParagraphs(blockContent, container) {
    const blockContainer = document.getElementById(container);

    if (!blockContainer) {
        console.error(`Container element with ID '${container}' not found.`);
        return;
    }

    if (blockContent) {
        blockContent.forEach((p) => {
            if (p._type === "block" && p.children.some((child) => child.text.trim() !== "")) {
                let pEl = document.createElement("p");

                if (p.style === "h1") {
                    pEl = document.createElement("h1");
                } else if (p.style === "h2") {
                    pEl = document.createElement("h2");
                } else if (p.style === "h3") {
                    pEl = document.createElement("h3");
                } else if (p.style === "h4") {
                    pEl = document.createElement("h4");
                } else if (p.listItem === "bullet") {
                    pEl = document.createElement("li");
                }

                p.children.forEach((child) => {
                    if (child.text.trim() !== "") {
                        if (child.marks && child.marks[0] === "strong") {
                            const strongEl = document.createElement("strong");
                            strongEl.textContent = child.text;
                            pEl.appendChild(strongEl);
                        } else {
                            const textArray = child.text.split("<strong>");
                            textArray.forEach((text, index) => {
                                if (text) {
                                    const textNode = document.createTextNode(text);
                                    pEl.appendChild(textNode);
                                }

                                if (index < textArray.length - 1) {
                                    const strongEl = document.createElement("strong");
                                    strongEl.textContent = textArray[index + 1].split("</strong>")[0];
                                    pEl.appendChild(strongEl);
                                }
                            });
                        }
                    }
                });

                if (p.markDefs.length > 0 && p.markDefs[0].href !== undefined) {
                    const aEl = document.createElement("a");
                    aEl.setAttribute("href", p.markDefs[0].href);
                    aEl.setAttribute("target", "_blank");
                    aEl.appendChild(pEl);
                    pEl = aEl;
                }

                blockContainer.appendChild(pEl);
            }

            if (p._type === "image") {
                const fileNameArray = p.asset._ref.split("-");
                const fileName = `${fileNameArray[1]}-${fileNameArray[2]}.${fileNameArray[3]}`;
                const imgEL = document.createElement("img");
                imgEL.setAttribute("src", `${cdnUrl}${fileName}`);
                imgEL.classList.add("project__blockImg");
                blockContainer.appendChild(imgEL);
            }
        });
    }
}
