"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const pixelFont = '"Geist Pixel Square", "Geist Pixel Square Placeholder", sans-serif';

const quoteStyle: CSSProperties = {
  "--framer-font-family": pixelFont,
  "--framer-letter-spacing": "-0.02em",
  "--framer-line-height": "1.3em",
  "--framer-text-color": "var(--extracted-r6o4lv, rgb(74, 74, 74))",
};
// Placeholder copy Framer keeps (invisible) behind the active quote
const ghostStyle: CSSProperties = {
  "--framer-font-size": "22px",
  "--framer-font-weight": "500",
  "--framer-letter-spacing": "-0.02em",
  "--framer-line-height": "1.3em",
  "--framer-text-color": "var(--extracted-r6o4lv, rgb(74, 74, 74))",
};
const textContainer: CSSProperties = {
  "--extracted-r6o4lv": "rgb(74, 74, 74)",
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
};
const cardStyle = (pressed: boolean): CSSProperties => ({
  backgroundColor: "var(--token-e661b896-511c-4f46-9673-936f9c44e485, rgb(32, 96, 223))",
  boxShadow: pressed ? "none" : "2px 3px 7px 0px rgba(0, 0, 0, 0.54)",
  transform: "rotate(1deg)",
});

/** "Pranav SDE at AWS" style signature: script initial + name + role, gradient filled. */
function Signature({ initial, name, role, color }: { initial: string; name: string; role: string; color?: boolean }) {
  return (
    <p
      dir="auto"
      className="framer-text"
      style={{
        "--framer-font-family": pixelFont,
        "--framer-font-size": "10px",
        "--framer-line-height": "0.9em",
        "--framer-text-alignment": "center",
        ...(color ? { "--framer-text-color": "var(--extracted-r6o4lv, rgb(54, 54, 54))" } : {}),
      }}
    >
      <span
        data-text-fill="true"
        className="framer-text"
        style={{
          backgroundImage:
            "linear-gradient(0deg, var(--token-5592f09a-832d-414a-a277-f0050315ad1d, rgb(55, 130, 204)) -27%, rgb(255, 255, 255) 65%)",
        }}
      >
        <span
          className="framer-text"
          style={{
            "--framer-font-family": '"Bickham Script Pro Regular", "Bickham Script Pro Regular Placeholder", sans-serif',
            "--framer-font-size": "48px",
            "--framer-text-decoration-color": "rgb(194, 194, 194)",
            ...(color ? { "--framer-text-color": "var(--extracted-1bl15it, rgb(0, 0, 0))" } : {}),
          }}
        >
          {initial}
        </span>
        <span
          className="framer-text"
          style={{
            "--framer-font-size": "16px",
            "--framer-text-decoration-color": "rgb(194, 194, 194)",
            ...(color ? { "--framer-text-color": "var(--extracted-fcgbq5, rgb(0, 0, 0))" } : {}),
          }}
        >
          {name}
        </span>
        <span
          className="framer-text"
          style={{
            "--framer-font-size": "16px",
            ...(color ? { "--framer-text-color": "var(--extracted-9e7nuq, rgb(0, 0, 0))" } : {}),
          }}
        >
          {" "}
        </span>
        {role}
      </span>
    </p>
  );
}

const signatureColors: CSSProperties = {
  "--extracted-1bl15it": "rgb(0, 0, 0)",
  "--extracted-9e7nuq": "rgb(0, 0, 0)",
  "--extracted-fcgbq5": "rgb(0, 0, 0)",
  "--extracted-r6o4lv": "rgb(54, 54, 54)",
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
};

function Rich({ className, style, children, ...rest }: { className: string; style?: CSSProperties; children: ReactNode; "data-highlight"?: string; onClick?: () => void }) {
  return (
    <div className={className} data-framer-component-type="RichTextContainer" style={style} {...rest}>
      {children}
    </div>
  );
}

const variantClass = ["framer-v-zxbfvw", "framer-v-13lroxa", "framer-v-11cgi88"];
const variantName = ["First", "Second", "Third"];

