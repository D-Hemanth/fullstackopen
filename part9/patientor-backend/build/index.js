"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
const PORT = 3001;
app.get("/api/ping", (_request, response) => {
    console.log("someone pinged here");
    response.send("pong");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
