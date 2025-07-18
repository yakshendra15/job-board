// JavaScript file for JobBoard application

// Global variables
let currentUser = null;
let jobs = [];
let filteredJobs = [];
let currentPage = 0;
const jobsPerPage = 12;

// Sample job data
const sampleJobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "TechCorp",
        location: "San Francisco, CA",
        type: "full-time",
        experience: "junior",
        salary: 85000,
        skills: ["JavaScript", "React", "HTML", "CSS"],
        degree: "bachelor",
        field: "Computer Science",
        description: "We are looking for a talented Frontend Developer to join our team and help build amazing user experiences. You will work with modern technologies and collaborate with designers and backend developers.",
        postedDate: "2024-01-15",
        isRemote: false
    },
    {
        id: 2,
        title: "Data Scientist",
        company: "DataFlow Inc",
        location: "New York, NY",
        type: "full-time",
        experience: "senior",
        salary: 120000,
        skills: ["Python", "Machine Learning", "SQL", "Statistics"],
        degree: "master",
        field: "Data Science",
        description: "Join our data science team to build innovative ML solutions that drive business decisions. You will work with large datasets and develop predictive models.",
        postedDate: "2024-01-14",
        isRemote: true
    },
    {
        id: 3,
        title: "UX Designer",
        company: "DesignStudio",
        location: "Austin, TX",
        type: "contract",
        experience: "mid-level",
        salary: 95000,
        skills: ["Figma", "User Research", "Prototyping", "UI Design"],
        degree: "bachelor",
        field: "Design",
        description: "Create amazing user experiences for our products. You will conduct user research, create wireframes, and design beautiful interfaces.",
        postedDate: "2024-01-13",
        isRemote: false
    },
    {
        id: 4,
        title: "DevOps Engineer",
        company: "CloudTech",
        location: "Seattle, WA",
        type: "full-time",
        experience: "senior",
        salary: 110000,
        skills: ["AWS", "Docker", "Kubernetes", "Linux"],
        degree: "bachelor",
        field: "Computer Science",
        description: "Build and maintain our cloud infrastructure. You will automate deployments, monitor systems, and ensure high availability.",
        postedDate: "2024-01-12",
        isRemote: true
    },
    {
        id: 5,
        title: "Marketing Manager",
        company: "GrowthCo",
        location: "Chicago, IL",
        type: "full-time",
        experience: "mid-level",
        salary: 75000,
        skills: ["Digital Marketing", "SEO", "Analytics", "Content Strategy"],
        degree: "bachelor",
        field: "Marketing",
        description: "Lead our marketing initiatives and drive growth. You will develop marketing strategies and manage campaigns across multiple channels.",
        postedDate: "2024-01-11",
        isRemote: false
    },
    {
        id: 6,
        title: "Product Manager",
        company: "InnovateLab",
        location: "Boston, MA",
        type: "full-time",
        experience: "senior",
        salary: 130000,
        skills: ["Product Strategy", "Agile", "User Research", "Analytics"],
        degree: "master",
        field: "Business",
        description: "Lead product development from concept to launch. You will work with cross-functional teams and define product roadmaps.",
        postedDate: "2024-01-10",
        isRemote: true
    },
    {
        id: 7,
        title: "Backend Developer",
        company: "CodeCraft",
        location: "Denver, CO",
        type: "full-time",
        experience: "junior",
        salary: 70000,
        skills: ["Node.js", "Python", "MongoDB", "REST APIs"],
        degree: "bachelor",
        field: "Computer Science",
        description: "Build scalable backend services and APIs. You will work with modern frameworks and databases to create robust systems.",
        postedDate: "2024-01-09",
        isRemote: false
    },
    {
        id: 8,
        title: "Sales Representative",
        company: "SalesForce",
        location: "Miami, FL",
        type: "full-time",
        experience: "entry",
        salary: 55000,
        skills: ["Sales", "CRM", "Communication", "Negotiation"],
        degree: "bachelor",
        field: "Business",
        description: "Drive sales growth and build client relationships. You will prospect new clients and manage existing accounts.",
        postedDate: "2024-01-08",
        isRemote: false
    },
    {
        id: 9,
        title: "Mobile Developer",
        company: "AppWorks",
        location: "Los Angeles, CA",
        type: "full-time",
        experience: "mid-level",
        salary: 90000,
        skills: ["React Native", "iOS", "Android", "JavaScript"],
        degree: "bachelor",
        field: "Computer Science",
        description: "Develop mobile applications for iOS and Android platforms. You will work with React Native and native technologies.",
        postedDate: "2024-01-07",
        isRemote: true
    },
    {
        id: 10,
        title: "Content Writer",
        company: "ContentHub",
        location: "Portland, OR",
        type: "part-time",
        experience: "entry",
        salary: 45000,
        skills: ["Content Writing", "SEO", "Social Media", "Copywriting"],
        degree: "bachelor",
        field: "English",
        description: "Create engaging content for our blog and social media channels. You will write articles, social posts, and marketing copy.",
        postedDate: "2024-01-06",
        isRemote: true
    }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        if (window.location.pathname.includes('dashboard.html')) {
            loadDashboard();
        } else {
            window.location.href = 'dashboard.html';
        }
    }

    // Initialize jobs
    jobs = [...sampleJobs];
    filteredJobs = [...jobs];

    // Set up event listeners
    setupEventListeners();
    
    // Initialize salary range sliders
    initializeSalarySliders();
}

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchJobs);
    }
}

