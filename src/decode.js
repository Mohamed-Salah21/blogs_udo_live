export const session =
  "eyJwYXlsb2FkIjp7InRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmZhV1FpT2lJMk5qUTVPV1UzWkRVd1lXSXpZV1l5TURVd05EWTBabVVpTENKcFlYUWlPakUzTVRjek1UazVPVFFzSW1WNGNDSTZNVGN5TlRBNU5UazVOSDAuUUU2aF9QaWZxTThiZ0Q0ZTBicThUbmJXdlFmdHFzV1VUS1MxbFpKcXJQVSIsImV4cGlyZXNJbiI6IjkwZCJ9fQ==";

// Function to Base64 decode
function base64Decode(str) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

// Function to decrypt (Assuming a simple encryption for demonstration; adjust accordingly)
function decrypt(data) {
  // Implement your decryption logic here
  // This is a placeholder and should be replaced with actual decryption code
  return data; // Return the decrypted data
}
const decryptionKey = "MY_COOKIE_SECRET!!!"; // Replace with your actual decryption key

export function decodeSession() {
  const encodedSession = session;
  if (!encodedSession) {
    return null;
  }

  // Step 2: Base64 decode the session data
  const base64DecodedSession = base64Decode(encodedSession);

  // Step 3: Decrypt the session data (if applicable)
  const decryptedSession = decrypt(base64DecodedSession, decryptionKey);

  // Step 4: Parse the JSON string to get the session object
  const sessionData = JSON.parse(decryptedSession);

  return sessionData;
}
