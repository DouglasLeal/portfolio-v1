let portfolioItens = document.querySelector(".portfolio-itens");
let portfolioFilter = document.querySelector(".portfolio-filter");
let listProjects = document.querySelector("#listProjects");

let projects = [];
let categories = [];

async function getProjects() {
    let res = await fetch("assets/data/projetos.json");
    projects = await res.json();

    getCategories();

    createPortfolio(projects);
}

function getCategories() {
    projects.forEach(project => {
        project.category.forEach(c => {
            c = c.toLowerCase();
            if (!categories.includes(c)) {
                categories.push(c);
            }
        });
    });

    categories = categories.sort();

    populateDataListPortfolio();
}

function createPortfolio(projects) {
    projects.forEach(project => {
        let portfolioItem = document.createElement("div");
        portfolioItem.classList.add("portfolio-item");

        let itemImage = document.createElement("img");
        itemImage.classList.add("portfolio-item-image");
        itemImage.src = project.image;

        let itemContent = document.createElement("div");
        itemContent.classList.add("portfolio-item-content");

        let itemTitle = document.createElement("h3");
        itemTitle.classList.add("portfolio-item-title");
        itemTitle.innerText = project.title;

        let itemCategory = document.createElement("ul");
        itemCategory.classList.add("portfolio-item-category");

        project.category.forEach(c => {
            let category = document.createElement("li");
            category.innerText = c;

            itemCategory.append(category);
        });

        let itemDescription = document.createElement("p");
        itemDescription.classList.add("portfolio-item-description");
        itemDescription.innerText = project.description;

        let itemLinks = document.createElement("div");
        itemLinks.classList.add("portfolio-item-links");

        let linkGit = document.createElement("a");
        linkGit.classList.add("portfolio-item-link");
        linkGit.href = project.urlGit;
        linkGit.innerText = "Github";

        portfolioItem.append(itemImage);
        itemContent.append(itemTitle);
        itemContent.append(itemCategory);
        itemContent.append(itemDescription);
        itemLinks.append(linkGit);

        if (project.urlProd != "") {
            let linkProd = document.createElement("a");
            linkProd.classList.add("portfolio-item-link");
            linkProd.href = project.urlProd;
            linkProd.innerText = "Demo";
            itemLinks.append(linkProd);
        }


        itemContent.append(itemLinks);
        portfolioItem.append(itemContent);

        portfolioItens.append(portfolioItem);
    });
}

function populateDataListPortfolio() {
    categories.forEach(c => {
        let option = document.createElement("option");
        option.innerText = c;
        option.value = c;

        listProjects.append(option);
    });
}

function removePortfolioItens() {
    let portfolioItemList = document.querySelectorAll(".portfolio-item");

    portfolioItemList.forEach(e => {
        e.classList.add("portfolio-item-fade");
        setTimeout(() => {
            e.remove();
        }, 600)
    });
}

portfolioFilter.addEventListener("input", (e) => {
    let filtered = [];
    removePortfolioItens();

    if (e.target.value != "") {
        projects.forEach(p => {
            p.category.forEach(c => {
                if (c.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0) {
                    if (!filtered.includes(p)) {
                        filtered.push(p);
                    }
                }
            });
        });

        createPortfolio(filtered);
    } else {
        createPortfolio(projects);
    }
});