const GOOGLE_SCOPES = "email profile openid";

let scriptPromise = null;

const loadGoogleScript = () => {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (window.google?.accounts) {
      resolve(window.google);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => resolve(window.google);
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Failed to load Google identity services."));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
};

export const signInWithGoogle = () =>
  new Promise((resolve, reject) => {
    loadGoogleScript()
      .then((google) => {
        const client = google.accounts.oauth2.initTokenClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: GOOGLE_SCOPES,
          callback: (response) => {
            if (response.error) {
              reject(new Error("Google sign-in was cancelled or failed."));
              return;
            }
            resolve(response.access_token);
          },
        });
        client.requestAccessToken();
      })
      .catch(reject);
  });