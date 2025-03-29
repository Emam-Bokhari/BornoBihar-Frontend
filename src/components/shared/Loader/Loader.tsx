import { Book } from "lucide-react";
import "./index.css";

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loader">
        <Book size={40} color="#fff" />
      </div>
    </div>
  );
}
