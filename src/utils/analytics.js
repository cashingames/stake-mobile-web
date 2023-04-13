import { logEvent } from "firebase/analytics";
import { initializeAnalytics } from "../firebaseConfig";
const analytics = initializeAnalytics()

export default function logToAnalytics(eventName, data) {

    logEvent(analytics, eventName, data)

}