// Authentication Functions
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showNotification('Login successful!', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        degree: formData.get('degree'),
        field: formData.get('field'),
        location: formData.get('location'),
        skills: formData.get('skills').split(',').map(skill => skill.trim()),
        experience: formData.get('experience')
    };
    
    // Validation
    if (userData.password !== userData.confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (userData.password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === userData.email)) {
        showNotification('User already exists with this email', 'error');
        return;
    }
    
    // Save user
    const newUser = {
        ...userData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        viewedJobs: [],
        appliedJobs: [],
        savedJobs: []
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showNotification('Account created successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    window.location.href = 'index.html';
}

// Dashboard Functions
function loadDashboard() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update user name
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = currentUser.firstName;
    }
    
    // Update stats
    updateStats();
    
    // Load personalized jobs
    loadPersonalizedJobs();
    
    // Initialize dashboard features
    initializeDashboard();
}

function updateStats() {
    const viewedJobs = currentUser.viewedJobs ? currentUser.viewedJobs.length : 0;
    const appliedJobs = currentUser.appliedJobs ? currentUser.appliedJobs.length : 0;
    const savedJobs = currentUser.savedJobs ? currentUser.savedJobs.length : 0;
    
    document.getElementById('viewedJobs').textContent = viewedJobs;
    document.getElementById('appliedJobs').textContent = appliedJobs;
    document.getElementById('savedJobs').textContent = savedJobs;
}

function loadPersonalizedJobs() {
    // Filter jobs based on user preferences
    filteredJobs = jobs.filter(job => {
        // Match degree level
        const degreeMatch = job.degree === currentUser.degree || 
                           (currentUser.degree === 'master' && job.degree === 'bachelor') ||
                           (currentUser.degree === 'phd' && ['bachelor', 'master'].includes(job.degree));
        
        // Match location
        const locationMatch = job.location.toLowerCase().includes(currentUser.location.toLowerCase()) ||
                             job.isRemote;
        
        // Match skills
        const skillMatch = currentUser.skills.some(skill => 
            job.skills.some(jobSkill => 
                jobSkill.toLowerCase().includes(skill.toLowerCase())
            )
        );
        
        return degreeMatch && (locationMatch || skillMatch);
    });
    
    // Sort by relevance
    filteredJobs.sort((a, b) => {
        const aScore = calculateJobScore(a);
        const bScore = calculateJobScore(b);
        return bScore - aScore;
    });
    
    displayJobs();
}

function calculateJobScore(job) {
    let score = 0;
    
    // Degree match
    if (job.degree === currentUser.degree) score += 10;
    else if (currentUser.degree === 'master' && job.degree === 'bachelor') score += 8;
    else if (currentUser.degree === 'phd' && ['bachelor', 'master'].includes(job.degree)) score += 6;
    
    // Location match
    if (job.location.toLowerCase().includes(currentUser.location.toLowerCase())) score += 8;
    if (job.isRemote) score += 5;
    
    // Skills match
    const matchingSkills = currentUser.skills.filter(skill => 
        job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
    );
    score += matchingSkills.length * 3;
    
    // Experience match
    if (job.experience === currentUser.experience) score += 5;
    
    return score;
}

function displayJobs() {
    const container = document.getElementById('jobsContainer');
    if (!container) return;
    
    const startIndex = currentPage * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const jobsToShow = filteredJobs.slice(startIndex, endIndex);
    
    container.innerHTML = jobsToShow.map(job => createJobCard(job)).join('');
}

