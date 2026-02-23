/**
 * Age Counter - Calculates and displays precise age
 * Updates every 50ms for smooth animation
 */

class AgeCounter {
  constructor(birthDate, elementId) {
    this.birthDate = new Date(birthDate);
    this.elementId = elementId;
    this.updateInterval = null;
  }

  // Calculate current age
  calculateAge() {
    const now = new Date();
    const timeDiff = now.getTime() - this.birthDate.getTime();
    const msPerYear = 1000 * 60 * 60 * 24 * 365.25; // Account for leap years
    return timeDiff / msPerYear;
  }

  // Update the display
  updateDisplay() {
    const ageElement = document.getElementById(this.elementId);
    if (ageElement) {
      const age = this.calculateAge();
      ageElement.textContent = `> I am = ${age.toFixed(9)} years old`;
    }
  }

  // Start the counter
  start(interval = 50) {
    this.updateDisplay(); // Immediate update
    this.updateInterval = setInterval(() => this.updateDisplay(), interval);
  }

  // Stop the counter
  stop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const ageCounter = new AgeCounter('1998-10-02', 'years-counter');
  ageCounter.start(50);
});