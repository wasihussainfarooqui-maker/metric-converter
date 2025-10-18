// Enhanced Length Converter with Extended Units and History
document.addEventListener('DOMContentLoaded', function() {
    initializeExtendedLengthConverter();
    initializeConversionHistory();
});

function initializeExtendedLengthConverter() {
    const fromValue = document.getElementById('fromValue');
    const fromUnit = document.getElementById('fromUnit');
    const toValue = document.getElementById('toValue');
    const toUnit = document.getElementById('toUnit');
    const swapButton = document.getElementById('swapUnits');
    const resultDisplay = document.getElementById('resultDisplay');
    
    // Extended conversion factors (all to meters)
    const lengthFactors = {
        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001,
        micrometer: 0.000001,
        nanometer: 0.000000001,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.344,
        'nautical-mile': 1852,
        'light-year': 9.461e15,
        'astronomical-unit': 1.496e11
    };
    
    // Unit display names
    const unitNames = {
        meter: 'Meter',
        kilometer: 'Kilometer',
        centimeter: 'Centimeter',
        millimeter: 'Millimeter',
        micrometer: 'Micrometer',
        nanometer: 'Nanometer',
        inch: 'Inch',
        foot: 'Foot',
        yard: 'Yard',
        mile: 'Mile',
        'nautical-mile': 'Nautical Mile',
        'light-year': 'Light Year',
        'astronomical-unit': 'Astronomical Unit'
    };
    
    // Unit symbols
    const unitSymbols = {
        meter: 'm',
        kilometer: 'km',
        centimeter: 'cm',
        millimeter: 'mm',
        micrometer: 'μm',
        nanometer: 'nm',
        inch: 'in',
        foot: 'ft',
        yard: 'yd',
        mile: 'mi',
        'nautical-mile': 'nmi',
        'light-year': 'ly',
        'astronomical-unit': 'AU'
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
        const formattedValue = formatNumber(value);
        
        resultDisplay.textContent = `${formattedValue} ${unitNames[from]} (${fromSymbol}) = ${formattedResult} ${unitNames[to]} (${toSymbol})`;
        
        // Add to history
        addToHistory({
            from: { value: formattedValue, unit: unitNames[from], symbol: fromSymbol },
            to: { value: formattedResult, unit: unitNames[to], symbol: toSymbol },
            timestamp: new Date()
        });
        
        // Add subtle animation
        gsap.fromTo(resultDisplay, 
            { scale: 0.95, opacity: 0.7 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        
        // Unlock achievement for first conversion
        if (window.unlockAchievement) {
            window.unlockAchievement('first_conversion');
        }
    }
    
    function formatNumber(num) {
        if (num === 0) return '0';
        
        // Handle very large numbers (astronomical units, light years)
        if (Math.abs(num) >= 1e15) {
            return num.toExponential(3);
        }
        
        // Handle large numbers
        if (Math.abs(num) >= 1000000) {
            return num.toExponential(6);
        }
        
        // Handle normal range numbers
        if (Math.abs(num) >= 1) {
            return parseFloat(num.toFixed(8)).toString();
        }
        
        // Handle small numbers
        if (Math.abs(num) >= 0.001) {
            return parseFloat(num.toFixed(8)).toString();
        }
        
        // Handle very small numbers (nanometers, micrometers)
        return num.toExponential(6);
    }
    
    // Event listeners
    fromValue.addEventListener('input', performConversion);
    fromUnit.addEventListener('change', performConversion);
    toUnit.addEventListener('change', performConversion);
    
    // Enhanced swap functionality
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
    
    // Enhanced quick conversions
    const quickConversions = {
        '1m-ft': { value: 1, from: 'meter', to: 'foot' },
        '1km-mi': { value: 1, from: 'kilometer', to: 'mile' },
        '1in-cm': { value: 1, from: 'inch', to: 'centimeter' },
        '1ft-m': { value: 1, from: 'foot', to: 'meter' },
        '100cm-m': { value: 100, from: 'centimeter', to: 'meter' },
        '1mi-km': { value: 1, from: 'mile', to: 'kilometer' },
        '1yd-m': { value: 1, from: 'yard', to: 'meter' },
        '1nmi-km': { value: 1, from: 'nautical-mile', to: 'kilometer' }
    };
    
    document.querySelectorAll('.quick-btn').forEach(button => {
        button.addEventListener('click', () => {
            const conversion = button.dataset.conversion;
            const config = quickConversions[conversion];
            
            if (config) {
                fromValue.value = config.value;
                fromUnit.value = config.from;
                toUnit.value = config.to;
                
                performConversion();
                
                // Visual feedback
                gsap.fromTo(button, 
                    { scale: 0.95 },
                    { scale: 1, duration: 0.2, ease: "power2.out" }
                );
            }
        });
    });
    
    // Initial conversion
    performConversion();
}

function initializeConversionHistory() {
    const historyContainer = document.getElementById('conversionHistory');
    const clearHistoryBtn = document.getElementById('clearHistory');
    
    let conversionHistory = JSON.parse(localStorage.getItem('metricx-length-history') || '[]');
    
    function addToHistory(conversion) {
        // Add to beginning of array
        conversionHistory.unshift(conversion);
        
        // Keep only last 10 conversions
        if (conversionHistory.length > 10) {
            conversionHistory = conversionHistory.slice(0, 10);
        }
        
        // Save to localStorage
        localStorage.setItem('metricx-length-history', JSON.stringify(conversionHistory));
        
        // Update display
        updateHistoryDisplay();
    }
    
    function updateHistoryDisplay() {
        if (conversionHistory.length === 0) {
            historyContainer.innerHTML = `
                <div style="text-align: center; color: var(--text-muted); padding: 2rem;">
                    <i class="fas fa-history" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>Your conversion history will appear here</p>
                </div>
            `;
            return;
        }
        
        historyContainer.innerHTML = conversionHistory.map((item, index) => {
            const timeAgo = getTimeAgo(item.timestamp);
            return `
                <div class="history-item" style="
                    padding: var(--spacing-md);
                    border-bottom: 1px solid var(--border-light);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                " data-index="${index}">
                    <div>
                        <div style="font-weight: 500; color: var(--text-primary);">
                            ${item.from.value} ${item.from.symbol} → ${item.to.value} ${item.to.symbol}
                        </div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">
                            ${item.from.unit} to ${item.to.unit}
                        </div>
                    </div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">
                        ${timeAgo}
                    </div>
                </div>
            `;
        }).join('');
        
        // Add click handlers to history items
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                const conversion = conversionHistory[index];
                
                // Set form values based on history item
                document.getElementById('fromValue').value = conversion.from.value;
                document.getElementById('toValue').value = conversion.to.value;
                
                // Find and set the units
                const fromSelect = document.getElementById('fromUnit');
                const toSelect = document.getElementById('toUnit');
                
                for (let option of fromSelect.options) {
                    if (option.text.includes(conversion.from.symbol)) {
                        fromSelect.value = option.value;
                        break;
                    }
                }
                
                for (let option of toSelect.options) {
                    if (option.text.includes(conversion.to.symbol)) {
                        toSelect.value = option.value;
                        break;
                    }
                }
                
                // Update result display
                document.getElementById('resultDisplay').textContent = 
                    `${conversion.from.value} ${conversion.from.unit} (${conversion.from.symbol}) = ${conversion.to.value} ${conversion.to.unit} (${conversion.to.symbol})`;
                
                // Visual feedback
                gsap.fromTo(item, 
                    { backgroundColor: 'rgba(37, 99, 235, 0.1)' },
                    { backgroundColor: 'transparent', duration: 0.5 }
                );
            });
            
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = 'transparent';
            });
        });
    }
    
    function getTimeAgo(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInSeconds = Math.floor((now - time) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    }
    
    function clearHistory() {
        conversionHistory = [];
        localStorage.removeItem('metricx-length-history');
        updateHistoryDisplay();
        
        if (window.MetricxUtils) {
            window.MetricxUtils.showNotification('History cleared', 'info');
        }
    }
    
    // Clear history button
    clearHistoryBtn.addEventListener('click', clearHistory);
    
    // Initial display
    updateHistoryDisplay();
    
    // Export addToHistory function
    window.addToHistory = addToHistory;
}

// Export for use in other scripts
window.LengthConverter = {
    formatNumber: function(num) {
        if (num === 0) return '0';
        
        if (Math.abs(num) >= 1e15) {
            return num.toExponential(3);
        }
        
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

