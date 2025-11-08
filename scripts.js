// ==========================
// DATA STRUCTURES & CONSTANTS
// ==========================

const LIBRARY_DATA = {
    levels: {
        1: {
            name: "Level 1",
            collections: [
                { range: "1-01 to 1-03", name: "Accessible Collection", audience: "All" },
                { range: "1-04 to 1-23", name: "Early Literacy", audience: "Children" }
            ],
            mapImage: "./floor-plans/level1-floor-plan.jpg"
        },
        2: {
            name: "Level 2",
            collections: [
                { range: "2-01 to 2-12", name: "World and Us", audience: "Children" },
                { range: "2-13 to 2-25", name: "Junior Simple Stories (JS)", audience: "Children" },
                { range: "2-26 to 2-27", name: "Hanyu Pinyin & Bilingual", audience: "Children" },
                { range: "2-28 to 2-31", name: "Chinese Collection (JP & J)", audience: "Children" },
                { range: "2-32 to 2-37", name: "English Fiction (J)", audience: "Children" },
                { range: "2-38 to 2-40", name: "English Non-Fiction (J)", audience: "Children" },
                { range: "2-38 to 2-44", name: "English Picture Fiction (JP)", audience: "Children" },
                { range: "2-47", name: "Folktales (398.2)", audience: "Children" },
                { range: "2-48 to 2-49", name: "English Picture Non-Fiction (JP)", audience: "Children" }
            ],
            mapImage: "./floor-plans/level2-floor-plan.jpg"
        },
        3: {
            name: "Level 3",
            collections: [
                { range: "3-18", name: "Comics", audience: "Teens" },
                { range: "3-18 to 3-14", name: "English Fiction", audience: "Teens/Adults" },
                { range: "3-25", name: "Chinese Fiction", audience: "Teens" },
                { range: "3-10 to 3-14", name: "English Fiction", audience: "Adults" },
                { range: "3-16 to 3-17", name: "Large Print", audience: "Adults" },
                { range: "3-35", name: "Tamil Fiction", audience: "Adults" },
                { range: "3-36", name: "Malay Fiction", audience: "Adults" },
                { range: "3-26 to 3-32", name: "Chinese Fiction", audience: "Adults" },
                { range: "3-33 to 3-34", name: "Singapore Fiction", audience: "Adults" },
                { range: "3-37 to 3-38", name: "Magazine", audience: "Adults" }
            ],
            mapImage: "./floor-plans/level3-floor-plan.jpg"
        },
        4: {
            name: "Level 4",
            collections: [
                { range: "4-47 to 4-49", name: "Teens Non-Fiction", audience: "Teens" },
                { range: "4-09 to 4-10", name: "Accompanying Items", audience: "Adults" },
                { range: "4-11 to 4-14", name: "Business", audience: "Adults" },
                { range: "4-15 to 4-16", name: "Computers", audience: "Adults" },
                { range: "4-17 to 4-18", name: "Travel", audience: "Adults" },
                { range: "4-18 to 4-20", name: "Cookery", audience: "Adults" },
                { range: "4-21 to 4-22", name: "Health", audience: "Adults" },
                { range: "4-23", name: "Recreation", audience: "Adults" },
                { range: "4-24 to 4-25", name: "Art", audience: "Adults" },
                { range: "4-26 to 4-35", name: "English Non-Fiction", audience: "Adults" },
                { range: "4-36 to 4-37", name: "Parenting", audience: "Adults" },
                { range: "4-37 to 4-44", name: "Chinese Non-Fiction", audience: "Adults" },
                { range: "4-45", name: "Malay Non-Fiction", audience: "Adults" },
                { range: "4-46", name: "Tamil Non-Fiction", audience: "Adults" },
                { range: "4-01 to 4-05", name: "Singapore Non-Fiction (English)", audience: "Adults" },
                { range: "4-06", name: "Singapore Non-Fiction (Malay)", audience: "Adults" },
                { range: "4-07 to 4-08", name: "Singapore Non-Fiction (Chinese)", audience: "Adults" }
            ],
            mapImage: "./floor-plans/level4-floor-plan.jpg"
        }
    },
    
    ddcRanges: {
        "000-099": { category: "General Knowledge", examples: ["Computer Science", "Information", "Library Science"] },
        "100-199": { category: "Philosophy & Psychology", examples: ["Astrology (133)", "Psychology (150)", "Mental Health"] },
        "200-299": { category: "Religion & Mythology", examples: ["Religious Ethics (205)", "Philosophy of Religion (210)"] },
        "300-399": { category: "Social Sciences & Folklore", examples: ["Social Problems (361)", "Criminology (364)", "Folktales (398.2)"] },
        "400-499": { category: "Languages & Grammar", examples: ["English Usage (428)", "Sign Languages (419)", "East Asian Languages (495)"] },
        "500-599": { category: "Mathematics & Natural Sciences", examples: ["Mathematics (510)", "Astronomy (520)", "Insects (595.79)", "Alpacas (599.63)"] },
        "600-699": { category: "Medicine & Technology", examples: ["Personal Health (613)", "Mental Health (616.85)", "Dogs (636.7)", "Cooking (641.5)"] },
        "700-799": { category: "Arts & Recreation", examples: ["Comics (741.5)", "Music (780)", "Outdoor Sports (796)"] },
        "800-899": { category: "Writing & Literature", examples: ["Rhetoric (808)", "Poetry (811, 821)", "Fiction (823, 824)"] },
        "900-999": { category: "History & Geography", examples: ["Travel (910)", "Ancient History (930)", "WWII (940.53)", "Asian History (950)"] }
    }
};

