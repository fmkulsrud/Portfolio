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
    console.log(container)
    const blockContainer = document.getElementById(container);
    console.log(blockContent)
    console.log(blockContainer)
    
    blockContent.map(p  => {
        if(p._type === 'block'){
            let pEl = document.createElement('p')
            if(p.style === 'h1') {
                 pEl = document.createElement('h1')
            }
            if(p.style === 'h2') {
                 pEl = document.createElement('h2')
            }
            if(p.style === 'h3') {
                 pEl = document.createElement('h3')
            }
            if(p.style === 'h4') {
                 pEl = document.createElement('h4')
            }
            pEl.textContent = p.children[0].text;
            blockContainer.append(pEl)
            
        }
        if (p._type === 'image') {
            const fileNameArray = p.asset._ref.split('-');
            const fileName = `${fileNameArray[1]}-${fileNameArray[2]}.${fileNameArray[3]}`;
            const imgEL = document.createElement('img');
            imgEL.setAttribute('src', `${cdnUrl}${fileName}`);
            imgEL.classList.add('project__blockImg');
            blockContainer.append(imgEL);

        }
    });
};