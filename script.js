
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500); 
    }, 2800);

    const numStars = 100;
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars');
    document.body.prepend(starsContainer);

    for (let i = 0; i < numStars; i++) {
        let star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        starsContainer.appendChild(star);
    }

    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks = document.getElementById('menu-links');

    menuToggle.addEventListener('click', () => {
        menuLinks.classList.toggle('show');
    });

    document.querySelectorAll('#menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.classList.remove('show');
        });
    });

    const title = document.getElementById('typewriter');
    const name = "Octávio Augusto";
    let i = 0;
    let isDeleting = false;
    let endDelay = 0;

    function typeWriter() {
        if (!isDeleting) {
            title.textContent = name.substring(0, i + 1);
            i++;
        } else {
            title.textContent = name.substring(0, i - 1);
            i--;
        }

        if (!isDeleting && i === name.length) {
            endDelay = 500;
            isDeleting = true;
        } else if (isDeleting && i === 1) {
            endDelay = 500;
            isDeleting = false;
        }

        const speed = isDeleting ? 100 : 125;
        setTimeout(typeWriter, endDelay || speed);
    }
    typeWriter();

    AOS.init({
        duration: 1200,
        offset: 100
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const downloadCvButton = document.querySelector("button:nth-of-type(2)");
    const verProjetosBtn = document.getElementById('verProjetosBtn');

    if (verProjetosBtn) {
        verProjetosBtn.addEventListener('click', () => {
            const target = document.getElementById('sobreMim');
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    if (downloadCvButton && downloadCvButton.textContent.includes("Download CV")) {
        downloadCvButton.addEventListener("click", () => {
            const link = document.createElement("a");
            link.href = "Octávio Augusto Currículo.pdf";
            link.download = "Octávio Augusto Currículo.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    const projectsData = [
        {
            id: 'project1',
            name: 'Controle de Estoque ASP.NET',
            image: 'imgs/projeto-controle-estoque-aspnet-ef.png',
            description: 'Um sistema completo de controle de estoque desenvolvido com ASP.NET Core e Entity Framework. Gerencie produtos, categorias, fornecedores e movimentações de estoque de forma eficiente.',
            technologies: ['ASP.NET Core', 'Entity Framework', 'C#', 'MySQL', 'HTML', 'CSS', 'Bootstrap', 'JavaScript'],
            githubLink: 'https://github.com/octavioaugustocr/controle-estoque-aspnet-ef' 
        },
        {
            id: 'project2',
            name: 'Portfólio Pessoal',
            image: 'imgs/projeto-porfolio-pessoal.png',
            description: 'Portfólio pessoal com intuito de destacar minhas habilidades com front-end e divulgar meus projetos desenvolvido com HTML, CSS e JS e algumas bibliotecas para as animações.',
            technologies: ['HTML', 'CSS', 'JS'],
            githubLink: 'http://github.com/octavioaugustocr' 
        },
        {
            id: 'project3',
            name: 'JWT-EF WebAPI',
            image: 'imgs/jwt-ef-webapi.png',
            description: 'Uma API Web RESTful desenvolvida em .NET 8.0 que implementa autenticação e autorização usando JSON Web Tokens (JWT) e persistência de dados com Entity Framework Core e MySQL.',
            technologies: ['.NET 8.0', 'ASP.NET Core WebAPI', "Entity Framework Core 9.0.10", 'MySQL', 'Pomelo.EntityFrameworkCore.MySql', 'HMACSHA512', 'JWT'],
            githubLink: 'https://github.com/octavioaugustocr/jwt-ef-webapi'
        },
        {
            id: 'project4',
            name: 'Consumindo API de CEP',
            image: 'imgs/consumindo-api-cep.png',
            description: 'Este projeto demonstra como consumir uma API de consulta de CEP utilizando C# e ASP.NET Core. Ele oferece um endpoint que permite buscar informações de endereço a partir de um CEP fornecido.',
            technologies: ['C#', '.NET 8.0', 'ASP.NET Core', 'Swagger/OpenAPI'],
            githubLink: 'https://github.com/octavioaugustocr/consumindo-api-cep'
        }
    ];

    const projectsGrid = document.getElementById('imgProjetos');
    const projectModal = document.getElementById('projectModal');
    const closeButton = projectModal.querySelector('.close-button');
    const modalProjectName = document.getElementById('modalProjectName');
    const modalProjectDescription = document.getElementById('modalProjectDescription');
    const modalProjectTechs = document.getElementById('modalProjectTechs');
    const modalProjectLink = document.getElementById('modalProjectLink');
    const carouselSlide = projectModal.querySelector('.carousel-slide');
    const prevSlideButton = projectModal.querySelector('.prev-slide');
    const nextSlideButton = projectModal.querySelector('.next-slide');

    let currentSlide = 0;
    let carouselInterval;

    function createProjectCard(project) {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.setAttribute('data-aos', 'zoom-in');
        card.innerHTML = `
            <img src="${project.image}" alt="${project.name}">
            <h4>${project.name}</h4>
            <button class="btn-details" data-project-id="${project.id}">Mais Informações</button>
        `;
        projectsGrid.appendChild(card);
    }

    projectsData.forEach(project => createProjectCard(project));

    projectsGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-details')) {
            const projectId = event.target.dataset.projectId;
            const project = projectsData.find(p => p.id === projectId);
            if (project) {
                openProjectModal(project);
            }
        }
    });

    closeButton.addEventListener('click', closeProjectModal);
    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            closeProjectModal();
        }
    });

    function openProjectModal(project) {
        modalProjectName.textContent = project.name;
        modalProjectDescription.textContent = project.description;
        modalProjectLink.href = project.githubLink;

        modalProjectTechs.innerHTML = '';
        project.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.classList.add('tech-tag');
            span.textContent = tech;
            modalProjectTechs.appendChild(span);
        });

        carouselSlide.innerHTML = '';
        for (let k = 0; k < 3; k++) {
            const img = document.createElement('img');
            img.src = project.image;
            img.alt = `${project.name} - Imagem ${k + 1}`;
            carouselSlide.appendChild(img);
        }
        currentSlide = 0;
        updateCarousel();
        startCarouselAutoPlay();

        projectModal.style.display = 'flex';
    }

    function closeProjectModal() {
        projectModal.style.display = 'none';
        stopCarouselAutoPlay();
    }

    function updateCarousel() {
        const slides = carouselSlide.children;
        if (slides.length > 0) {
            carouselSlide.style.transform = `translateX(${-currentSlide * 100}%)`;
        }
    }

    function nextSlide() {
        const slides = carouselSlide.children;
        if (slides.length > 0) {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }
    }

    function prevSlide() {
        const slides = carouselSlide.children;
        if (slides.length > 0) {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
        }
    }

    function startCarouselAutoPlay() {
        stopCarouselAutoPlay();
        carouselInterval = setInterval(nextSlide, 5000);
    }

    function stopCarouselAutoPlay() {
        clearInterval(carouselInterval);
    }

    prevSlideButton.addEventListener('click', () => {
        stopCarouselAutoPlay();
        prevSlide();
        startCarouselAutoPlay();
    });

    nextSlideButton.addEventListener('click', () => {
        stopCarouselAutoPlay();
        nextSlide();
        startCarouselAutoPlay();
    });

});
