const firebase = require('firebase-admin');
const serviceAccount = require('../../../../config/lafia-owner-app-firebase-adminsdk-w3tdf-62fc692d85.json');
const ownerModel = require('../../../../models/owner-model');

const TIME_TO_LIVE = 60 * 60 * 24;

async function sendPushNotification(title, message, order, ownerId)
{

    firebase.initializeApp({
        credential :firebase.credential.cert(serviceAccount)
    })

    const owner = await ownerModel.findById(ownerId);
    let payload = {
        //notification message display
        notification : {
            title: title,
            body: message,
            click_action: 'FLUTTER_NOTIFICATION_CLICK'
        },
        
        //charge utile
        data:{
            orderRef: order.orderRef,
            orderDate: order.updateAt
        }
    }

    const options = {
        priority: 'high',
        timeToLive: TIME_TO_LIVE
    }

    firebase.messaging().sendToDevice(owner.ownerDeviceTokens, payload, options)
}


module.exports = {
    ownerSendPushNotification : sendPushNotification
}