import React from 'react';

export const NextArrow=(props)=>{
    // const{className,style,onClick}=props;
    return(
        <>
        <div className={props.className}
        style={{ ...props.style, 
            backgroundColor: "rgba(0, 0, 0, 10)",
            padding: "0.2px",
            display:"flex",
            borderRadius:"100%",
            justifyContent:"center",
            alignItems:"center",
            width:"0.8rem",
            height:"0.8rem",
            boxShadow: "0px 0px 10px 4px red"
        }}
        onClick={props.onClick}
        />
        </>
    )
}

export const PrevArrow=(props)=>{
    // const{className,style,}
    return(
        <>
        
            <div className={props.className}
            style={{ ...props.style,
                backgroundColor: "rgba(0, 0, 0, 10)",
                padding: "0.2px",
                display:"flex",
                borderRadius:"100%",
                justifyContent:"center",
                alignItems:"center",
                width:"0.8rem",
                height:"0.8rem",
                boxShadow: "0px 0px 10px 4px red"
            }}
            onClick={props.onClick}
            />
        </>
    )
}