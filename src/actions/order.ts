import type { OrderInput } from "../interfaces/order.interfcae";
import { supabase } from "../supabase/client";

//Transaccion para una orden.
export const createOrder = async(order:OrderInput)=>{
    //1 Obtener el usuario autenticado mas el cliente de la tabla customer
    const {data,error:errorUser} = await supabase.auth.getUser();

    if(errorUser){
        console.info(errorUser)
        throw new Error(errorUser.message);
    }

    const userId = data.user.id;

    const {data:customer, error:errorCustomer} = await supabase.from("customers").select("id").eq("user_id",userId).single();

    if(errorCustomer){
        console.info(errorCustomer);
        throw new Error(errorCustomer.message);
    }

    const customerId = customer.id;

    //2. Verificar que haya stock suficiente para cada variante en el carrito

    for(const item of order.cartItems){
        const {data:variantData,error:variantError} = await supabase.from("variants").select("stock").eq("id",item.variantId).single();
    
        if(variantError){
            console.info(variantError);
            throw new Error(variantError.message);
        }

        if(variantData.stock < item.quantity){
            throw new Error("No hay stock suficiente para los articulos seleccionados")
        }
    }

    //3. Guardar la direccion del envio
    const {data:addresData,error:errorAddress} = await supabase.from("addresses").insert({
        address_line1:order.address.addressLine1,
        address_line2:order.address.addressLine2,
        city:order.address.city,
        state:order.address.state,
        postal_code:order.address.postalCode,
        country:order.address.country,
        customer_id:customerId,
    }).select().single();

    if(errorAddress){
        console.log(errorAddress);
        throw new Error(errorAddress.message);
    }

    //4. Crear la orden
    const {data:orderData} = await supabase.from("orders").insert({
        customer_id:customerId,
        address_id:addresData.id,
        total_amount:order.totalAmount,
        status:"Pending",
    }).select().single();

    //5. Guardar los detalles de la orden
    const orderItems = order.cartItems.map(item=>({
        order_id:orderData?.id,
        variant_id:item.variantId,
        quantity:item.quantity,
        price:item.price,
    }))

    const {error: orderItemsError} = await supabase.from("orders_item").insert(orderItems);

    if(orderItemsError){
        console.log(orderItemsError)
        throw new Error(orderItemsError.message);
    }

    //6 actualizar el stock de las variantes
    for(const item of order.cartItems){
        //Obtener el stock actual
        const {data:variantData} = await supabase.from("variants").select("stock").eq("id", item.variantId).single();

        if(!variantData){
            throw new Error("No se encontro la variante");
        }

        const newStock = variantData.stock-item.quantity;

        //Actualizar la variante

        const {error:updatedStockError} = await supabase.from("variants").update({stock:newStock}).eq("id",item.variantId);
    
        if(updatedStockError){
            console.info(updatedStockError);
            throw new Error("No se pudo actualizar el stock de la variante");
        }
    
    }

    return orderData;
}


export const getOrdersByCustomerId = async()=>{
    
    const {data,error} = await supabase.auth.getUser();

    if(error){
        console.log(error);
        throw new Error(error.message);
    }

    const {data:customer,error:customerError} = await supabase.from("customers").select("id").eq("user_id",data.user.id).single();

    if(customerError){
        console.log(customerError);
        throw new Error(customerError.message);
    }

    const customerId = customer.id;

    const {data:ordersData,error:errorOrders} = await supabase.from("orders").select("id, total_amount, status,created_at").eq("customer_id",customerId).order("created_at",{
        ascending:false
    })

    if(errorOrders){
        console.log(errorOrders);
        throw new Error(errorOrders.name);
    }

    return ordersData;
}

export const getOrderById = async(orderId:number)=>{


    const {data,error} = await supabase.auth.getUser();

    if(error){
        console.log(error);
        throw new Error(error.message);
    }

    const {data:customer,error:customerError} = await supabase.from("customers").select("id").eq("user_id",data.user.id).single();

    if(customerError){
        console.log(customerError);
        throw new Error(customerError.message);
    }

    const customerId = customer.id;

    const {data:order,error:orderError} = await supabase
    .from("orders")
    .select("*,addresses(*), customers(fullName,email),orders_item(quantity,price,variants(color_name,storage,products(name,images)))")
    .eq("customer_id",customerId)
    .eq("id",orderId)
    .single();

    if(orderError){
        console.log(orderError);
        throw new Error(orderError.message);
    }

    return {
        customer:{
            email:order.customers.email,
            fullName: order.customers.fullName,
        },
        total_amount:order.total_amount,
        status: order.status,
        address:{
            addressLine1: order.addresses.address_line1,
            addressLine2: order.addresses.address_line2,
            city:order.addresses.city,
            state: order.addresses.state,
            postalCode: order.addresses.postal_code,
            country:order.addresses.country,
        },
        orderItems: order.orders_item.map(item =>({
            quantity:item.quantity,
            price:item.price,
            color_name:item.variants?.color_name,
            storage:item.variants?.storage,
            productName:item.variants?.products.name,
            productImage:item.variants?.products.images[0],

        }))
    }
}