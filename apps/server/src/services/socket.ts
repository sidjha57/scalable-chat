import { Server } from "socket.io";
import { pub, sub } from "./redisClient";
import prismaClient from "./prisma";
import { produceMessage } from "./kakfa";

class SocketService {
	private _io: Server;

	constructor() {
		console.log("Init Socket Service...");
		this._io = new Server({
			cors: {
				allowedHeaders: ["*"],
				origin: "*",
			},
		});
		sub.subscribe(process.env.REDIS_CHAT_CHANNEL as string || "MESSAGES");
	}

	public initListeners() {
		const io = this.io;
		console.log("Init Socket Listeners...");

		io.on("connect", (socket) => {
			console.log(`New Socket Connected`, socket.id);

			socket.on("event:message", async ({ message }: { message: string }) => {
				console.log("New message Rec", message);

				// publish this message to redis
				await pub.publish(
					process.env.REDIS_CHAT_CHANNEL as string || "MESSAGES",
					JSON.stringify({ message }),
				);
				console.log("Message emitted to redis");
			});
		});

		sub.on("message", async (channel, message) => {
			if (channel === (process.env.REDIS_CHAT_CHANNEL as string || "MESSAGES")) {
				console.log("new message from redis", message);
				io.emit("message", message);
				console.log("Message emitted to server");

				await produceMessage(message);
				console.log("Message Produced to Kafka Broker");
			}
		});
	}

	get io() {
		return this._io;
	}
}

export default SocketService;
