import "@/styles/pages/about-me.css";
import AboutPage from "@/components/about/AboutPage";

export default function AboutMe() {
  return (
    <>
      <style>{"html body { background: rgb(0, 0, 0); }"}</style>
      <AboutPage />
      <div id="overlay" />
    </>
  );
}
