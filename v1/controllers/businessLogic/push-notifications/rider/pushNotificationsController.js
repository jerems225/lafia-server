const firebase = require('firebase-admin');
const serviceAccount = require('../../../../config/lafia-driver-app-firebase-adminsdk-gt560-68be3bc080.json');
const riderModel = require('../../../../models/rider-model');

const TIME_TO_LIVE = 60 * 60 * 24;

async function sendPushNotification(title, message, order, riderId) {

    try {
        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount)
        })

        const rider = await riderModel.findById(riderId);
        let payload = {
            //notification message display
            notification: {
                title: title,
                body: message,
                click_action: 'FLUTTER_NOTIFICATION_CLICK'
            },

            //charge utile
            data: {
                orderRef: order.orderRef,
                orderDate: order.updateAt
            }
        }

        const options = {
            priority: 'high',
            timeToLive: TIME_TO_LIVE
        }

        firebase.messaging().sendToDevice(rider.riderDeviceTokens, payload, options)
    }
    catch (e) {
        console.log({
            status: 500,
            message: "An error server try occurred, Please again or check the message error !",
            data: e.message
        })
    }
}


module.exports = {
    riderSendPushNotification: sendPushNotification
}