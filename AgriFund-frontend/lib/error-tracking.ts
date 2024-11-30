export function initErrorTracking() {
  if (typeof window !== 'undefined') {
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      // Log to your error tracking service
      console.error('Client Error:', {
        message: msg,
        url,
        lineNo,
        columnNo,
        error
      })
      return false
    }

    window.addEventListener('unhandledrejection', function(event) {
      console.error('Unhandled Promise Rejection:', event.reason)
    })
  }
} 