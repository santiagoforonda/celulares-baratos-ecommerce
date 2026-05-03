import { BsTwitterX } from "react-icons/bs"
import { FaBoxOpen, FaCartShopping, FaFacebook } from "react-icons/fa6"
import { GrInstagram } from "react-icons/gr"

export const navBarLinks =[
    {
        id:1,
        title:"Inicio",
        href:"/"
    },
    {
        id:2,
        title:"Celulares",
        href:"/celulares"
    },
    {
        id:3,
        title:"Sobre nosotros",
        href:"/nosotros"
    }
]

export const socialLinks =[
    {
        id:1,
        title:"Facebook",
        href:"https://www.facebook.com",
        icon:<FaFacebook></FaFacebook>
    },
    {
        id:2,
        title:"Twitter",
        href:"https://www.x.com",
        icon:<BsTwitterX />
    },
    {
        id:3,
        title:"Instagram",
        href:"https://www.instagram.com",
        icon:<GrInstagram />
    }   
]


export const dashboardLinks =[
    {
        id:1,
        title:"Productos",
        href:"/dashboard/productos",
        icon:<FaBoxOpen size={25}></FaBoxOpen>
    },
    {
        id:2,
        title:"Ordenes",
        href:"/dashboard/ordenes",
        icon:<FaCartShopping></FaCartShopping>
    }
]