function createJobCard(job) {
    const isSaved = currentUser.savedJobs && currentUser.savedJobs.includes(job.id);
    const isApplied = currentUser.appliedJobs && currentUser.appliedJobs.includes(job.id);
    
    return `
        <div class="job-card" onclick="openJobModal(${job.id})">
            <div class="job-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <p class="company-name">${job.company}</p>
                    <p class="job-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${job.location} ${job.isRemote ? '(Remote)' : ''}
                    </p>
                </div>
                <div class="job-salary">$${job.salary.toLocaleString()}</div>
            </div>
            
            <div class="job-tags">
                <span class="job-tag">${job.type}</span>
                <span class="job-tag">${job.experience}</span>
                ${job.isRemote ? '<span class="job-tag">Remote</span>' : ''}
            </div>
            
            <div class="job-actions">
                <button class="action-btn apply-btn" onclick="event.stopPropagation(); applyToJob(${job.id})">
                    ${isApplied ? 'Applied' : 'Apply Now'}
                </button>
                <button class="action-btn save-btn" onclick="event.stopPropagation(); toggleSaveJob(${job.id})">
                    <i class="fas fa-heart"></i>
                    ${isSaved ? 'Saved' : 'Save'}
                </button>
            </div>
        </div>
    `;
}

// Job Actions
function applyToJob(jobId) {
    if (!currentUser.appliedJobs) {
        currentUser.appliedJobs = [];
    }
    
    if (!currentUser.appliedJobs.includes(jobId)) {
        currentUser.appliedJobs.push(jobId);
        updateUserInStorage();
        updateStats();
        showNotification('Application submitted successfully!', 'success');
    } else {
        showNotification('You have already applied to this job', 'info');
    }
}

function toggleSaveJob(jobId) {
    if (!currentUser.savedJobs) {
        currentUser.savedJobs = [];
    }
    
    const index = currentUser.savedJobs.indexOf(jobId);
    if (index > -1) {
        currentUser.savedJobs.splice(index, 1);
        showNotification('Job removed from saved', 'info');
    } else {
        currentUser.savedJobs.push(jobId);
        showNotification('Job saved successfully!', 'success');
    }
    
    updateUserInStorage();
    updateStats();
    displayJobs(); // Refresh to update save button state
}

