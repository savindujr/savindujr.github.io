/**
 * Visitor Info - Fetches and displays visitor information
 * Uses ip-api.com with ipify.org fallback
 */

class VisitorInfo {
  constructor(elementId) {
    this.elementId = elementId;
    this.connectionStatusId = 'connection-status';
    this.timestampId = 'timestamp';
  }

  // Main fetch function
  async fetchVisitorInfo() {
    try {
      // Try primary API first
      const data = await this.fetchFromPrimaryAPI();
      if (data) {
        this.renderSuccess(data);
      } else {
        throw new Error('Primary API failed');
      }
    } catch (error) {
      console.warn('Primary API failed, trying fallback:', error);
      await this.fallbackToIPOnly();
    }
  }

  // Primary API (ip-api.com)
  async fetchFromPrimaryAPI() {
    try {
      const response = await fetch(
        'http://ip-api.com/json/?fields=status,message,country,regionName,city,isp,org,query,lat,lon,timezone'
      );
      const data = await response.json();
      
      return data.status === 'success' ? data : null;
    } catch (error) {
      console.error('Primary API error:', error);
      return null;
    }
  }

  // Render successful data
  renderSuccess(data) {
    const infoHTML = `
      <div class="space-y-2">
        <div class="flex items-start">
          <span class="text-green-400 mr-3">$></span>
          <span class="text-gray-500 text-xs w-20">IP_ADDR</span>
          <span class="text-green-400">${data.query}</span>
        </div>
      </div>
    `;
    
    document.getElementById(this.elementId).innerHTML = infoHTML;
  }

  // Fallback to IP-only service
  async fallbackToIPOnly() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      
      const fallbackHTML = `
        <div class="space-y-2">
          <div class="flex items-start">
            <span class="text-green-400 mr-3">$></span>
            <span class="text-gray-500 text-xs w-20">IP_ADDR</span>
            <span class="text-green-400">${data.ip}</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-400 mr-3">$></span>
            <span class="text-gray-500 text-xs w-20">STATUS</span>
            <span class="text-yellow-400">Location unavailable (limited mode)</span>
          </div>
        </div>
      `;
      
      document.getElementById(this.elementId).innerHTML = fallbackHTML;
    } catch (error) {
      this.renderError('Failed to fetch visitor data');
    }
  }

  // Render error state
  renderError(message) {
    document.getElementById(this.elementId).innerHTML = `
      <div class="flex items-start">
        <span class="text-red-400 mr-3">⛔</span>
        <span class="text-red-400/70">${message}</span>
      </div>
    `;
  }

  // Update timestamp
  updateTimestamp() {
    const now = new Date();
    const timestampElement = document.getElementById(this.timestampId);
    if (timestampElement) {
      timestampElement.textContent = now.toLocaleTimeString() + ' UTC';
    }
  }

  // Update connection status
  updateConnectionStatus() {
    const statusElement = document.getElementById(this.connectionStatusId);
    if (statusElement) {
      const isOnline = navigator.onLine;
      statusElement.textContent = isOnline ? '● ONLINE' : '● OFFLINE';
      statusElement.className = isOnline ? 'text-green-400 mr-2' : 'text-red-400 mr-2';
    }
  }

  // Initialize all features
  init() {
    // Fetch visitor info
    this.fetchVisitorInfo();
    
    // Update timestamp every second
    setInterval(() => this.updateTimestamp(), 1000);
    
    // Monitor connection status
    window.addEventListener('online', () => this.updateConnectionStatus());
    window.addEventListener('offline', () => this.updateConnectionStatus());
    
    // Initial connection status
    this.updateConnectionStatus();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const visitorInfo = new VisitorInfo('visitor-info');
  visitorInfo.init();
});