const {Kafka}=require("kafkajs")

//creating kafka client
exports.kafka=new Kafka({
    clientId:'my-app',
    brokers:["localhost:9092"]
})