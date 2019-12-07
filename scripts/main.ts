import { game } from "./game";

declare global {
    interface Window { game: game; }
}

window.onload = () => window.game = new game(document.getElementById("game") as HTMLCanvasElement);
