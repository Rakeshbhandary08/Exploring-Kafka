const {kafka}=require('./client')

async function init(){
      const producer=kafka.producer()

      try {
        console.log("Producer connecting...")
        await producer.connect()
        console.log("Producer connected")
  
        //send the messages to the kafka
        await producer.send({
          topic:'rider-updates',
          messages:[ //messages should be in array of object ,it can be multiple
              {partition:0,key:'location-update',value:JSON.stringify({name:"Rakesh G",location:"North"})},
              {partition:1,key:'location-update',value:JSON.stringify({name:"Mitsuri",location:"Castle"})}
          ]
        })
      } catch (err) {
         console.log("Error",err)
      }finally{
        await producer.disconnect()
      }

      
}

init()