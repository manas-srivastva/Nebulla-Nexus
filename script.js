// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const viewAllLinks = document.querySelectorAll('.view-all');
    
    // Handle navigation
    function showPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Update page title
        updatePageTitle(pageId);
    }
    
    function updatePageTitle(pageId) {
        const titles = {
            'dashboard': 'Campus Clubs Portal - Dashboard',
            'profile': 'Campus Clubs Portal - My Profile',
            'events': 'Campus Clubs Portal - Events'
        };
        document.title = titles[pageId] || 'Campus Clubs Portal';
    }
    
    // Add click handlers to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Add click handlers to "View All" links
    viewAllLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Events page functionality
    initializeEventsPage();
    
    // Profile page functionality
    initializeProfilePage();
    
    // Dashboard functionality
    initializeDashboard();
});

// Events page functionality
function initializeEventsPage() {
    const searchInput = document.getElementById('eventSearch');
    const campusFilter = document.getElementById('campusFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const eventsContainer = document.getElementById('eventsContainer');
    
    if (!searchInput || !eventsContainer) return;
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        filterEvents();
    });
    
    // Filter functionality
    [campusFilter, categoryFilter, dateFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', function() {
                filterEvents();
            });
        }
    });
    
    function filterEvents() {
        const searchTerm = searchInput.value.toLowerCase();
        const campusValue = campusFilter.value;
        const categoryValue = categoryFilter.value;
        const dateValue = dateFilter.value;
        
        const eventCards = eventsContainer.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.event-description').textContent.toLowerCase();
            const campus = card.getAttribute('data-campus');
            const category = card.getAttribute('data-category');
            const date = card.getAttribute('data-date');
            
            let showCard = true;
            
            // Search filter
            if (searchTerm && !title.includes(searchTerm) && !description.includes(searchTerm)) {
                showCard = false;
            }
            
            // Campus filter
            if (campusValue && campus !== campusValue) {
                showCard = false;
            }
            
            // Category filter
            if (categoryValue && category !== categoryValue) {
                showCard = false;
            }
            
            // Date filter
            if (dateValue) {
                const eventDate = new Date(date);
                const today = new Date();
                const diffTime = eventDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                switch (dateValue) {
                    case 'today':
                        if (diffDays !== 0) showCard = false;
                        break;
                    case 'week':
                        if (diffDays < 0 || diffDays > 7) showCard = false;
                        break;
                    case 'month':
                        if (diffDays < 0 || diffDays > 30) showCard = false;
                        break;
                }
            }
            
            // Show/hide card with animation
            if (showCard) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Event registration functionality
    const registerButtons = document.querySelectorAll('.event-card .btn-primary');
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleEventRegistration(this);
        });
    });
}

function handleEventRegistration(button) {
    const eventCard = button.closest('.event-card');
    const eventTitle = eventCard.querySelector('h3').textContent;
    
    // Simulate registration process
    button.textContent = 'Registering...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Registered ✓';
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
        
        // Show success message
        showNotification(`Successfully registered for ${eventTitle}!`, 'success');
        
        // Update attendee count
        updateAttendeeCount(eventCard);
    }, 1500);
}

function updateAttendeeCount(eventCard) {
    const attendeeInfo = eventCard.querySelector('.event-detail:last-child span');
    if (attendeeInfo) {
        const currentText = attendeeInfo.textContent;
        const match = currentText.match(/(\d+)\/(\d+) attendees/);
        if (match) {
            const current = parseInt(match[1]);
            const max = parseInt(match[2]);
            attendeeInfo.textContent = `${current + 1}/${max} attendees`;
        }
    }
}

// Profile page functionality
function initializeProfilePage() {
    const editButton = document.querySelector('#profile .btn-primary');
    if (editButton) {
        editButton.addEventListener('click', function() {
            handleProfileEdit();
        });
    }
    
    // Club view buttons
    const viewClubButtons = document.querySelectorAll('.membership-actions .btn-outline');
    viewClubButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const clubName = this.closest('.membership-item').querySelector('h4').textContent;
            showNotification(`Viewing ${clubName} details...`, 'info');
        });
    });
}

function handleProfileEdit() {
    showNotification('Profile editing feature coming soon!', 'info');
}

// Dashboard functionality
function initializeDashboard() {
    // Quick registration buttons
    const quickRegisterButtons = document.querySelectorAll('#dashboard .event-item .btn-primary');
    quickRegisterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventTitle = this.closest('.event-item').querySelector('h4').textContent;
            handleQuickRegistration(this, eventTitle);
        });
    });
    
    // Join club buttons
    const joinClubButtons = document.querySelectorAll('.btn-outline');
    joinClubButtons.forEach(button => {
        if (button.textContent.includes('Join')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Club discovery feature coming soon!', 'info');
            });
        }
    });
    
    // Notification handling
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            showNotificationPanel();
        });
    }
    
    // Announcements interaction
    const announcementItems = document.querySelectorAll('.announcement-item');
    announcementItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.backgroundColor = '#f8fafc';
            const title = this.querySelector('h4').textContent;
            showNotification(`Opened: ${title}`, 'info');
        });
    });
}

function handleQuickRegistration(button, eventTitle) {
    button.textContent = 'Registering...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Registered ✓';
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
        showNotification(`Registered for ${eventTitle}!`, 'success');
    }, 1000);
}

function showNotificationPanel() {
    const notifications = [
        'New event: AI Workshop Series starts tomorrow',
        'Club meeting reminder: Photography Society at 3 PM',
        'Achievement unlocked: Event Organizer badge',
        'Welcome to Tech Innovation Club!',
        'Campus Clean-up Drive needs more volunteers',
        'Your profile has been updated successfully',
        'New announcement from Environmental Action'
    ];
    
    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
    showNotification(randomNotification, 'info');
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 24px;
        background: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-left: 4px solid ${getNotificationColor(type)};
        z-index: 1001;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
        }
        
        .notification-content i {
            color: ${getNotificationColor(type)};
        }
        
        .notification-close {
            position: absolute;
            top: 8px;
            right: 8px;
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
        }
        
        .notification-close:hover {
            background: #f1f5f9;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.remove();
        style.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
            style.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#10B981',
        'error': '#EF4444',
        'warning': '#F59E0B',
        'info': '#3B82F6'
    };
    return colors[type] || '#3B82F6';
}

// Add smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading states for buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn') && !e.target.disabled) {
        const originalText = e.target.textContent;
        const isAsync = e.target.classList.contains('btn-primary') || 
                       e.target.classList.contains('btn-outline');
        
        if (isAsync && !originalText.includes('...') && !originalText.includes('✓')) {
            // Add subtle loading feedback
            e.target.style.opacity = '0.8';
            setTimeout(() => {
                if (e.target) {
                    e.target.style.opacity = '1';
                }
            }, 200);
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Alt + 1, 2, 3 for quick navigation
    if (e.altKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.querySelector('[data-page="dashboard"]').click();
                break;
            case '2':
                e.preventDefault();
                document.querySelector('[data-page="profile"]').click();
                break;
            case '3':
                e.preventDefault();
                document.querySelector('[data-page="events"]').click();
                break;
        }
    }
});

// Initialize intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.stat-card, .event-card, .club-card, .announcement-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
});