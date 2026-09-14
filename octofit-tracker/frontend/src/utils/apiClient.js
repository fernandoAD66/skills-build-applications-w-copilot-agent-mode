/**
 * API Client utility for Codespaces and localhost support
 * 
 * Environment Setup:
 * - For Codespaces: Create .env.local with VITE_CODESPACE_NAME=<your-codespace-name>
 * - For localhost: Leave VITE_CODESPACE_NAME unset (falls back to localhost:8000)
 * 
 * Example .env.local:
 * VITE_CODESPACE_NAME=my-codespace-name
 */

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  
  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-8000.app.github.dev`
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:8000'
}

const API_BASE_URL = getApiBaseUrl()

/**
 * Fetch data from API endpoint
 * Handles both array and paginated responses
 */
export const fetchFromApi = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    throw error
  }
}

export { API_BASE_URL }
