import { getMessaging, getToken, onMessage } from "firebase/messaging";
import app from "./firebaseConfig";

const messaging = getMessaging(app);

// Request Notification Permission & Get Token
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.error("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

// Listen for Incoming Messages (Foreground)
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Foreground Message Received:", payload);
      resolve(payload);
    });
  });
