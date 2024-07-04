import React from "react";
import CardNote from "./components/CardNote";
import AddCardNote from "./components/AddCardNote";

function Home() {

    return(
        <div className="flex flex-wrap items-center justify-around m-14">
            <AddCardNote />
            <CardNote />
            <CardNote />
            <CardNote />
            <CardNote />
            <CardNote />

        </div>
    )
}

export default Home