// Section code patterns
const SECTION_CODES = {
    'JS': { name: 'Junior Simple', level: 2, audience: 'Children', description: 'Easy chapter books with pictures' },
    'J': { name: 'Junior', level: 2, audience: 'Children', description: 'Upper primary books' },
    'JP': { name: 'Junior Picture', level: 2, audience: 'Children', description: 'Picture books' },
    'YA': { name: 'Young Adult', level: 3, audience: 'Teens', description: 'Teen fiction' },
    'SING': { name: 'Singapore Literature', level: 3, audience: 'All', description: 'By Singaporean authors' }
};

// ==========================
// STATE MANAGEMENT
// ==========================

class AppState {
    constructor() {
        this.searchHistory = this.loadFromStorage('searchHistory', []);
        this.sessionStart = Date.now();
        this.statistics = this.loadFromStorage('statistics', {
            totalSearches: 0,
            successfulSearches: 0,
            errors: 0,
            challengingSections: {},
            searchTimes: []
        });
        this.currentSession = {
            searches: 0,
            errors: 0,
            startTime: Date.now()
        };
    }

    loadFromStorage(key, defaultValue) {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    }

    saveToStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage error:', e);
        }
    }

    addToHistory(callNumber, result) {
        const historyItem = {
            callNumber,
            timestamp: Date.now(),
            result: result || null
        };
        this.searchHistory.unshift(historyItem);
        if (this.searchHistory.length > 50) {
            this.searchHistory = this.searchHistory.slice(0, 50);
        }
        this.saveToStorage('searchHistory', this.searchHistory);
    }

    recordSearch(callNumber, success, section = null) {
        this.statistics.totalSearches++;
        this.currentSession.searches++;
        
        if (success) {
            this.statistics.successfulSearches++;
            if (section) {
                this.statistics.challengingSections[section] = 
                    (this.statistics.challengingSections[section] || 0) + 1;
            }
        } else {
            this.statistics.errors++;
            this.currentSession.errors++;
        }
        
        this.statistics.searchTimes.push(Date.now());
        if (this.statistics.searchTimes.length > 100) {
            this.statistics.searchTimes = this.statistics.searchTimes.slice(-100);
        }
        
        this.saveToStorage('statistics', this.statistics);
    }

    clearHistory() {
        this.searchHistory = [];
        this.saveToStorage('searchHistory', []);
    }

    getSessionDuration() {
        return Math.floor((Date.now() - this.currentSession.startTime) / 60000);
    }

    getBooksPerHour() {
        const duration = (Date.now() - this.currentSession.startTime) / 3600000;
        return duration > 0 ? Math.round(this.currentSession.searches / duration) : 0;
    }

    getErrorRate() {
        const total = this.statistics.totalSearches;
        return total > 0 ? Math.round((this.statistics.errors / total) * 100) : 0;
    }
}

// ==========================
// CALL NUMBER PARSER
// ==========================

