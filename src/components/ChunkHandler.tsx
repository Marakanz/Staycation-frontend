// ChunkErrorHandler.tsx - Create this as a separate utility
import React from 'react';

// Retry function for failed chunk loading
const retryChunkLoad = (fn: () => Promise<any>, retriesLeft = 3, interval = 1000): Promise<any> => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        console.log(`Chunk loading failed, retries left: ${retriesLeft}`);
        
        // If it's a chunk loading error and we have retries left
        if (retriesLeft > 0 && (
          error.name === 'ChunkLoadError' || 
          error.message.includes('Loading chunk') ||
          error.message.includes('Unexpected token')
        )) {
          setTimeout(() => {
            retryChunkLoad(fn, retriesLeft - 1, interval).then(resolve, reject);
          }, interval);
        } else {
          reject(error);
        }
      });
  });
};

// Enhanced lazy loading function with retry logic
export const createRetryableLazyComponent = (importFunc: () => Promise<{ default: React.ComponentType<any> }>) => {
  return React.lazy(() => 
    retryChunkLoad(importFunc).catch(() => {
      console.error('All chunk loading retries failed, showing error component');
      return {
        default: () => (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Loading Error</h2>
              <p className="text-gray-600 mb-4">
                Failed to load this page. This usually happens after a site update.
              </p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 mr-2"
              >
                Refresh Page
              </button>
              <button 
                onClick={() => window.location.href = '/'} 
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Go Home
              </button>
            </div>
          </div>
        )
      };
    })
  );
};

// Global error handler for chunk loading errors
export const setupChunkErrorHandler = () => {
  // Handle unhandled promise rejections (chunk loading errors)
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    
    if (error && (
      error.name === 'ChunkLoadError' || 
      (typeof error.message === 'string' && error.message.includes('Loading chunk'))
    )) {
      console.error('Chunk loading error detected, reloading page...');
      event.preventDefault(); // Prevent the error from being logged to console
      
      // Show a user-friendly message before reload
      const shouldReload = window.confirm(
        'The application needs to reload to get the latest version. Click OK to continue.'
      );
      
      if (shouldReload) {
        window.location.reload();
      }
    }
  });

//   // Handle chunk loading errors from dynamic imports
//   const originalImport = window.__webpack_require__.e;
//   if (originalImport) {
//     window.__webpack_require__.e = function(chunkId) {
//       return originalImport.call(this, chunkId).catch((error) => {
//         console.error(`Failed to load chunk ${chunkId}:`, error);
        
//         // Retry the chunk loading once
//         return originalImport.call(this, chunkId).catch((retryError) => {
//           console.error(`Retry failed for chunk ${chunkId}:`, retryError);
//           throw retryError;
//         });
//       });
//     };
//   }
};

// Call this in your main App component or index.tsx
declare global {
  interface Window {
    __webpack_require__: any;
  }
}