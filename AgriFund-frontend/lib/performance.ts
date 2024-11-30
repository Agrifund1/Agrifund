// Extend the Performance interface to include memory property
declare global {
  interface Performance {
    memory?: {
      totalJSHeapSize: number;
      usedJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  }
}

export function trackPagePerformance() {
  if (typeof window !== 'undefined') {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    const metrics = {
      // Navigation timing
      pageLoadTime: (navigation as PerformanceNavigationTiming).loadEventEnd - (navigation as PerformanceNavigationTiming).startTime,
      dnsLookupTime: (navigation as PerformanceNavigationTiming).domainLookupEnd - (navigation as PerformanceNavigationTiming).domainLookupStart,
      tcpConnectionTime: (navigation as PerformanceNavigationTiming).connectEnd - (navigation as PerformanceNavigationTiming).connectStart,
      serverResponseTime: navigation.responseEnd - navigation.requestStart,
      domContentLoadedTime: (navigation as PerformanceNavigationTiming).domContentLoadedEventEnd - (navigation as PerformanceNavigationTiming).startTime,
      
      // Memory usage
      jsHeapSize: (performance.memory ? performance.memory.usedJSHeapSize : undefined),
      
      // Resource timing
      resources: performance.getEntriesByType('resource').map(resource => {
        const res = resource as PerformanceResourceTiming;
        return {
          name: res.name,
          duration: res.duration,
          size: res.transferSize
        }
      })
    }
    
    // Send metrics to analytics service
    console.log('Performance Metrics:', metrics)
  }
} 