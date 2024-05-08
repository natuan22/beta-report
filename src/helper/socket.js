import { io } from "socket.io-client";
const socketUrl = process.env.REACT_APP_SOCKET_URL;
const socket = io(socketUrl, { transports: ["websocket"] });

export default socket;