class CallNumberParser {
    static parse(input) {
        const cleaned = input.trim().toUpperCase();
        
        // Adult shelf number pattern (3-18, 4-26, etc.)
        if (/^\d-\d+$/.test(cleaned)) {
            return this.parseShelfNumber(cleaned);
        }
        
        // Fiction pattern: JS STI, J LEF, etc.
        if (/^(JS|J|JP|YA|SING)\s+[A-Z]{3}/.test(cleaned)) {
            return this.parseFiction(cleaned);
        }
        
        // Non-fiction pattern: J 636.7 HAM, J 940.53 DEA, etc.
        if (/^(J|JS|JP)\s+\d+\.?\d*\s+[A-Z]+/.test(cleaned)) {
            return this.parseNonFiction(cleaned);
        }
        
        // DDC only: 398.2, 636.7, etc.
        if (/^\d+\.?\d*$/.test(cleaned)) {
            return this.parseDDCOnly(cleaned);
        }
        
        // Adult fiction: Just three letters
        if (/^[A-Z]{3}$/.test(cleaned)) {
            return this.parseAdultFiction(cleaned);
        }
        
        return { success: false, error: 'Unrecognized call number format' };
    }

    static parseShelfNumber(input) {
        const [level, shelf] = input.split('-');
        const levelNum = parseInt(level);
        
        if (!LIBRARY_DATA.levels[levelNum]) {
            return { success: false, error: 'Invalid level number' };
        }
        
        const levelData = LIBRARY_DATA.levels[levelNum];
        let collection = null;
        
        for (const coll of levelData.collections) {
            const ranges = coll.range.split(',').map(r => r.trim());
            for (const range of ranges) {
                if (range.includes('to')) {
                    const [start, end] = range.split('to').map(r => {
                        const match = r.trim().match(/\d+-(\d+)/);
                        return match ? parseInt(match[1]) : 0;
                    });
                    const shelfNum = parseInt(shelf);
                    if (shelfNum >= start && shelfNum <= end) {
                        collection = coll;
                        break;
                    }
                } else if (range.includes(input)) {
                    collection = coll;
                    break;
                }
            }
            if (collection) break;
        }
        
        return {
            success: true,
            type: 'shelf',
            level: levelNum,
            shelf: input,
            collection: collection ? collection.name : 'Unknown',
            audience: collection ? collection.audience : 'Unknown'
        };
    }

    static parseFiction(input) {
        const parts = input.split(/\s+/);
        const section = parts[0];
        const author = parts[1];
        
        const sectionInfo = SECTION_CODES[section];
        if (!sectionInfo) {
            return { success: false, error: 'Unknown section code' };
        }
        
        return {
            success: true,
            type: 'fiction',
            section: section,
            sectionName: sectionInfo.name,
            author: author,
            level: sectionInfo.level,
            audience: sectionInfo.audience,
            description: sectionInfo.description
        };
    }

    static parseNonFiction(input) {
        const parts = input.split(/\s+/);
        const section = parts[0];
        const ddc = parts[1];
        const author = parts.length > 2 ? parts[2] : null;
        
        const sectionInfo = SECTION_CODES[section];
        const ddcNum = parseFloat(ddc);
        const ddcInfo = this.getDDCInfo(ddcNum);
        
        // Determine level based on DDC range for Junior books
        let level = 2; // Default for Junior books
        if (section === 'J' && ddcNum >= 0 && ddcNum < 500) {
            level = 2; // Fiction and early non-fiction
        } else if (section === 'J' && ddcNum >= 500) {
            level = 4; // Sciences and advanced topics
        }
        
        return {
            success: true,
            type: 'non-fiction',
            section: section,
            sectionName: sectionInfo ? sectionInfo.name : section,
            ddc: ddc,
            ddcCategory: ddcInfo.category,
            ddcExamples: ddcInfo.examples,
            author: author,
            level: level,
            audience: sectionInfo ? sectionInfo.audience : 'Unknown'
        };
    }

    static parseDDCOnly(input) {
        const ddcNum = parseFloat(input);
        const ddcInfo = this.getDDCInfo(ddcNum);
        
        // Special case for 398.2 (folktales)
        if (input === '398.2') {
            return {
                success: true,
                type: 'special',
                specialType: 'folktales',
                ddc: '398.2',
                ddcCategory: 'Folktales & Folklore',
                level: 2,
                collection: 'Folktales',
                shelf: '2-47',
                audience: 'Children'
            };
        }
        
        return {
            success: true,
            type: 'ddc',
            ddc: input,
            ddcCategory: ddcInfo.category,
            ddcExamples: ddcInfo.examples,
            level: ddcNum < 500 ? 2 : 4
        };
    }

