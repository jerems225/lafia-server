const orderModel = require("../../models/order-model");
const promoCodeModel = require("../../models/promo-code-model");

async function generateOrderRef(length){

    // declare all characters
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const orders = await orderModel.find();

    return `CM-${orders.length}-${result}`;
}

async function totalAmount(orderProducts, orderPromoCode)
{
    let totalAmount = 0;
    var percent = 0;
    orderProducts.forEach((orderProduct) => {
        let product = orderProduct.product;
        let quantity = orderProduct.quantity;

        totalAmount =  totalAmount + (product.price * quantity);
    })

    if(orderPromoCode)
    {
        const promoCode = await promoCodeModel.findOne({ code : orderPromoCode });
        if(promoCode.promoPercent != 0)
        {
            percent = promoCode.promoPercent/100;
            totalAmount = totalAmount * percent;
        }
    }

    return totalAmount;
}

async function generateDeliveryCode(length)
{
    // declare all characters
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const orders = await orderModel.find();

    return `DL-${orders.length}-${result}`;
}

module.exports = {
    generateOrderRef : generateOrderRef,
    totalAmount : totalAmount,
    generateDeliveryCode : generateDeliveryCode
}