"use client";

import { useState } from "react";
import BgImage from "@/components/framer/BgImage";
import ArrowButton from "./ArrowButton";
import TestimonialText from "./TestimonialText";

type Props = {
  direction: "row" | "column";
  /** Padding of the text column */
  padding: string;
  gap?: number;
};

const photos = [
  { src: "HaY5RImw2RAjjUid6YZ7DWAh1bU.png", width: 1856, height: 2464, position: "47% 2.6%" },
  { src: "7qhCfeCFTVHTChSJ2VjIl5OYlVA.png", width: 1536, height: 2752, position: "42.8% 42.2%" },
  { src: "LS6WZ27lzepQEOaLyWLHHm5vdkA.png", width: 1536, height: 2752, position: "52.1% 37.8%" },
];
const stateClass = ["framer-v-rtcpe", "framer-v-10sbvb2", "framer-v-12pycs8"];
const stateName = ["First", "Second", "Third"];

/** Testimonial card with a photo on one side and the quote + prev/next arrows on the other. */
export default function Testimonials({ direction, padding, gap = 10 }: Props) {
  const [index, setIndex] = useState(0);
  const photo = photos[index];
  const column = direction === "column";

  return (
    <div
      className={`framer-kIqML framer-rtcpe ${stateClass[index]}`}
      data-border="true"
      data-framer-name={stateName[index]}
      style={{
        "--16anluw": column ? "100%" : "1px",
        "--1aid83u": column ? "1 0 0px" : undefined,
        "--1iw0kpf": direction,
        "--2sns5d": column ? "1px" : "100%",
        "--border-bottom-width": "1px",
        "--border-color": "rgb(232, 232, 232)",
        "--border-left-width": "1px",
        "--border-right-width": "1px",
        "--border-style": "solid",
        "--border-top-width": "1px",
        backgroundColor: "rgb(246, 246, 246)",
        height: "100%",
        width: "100%",
        boxShadow: "inset 0px 2px 0px 0px rgb(255, 255, 255)",
      }}
    >
      <div className="framer-fqjaun-container">
        <div
          className={`framer-jDYBf framer-sisedy ${["framer-v-sisedy", "framer-v-p2p9j", "framer-v-fuvje8"][index]}`}
          data-framer-name={stateName[index]}
          style={{ height: "100%", width: "100%" }}
        >
          <BgImage
            key={photo.src}
            src={photo.src}
            width={photo.width}
            height={photo.height}
            scales={[1024, 2048]}
            sizes="(min-width: 1200px) 380px, (max-width: 1199.98px) 380px"
            position={photo.position}
          />
          <div
            className="framer-vfoag0"
            data-framer-name="Overlay"
            style={{
              filter: "blur(10px)",
              WebkitFilter: "blur(10px)",
              mask: "radial-gradient(50% 50% at 50% 50%, rgb(0, 0, 0) 55.15730574324324%, rgba(0, 0, 0, 0) 100%) add",
              WebkitMask:
                "radial-gradient(50% 50% at 50% 50%, rgb(0, 0, 0) 55.15730574324324%, rgba(0, 0, 0, 0) 100%) add",
            }}
          />
        </div>
      </div>
      <div
        className="framer-uixfg4"
        data-framer-name="Right"
        style={{ "--18ww4ac": padding, "--1k5wm6d": "space-between", "--th71j2": `${gap}px` }}
      >
        <div className="framer-i77rfg">
          <div className="framer-obs8tf" data-framer-name="Icon">
            <div
              className="framer-uja1jv"
              data-framer-component-type="RichTextContainer"
              style={{ textShadow: "2px 3px 7px rgba(0, 0, 0, 0.54)" }}
            >
              <p
                dir="auto"
                className="framer-text"
                style={{
                  "--framer-font-family": '"Kate Medium", "Kate Medium Placeholder", sans-serif',
                  "--framer-font-size": "58px",
                  "--framer-font-weight": "500",
                  "--framer-line-height": "0.1em",
                }}
              >
                {'"'}
              </p>
            </div>
          </div>
          <div className="framer-1q7jl1m-container">
            <TestimonialText index={index} onReset={() => setIndex(0)} />
          </div>
        </div>
        <div className="framer-14vzu51">
          <div className="framer-oh1olz-container">
            <ArrowButton direction="left" disabled={index === 0} onClick={() => setIndex(index - 1)} />
          </div>
          <div className="framer-j3e0c7-container">
            <ArrowButton direction="right" disabled={index === 2} onClick={() => setIndex(index + 1)} />
          </div>
        </div>
      </div>
    </div>
  );
}
