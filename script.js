
document.addEventListener('DOMContentLoaded', function () {

    // Navigation functionality
    function showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update navbar active state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Animate skill bars when skills section is shown
        if (sectionId === 'skills') {
            setTimeout(() => {
                const skillBars = document.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    bar.style.width = '0%';
                    setTimeout(() => {
                        const percentMatch = bar.textContent.match(/\d+/);
                        if (percentMatch) {
                            bar.style.width = percentMatch[0] + '%';
                        }
                    }, 100);
                });
            }, 200);
        }
    }

    // Make showSection globally accessible
    window.showSection = showSection;

    // Typing animation
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const texts = ['Front End Developer', 'Problem Solver', 'Creative Thinker'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            const typingSpeed = isDeleting ? 100 : 150;
            setTimeout(typeWriter, typingSpeed);
        }

        // Start typing animation
        typeWriter();
    }

    // Create floating particles
    function createParticles() {
        const particlesContainer = document.getElementById('particles');

        if (particlesContainer) {
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particlesContainer.appendChild(particle);
            }
        }
    }

    // Download resume function
    function downloadResume() {
        try {
            const link = document.createElement('a');
            link.href = '/asset/Kamesh Resume.pdf'; // You would put actual PDF data here
            link.download = 'Kamesh Resume.pdf';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            // Fallback for demonstration
            console.error('Resume download error:', error);
            alert('Resume download would start here. In a real implementation, you would link to an actual PDF file.');
        }
    }
    // Make downloadResume globally accessible
    window.downloadResume = downloadResume;

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize particles when page loads
    createParticles();

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        }
    });

    //project section
    const projects = {
        todo: {
            title: "To-Do-List",
            description: "A collaborative app for users to track their daily tasks with a clean user interface and local storage support.",
            demoUrl: "https://to-do-list-kings-11.vercel.app/",
            githubUrl: "https://github.com/Kamesh-1155/To-do-List",
            features: [
                "📝 Task Management – Add, edit, delete, and organize daily tasks.",
                "✅ Task Status Tracking – Mark tasks as Pending or Completed.",
                "🔍 Real-Time Search – Instantly search tasks by title or description.",
                "📊 Productivity Dashboard – View total, completed, and pending task statistics.",
                "📈 Progress Tracking – Visual progress bar showing task completion percentage.",
                "💾 Local Storage Support – Automatically saves tasks in the browser, even after refresh.",
                "🎨 Responsive Modern UI – Clean, user-friendly interface built with React, Vite, and custom CSS."
            ]
        },
        quiz: {
            title: "Calories Tracker",
            description: "Calories Tracker is a dynamic web app that lets users to input their body parameters and get their personalized diet plans to fulfill their calorie goals.",
            demoUrl: "https://kalorietracker.vercel.app/",
            githubUrl: "https://github.com/Kamesh-1155/Calorie-Tracker",
            features: [
                "🥗 Personalized Diet Plan Generator",
                "🔥 Daily Calorie & Macronutrient Recommendation",
                "💪 Fitness Activity Tracker",
                "📚 Save & Manage Diet Plans",
                "🎯 Goal-Based Nutrition Planning",
                "📱 Responsive & User-Friendly Interface"
            ]
        },
        notes: {
            title: "Restaurant Order App",
            description: "Complete Restaurant Management at one place.",
            demoUrl: "",
            githubUrl: "https://github.com/Kamesh-1155/Order-Management",
            features: [
                "Real-Time Restaurant Order Management",
                "Live Kitchen Dashboard",
                "Order Tracking System",
                "Dynamic Menu Management",
                "Inventory Management",
                "Responsive React Frontend",
                "Spring Boot & MySQL Backend"
            ]
        }
    };

    function showDemo(projectKey) {
        const project = projects[projectKey];
        if (!project) return;

        // Populate modal content
        document.getElementById('demoModalTitle').textContent = project.title;
        const demoContent = document.getElementById('demoContent');
        demoContent.innerHTML = `
            <p class="text-center mb-4">${project.description}</p>
            <h6>Key Features:</h6>
            <ul class="list-unstyled">
                ${project.features.map(f => `<li><i class="fas fa-check-circle text-success me-2"></i>${f}</li>`).join('')}
            </ul>`;

        // Set the 'Visit Project' button link
        document.getElementById('visitProjectBtn').onclick = () => window.open(project.demoUrl, '_blank');

        // Show the modal
        const demoModal = new bootstrap.Modal(document.getElementById('demoModal'));
        demoModal.show();
    }
    window.showDemo = showDemo;

    function openGitHub(projectKey) {
        const project = projects[projectKey];
        if (project && project.githubUrl) {
            window.open(project.githubUrl, '_blank');
        }
    }
    window.openGitHub = openGitHub;

    // Add click tracking for analytics 
    profileLinks.forEach(link => {
        link.addEventListener('click', function () {
            const platform = this.closest('.coding-profile').classList[1];
            console.log(`Profile clicked: ${platform}`);
            // You can add analytics tracking here
        });
    });



});
