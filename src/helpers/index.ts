
//Funcion para formatear moneda

import type { Color, Product, Variant } from "../interfaces/product.interface";

export const formatPrice =(price:number)=>{
    return new Intl.NumberFormat("en-US",{
        style:"currency",
        currency:"USD",
        minimumFractionDigits:2,
        maximumFractionDigits:2,
    }).format(price);
}

export const prepareProducts = (products: Product[]) => {
	return products.map(product => {
		// Agrupar las variantes por color
		const colors = product.variants.reduce(
			(acc: Color[], variant: Variant) => {
				const existingColor = acc.find(
					item => item.color === variant.color
				);

				if (existingColor) {
					// Si ya existe el color, comparamos los precios
					existingColor.price = Math.min(
						existingColor.price,
						variant.price
					);
				} // Mantenemos el precio mínimo
				else {
					acc.push({
						color: variant.color,
						price: variant.price,
						name: variant.color_name,
					});
				}

				return acc;
			},
			[]
		);

		// Obtener el precio más bajo de las variantes agrupadas
		const price = Math.min(...colors.map(item => item.price));

		// Devolver el producto formateado
		return {
			...product,
			price,
			colors: colors.map(({ name, color }) => ({ name, color })),
			variants: product.variants,
		};
	});
};

//Funcion para formatear la fecha a formato 3 de enero de 2022
export const formatDateLong =(date:string):string=>{
	const dateObject = new Date(date);

	return dateObject.toLocaleString("es-Es",{year:"numeric",month:"long",day:"numeric"})
}

//Funcion para formatear la fecha en 2/10/29
export const formatDate =(date:string):string =>{
	const dateObject = new Date(date);
	return dateObject.toLocaleDateString("es-Es",{
		year:"numeric",
		month:"2-digit",
		day:"numeric",
	})
}

//Funcion para obtener el estado del pedido en español
export const getStatus =(status:string):string=>{
	switch(status){
		case "Pending": return "Pendiente";
		case "Paid": return "Pagado";
		case "Shipped": return "Enviado";
		case "Delivered" :return "Entregado";
	}

	return status;
}


//Funcion para generar el slug de un producto
export const generateSlug = (name:string):string=>{
	return name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
}