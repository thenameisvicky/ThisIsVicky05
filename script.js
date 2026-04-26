const portfolioData = {
    personal: {
        name: "Vigneshwaran B",
        role: "Software Engineer",
        email: "vigneshbalasubramaniyan3@gmail.com",
        phone: "+91 97897 29792",
        about: "I build systems that work. Backend, automation, and applied AI—designed to run reliably in real conditions.",
        socials: {
            "LinkedIn": "https://www.linkedin.com/in/vigneshwaranbstar/",
            "GitHub": "https://github.com/thenameisvicky",
            "LeetCode": "https://leetcode.com/u/thenameisvicky/"
        }
    },
    skills: [
        {
            category: "Languages & Core",
            items: ["JavaScript", "TypeScript", "Python", "SOLID Principles"]
        },
        {
            category: "Backend & AI",
            items: ["Node.js", "Express.js", "MongoDB", "RAG Pipelines", "REST APIs"]
        },
        {
            category: "Automation & Infrastructure",
            items: ["Docker", "Azure", "Nginx"]
        },
        {
            category: "Frontend & Observability",
            items: ["React", "Redux", "Elastic/Kibana"]
        }
    ],
    projects: [
        {
            id: "stardust",
            name: "Stardust RAG",
            description: "Self-hosted RAG pipeline with streaming responses using Docker, queues, and local LLMs. Optimized for high-throughput system analysis.",
            features: ["Streaming RAG", "Docker", "Queue Processing", "Local LLM"],
            images: ["public/stardust_query.png", "public/stardust_source.png"]
        },
        {
            id: "wAI",
            name: "wAI",
            description: "AI-powered business Operations system for SME workflows—integrating customer management, automated invoicing, and messaging pipelines.",
            features: ["Automated Messaging", "Invoicing", "AI Workflow Automation"],
            images: ["public/wAI_Invoice.png"]
        },
        {
            id: "brokenhungry",
            name: "BrokeNhungry (Research Blog)",
            description: "A specialized technical blog and research project covering backend systems, browser/runtime internals, and core engineering concepts.",
            features: ["Distributed Systems", "JS Internals", "Performance Engineering", "Engineering Patterns"],
            images: ["public/brokeNhungry.png"]
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('name').textContent = portfolioData.personal.name;
    document.getElementById('role').textContent = portfolioData.personal.role;
    document.getElementById('about-text').textContent = portfolioData.personal.about;
    document.getElementById('year').textContent = new Date().getFullYear();

    const socialContainer = document.getElementById('social-links');
    Object.entries(portfolioData.personal.socials).forEach(([platform, url]) => {
        const link = document.createElement('a');
        link.href = url;
        link.textContent = platform;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        socialContainer.appendChild(link);
    });

    const chipsContainer = document.getElementById('contact-chips');
    const emailChip = document.createElement('div');
    emailChip.className = 'chip';
    emailChip.innerHTML = `<span class="icon">SYS_MAIL:</span> ${portfolioData.personal.email}`;
    chipsContainer.appendChild(emailChip);

    const phoneChip = document.createElement('div');
    phoneChip.className = 'chip';
    phoneChip.innerHTML = `<span class="icon">SYS_TEL:</span> ${portfolioData.personal.phone}`;
    chipsContainer.appendChild(phoneChip);

    const skillsGrid = document.getElementById('skills-grid');
    portfolioData.skills.forEach(skillGroup => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'skill-category';
        
        const title = document.createElement('h3');
        title.textContent = skillGroup.category;
        groupDiv.appendChild(title);
        
        const list = document.createElement('ul');
        skillGroup.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
        
        groupDiv.appendChild(list);
        skillsGrid.appendChild(groupDiv);
    });

    const modal = document.getElementById('image-modal');
    const modalCarousel = document.getElementById('modal-carousel');
    const closeModal = document.querySelector('.close-modal');

    const openModal = (project) => {
        modalCarousel.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-container';
        
        project.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = 'project-ui-shot';
            wrapper.appendChild(img);
        });
        
        modalCarousel.appendChild(wrapper);

        if (project.images.length > 1) {
            let currentSlide = 0;
            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-btn next';
            nextBtn.innerHTML = '&#8594;';
            nextBtn.style.display = 'block';
            
            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-btn prev';
            prevBtn.innerHTML = '&#8592;';
            prevBtn.style.display = 'block';

            const updateCarousel = () => {
                wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            };

            nextBtn.onclick = (e) => {
                e.stopPropagation();
                currentSlide = (currentSlide + 1) % project.images.length;
                updateCarousel();
            };

            prevBtn.onclick = (e) => {
                e.stopPropagation();
                currentSlide = (currentSlide - 1 + project.images.length) % project.images.length;
                updateCarousel();
            };

            modalCarousel.appendChild(prevBtn);
            modalCarousel.appendChild(nextBtn);
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    closeModal.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    const projectsGrid = document.getElementById('projects-grid');
    portfolioData.projects.forEach((project, idx) => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'project-content';

        const title = document.createElement('h3');
        title.textContent = project.name;
        contentDiv.appendChild(title);
        
        const desc = document.createElement('p');
        desc.textContent = project.description;
        contentDiv.appendChild(desc);
        
        const featureContainer = document.createElement('div');
        featureContainer.className = 'project-features';
        
        project.features.forEach(feature => {
            const span = document.createElement('span');
            span.textContent = feature;
            featureContainer.appendChild(span);
        });
        contentDiv.appendChild(featureContainer);
        projectDiv.appendChild(contentDiv);

        if (project.images && project.images.length > 0) {
            const imagesWrapper = document.createElement('div');
            imagesWrapper.className = 'project-images';
            imagesWrapper.onclick = () => openModal(project);
            
            const carouselContainer = document.createElement('div');
            carouselContainer.className = 'carousel-container';
            
            project.images.forEach(imgSrc => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = `${project.name} UI`;
                img.className = 'project-ui-shot';
                carouselContainer.appendChild(img);
            });
            
            imagesWrapper.appendChild(carouselContainer);

            if (project.images.length > 1) {
                let currentSlide = 0;
                const nextBtn = document.createElement('button');
                nextBtn.className = 'carousel-btn next';
                nextBtn.innerHTML = '&#8594;';
                nextBtn.style.display = 'block';
                
                const prevBtn = document.createElement('button');
                prevBtn.className = 'carousel-btn prev';
                prevBtn.innerHTML = '&#8592;';
                prevBtn.style.display = 'block';

                const updateCarousel = () => {
                    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
                };

                nextBtn.onclick = (e) => {
                    e.stopPropagation();
                    currentSlide = (currentSlide + 1) % project.images.length;
                    updateCarousel();
                };

                prevBtn.onclick = (e) => {
                    e.stopPropagation();
                    currentSlide = (currentSlide - 1 + project.images.length) % project.images.length;
                    updateCarousel();
                };

                imagesWrapper.appendChild(prevBtn);
                imagesWrapper.appendChild(nextBtn);

                // Auto-slide every 4 seconds
                setInterval(() => {
                    currentSlide = (currentSlide + 1) % project.images.length;
                    updateCarousel();
                }, 4000);
            }
            
            projectDiv.appendChild(imagesWrapper);
        }
        
        projectsGrid.appendChild(projectDiv);
    });
});
