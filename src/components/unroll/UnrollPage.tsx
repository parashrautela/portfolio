import Appear from "@/components/framer/Appear";
import InViewAppear from "@/components/framer/InViewAppear";
import UnrollingImage from "@/components/unroll/UnrollingImage";

export default function UnrollPage() {
  return (
    <div
      data-framer-root=""
      className="framer-XW6WS framer-ot5tus"
      style={{ minHeight: "100vh", width: "auto" }}
    >
      <div className="framer-103bphh" data-framer-name="Main">
        <div className="framer-14vj6d6" data-framer-name="Container">
          <div className="framer-1nkhoy5" data-framer-name="Images">
            <div className="framer-tgi333" data-framer-name="Sticky">
              <div className="framer-1sjh567" data-framer-name="Hero">
                <div className="framer-1ryn38c" data-framer-name="Left">
                  <Appear
                    className="framer-x6fqs0"
                    style={{ justifyContent: "center" }}
                    data-framer-component-type="RichTextContainer"
                    from={{ opacity: 0.001, y: 40 }}
                    transition={{ damping: 30, delay: 0, mass: 1, stiffness: 205, type: "spring" }}
                  >
                    <div
                      dir="auto"
                      style={{
                        "--framer-font-family": '"Bebas Neue", "Bebas Neue Placeholder", sans-serif',
                        "--framer-font-size": "36px",
                        "--framer-line-height": "0.9em",
                        "--framer-text-color":
                          "var(--token-c16d487f-2660-4e60-a3d6-486a06491288, rgb(255, 255, 255))",
                      }}
                      className="framer-text"
                    >
                      {"OOmg you came "}
                    </div>
                    <div
                      dir="auto"
                      style={{
                        "--framer-font-family": '"Bebas Neue", "Bebas Neue Placeholder", sans-serif',
                        "--framer-font-size": "36px",
                        "--framer-line-height": "0.9em",
                        "--framer-text-color":
                          "var(--token-c16d487f-2660-4e60-a3d6-486a06491288, rgb(255, 255, 255))",
                      }}
                      className="framer-text"
                    >
                      {"to this section you are "}
                    </div>
                    <div
                      dir="auto"
                      style={{
                        "--framer-font-family": '"Bebas Neue", "Bebas Neue Placeholder", sans-serif',
                        "--framer-font-size": "36px",
                        "--framer-line-height": "0.9em",
                        "--framer-text-color":
                          "var(--token-c16d487f-2660-4e60-a3d6-486a06491288, rgb(255, 255, 255))",
                      }}
                      className="framer-text"
                    >
                      {"definatey more then a viewer "}
                    </div>
                  </Appear>
                  <InViewAppear
                    as="svg"
                    className="framer-wgl55"
                    data-framer-component-type="RichTextContainer"
                    viewBox="0 0 801.15 189"
                    from={{ opacity: 0, y: 40 }}
                    transition={{ type: "spring", damping: 30, stiffness: 205, mass: 1 }}
                  >
                    <foreignObject
                      width="100%"
                      height="100%"
                      className="framer-fit-text"
                      transform="scale(1)"
                      style={{ overflow: "visible", transformOrigin: "center center" }}
                    >
                      <h1
                        dir="auto"
                        style={{
                          "--framer-font-family": '"Inter Display", "Inter Display Placeholder", sans-serif',
                          "--framer-font-size": "97px",
                          "--framer-font-weight": "600",
                          "--framer-letter-spacing": "-0.03em",
                          "--framer-line-height": "0.9em",
                          "--framer-text-color": "rgb(255, 255, 255)",
                          "--framer-text-transform": "uppercase",
                        }}
                        className="framer-text"
                      >
                        <span style={{ "--framer-font-size": "105px" }} className="framer-text">
                          image
                        </span>
                        <span
                          style={{ "--framer-font-size": "105px", "--framer-letter-spacing": "-0.06em" }}
                          className="framer-text"
                        >
                          <br className="framer-text" />
                        </span>
                        <span style={{ "--framer-font-size": "105px" }} className="framer-text">
                          unroll scroll
                        </span>
                      </h1>
                    </foreignObject>
                  </InViewAppear>
                </div>
                <Appear
                  className="framer-kblybi"
                  data-framer-name="Right"
                  from={{ opacity: 0.001 }}
                  transition={{ bounce: 0.1, delay: 0, duration: 1, type: "spring" }}
                >
                  <div
                    className="framer-1tw0v"
                    style={{ transform: "none" }}
                    data-framer-component-type="RichTextContainer"
                  >
                    <p
                      dir="auto"
                      style={{
                        "--framer-font-size": "20px",
                        "--framer-font-weight": "500",
                        "--framer-letter-spacing": "-0.01em",
                        "--framer-line-height": "1.3em",
                        "--framer-text-alignment": "right",
                        "--framer-text-color":
                          "var(--token-84002464-baa0-40a1-a1a1-82899aec539a, rgb(155, 161, 165))",
                      }}
                      className="framer-text"
                    >
                      A sequence of images unrolling, guided by scroll, angle and animation.
                    </p>
                  </div>
                </Appear>
              </div>
            </div>
            <div className="framer-12doki4" data-framer-name="Row 1">
              <div className="framer-1wjxlx5-container">
                <UnrollingImage
                  src="/images/5MHVgoPWUQlSxsXNQtDw5nWw.jpg"
                  angle={45}
                  startAlign="center"
                  duration={1.5}
                />
              </div>
            </div>
            <div className="framer-1ywmbld" data-framer-name="Row 2">
              <div className="framer-10otyms-container">
                <UnrollingImage
                  src="/images/I6XipHhE9OD0q7GsA0fzvKWU28.jpg"
                  angle={45}
                  startAlign="center"
                  duration={1.5}
                />
              </div>
              <div className="framer-fvagkx" data-framer-name="Space" />
            </div>
            <div className="framer-117ly6c" data-framer-name="Row 3">
              <div className="framer-1226uzy" data-framer-name="Space" />
              <div className="framer-1d8hdmj-container">
                <UnrollingImage
                  src="/images/MSqSONTU5XD5YgrKNk65mLfbgus.jpg"
                  angle={45}
                  startAlign="center"
                  duration={1.5}
                />
              </div>
            </div>
            <div className="framer-14ul16c" data-framer-name="Row 4">
              <div className="framer-1swvktb-container">
                <UnrollingImage
                  src="/images/3BnHFLXcpRLlHMRfNlB67El2ySo.jpg"
                  angle={45}
                  startAlign="center"
                  duration={1.5}
                />
              </div>
              <div className="framer-7so5ke" data-framer-name="Space" />
            </div>
            <div className="framer-z6gt2s" data-framer-name="Space" />
          </div>
        </div>
        <div className="framer-hxv36r" data-framer-name="Spacer">
          <Appear
            className="framer-1vpnxyd"
            style={{ justifyContent: "center" }}
            data-framer-component-type="RichTextContainer"
            from={{ opacity: 0.001, y: 40 }}
            transition={{ damping: 30, delay: 0, mass: 1, stiffness: 205, type: "spring" }}
          >
            <div
              dir="auto"
              style={{
                "--framer-font-family": '"Bebas Neue", "Bebas Neue Placeholder", sans-serif',
                "--framer-font-size": "36px",
                "--framer-line-height": "80.1%",
                "--framer-text-color": "rgba(255, 255, 255, 0.7)",
              }}
              className="framer-text"
            >
              Not everyone makes it this far. You did. Let's talk.
            </div>
          </Appear>
        </div>
      </div>
    </div>
  );
}