    static parseAdultFiction(input) {
        return {
            success: true,
            type: 'adult-fiction',
            author: input,
            level: 3,
            audience: 'Adults',
            collection: 'English Fiction'
        };
    }

    static getDDCInfo(ddc) {
        const ranges = Object.keys(LIBRARY_DATA.ddcRanges);
        for (const range of ranges) {
            const [start, end] = range.split('-').map(r => parseInt(r));
            if (ddc >= start && ddc <= end) {
                return LIBRARY_DATA.ddcRanges[range];
            }
        }
        return { category: 'Unknown', examples: [] };
    }
}

// ==========================
// LOCATION FINDER
// ==========================

class LocationFinder {
    static findLocation(parsedData) {
        if (!parsedData.success) {
            return parsedData;
        }

        let shelfLocation = '';
        let tips = [];

        switch (parsedData.type) {
            case 'fiction':
                shelfLocation = this.findFictionLocation(parsedData);
                tips = this.getFictionTips(parsedData);
                break;
            case 'non-fiction':
                shelfLocation = this.findNonFictionLocation(parsedData);
                tips = this.getNonFictionTips(parsedData);
                break;
            case 'special':
                shelfLocation = parsedData.shelf;
                tips = this.getSpecialTips(parsedData);
                break;
            case 'shelf':
                shelfLocation = parsedData.shelf;
                tips = this.getShelfTips(parsedData);
                break;
            case 'ddc':
                shelfLocation = this.findDDCLocation(parsedData);
                tips = this.getDDCTips(parsedData);
                break;
            case 'adult-fiction':
                shelfLocation = '3-10 to 3-14';
                tips = this.getAdultFictionTips(parsedData);
                break;
        }

        return {
            ...parsedData,
            shelfLocation,
            tips,
            mapImage: LIBRARY_DATA.levels[parsedData.level]?.mapImage
        };
    }

    static findFictionLocation(data) {
        if (data.section === 'JS') {
            return '2-13 to 2-25';
        } else if (data.section === 'J') {
            return '2-32 to 2-37';
        } else if (data.section === 'JP') {
            return '2-38 to 2-44';
        }
        return '2-32 to 2-37';
    }

    static findNonFictionLocation(data) {
        const ddcNum = parseFloat(data.ddc);
        
        if (data.section === 'J' || data.section === 'JS') {
            if (ddcNum >= 0 && ddcNum < 500) {
                return '2-38 to 2-40';
            } else {
                return '4-47 to 4-49';
            }
        }
        return '4-47 to 4-49';
    }

    static findDDCLocation(data) {
        const ddcNum = parseFloat(data.ddc);
        if (ddcNum < 500) {
            return '2-38 to 2-40';
        }
        return '4-26 to 4-35';
    }

    static getFictionTips(data) {
        return [
            `Fiction books are arranged alphabetically by author's surname`,
            `Look for "${data.author}" on the spine label`,
            `${data.sectionName} books are easy to identify by their section label`,
            `Books are sorted A-Z within the ${data.sectionName} section`
        ];
    }

    static getNonFictionTips(data) {
        return [
            `Non-Fiction books are arranged numerically by DDC number first`,
            `Find the ${data.ddc} section (${data.ddcCategory})`,
            `Then look alphabetically by author "${data.author}"`,
            `Check the spine label for the complete call number`
        ];
    }

    static getSpecialTips(data) {
        if (data.specialType === 'folktales') {
            return [
                `Folktales are always classified as 398.2`,
                `Located in the Children Collection on Level 2`,
                `Even though they're stories, they're in Non-Fiction`,
                `Arranged by culture or region within the 398.2 section`
            ];
        }
        return [];
    }

    static getShelfTips(data) {
        return [
            `Go directly to ${data.collection}`,
            `Located in the ${data.audience} section`,
            `Look for shelf marker ${data.shelf}`,
            `Books are arranged by call number on the shelf`
        ];
    }

    static getDDCTips(data) {
        return [
            `This is a DDC number in the ${data.ddcCategory} section`,
            `Examples in this range: ${data.ddcExamples.join(', ')}`,
            `Look for the numerical markers on the shelves`,
            `Books within this DDC range are arranged by author surname`
        ];
    }

