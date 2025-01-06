import amqp from 'amqplib'
import dotenv from 'dotenv'
dotenv.config()
const RABBIT_URL=process.env.RABBIT_URL
let connection,channel
export async function connect() {
    try {
        connection = await amqp.connect(RABBIT_URL);
        channel = await connection.createChannel();
        console.log("RabbitMQ connected successfully");
    } catch (err) {
        console.error("Failed to connect to RabbitMQ", err);
        setTimeout(connect, 5000); // Retry after 5 seconds
    }
}


export async function subscribeToQueue(queueName,callback) {
    if(!channel) await connect();
    await channel.assertQueue(queueName) 
    channel.consume(queueName,(message)=>{
        callback(message.content.toString())
        channel.ack(message)
    })
}

export async function publishToQueue(queueName,data) {
    if(!channel) await connect();
    channel.assertQueue(queueName)
    channel.sendToQueue(queueName,Buffer.from(data))
} 


