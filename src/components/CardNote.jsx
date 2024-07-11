import React from "react";

function CardNote() {


    return(
        <div className="flex flex-col items-center justify-stretch my-1 w-60 h-80 rounded-xl text-white shadow p-5 bg-black opacity-90">
            <div className="basis-1/4 flex flex-col items-center justify-center">
                <p>Posao</p>
                <p>12-06-2024</p>
            </div>
            <div className="basis-3/4 flex items-center justify-center bg-white opacity-80 rounded-3xl w-full text-black">
                <p className="text-wrap">
                    asdffasafsaa
                </p>
            </div>
        </div>
    )
}

export default CardNote