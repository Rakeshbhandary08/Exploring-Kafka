const {kafka}=require("./client")

async function init(){
    const consumer=await kafka.consumer({groupId:'user-1'})

    try{
      await consumer.connect()

      // You can subscribe to multiple topics at once
      await consumer.subscribe({ topics: ['rider-updates'],fromBeginning:true}) 

      await consumer.run({
        eachMessage:async ({ topic, partition, message, heartbeat, pause })=>{
            console.log(`[${topic}] : PARTITION:${partition} KEY:${message.key?.toString()}`,message.value.toString())
        }
      })

      // Disconnect cleanly on Ctrl+C so Kafka can rebalance the group right away
      process.on('SIGINT',async ()=>{
        await consumer.disconnect()
        process.exit(0)
      })
    }
    catch(err){
      console.log("Failed",err)
    }
}

init()