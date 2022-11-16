export const calculateTimeRemaining = (futureTime, onComplete) => {
    var diff = futureTime - new Date().getTime();

    // console.log(diff, typeof(diff), diff < 2000, diff < Number(2000))
    if (diff < 3000) {
        // console.log("stop running countdown")
        onComplete();
        return "1s";
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    var result = "";
    if (days !== 0) {
        result += days + "d ";
    }

    if (hours !== 0) {
        result += hours + "h ";
    }

    if (minutes !== 0) {
        result += minutes + "m ";
    }

    if (seconds !== 0) {
        result += seconds + "s ";
    }

    return result;

}