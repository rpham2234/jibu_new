import React from "react";

export default function PageTitle(
    {
        title = "Title",
    }:{
        title?: string,
    }
) {
    return(
        <div className="container mx-auto my-6 flex flex-col items-center text-center">            
            <h1 className="text-2xl md:text-5xl font-semibold">{title}</h1> 
        </div>
    )
}