// Service Worker for MedAid PWA
const CACHE_NAME = 'medaid-v1.0.0';
const STATIC_CACHE = 'medaid-static-v1';
const DYNAMIC_CACHE = 'medaid-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/offline.html',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap'
];

// Critical canned responses for offline use
const OFFLINE_RESPONSES = {
  'fever': {
    hi: 'बुखार के लिए आराम करें, पानी पिएं। 102°F से ज्यादा हो तो डॉक्टर से मिलें।',
    en: 'For fever: rest, drink fluids. See doctor if >102°F.',
  },
  'headache': {
    hi: 'सिरदर्द के लिए आराम करें, पानी पिएं। बहुत तेज हो तो डॉक्टर से मिलें।',
    en: 'For headache: rest, hydrate. See doctor if severe.',
  }
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content, fallback strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle different types of requests
  if (request.url.includes('/api/ai/chat')) {
    // AI Chat API - Network first, cache fallback
    event.respondWith(handleAIRequest(request));
  } else if (request.url.includes('/api/')) {
    // Other APIs - Network first
    event.respondWith(handleAPIRequest(request));
  } else {
    // Static assets - Cache first
    event.respondWith(handleStaticRequest(request));
  }
});

// Handle AI chat requests with offline fallback
async function handleAIRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('[SW] Network failed for AI request, trying offline');
  }

  // Offline fallback - serve canned response
  try {
    const requestData = await request.json().catch(() => ({}));
    const query = requestData.message || '';
    const language = requestData.language || 'en';
    
    const offlineResponse = generateOfflineResponse(query, language);
    
    return new Response(JSON.stringify(offlineResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Served-By': 'ServiceWorker-Offline'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      message: 'Offline mode. Please check your connection.',
      offline: true
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle general API requests
async function handleAPIRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('[SW] Network failed for API request');
  }

  // Try cached version
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Return offline message
  return new Response(JSON.stringify({
    error: 'Service unavailable offline',
    offline: true
  }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Handle static asset requests
async function handleStaticRequest(request) {
  // Try cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Try network
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('[SW] Network failed for static request');
  }

  // Fallback to offline page for navigation requests
  if (request.mode === 'navigate') {
    return caches.match('/offline.html');
  }

  return new Response('Offline', { status: 503 });
}

// Generate offline response for common symptoms
function generateOfflineResponse(query, language) {
  const lowerQuery = query.toLowerCase();
  
  // Simple keyword matching
  for (const [symptom, responses] of Object.entries(OFFLINE_RESPONSES)) {
    if (lowerQuery.includes(symptom) || 
        lowerQuery.includes(responses[language]?.split(' ')[0])) {
      
      return {
        message: responses[language] || responses['en'],
        disclaimer: language === 'hi' 
          ? '⚠️ यह केवल सामान्य जानकारी है। डॉक्टर की सलाह लें।'
          : '⚠️ This is general information only. Consult a doctor.',
        offline: true,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Default offline response
  const defaultResponses = {
    hi: 'माफ करें, अभी ऑफ़लाइन हैं। कनेक्शन वापस आने पर कोशिश करें। आपातकाल में 108 डायल करें।',
    en: 'Sorry, currently offline. Try again when connection is restored. For emergencies, dial 108.'
  };

  return {
    message: defaultResponses[language] || defaultResponses['en'],
    disclaimer: language === 'hi' 
      ? '⚠️ यह केवल सामान्य जानकारी है। डॉक्टर की सलाह लें।'
      : '⚠️ This is general information only. Consult a doctor.',
    offline: true,
    timestamp: new Date().toISOString()
  };
}

// Background sync for queued actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(processBackgroundSync());
  }
});

// Process queued actions when back online
async function processBackgroundSync() {
  console.log('[SW] Processing background sync');
  
  // Get queued actions from IndexedDB
  // This would integrate with the app's offline queue
  
  // Example: sync reminder updates, chat logs, etc.
}

// Push notifications for reminders
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      vibrate: [200, 100, 200],
      data: data.data,
      actions: [
        {
          action: 'taken',
          title: 'Taken',
          icon: '/icons/check.png'
        },
        {
          action: 'snooze',
          title: 'Snooze 15min',
          icon: '/icons/snooze.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'taken') {
    // Mark reminder as taken
    event.waitUntil(
      clients.openWindow('/reminders?action=taken&id=' + event.notification.data.id)
    );
  } else if (event.action === 'snooze') {
    // Snooze reminder
    event.waitUntil(
      clients.openWindow('/reminders?action=snooze&id=' + event.notification.data.id)
    );
  } else {
    // Default: open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});