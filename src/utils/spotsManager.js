// Shared spots management utility
class SpotsManager {
    constructor() {
        this.storageKey = 'remainingSpots';
        this.minSpots = 2;
        this.maxSpots = 6;
    }

    // Get or initialize spots count
    getSpotsLeft() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored === null) {
            // First visit - generate random spots between 2-6
            const initialSpots = Math.floor(Math.random() * (this.maxSpots - this.minSpots + 1)) + this.minSpots;
            localStorage.setItem(this.storageKey, initialSpots.toString());
            return initialSpots;
        }
        return parseInt(stored);
    }

    // Decrease spots count (when someone "books")
    decrementSpots() {
        const current = this.getSpotsLeft();
        const newCount = Math.max(this.minSpots, current - 1);
        localStorage.setItem(this.storageKey, newCount.toString());
        return newCount;
    }

    // Get today's date in format "Month Day"
    getTodaysDate() {
        const options = { month: "long", day: "numeric" };
        return new Date().toLocaleDateString("en-US", options);
    }

    // Update any element with spots count
    updateSpotsDisplay(elementId, spotsCount = null) {
        const element = document.getElementById(elementId);
        if (element) {
            const spots = spotsCount || this.getSpotsLeft();
            element.textContent = spots.toString();
        }
    }

    // Update element with spots count and date
    updateSpotsWithDate(elementId, spotsCount = null) {
        const element = document.getElementById(elementId);
        if (element) {
            const spots = spotsCount || this.getSpotsLeft();
            const date = this.getTodaysDate();
            element.textContent = `${spots} spots left as of ${date}`;
        }
    }

    // Initialize spots display for multiple elements
    initializeSpots() {
        const spots = this.getSpotsLeft();
        
        // Update all elements that show spots count
        this.updateSpotsDisplay('spots-left-offer', spots);
        this.updateSpotsDisplay('spots-left-mobile', spots);
        this.updateSpotsDisplay('exit-intent-spots', spots);
        
        return spots;
    }
}

// Export as singleton
window.spotsManager = new SpotsManager(); 