    static getAdultFictionTips(data) {
        return [
            `Adult Fiction is on Level 3`,
            `Books are arranged alphabetically by author surname`,
            `Look for "${data.author}" on the spine labels`,
            `Located in shelves 3-10 to 3-14`
        ];
    }
}

// ==========================
// VALIDATION & ERROR HANDLING
// ==========================

class Validator {
    static validateCallNumber(input) {
        const errors = [];
        const warnings = [];

        if (!input || input.trim().length === 0) {
            errors.push('Please enter a call number');
            return { valid: false, errors, warnings };
        }

        const cleaned = input.trim().toUpperCase();

        // Check for common mistakes
        if (cleaned.includes('  ')) {
            warnings.push('Remove extra spaces between parts');
        }

        if (cleaned.includes('.') && cleaned.split('.').length > 2) {
            errors.push('DDC numbers should have at most one decimal point');
        }

        // Check for lowercase (should be uppercase)
        if (input !== input.toUpperCase()) {
            warnings.push('Call numbers should be in uppercase');
        }

        // Check for special characters
        if (/[^A-Z0-9\s.-]/.test(cleaned)) {
            errors.push('Call numbers should only contain letters, numbers, spaces, periods, and hyphens');
        }

        return {
            valid: errors.length === 0,
            errors,
            warnings,
            cleaned
        };
    }

    static suggestCorrections(input) {
        const suggestions = [];
        const cleaned = input.trim().toUpperCase();

        // Suggest removing extra spaces
        if (cleaned.includes('  ')) {
            suggestions.push(cleaned.replace(/\s+/g, ' '));
        }

        // Suggest common section codes
        if (/^[A-Z]\s/.test(cleaned) && !cleaned.startsWith('JS') && !cleaned.startsWith('JP')) {
            suggestions.push('J' + cleaned.substring(1));
            suggestions.push('JS' + cleaned.substring(1));
        }

        // Suggest DDC format
        if (/^\d{3}\s[A-Z]/.test(cleaned)) {
            const parts = cleaned.split(/\s+/);
            suggestions.push(`J ${parts[0]} ${parts[1]}`);
        }

        return suggestions;
    }
}

// ==========================
// UI CONTROLLER
// ==========================

class UIController {
    constructor(state) {
        this.state = state;
        this.initializeElements();
        this.initializeMaterialize();
        this.attachEventListeners();
        this.updateUI();
    }

    initializeElements() {
        this.elements = {
            callNumberInput: document.getElementById('callNumberInput'),
            searchBtn: document.getElementById('searchBtn'),
            resultCard: document.getElementById('resultCard'),
            resultContent: document.getElementById('resultContent'),
            errorCard: document.getElementById('errorCard'),
            errorMessage: document.getElementById('errorMessage'),
            suggestions: document.getElementById('suggestions'),
            historyList: document.getElementById('historyList'),
            clearHistoryBtn: document.getElementById('clearHistoryBtn'),
            mapContainer: document.getElementById('mapContainer'),
            floorMap: document.getElementById('floorMap'),
            navigationSteps: document.getElementById('navigationSteps'),
            helpBtn: document.getElementById('helpBtn'),
            inputHelper: document.getElementById('inputHelper')
        };
    }

