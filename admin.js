

const {kafka}=require("./client")

async function init(){
    const admin=kafka.admin()
    console.log("Admin connecting...")
    await admin.connect()
    console.log("Admin connection successfully")

    //create the topics
    console.log("Creating Topics")
    await admin.createTopics({
        topics:[{
            topic:'rider-updates',
            numPartitions:2,

        }]
    })
    console.log("Topic created")

    await admin.disconnect()
    console.log('Admin disconnected')
}

init();