function openJobModal(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;
    
    // Mark as viewed
    if (!currentUser.viewedJobs) {
        currentUser.viewedJobs = [];
    }
    if (!currentUser.viewedJobs.includes(jobId)) {
        currentUser.viewedJobs.push(jobId);
        updateUserInStorage();
        updateStats();
    }
    
    const modal = document.getElementById('jobModal');
    const modalContent = document.getElementById('jobModalContent');
    
    modalContent.innerHTML = `
        <div class="job-modal-header">
            <h2>${job.title}</h2>
            <p class="company-name">${job.company}</p>
        </div>
        
        <div class="job-modal-details">
            <div class="detail-row">
                <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span><i class="fas fa-clock"></i> ${job.type}</span>
                <span><i class="fas fa-dollar-sign"></i> $${job.salary.toLocaleString()}</span>
            </div>
            
            <div class="job-skills">
                <h4>Required Skills:</h4>
                <div class="skills-list">
                    ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            
            <div class="job-description">
                <h4>Job Description:</h4>
                <p>${job.description}</p>
            </div>
            
            <div class="job-requirements">
                <h4>Requirements:</h4>
                <ul>
                    <li>${job.degree} degree in ${job.field}</li>
                    <li>${job.experience} level experience</li>
                    <li>${job.isRemote ? 'Remote work capability' : 'On-site work required'}</li>
                </ul>
            </div>
        </div>
        
        <div class="job-modal-actions">
            <button class="action-btn apply-btn" onclick="applyToJob(${job.id}); closeModal();">
                Apply Now
            </button>
            <button class="action-btn save-btn" onclick="toggleSaveJob(${job.id}); closeModal();">
                Save Job
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('jobModal');
    modal.style.display = 'none';
}

// Filter Functions
function applyFilters() {
    const jobTypes = Array.from(document.querySelectorAll('input[value*="time"], input[value="contract"], input[value="remote"]:checked'))
        .map(cb => cb.value);
    
    const experienceLevels = Array.from(document.querySelectorAll('input[value*="entry"], input[value*="junior"], input[value*="senior"]:checked'))
        .map(cb => cb.value);
    
    const salaryMin = parseInt(document.getElementById('salaryMin').value);
    const salaryMax = parseInt(document.getElementById('salaryMax').value);
    const locationFilter = document.getElementById('locationFilter').value.toLowerCase();
    
    filteredJobs = jobs.filter(job => {
        const typeMatch = jobTypes.length === 0 || jobTypes.includes(job.type);
        const experienceMatch = experienceLevels.length === 0 || experienceLevels.includes(job.experience);
        const salaryMatch = job.salary >= salaryMin && job.salary <= salaryMax;
        const locationMatch = !locationFilter || job.location.toLowerCase().includes(locationFilter);
        
        return typeMatch && experienceMatch && salaryMatch && locationMatch;
    });
    
    currentPage = 0;
    displayJobs();
    showNotification(`Found ${filteredJobs.length} jobs matching your criteria`, 'success');
}

function sortJobs() {
    const sortBy = document.getElementById('sortJobs').value;
    
    filteredJobs.sort((a, b) => {
        switch (sortBy) {
            case 'date':
                return new Date(b.postedDate) - new Date(a.postedDate);
            case 'salary':
                return b.salary - a.salary;
            case 'relevance':
            default:
                return calculateJobScore(b) - calculateJobScore(a);
        }
    });
    
    currentPage = 0;
    displayJobs();
}

function toggleView(viewType) {
    const container = document.getElementById('jobsContainer');
    const buttons = document.querySelectorAll('.view-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.view-btn').classList.add('active');
    
    if (viewType === 'list') {
        container.style.gridTemplateColumns = '1fr';
    } else {
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(350px, 1fr))';
    }
}

function loadMoreJobs() {
    currentPage++;
    displayJobs();
}

// Utility Functions
function searchJobs() {
    const searchTerm = document.getElementById('searchInput')?.value || '';
    const locationTerm = document.getElementById('locationInput')?.value || '';
    
    if (!searchTerm && !locationTerm) {
        filteredJobs = [...jobs];
    } else {
        filteredJobs = jobs.filter(job => {
            const searchMatch = !searchTerm || 
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
            
            const locationMatch = !locationTerm || 
                job.location.toLowerCase().includes(locationTerm.toLowerCase());
            
            return searchMatch && locationMatch;
        });
    }
    
    currentPage = 0;
    displayJobs();
    showNotification(`Found ${filteredJobs.length} jobs`, 'success');
}

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const icon = field.nextElementSibling;
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function initializeSalarySliders() {
    const minSlider = document.getElementById('salaryMin');
    const maxSlider = document.getElementById('salaryMax');
    const minValue = document.getElementById('salaryMinValue');
    const maxValue = document.getElementById('salaryMaxValue');
    
    if (minSlider && maxSlider) {
        minSlider.addEventListener('input', function() {
            minValue.textContent = parseInt(this.value).toLocaleString();
            if (parseInt(this.value) > parseInt(maxSlider.value)) {
                maxSlider.value = this.value;
                maxValue.textContent = parseInt(this.value).toLocaleString();
            }
        });
        
        maxSlider.addEventListener('input', function() {
            maxValue.textContent = parseInt(this.value).toLocaleString();
            if (parseInt(this.value) < parseInt(minSlider.value)) {
                minSlider.value = this.value;
                minValue.textContent = parseInt(this.value).toLocaleString();
            }
        });
    }
}

function initializeDashboard() {
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('jobModal');
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Close modal with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

function updateUserInStorage() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex > -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .job-modal-header {
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #e1e5e9;
    }
    
    .job-modal-header h2 {
        color: #333;
        margin-bottom: 0.5rem;
    }
    
    .detail-row {
        display: flex;
        gap: 2rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
    }
    
    .detail-row span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #666;
    }
    
    .job-skills, .job-description, .job-requirements {
        margin-bottom: 1.5rem;
    }
    
    .job-skills h4, .job-description h4, .job-requirements h4 {
        color: #333;
        margin-bottom: 0.8rem;
    }
    
    .skills-list {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    
    .skill-tag {
        background: #667eea;
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
    }
    
    .job-requirements ul {
        list-style: none;
        padding-left: 0;
    }
    
    .job-requirements li {
        padding: 0.3rem 0;
        color: #666;
    }
    
    .job-requirements li:before {
        content: "•";
        color: #667eea;
        font-weight: bold;
        margin-right: 0.5rem;
    }
    
    .job-modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 2px solid #e1e5e9;
    }
`;
document.head.appendChild(notificationStyles);
