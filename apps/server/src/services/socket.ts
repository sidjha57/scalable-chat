import { Server } from "socket.io";
import { pub, sub } from "./redisClient";

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
		sub.subscribe(process.env.REDIS_CHAT_CHANNEL as string);
	}

	public initListeners() {
		console.log("Init Socket Listeners...");

		const io = this.io;
		io.on("connect", (socket) => {
			console.log(`New Socket Connected`, socket.id);

			socket.on("event:message", async ({ message }: { message: string }) => {
				console.log("New message Rec", message);

				// publish this message to redis
				await pub.publish(
					process.env.REDIS_CHAT_CHANNEL as string,
					JSON.stringify({ message }),
				);
			});
		});

		sub.on("message", (channel, message) => {
			if (channel === (process.env.REDIS_CHAT_CHANNEL as string)) {
				io.emit("message", message);
			}
		});
	}

	get io() {
		return this._io;
	}
}

export default SocketService;
