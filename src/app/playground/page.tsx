import "@/styles/pages/playground.css";
import PlaygroundPage from "@/components/playground/PlaygroundPage";

export default function Playground() {
  return (
    <>
      <style>{"html body { background: rgb(0, 0, 0); }"}</style>
      <PlaygroundPage />
      <div id="overlay" />
    </>
  );
}
