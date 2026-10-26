import "@/styles/pages/testing.css";
import TestingPage from "@/components/testing/TestingPage";

export default function Testing() {
  return (
    <>
      <style>{"html body { background: rgb(0, 0, 0); }"}</style>
      <TestingPage />
      <div id="overlay" />
    </>
  );
}
