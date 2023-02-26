import { logEvent } from "firebase/analytics";
import firebaseConfig from "../firebaseConfig";
const analytics = firebaseConfig();

export default function logToAnalytics(eventName, data) {

    logEvent(analytics, eventName, data)

}