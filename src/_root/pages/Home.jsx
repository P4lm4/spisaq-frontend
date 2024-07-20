import React from "react";
import AddCardNote from "../components/AddCardNote";
import CardNote from "../components/CardNote";

function Home() {

    return(
        <div className="flex flex-wrap items-center justify-around">
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