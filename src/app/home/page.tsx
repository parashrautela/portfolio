import "@/styles/pages/unroll.css";
import UnrollPage from "@/components/unroll/UnrollPage";

// "/home": the image-unroll scroll experiment
export default function Home() {
  return (
    <>
      <style>{"html body { background: rgb(5, 5, 5); }"}</style>
      <UnrollPage />
      <div id="overlay" />
    </>
  );
}
