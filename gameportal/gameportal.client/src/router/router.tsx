import { createBrowserRouter, } from "react-router-dom";
import HomePage from "../features/home/pages/HomePage";
import WordlePage from "../features/wordle/pages/WordlePage";
import TicTacToePage from "../features/tictactoe/pages/TicTacToePage";
import SnakePage from "../features/snake/pages/SnakePage";

export const router =
    createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/wordle",
            element: <WordlePage />,
        },
        {
            path: "/tictactoe",
            element: <TicTacToePage />,
        },
        {
            path: "/snake",
            element: < SnakePage />,
        },
    ]);