/** The quote + signature card for each of the three testimonials ("Testimonial Texts" in Framer). */
export default function TestimonialText({ index, onReset }: { index: number; onReset: () => void }) {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      className={`framer-fARQv framer-zxbfvw ${variantClass[index]}${pressed ? " pressed" : ""}`}
      data-framer-name={variantName[index]}
      style={{ width: "100%" }}
      tabIndex={0}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      {index !== 2 && (
        <div className="framer-1nqkjt9" data-framer-name="Text 2" style={{ opacity: index === 1 ? 1 : 0 }}>
          <Rich className="framer-is0i2f" style={textContainer}>
            {index === 1 ? (
              <>
                <p dir="auto" className="framer-text" style={quoteStyle}>
                  {"Parash brings a rare and distinctive taste to design deeply driven, genuinely passionate, and exceptional at what he does. His dedication is evident in every deliverable, and his communication style made collaboration effortless. "}
                </p>
                <p dir="auto" className="framer-text" style={{ ...quoteStyle, "--framer-text-color": "var(--extracted-2gxw0f, rgb(74, 74, 74))" }}>
                  He was always proactive, responsive, and easy to stay aligned with. The kind of person who shows up fully, every single time.
                </p>
              </>
            ) : (
              <p dir="auto" className="framer-text" style={ghostStyle}>
                I’m building a new website and it’s absolutely ridiculous how valuable your content has been.
              </p>
            )}
          </Rich>
          {index === 1 && (
            <a
              className="framer-wmnihc framer-omq16b"
              href="https://www.linkedin.com/in/param-thakkar-0b4678158/"
              target="_blank"
              rel="noopener"
              style={cardStyle(pressed)}
            >
              <Rich className="framer-1t5isuy" style={{ ...signatureColors, transform: "translateX(-50%)" }}>
                <Signature initial="P" name="aram" role="APM at LeapScholar" color />
              </Rich>
            </a>
          )}
        </div>
      )}
      {index !== 1 && (
        <div className="framer-wn9rcl" data-framer-name="Text 3" style={{ opacity: index === 2 ? 1 : 0 }}>
          <Rich className="framer-mhz3yj" style={textContainer}>
            {index === 2 ? (
              <p dir="auto" className="framer-text" style={quoteStyle}>
                As a manager, what stood out immediately was Parash&apos;s ability to execute with remarkable speed without ever compromising quality. He treats design as art, with deep product thinking and intentional attention to detail. He consistently goes beyond the brief, always returning with something more refined than expected — the kind of designer who raises the bar without being asked.
              </p>
            ) : (
              <p dir="auto" className="framer-text" style={ghostStyle}>
                Way too much value for free to be honest.
              </p>
            )}
          </Rich>
          {index === 2 ? (
            <a
              className="framer-44i5kd framer-omq16b"
              href="https://www.linkedin.com/in/abhishek0010/"
              target="_blank"
              rel="noopener"
              style={cardStyle(pressed)}
            >
              <Rich className="framer-14rymna" style={{ ...signatureColors, transform: "translateX(-50%)" }}>
                <Signature initial="A" name="bhishek" role="TechLead at Nirmaan" color />
              </Rich>
            </a>
          ) : (
            <a className="framer-44i5kd framer-omq16b" style={{ backgroundColor: "rgba(0, 0, 0, 0)", boxShadow: "none" }}>
              <Rich
                className="framer-14rymna"
                data-highlight="true"
                onClick={onReset}
                style={{
                  "--extracted-r6o4lv": "rgb(173, 172, 177)",
                  "--framer-link-text-color": "rgb(0, 153, 255)",
                  "--framer-link-text-decoration": "underline",
                  transform: "translateX(-50%)",
                }}
              >
                <p
                  dir="auto"
                  className="framer-text"
                  style={{
                    "--framer-font-size": "14px",
                    "--framer-font-weight": "500",
                    "--framer-line-height": "1.3em",
                    "--framer-text-color": "var(--extracted-r6o4lv, rgb(173, 172, 177))",
                  }}
                >
                  James Traf
                </p>
              </Rich>
            </a>
          )}
        </div>
      )}
      {index === 0 && (
        <div className="framer-dc5owf" data-framer-name="Text 1">
          <Rich className="framer-wgbqzw" data-highlight="true" style={textContainer} onClick={onReset}>
            <p dir="auto" className="framer-text" style={quoteStyle}>
              Parash is a talented UI/UX designer who consistently delivered high-quality work while we collaborated. He went beyond his core role by designing excellent app screens, creating a polished landing page, and even taking ownership of development and deployment. His dedication and attention to detail made him a valuable asset to the team.
            </p>
          </Rich>
          <a
            className="framer-1legth2 framer-omq16b"
            href="https://www.linkedin.com/in/pranav-salota-163791217/"
            target="_blank"
            rel="noopener"
            style={{ ...cardStyle(pressed), boxShadow: pressed ? "none" : "2px 3px 7px 0px rgba(0, 0, 0, 0.55)" }}
          >
            <Rich className="framer-xy3svb">
              <Signature initial="P" name="ranav" role="SDE at AWS" />
            </Rich>
          </a>
        </div>
      )}
    </div>
  );
}