    initializeMaterialize() {
        // Initialize sidenav
        M.Sidenav.init(document.querySelectorAll('.sidenav'));
        
        // Initialize modal
        M.Modal.init(document.querySelectorAll('.modal'));
        
        // Initialize collapsible
        M.Collapsible.init(document.querySelectorAll('.collapsible'));
        
        // Initialize floating action button
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));
    }

    attachEventListeners() {
        // Search functionality
        this.elements.searchBtn.addEventListener('click', () => this.handleSearch());
        this.elements.callNumberInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        // Input validation
        this.elements.callNumberInput.addEventListener('input', (e) => {
            this.validateInput(e.target.value);
        });

        // Example chips
        document.querySelectorAll('.example-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const example = e.target.getAttribute('data-example');
                this.elements.callNumberInput.value = example;
                this.elements.callNumberInput.focus();
                M.updateTextFields();
            });
        });

        // History
        this.elements.clearHistoryBtn.addEventListener('click', () => this.clearHistory());

        // Help
        this.elements.helpBtn.addEventListener('click', () => {
            const modal = M.Modal.getInstance(document.getElementById('helpModal'));
            modal.open();
        });

        // DDC items
        document.querySelectorAll('.ddc-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const range = e.currentTarget.getAttribute('data-range');
                M.toast({ html: `DDC Range: ${range}`, displayLength: 2000 });
            });
        });
    }

    validateInput(value) {
        const validation = Validator.validateCallNumber(value);
        
        if (value.length > 0) {
            if (validation.valid) {
                this.elements.callNumberInput.classList.remove('invalid');
                this.elements.callNumberInput.classList.add('valid');
                this.elements.inputHelper.textContent = 'Valid format ✓';
                this.elements.inputHelper.style.color = '#43a047';
            } else if (validation.errors.length > 0) {
                this.elements.callNumberInput.classList.remove('valid');
                this.elements.callNumberInput.classList.add('invalid');
                this.elements.inputHelper.textContent = validation.errors[0];
                this.elements.inputHelper.style.color = '#e53935';
            }
        } else {
            this.elements.callNumberInput.classList.remove('valid', 'invalid');
            this.elements.inputHelper.textContent = 'Enter the call number from the book spine';
            this.elements.inputHelper.style.color = '#666';
        }
    }

    handleSearch() {
        const input = this.elements.callNumberInput.value;
        const validation = Validator.validateCallNumber(input);

        if (!validation.valid) {
            this.showError(validation.errors[0], Validator.suggestCorrections(input));
            this.state.recordSearch(input, false);
            return;
        }

        const parsed = CallNumberParser.parse(validation.cleaned);
        
        if (!parsed.success) {
            this.showError(parsed.error, Validator.suggestCorrections(input));
            this.state.recordSearch(input, false);
            return;
        }

        const location = LocationFinder.findLocation(parsed);
        this.displayResult(location);
        this.state.addToHistory(validation.cleaned, location);
        this.state.recordSearch(validation.cleaned, true, location.collection);
        this.updateStatistics();
        this.renderHistory();
    }

    displayResult(location) {
        this.elements.errorCard.style.display = 'none';
        this.elements.resultCard.style.display = 'block';

        const resultHTML = `
            <div class="result-info">
                <div class="info-item">
                    <div class="info-label">Book Type</div>
                    <div class="info-value">${this.getBookType(location)}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Collection</div>
                    <div class="info-value">${location.collection || location.sectionName || 'General'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Floor Level</div>
                    <div class="info-value">Level ${location.level}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Shelf Location</div>
                    <div class="info-value">${location.shelfLocation}</div>
                </div>
                ${location.ddcCategory ? `
                <div class="info-item">
                    <div class="info-label">Topic Category</div>
                    <div class="info-value">${location.ddcCategory}</div>
                </div>
                ` : ''}
                ${location.author ? `
                <div class="info-item">
                    <div class="info-label">Author Code</div>
                    <div class="info-value">${location.author}</div>
                </div>
                ` : ''}
            </div>
        `;

        this.elements.resultContent.innerHTML = resultHTML;

        // Display map
        if (location.mapImage) {
            this.elements.floorMap.src = location.mapImage;
            this.elements.mapContainer.style.display = 'block';
        }

        // Display navigation steps
        this.displayNavigationSteps(location);

        // Scroll to result
        setTimeout(() => {
            this.elements.resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);

        M.toast({ html: 'Book location found!', displayLength: 2000, classes: 'green' });
    }

    getBookType(location) {
        if (location.type === 'fiction' || location.type === 'adult-fiction') {
            return 'Fiction';
        } else if (location.type === 'non-fiction' || location.type === 'ddc') {
            return 'Non-Fiction';
        } else if (location.type === 'special') {
            return 'Special Collection';
        }
        return 'General';
    }

    displayNavigationSteps(location) {
        const steps = [
            `Go to <strong>Level ${location.level}</strong> of Punggol Regional Library`,
            `Find the <strong>${location.collection || 'designated'}</strong> section`,
            `Locate shelf range <strong>${location.shelfLocation}</strong>`,
            ...location.tips.map(tip => tip)
        ];

        const stepsHTML = steps.map((step, index) => `
            <div class="step-item">
                <div class="step-number">${index + 1}</div>
                <div class="step-text">${step}</div>
            </div>
        `).join('');

        this.elements.navigationSteps.innerHTML = `
            <h6><i class="material-icons tiny">directions_walk</i> Step-by-Step Guide:</h6>
            ${stepsHTML}
        `;
    }

    showError(message, suggestions = []) {
        this.elements.resultCard.style.display = 'none';
        this.elements.errorCard.style.display = 'block';
        this.elements.errorMessage.textContent = message;

        if (suggestions.length > 0) {
            const suggestionsHTML = `
                <div style="margin-top: 15px;">
                    <strong>Did you mean?</strong>
                    ${suggestions.map(s => `
                        <div class="suggestion-item" onclick="document.getElementById('callNumberInput').value='${s}'; M.updateTextFields();">
                            ${s}
                        </div>
                    `).join('')}
                </div>
            `;
            this.elements.suggestions.innerHTML = suggestionsHTML;
        } else {
            this.elements.suggestions.innerHTML = '';
        }

        setTimeout(() => {
            this.elements.errorCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }

    renderHistory() {
        if (this.state.searchHistory.length === 0) {
            this.elements.historyList.innerHTML = '<div class="center-align grey-text">No search history yet</div>';
            return;
        }

        const historyHTML = this.state.searchHistory.map((item, index) => {
            const date = new Date(item.timestamp);
            const timeStr = date.toLocaleTimeString();
            return `
                <div class="collection-item">
                    <div>
                        <span class="history-call-number">${item.callNumber}</span>
                        <br>
                        <span class="history-timestamp">${timeStr}</span>
                    </div>
                    <div class="history-actions">
                        <i class="material-icons" onclick="ui.repeatSearch('${item.callNumber}')" title="Search again">refresh</i>
                        <i class="material-icons" onclick="ui.deleteHistoryItem(${index})" title="Delete">delete</i>
                    </div>
                </div>
            `;
        }).join('');

        this.elements.historyList.innerHTML = historyHTML;
    }

    repeatSearch(callNumber) {
        this.elements.callNumberInput.value = callNumber;
        M.updateTextFields();
        this.handleSearch();
    }

    deleteHistoryItem(index) {
        this.state.searchHistory.splice(index, 1);
        this.state.saveToStorage('searchHistory', this.state.searchHistory);
        this.renderHistory();
        M.toast({ html: 'History item deleted', displayLength: 1500 });
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all search history?')) {
            this.state.clearHistory();
            this.renderHistory();
            M.toast({ html: 'History cleared', displayLength: 2000 });
        }
    }

    updateStatistics() {
        document.getElementById('booksPerHour').textContent = this.state.getBooksPerHour();
        document.getElementById('totalSearches').textContent = this.state.statistics.totalSearches;
        document.getElementById('errorRate').textContent = this.state.getErrorRate() + '%';
        document.getElementById('sessionTime').textContent = this.state.getSessionDuration();

        this.renderChallengingSections();
        this.renderActivityChart();
    }

    renderChallengingSections() {
        const sections = Object.entries(this.state.statistics.challengingSections)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        if (sections.length === 0) {
            document.getElementById('challengingSections').innerHTML = 
                '<p class="grey-text">No data yet</p>';
            return;
        }

        const html = sections.map(([section, count]) => `
            <div class="challenge-item">
                <span class="challenge-name">${section}</span>
                <span class="challenge-count">${count} searches</span>
            </div>
        `).join('');

        document.getElementById('challengingSections').innerHTML = html;
    }

    renderActivityChart() {
        const canvas = document.getElementById('activityChart');
        const ctx = canvas.getContext('2d');

        // Prepare data for last 10 searches
        const times = this.state.statistics.searchTimes.slice(-10);
        const labels = times.map((t, i) => `#${i + 1}`);
        const data = times.map((t, i, arr) => {
            if (i === 0) return 0;
            return Math.round((t - arr[i - 1]) / 1000); // seconds between searches
        });

        if (window.activityChart) {
            window.activityChart.destroy();
        }

        window.activityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Time Between Searches (seconds)',
                    data: data,
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Seconds'
                        }
                    }
                }
            }
        });
    }

    updateUI() {
        this.renderHistory();
        this.updateStatistics();
    }
}

// ==========================
// INITIALIZATION
// ==========================

let state, ui;

document.addEventListener('DOMContentLoaded', () => {
    state = new AppState();
    ui = new UIController(state);

    // Update statistics every 30 seconds
    setInterval(() => {
        ui.updateStatistics();
    }, 30000);

    console.log('Punggol Regional Library Book Shelving Assistant loaded successfully!');
});