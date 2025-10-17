// METRICX - Minimalist Script
// Clean, efficient, and elegant functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeThemeToggle();
    initializeConversionTool();
    initializeQuickConversions();
    initializeSearch();
    initializeSmoothScrolling();
    initializeAnimations();
});

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('metricx-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(icon, savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('metricx-theme', newTheme);
        updateThemeIcon(icon, newTheme);
        
        // Smooth transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(icon, theme) {
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Conversion Tool Functionality
function initializeConversionTool() {
    const fromValue = document.getElementById('fromValue');
    const fromUnit = document.getElementById('fromUnit');
    const toValue = document.getElementById('toValue');
    const toUnit = document.getElementById('toUnit');
    const swapButton = document.getElementById('swapUnits');
    const resultDisplay = document.getElementById('resultDisplay');
    
    // Conversion factors (all to meters)
    const lengthFactors = {
        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.344
    };
    
    // Unit display names
    const unitNames = {
        meter: 'Meter',
        kilometer: 'Kilometer',
        centimeter: 'Centimeter',
        millimeter: 'Millimeter',
        inch: 'Inch',
        foot: 'Foot',
        yard: 'Yard',
        mile: 'Mile'
    };
    
    // Unit symbols
    const unitSymbols = {
        meter: 'm',
        kilometer: 'km',
        centimeter: 'cm',
        millimeter: 'mm',
        inch: 'in',
        foot: 'ft',
        yard: 'yd',
        mile: 'mi'
    };
    
    function performConversion() {
        const value = parseFloat(fromValue.value) || 0;
        const from = fromUnit.value;
        const to = toUnit.value;
        
        if (value === 0) {
            toValue.value = '0';
            resultDisplay.textContent = `0 ${unitNames[from]} = 0 ${unitNames[to]}`;
            return;
        }
        
        // Convert to meters first, then to target unit
        const meters = value * lengthFactors[from];
        const result = meters / lengthFactors[to];
        
        // Format result with appropriate precision
        const formattedResult = formatNumber(result);
        toValue.value = formattedResult;
        
        // Update result display
        const fromSymbol = unitSymbols[from];
        const toSymbol = unitSymbols[to];
        resultDisplay.textContent = `${formatNumber(value)} ${unitNames[from]} (${fromSymbol}) = ${formattedResult} ${unitNames[to]} (${toSymbol})`;
        
        // Add subtle animation
        gsap.fromTo(resultDisplay, 
            { scale: 0.95, opacity: 0.7 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
        );
    }
    
    function formatNumber(num) {
        if (num === 0) return '0';
        if (Math.abs(num) >= 1000000) {
            return num.toExponential(6);
        }
        if (Math.abs(num) >= 1) {
            return parseFloat(num.toFixed(8)).toString();
        }
        if (Math.abs(num) >= 0.001) {
            return parseFloat(num.toFixed(8)).toString();
        }
        return num.toExponential(6);
    }
    
    // Event listeners
    fromValue.addEventListener('input', performConversion);
    fromUnit.addEventListener('change', performConversion);
    toUnit.addEventListener('change', performConversion);
    
    // Swap units functionality
    swapButton.addEventListener('click', () => {
        const tempUnit = fromUnit.value;
        const tempValue = fromValue.value;
        
        fromUnit.value = toUnit.value;
        toUnit.value = tempUnit;
        fromValue.value = toValue.value;
        
        performConversion();
        
        // Animate swap button
        gsap.to(swapButton, {
            rotation: "+=180",
            duration: 0.3,
            ease: "power2.inOut"
        });
    });
    
    // Initial conversion
    performConversion();
}

// Quick Conversions
function initializeQuickConversions() {
    const quickButtons = document.querySelectorAll('.quick-btn');
    
    const quickConversions = {
        '1m-ft': { value: 1, from: 'meter', to: 'foot' },
        '1km-mi': { value: 1, from: 'kilometer', to: 'mile' },
        '1in-cm': { value: 1, from: 'inch', to: 'centimeter' },
        '1ft-m': { value: 1, from: 'foot', to: 'meter' },
        '100cm-m': { value: 100, from: 'centimeter', to: 'meter' },
        '1mi-km': { value: 1, from: 'mile', to: 'kilometer' }
    };
    
    quickButtons.forEach(button => {
        button.addEventListener('click', () => {
            const conversion = button.dataset.conversion;
            const config = quickConversions[conversion];
            
            if (config) {
                document.getElementById('fromValue').value = config.value;
                document.getElementById('fromUnit').value = config.from;
                document.getElementById('toUnit').value = config.to;
                
                // Trigger conversion
                document.getElementById('fromValue').dispatchEvent(new Event('input'));
                
                // Visual feedback
                gsap.fromTo(button, 
                    { scale: 0.95 },
                    { scale: 1, duration: 0.2, ease: "power2.out" }
                );
            }
        });
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = createSearchResults();
    
    const searchData = [
        { term: 'length', description: 'Convert meters, feet, inches, miles', url: 'length-minimalist.html' },
        { term: 'area', description: 'Convert square meters, acres, hectares', url: 'area-minimalist.html' },
        { term: 'mass', description: 'Convert kilograms, pounds, grams', url: 'mass-minimalist.html' },
        { term: 'meter', description: 'Length conversion tool', url: 'length-minimalist.html' },
        { term: 'foot', description: 'Length conversion tool', url: 'length-minimalist.html' },
        { term: 'inch', description: 'Length conversion tool', url: 'length-minimalist.html' },
        { term: 'kilometer', description: 'Length conversion tool', url: 'length-minimalist.html' },
        { term: 'mile', description: 'Length conversion tool', url: 'length-minimalist.html' }
    ];
    
    function createSearchResults() {
        const results = document.createElement('div');
        results.className = 'search-results';
        results.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--secondary-bg);
            border: 1px solid var(--border-light);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            max-height: 300px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        `;
        
        searchInput.parentElement.appendChild(results);
        return results;
    }
    
    function showSearchResults(query) {
        if (!query.trim()) {
            searchResults.style.display = 'none';
            return;
        }
        
        const filtered = searchData.filter(item => 
            item.term.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filtered.length === 0) {
            searchResults.style.display = 'none';
            return;
        }
        
        searchResults.innerHTML = filtered.map(item => `
            <div class="search-result-item" style="
                padding: var(--spacing-md);
                border-bottom: 1px solid var(--border-light);
                cursor: pointer;
                transition: background-color 0.2s ease;
            " data-url="${item.url}">
                <div style="font-weight: 500; color: var(--text-primary);">${item.term}</div>
                <div style="font-size: 0.875rem; color: var(--text-secondary);">${item.description}</div>
            </div>
        `).join('');
        
        searchResults.style.display = 'block';
        
        // Add click handlers
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = item.dataset.url;
            });
            
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = 'transparent';
            });
        });
    }
    
    searchInput.addEventListener('input', (e) => {
        showSearchResults(e.target.value);
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.parentElement.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations and Interactions
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.fromTo(entry.target, 
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
                );
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.card, .conversion-container').forEach(el => {
        observer.observe(el);
    });
    
    // Hover animations for cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Button hover effects
    document.querySelectorAll('.btn, .quick-btn, .fun-btn').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.2,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--secondary-bg);
        border: 1px solid var(--border-light);
        border-radius: var(--radius-md);
        padding: var(--spacing-md) var(--spacing-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    const colors = {
        info: 'var(--accent-color)',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
            <div style="width: 4px; height: 100%; background: ${colors[type]}; border-radius: 2px; position: absolute; left: 0; top: 0;"></div>
            <div style="margin-left: var(--spacing-sm);">
                <div style="font-weight: 500; color: var(--text-primary);">${message}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Export for use in other scripts
window.MetricxUtils = {
    showNotification,
    formatNumber: function(num) {
        if (num === 0) return '0';
        if (Math.abs(num) >= 1000000) {
            return num.toExponential(6);
        }
        if (Math.abs(num) >= 1) {
            return parseFloat(num.toFixed(8)).toString();
        }
        if (Math.abs(num) >= 0.001) {
            return parseFloat(num.toFixed(8)).toString();
        }
        return num.toExponential(6);
    }
};

