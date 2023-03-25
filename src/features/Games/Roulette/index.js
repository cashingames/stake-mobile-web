// import "./styles.css";
// import { useState } from "react";
// import WheelComponent from "react-wheel-of-prizes";
import { Wheel } from "./Wheel";

export default function App() {


    const segments = [
        "x1",
        "x2",
        "x3",
        "x4",
        "x5",
        "x6",
        "x7",
        "x8",
    ];
    // const [winner, setWinner] = useState(undefined);

    return (
        <Wheel items={segments} />
    );
}
