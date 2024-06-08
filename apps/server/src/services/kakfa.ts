import { Kafka, Producer } from "kafkajs";
import fs from "fs";
import path from "path";
import prismaClient from "./prisma";

export const kafka = new Kafka({
	brokers: [process.env.KAFKA_CONNECTION_URL || ""],
	ssl: {
		ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")],
	},
	sasl: {
		username: process.env.KAFKA_USERNAME || "",
		password: process.env.KAFKA_PASSWORD || "",
		mechanism: "plain",
	},
});

let producer: null | Producer = null;

export async function createProducer() {
	const _producer = kafka.producer();
	await _producer.connect();
	producer = _producer;
	return producer;
}

export async function produceMessage(message: string) {
	const producer = await createProducer();

	await producer.send({
		messages: [{ key: `message-${Date.now()}`, value: message }],
		topic: "MESSAGES",
	});

	return true;
}

export async function startMessageConsumer() {
	const consumer = kafka.consumer({ groupId: "default" });
	await consumer.connect();
	await consumer.subscribe({ topic: "MESSAGES", fromBeginning: true });

	await consumer.run({
		autoCommit: true,
		eachMessage: async ({ message, pause }) => {
			if (!message.value) return;
			console.log("New message received...");
            try {
                const msg: { message: string } = JSON.parse(message.value?.toString());

                await prismaClient.message.create({
                    data: {
                        text: msg.message,
                    },
                });
            } catch (err) {
                console.log("Something went wrong", err);
                pause();
                setTimeout(() => {
                    consumer.resume([{topic: "MESSAGES"}]);
                }, 60*1000);
            }
			
		},
	});
}
