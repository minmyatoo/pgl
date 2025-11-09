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
            mapImage: "images/level1-floor-plan.jpg"
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
            mapImage: "images/level2-floor-plan.jpg"
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
            mapImage: "images/level3-floor-plan.jpg"
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
            mapImage: "images/level4-floor-plan.jpg"
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
            searchTimes: [],
            levelDistribution: { 1: 0, 2: 0, 3: 0, 4: 0 },
            hourlyDistribution: Array(24).fill(0)
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
            console.warn(`Storage access blocked or error loading ${key}:`, e.message);
            return defaultValue;
        }
    }

    saveToStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn(`Storage access blocked or error saving ${key}:`, e.message);
            // Continue without storage - app will work but won't persist data
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

    recordSearch(callNumber, success, section = null, level = null) {
        this.statistics.totalSearches++;
        this.currentSession.searches++;

        if (success) {
            this.statistics.successfulSearches++;
            if (section) {
                this.statistics.challengingSections[section] =
                    (this.statistics.challengingSections[section] || 0) + 1;
            }
            if (level && level >= 1 && level <= 4) {
                this.statistics.levelDistribution[level] =
                    (this.statistics.levelDistribution[level] || 0) + 1;
            }
        } else {
            this.statistics.errors++;
            this.currentSession.errors++;
        }

        const now = new Date();
        const hour = now.getHours();
        if (!this.statistics.hourlyDistribution) {
            this.statistics.hourlyDistribution = Array(24).fill(0);
        }
        this.statistics.hourlyDistribution[hour]++;

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
        
        // Language-specific fiction: TAMIL MIYM, MALAY MIYM, CHINESE MIYM, ENGLISH MIYM
        if (/^(TAMIL|MALAY|CHINESE|ENGLISH)\s+[A-Z]{3,4}$/.test(cleaned)) {
            return this.parseLanguageFiction(cleaned);
        }
        
        // Fiction pattern: JS STI, J LEF, etc.
        if (/^(JS|J|JP|YA|SING)\s+[A-Z]{3,4}/.test(cleaned)) {
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
        
        // Adult fiction: 3-4 letter author codes (CAS, CAT, MIUS, MIYK)
        if (/^[A-Z]{3,4}$/.test(cleaned)) {
            return this.parseAdultFiction(cleaned);
        }
        
        // Shelf number search: just a shelf number without level (18, 26, 47, etc.)
        if (/^\d{1,2}$/.test(cleaned)) {
            return this.parseShelfNumberOnly(cleaned);
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
            collection: 'English Fiction',
            authorLength: input.length,
            language: 'English' // Default to English if no language specified
        };
    }

    static parseLanguageFiction(input) {
        const parts = input.split(/\s+/);
        const language = parts[0];
        const author = parts[1];
        
        // Language-specific shelf locations
        const languageMap = {
            'ENGLISH': {
                shelf: '3-10 to 3-14',
                collection: 'English Fiction',
                level: 3,
                icon: '📕 Red',
                description: 'Adult English Fiction'
            },
            'TAMIL': {
                shelf: '3-35',
                collection: 'Tamil Fiction',
                level: 3,
                icon: '📘 Blue',
                description: 'Adult Tamil Fiction'
            },
            'MALAY': {
                shelf: '3-36',
                collection: 'Malay Fiction',
                level: 3,
                icon: '📗 Green',
                description: 'Adult Malay Fiction'
            },
            'CHINESE': {
                shelf: '3-26 to 3-32',
                collection: 'Chinese Fiction',
                level: 3,
                icon: '📓 Black',
                description: 'Adult Chinese Fiction'
            }
        };
        
        const langInfo = languageMap[language];
        
        if (!langInfo) {
            return { 
                success: false, 
                error: `Language "${language}" not recognized. Try: English, Tamil, Malay, or Chinese` 
            };
        }
        
        return {
            success: true,
            type: 'language-fiction',
            language: language,
            author: author,
            authorLength: author.length,
            level: langInfo.level,
            shelf: langInfo.shelf,
            collection: langInfo.collection,
            languageIcon: langInfo.icon,
            audience: 'Adults',
            description: langInfo.description
        };
    }

    static parseShelfNumberOnly(input) {
        const shelfNum = parseInt(input);
        const possibleLocations = [];
        
        // Search through all levels for matching shelf numbers
        Object.keys(LIBRARY_DATA.levels).forEach(levelNum => {
            const levelData = LIBRARY_DATA.levels[levelNum];
            levelData.collections.forEach(coll => {
                const ranges = coll.range.split(',').map(r => r.trim());
                ranges.forEach(range => {
                    if (range.includes('to')) {
                        const [start, end] = range.split('to').map(r => {
                            const match = r.trim().match(/\d+-(\d+)/);
                            return match ? parseInt(match[1]) : 0;
                        });
                        if (shelfNum >= start && shelfNum <= end) {
                            possibleLocations.push({
                                level: parseInt(levelNum),
                                collection: coll.name,
                                audience: coll.audience,
                                fullShelf: `${levelNum}-${shelfNum}`,
                                range: range
                            });
                        }
                    } else {
                        const match = range.match(/\d+-(\d+)/);
                        if (match && parseInt(match[1]) === shelfNum) {
                            possibleLocations.push({
                                level: parseInt(levelNum),
                                collection: coll.name,
                                audience: coll.audience,
                                fullShelf: `${levelNum}-${shelfNum}`,
                                range: range
                            });
                        }
                    }
                });
            });
        });
        
        if (possibleLocations.length === 0) {
            return { 
                success: false, 
                error: `Shelf number ${input} not found in any level` 
            };
        }
        
        return {
            success: true,
            type: 'shelf-search',
            shelfNumber: input,
            locations: possibleLocations,
            level: possibleLocations[0].level, // Default to first match
            audience: possibleLocations[0].audience
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
            case 'shelf-search':
                shelfLocation = parsedData.locations[0].fullShelf;
                tips = this.getShelfSearchTips(parsedData);
                parsedData.collection = parsedData.locations[0].collection;
                break;
            case 'ddc':
                shelfLocation = this.findDDCLocation(parsedData);
                tips = this.getDDCTips(parsedData);
                break;
            case 'adult-fiction':
                shelfLocation = '3-10 to 3-14';
                tips = this.getAdultFictionTips(parsedData);
                break;
            case 'language-fiction':
                shelfLocation = parsedData.shelf;
                tips = this.getLanguageFictionTips(parsedData);
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
            `Look for "${data.author}" (${data.authorLength} letter code) on the spine labels`,
            `Located in shelves 3-10 to 3-14`,
            `Author codes can be 3-4 letters (e.g., CAS, CAT, MIUS, MIYK)`
        ];
    }

    static getShelfSearchTips(data) {
        const tips = [
            `Shelf number ${data.shelfNumber} found in ${data.locations.length} location(s):`,
        ];
        
        data.locations.forEach((loc, index) => {
            tips.push(`${index + 1}. Level ${loc.level} - ${loc.collection} (${loc.fullShelf}) - ${loc.audience} section`);
        });
        
        tips.push(`Most likely location: ${data.locations[0].fullShelf}`);
        tips.push(`Collection: ${data.locations[0].collection}`);
        
        return tips;
    }

    static getLanguageFictionTips(data) {
        return [
            `${data.language} Fiction on Level 3`,
            `Look for spine label with ${data.languageIcon} indicator`,
            `Books are arranged alphabetically by author surname`,
            `Author code: "${data.author}" (${data.authorLength} letters)`,
            `Located in shelves ${data.shelf}`,
            `${data.description} section`,
            `All ${data.language} fiction books are grouped together`
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
            exportHistoryBtn: document.getElementById('exportHistoryBtn'),
            exportStatsBtn: document.getElementById('exportStatsBtn'),
            printResultBtn: document.getElementById('printResultBtn'),
            mapContainer: document.getElementById('mapContainer'),
            floorMap: document.getElementById('floorMap'),
            navigationSteps: document.getElementById('navigationSteps'),
            helpBtn: document.getElementById('helpBtn'),
            inputHelper: document.getElementById('inputHelper'),
            themeToggle: document.getElementById('themeToggle'),
            themeToggleMobile: document.getElementById('themeToggleMobile')
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

        // Skip to main content link (for keyboard navigation)
        this.addSkipLink();

        // Example chips with keyboard support
        document.querySelectorAll('.example-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const example = e.target.getAttribute('data-example');
                this.elements.callNumberInput.value = example;
                this.elements.callNumberInput.focus();
                M.updateTextFields();
            });

            // Keyboard support for example chips
            chip.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const example = e.target.getAttribute('data-example');
                    this.elements.callNumberInput.value = example;
                    this.elements.callNumberInput.focus();
                    M.updateTextFields();
                }
            });
        });

        // History
        this.elements.clearHistoryBtn.addEventListener('click', () => this.clearHistory());

        // Export functionality
        if (this.elements.exportHistoryBtn) {
            this.elements.exportHistoryBtn.addEventListener('click', () => this.exportHistory());
        }
        if (this.elements.exportStatsBtn) {
            this.elements.exportStatsBtn.addEventListener('click', () => this.exportStatistics());
        }

        // Print functionality
        if (this.elements.printResultBtn) {
            this.elements.printResultBtn.addEventListener('click', () => window.print());
        }

        // Help
        this.elements.helpBtn.addEventListener('click', () => {
            const modal = M.Modal.getInstance(document.getElementById('helpModal'));
            modal.open();
        });

        // DDC items with keyboard support
        document.querySelectorAll('.ddc-item').forEach(item => {
            // Make focusable
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');

            item.addEventListener('click', (e) => {
                const range = e.currentTarget.getAttribute('data-range');
                M.toast({ html: `DDC Range: ${range}`, displayLength: 2000 });
            });

            // Keyboard support
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const range = e.currentTarget.getAttribute('data-range');
                    M.toast({ html: `DDC Range: ${range}`, displayLength: 2000 });
                }
            });
        });

        // Theme toggle
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        }

        if (this.elements.themeToggleMobile) {
            this.elements.themeToggleMobile.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
                // Close mobile menu
                const sidenavInstance = M.Sidenav.getInstance(document.getElementById('mobile-menu'));
                if (sidenavInstance) sidenavInstance.close();
            });
        }

        // Load theme preference
        this.loadTheme();
    }

    toggleTheme() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Update icon
        const icon = isDarkMode ? 'brightness_7' : 'brightness_4';
        if (this.elements.themeToggle) {
            this.elements.themeToggle.querySelector('i').textContent = icon;
        }
        if (this.elements.themeToggleMobile) {
            this.elements.themeToggleMobile.querySelector('i').textContent = icon;
        }

        M.toast({
            html: isDarkMode ? 'Dark mode enabled' : 'Light mode enabled',
            displayLength: 1500
        });
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            const icon = 'brightness_7';
            if (this.elements.themeToggle) {
                this.elements.themeToggle.querySelector('i').textContent = icon;
            }
            if (this.elements.themeToggleMobile) {
                this.elements.themeToggleMobile.querySelector('i').textContent = icon;
            }
        }
    }

    addSkipLink() {
        // Add skip to main content link for keyboard users
        const skipLink = document.createElement('a');
        skipLink.href = '#search-section';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #667eea;
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enableMapInteractions() {
        const mapContainer = this.elements.mapContainer;
        const floorMap = this.elements.floorMap;

        if (!mapContainer || !floorMap) return;

        let scale = 1;
        let panning = false;
        let pointX = 0;
        let pointY = 0;
        let start = { x: 0, y: 0 };

        // Mouse/Touch panning
        const startPan = (e) => {
            panning = true;
            start = { x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY };
            mapContainer.style.cursor = 'grabbing';
        };

        const pan = (e) => {
            if (!panning) return;
            e.preventDefault();
            const x = e.clientX || e.touches[0].clientX;
            const y = e.clientY || e.touches[0].clientY;
            const dx = x - start.x;
            const dy = y - start.y;

            mapContainer.scrollLeft -= dx;
            mapContainer.scrollTop -= dy;

            start = { x, y };
        };

        const endPan = () => {
            panning = false;
            mapContainer.style.cursor = 'grab';
        };

        // Add event listeners
        floorMap.addEventListener('mousedown', startPan);
        floorMap.addEventListener('touchstart', startPan, { passive: false });
        floorMap.addEventListener('mousemove', pan);
        floorMap.addEventListener('touchmove', pan, { passive: false });
        floorMap.addEventListener('mouseup', endPan);
        floorMap.addEventListener('touchend', endPan);
        floorMap.addEventListener('mouseleave', endPan);

        // Pinch-to-zoom for mobile
        let initialDistance = 0;
        let currentScale = 1;

        const getDistance = (touches) => {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        };

        floorMap.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                initialDistance = getDistance(e.touches);
            }
        }, { passive: true });

        floorMap.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const currentDistance = getDistance(e.touches);
                const scaleChange = currentDistance / initialDistance;
                currentScale = Math.min(Math.max(1, currentScale * scaleChange), 3);
                floorMap.style.transform = `scale(${currentScale})`;
                initialDistance = currentDistance;
            }
        }, { passive: false });

        floorMap.addEventListener('touchend', () => {
            initialDistance = 0;
        });

        // Double-tap to zoom
        let lastTap = 0;
        floorMap.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 300 && tapLength > 0) {
                e.preventDefault();
                if (currentScale > 1) {
                    currentScale = 1;
                    floorMap.style.transform = 'scale(1)';
                } else {
                    currentScale = 2;
                    floorMap.style.transform = 'scale(2)';
                }
            }
            lastTap = currentTime;
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
        this.state.recordSearch(validation.cleaned, true, location.collection, location.level);
        this.updateStatistics();
        this.renderHistory();
    }

    displayResult(location) {
        this.elements.errorCard.style.display = 'none';
        this.elements.resultCard.style.display = 'block';

        // Handle shelf-search type with multiple locations
        let additionalInfo = '';
        if (location.type === 'shelf-search' && location.locations && location.locations.length > 1) {
            additionalInfo = `
                <div class="info-item" style="grid-column: 1 / -1;">
                    <div class="info-label">Multiple Locations Found</div>
                    <div class="info-value">
                        ${location.locations.map((loc, idx) => `
                            <div style="padding: 8px; margin: 5px 0; background: #e3f2fd; border-radius: 4px;">
                                <strong>Option ${idx + 1}:</strong> Level ${loc.level} - ${loc.collection} (${loc.fullShelf})
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Language-specific info
        let languageInfo = '';
        if (location.type === 'language-fiction') {
            languageInfo = `
                <div class="info-item">
                    <div class="info-label">Language</div>
                    <div class="info-value">${location.language} ${location.languageIcon}</div>
                </div>
            `;
        }

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
                ${languageInfo}
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
                    <div class="info-value">${location.author}${location.authorLength ? ` (${location.authorLength} letters)` : ''}</div>
                </div>
                ` : ''}
                ${additionalInfo}
            </div>
        `;

        this.elements.resultContent.innerHTML = resultHTML;

        // Display map with interactive marker
        if (location.mapImage) {
            this.elements.floorMap.src = location.mapImage;
            this.elements.mapContainer.style.display = 'block';
            this.positionLocationMarker(location);
            this.enableMapInteractions();
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
        } else if (location.type === 'language-fiction') {
            return `${location.language} Fiction`;
        } else if (location.type === 'non-fiction' || location.type === 'ddc') {
            return 'Non-Fiction';
        } else if (location.type === 'special') {
            return 'Special Collection';
        } else if (location.type === 'shelf-search') {
            return 'Shelf Location Search';
        }
        return 'General';
    }

    positionLocationMarker(location) {
        const marker = document.getElementById('locationMarker');
        if (!marker) return;

        // Approximate coordinates based on level and shelf location (percentages)
        const coordinates = this.getMarkerCoordinates(location);

        if (coordinates) {
            marker.style.left = coordinates.x + '%';
            marker.style.top = coordinates.y + '%';
            marker.style.display = 'block';
            marker.title = `${location.collection || 'Location'}: ${location.shelfLocation}`;
        } else {
            marker.style.display = 'none';
        }
    }

    getMarkerCoordinates(location) {
        // Map shelf locations to approximate coordinates on floor plans
        // Format: { x: percentage from left, y: percentage from top }
        const shelfCoordinates = {
            // Level 1
            '1-01 to 1-03': { x: 20, y: 30 },
            '1-04 to 1-23': { x: 60, y: 50 },

            // Level 2
            '2-01 to 2-12': { x: 25, y: 35 },
            '2-13 to 2-25': { x: 50, y: 40 },
            '2-26 to 2-31': { x: 70, y: 45 },
            '2-32 to 2-37': { x: 45, y: 55 },
            '2-38 to 2-40': { x: 30, y: 60 },
            '2-47': { x: 60, y: 65 },

            // Level 3
            '3-10 to 3-14': { x: 40, y: 40 },
            '3-18': { x: 30, y: 35 },
            '3-25': { x: 50, y: 50 },
            '3-26 to 3-32': { x: 65, y: 45 },
            '3-33 to 3-34': { x: 55, y: 55 },
            '3-35': { x: 70, y: 60 },
            '3-36': { x: 75, y: 55 },

            // Level 4
            '4-09 to 4-14': { x: 25, y: 35 },
            '4-15 to 4-20': { x: 45, y: 40 },
            '4-21 to 4-25': { x: 55, y: 45 },
            '4-26 to 4-35': { x: 50, y: 55 },
            '4-37 to 4-44': { x: 65, y: 50 },
            '4-45': { x: 70, y: 55 },
            '4-46': { x: 75, y: 60 },
            '4-47 to 4-49': { x: 60, y: 65 }
        };

        // Try exact match first
        if (shelfCoordinates[location.shelfLocation]) {
            return shelfCoordinates[location.shelfLocation];
        }

        // Try to find a matching range
        for (const [range, coords] of Object.entries(shelfCoordinates)) {
            if (range.includes(location.shelfLocation)) {
                return coords;
            }
        }

        // Default position for level
        const defaultPositions = {
            1: { x: 50, y: 45 },
            2: { x: 50, y: 45 },
            3: { x: 50, y: 45 },
            4: { x: 50, y: 45 }
        };

        return defaultPositions[location.level] || { x: 50, y: 50 };
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
        this.renderSuccessChart();
        this.renderLevelChart();
        this.renderPerformanceInsights();
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
        if (!canvas || typeof Chart === 'undefined') return;

        const ctx = canvas.getContext('2d');
        const times = this.state.statistics.searchTimes.slice(-10);

        if (times.length < 2) return;

        const labels = times.map((t, i) => `#${i + 1}`);
        const data = times.map((t, i, arr) => {
            if (i === 0) return 0;
            return Math.round((t - arr[i - 1]) / 1000);
        });

        if (window.activityChart && typeof window.activityChart.destroy === 'function') {
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

    renderSuccessChart() {
        const canvas = document.getElementById('successChart');
        if (!canvas || typeof Chart === 'undefined') return;

        const ctx = canvas.getContext('2d');
        const stats = this.state.statistics;

        if (window.successChart && typeof window.successChart.destroy === 'function') {
            window.successChart.destroy();
        }

        window.successChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Successful', 'Errors'],
                datasets: [{
                    data: [stats.successfulSearches, stats.errors],
                    backgroundColor: ['#43a047', '#e53935'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    renderLevelChart() {
        const canvas = document.getElementById('levelChart');
        if (!canvas || typeof Chart === 'undefined') return;

        const ctx = canvas.getContext('2d');
        const levelDist = this.state.statistics.levelDistribution || { 1: 0, 2: 0, 3: 0, 4: 0 };

        if (window.levelChart && typeof window.levelChart.destroy === 'function') {
            window.levelChart.destroy();
        }

        window.levelChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4'],
                datasets: [{
                    label: 'Searches by Level',
                    data: [levelDist[1] || 0, levelDist[2] || 0, levelDist[3] || 0, levelDist[4] || 0],
                    backgroundColor: ['#1976d2', '#43a047', '#fb8c00', '#9c27b0'],
                    borderWidth: 1,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    renderPerformanceInsights() {
        const container = document.getElementById('performanceInsights');
        if (!container) return;

        const stats = this.state.statistics;
        const avgSearchTime = this.calculateAverageSearchTime();
        const peakHour = this.getPeakHour();

        const insights = [
            {
                icon: 'speed',
                label: 'Average Search Time',
                value: avgSearchTime ? `${avgSearchTime.toFixed(1)}s` : 'N/A',
                color: 'blue'
            },
            {
                icon: 'schedule',
                label: 'Peak Activity Hour',
                value: peakHour >= 0 ? `${peakHour}:00` : 'N/A',
                color: 'purple'
            },
            {
                icon: 'trending_up',
                label: 'Success Rate',
                value: `${100 - this.state.getErrorRate()}%`,
                color: 'green'
            },
            {
                icon: 'library_books',
                label: 'Most Popular Level',
                value: this.getMostPopularLevel(),
                color: 'orange'
            }
        ];

        const html = insights.map(insight => `
            <div class="insight-card ${insight.color}-text">
                <i class="material-icons">${insight.icon}</i>
                <div class="insight-content">
                    <div class="insight-label">${insight.label}</div>
                    <div class="insight-value">${insight.value}</div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    calculateAverageSearchTime() {
        const times = this.state.statistics.searchTimes;
        if (times.length < 2) return null;

        let totalTime = 0;
        for (let i = 1; i < times.length; i++) {
            totalTime += (times[i] - times[i - 1]) / 1000;
        }
        return totalTime / (times.length - 1);
    }

    getPeakHour() {
        const hourlyDist = this.state.statistics.hourlyDistribution;
        if (!hourlyDist || hourlyDist.every(h => h === 0)) return -1;

        let maxHour = 0;
        let maxCount = 0;
        for (let i = 0; i < hourlyDist.length; i++) {
            if (hourlyDist[i] > maxCount) {
                maxCount = hourlyDist[i];
                maxHour = i;
            }
        }
        return maxHour;
    }

    getMostPopularLevel() {
        const levelDist = this.state.statistics.levelDistribution;
        if (!levelDist) return 'N/A';

        let maxLevel = 1;
        let maxCount = 0;
        for (const [level, count] of Object.entries(levelDist)) {
            if (count > maxCount) {
                maxCount = count;
                maxLevel = level;
            }
        }
        return maxCount > 0 ? `Level ${maxLevel}` : 'N/A';
    }

    exportHistory() {
        if (this.state.searchHistory.length === 0) {
            M.toast({ html: 'No search history to export', displayLength: 2000, classes: 'orange' });
            return;
        }

        // Create CSV content
        const headers = ['Timestamp', 'Call Number', 'Level', 'Collection', 'Shelf Location'];
        const rows = this.state.searchHistory.map(item => {
            const date = new Date(item.timestamp);
            const result = item.result || {};
            return [
                date.toLocaleString(),
                item.callNumber,
                result.level || 'N/A',
                result.collection || result.sectionName || 'N/A',
                result.shelfLocation || 'N/A'
            ];
        });

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        // Download CSV
        this.downloadFile(csvContent, 'search-history.csv', 'text/csv');
        M.toast({ html: 'Search history exported successfully!', displayLength: 2000, classes: 'green' });
    }

    exportStatistics() {
        const stats = this.state.statistics;

        // Create CSV content
        const csvContent = [
            'Metric,Value',
            `Total Searches,${stats.totalSearches}`,
            `Successful Searches,${stats.successfulSearches}`,
            `Errors,${stats.errors}`,
            `Error Rate,${this.state.getErrorRate()}%`,
            `Books Per Hour,${this.state.getBooksPerHour()}`,
            `Session Duration (minutes),${this.state.getSessionDuration()}`,
            '',
            'Challenging Sections',
            'Section,Search Count',
            ...Object.entries(stats.challengingSections)
                .sort((a, b) => b[1] - a[1])
                .map(([section, count]) => `"${section}",${count}`)
        ].join('\n');

        // Download CSV
        this.downloadFile(csvContent, 'performance-statistics.csv', 'text/csv');
        M.toast({ html: 'Statistics exported successfully!', displayLength: 2000, classes: 'green' });
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded - statistics chart will be disabled');
    }

    state = new AppState();
    ui = new UIController(state);

    // Update statistics every 30 seconds
    setInterval(() => {
        ui.updateStatistics();
    }, 30000);

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }

    console.log('Punggol Regional Library Book Shelving Assistant loaded successfully!');

    // Show welcome toast
    setTimeout(() => {
        M.toast({
            html: '👋 Welcome! Enter a call number to find book locations.',
            displayLength: 4000,
            classes: 'blue'
        });
    }, 500);
});