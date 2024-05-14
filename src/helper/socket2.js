import { io } from "socket.io-client";
const socket2 = io("https://fos.altisss.vn", {
  path: "/market",
  transports: ["websocket", "polling"],
});

export default socket2;
