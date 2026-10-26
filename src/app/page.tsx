import "@/styles/pages/home.css";
import Appear from "@/components/framer/Appear";
import AboutDesktop from "@/components/home/AboutDesktop";
import AboutPhone from "@/components/home/AboutPhone";
import BeyondDesign from "@/components/home/BeyondDesign";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import SideProjects from "@/components/home/SideProjects";
import SvgTemplates from "@/components/home/SvgTemplates";
import TestimonialSection from "@/components/home/TestimonialSection";
import WorkDesktop from "@/components/home/WorkDesktop";
import WorkPhone from "@/components/home/WorkPhone";
import IntroVideo from "@/components/IntroVideo";
import Navigation from "@/components/navigation/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import SoundButton from "@/components/SoundButton";

// The nav fades in once the intro video has played
const navAppear = { type: "spring", bounce: 0.2, delay: 6, duration: 2 } as const;

export default function HomePage() {
  return (
    <>
      <style>{"html body { background: rgb(0, 0, 0); }"}</style>
      <div
        className="framer-knmwL framer-tgA2w framer-1ctwl6p"
        data-framer-root=""
        data-cursor="default"
        style={{ minHeight: "100vh", width: "auto" }}
      >
        <div className="framer-1r6mbr8-container" data-cursor="none">
          <IntroVideo
            src="/videos/Nb2HFE5qS1kIpXkSEEProV9ygQ.mp4"
            width={1328}
            height={1005}
            fadeDuration={2000}
            overlayColor="rgb(0, 0, 0)"
          />
        </div>
        <div className="framer-bqh2ar-container">
          <SmoothScroll intensity={15} />
        </div>
        <div className="framer-sbce-container">
          <SoundButton />
        </div>
        <div className="ssr-variant hidden-1pbhxf">
          <Appear
            className="framer-gosx8s-container"
            from={{ opacity: 0.001 }}
            transition={navAppear}
            transformTemplate="translateX(-50%)"
          >
            <Navigation variant="desktop" />
          </Appear>
        </div>
        <div className="ssr-variant hidden-1ctwl6p">
          <Appear
            className="framer-gosx8s-container"
            from={{ opacity: 0.001 }}
            transition={navAppear}
            transformTemplate="translateX(-50%)"
          >
            <Navigation variant="phone" fullWidth />
          </Appear>
        </div>
        <Hero />
        <WorkDesktop />
        <WorkPhone />
        <AboutDesktop />
        <AboutPhone />
        <SideProjects />
        <BeyondDesign />
        <TestimonialSection />
        <Footer />
      </div>
      <div id="overlay" />
      <SvgTemplates />
    </>
  );
}
