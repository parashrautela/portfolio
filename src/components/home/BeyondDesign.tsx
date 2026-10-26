import ScrollTransform from "@/components/framer/ScrollTransform";
import Video from "@/components/framer/Video";

export default function BeyondDesign() {
  return (
    <section className="framer-gurzkq hidden-1pbhxf" data-framer-name="Client">
      <div className="framer-zwdnt0" data-framer-name="Scroll Animation Section">
        <div className="framer-ocbk7j" data-framer-name="Sticky">
          <div className="framer-g3srrn" data-framer-name="Content">
            <ScrollTransform
              className="framer-17q8pnh"
              data-framer-name="3D Space"
              spring={{ stiffness: 500, damping: 50, mass: 0.1 }}
              threshold={1}
              base={{ rotateY: 90, transformPerspective: 1200 }}
              targets={[{ y: 240 }, { trigger: ".framer-1mdcn4p", rotateY: -180, y: -200 }]}
            >
              <div className="framer-39d0bg" data-framer-name="1">
                <div className="framer-1we24p7-container" style={{ transform: "rotateY(-90deg)" }}>
                  <div
                    className="framer-DEoLC framer-1v5v8bp framer-v-qfqsdy"
                    data-framer-name="Video"
                    style={{ height: "100%", width: "100%" }}
                  >
                    <div className="framer-w4iq0s-container">
                      <Video src="/videos/3GS2RsgQn6onezhgdniXfBAS6E.mp4" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="framer-1020x4m" data-framer-name="2" style={{ transform: "rotateY(45deg)" }}>
                <div className="framer-xifu23-container" style={{ transform: "rotateY(-90deg)" }}>
                  <div
                    className="framer-DEoLC framer-1v5v8bp framer-v-qfqsdy"
                    data-framer-name="Video"
                    style={{ height: "100%", width: "100%" }}
                  >
                    <div className="framer-w4iq0s-container">
                      <Video src="/videos/3tK52WDAXoMnAsSGsw8BoixpVc.mp4" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="framer-8x4qkp" data-framer-name="3" style={{ transform: "rotateY(90deg)" }}>
                <div className="framer-pl0j5x-container" style={{ transform: "rotateY(-90deg)" }}>
                  <div
                    className="framer-DEoLC framer-1v5v8bp framer-v-qfqsdy"
                    data-framer-name="Video"
                    style={{ height: "100%", width: "100%" }}
                  >
                    <div className="framer-w4iq0s-container">
                      <Video src="/videos/ryZJ4OFFrEAh5BNplz0OiAFQxQY.mp4" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="framer-1hdot6w" data-framer-name="4" style={{ transform: "rotateY(135deg)" }}>
                <div className="framer-ocywu3-container" style={{ transform: "rotateY(-90deg)" }}>
                  <div
                    className="framer-DEoLC framer-1v5v8bp framer-v-qfqsdy"
                    data-framer-name="Video"
                    style={{ height: "100%", width: "100%" }}
                  >
                    <div className="framer-w4iq0s-container">
                      <Video src="/videos/RwnnNBrrs5YoRtzEGmVTXpaiz8.mp4" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="framer-1r5i755" data-framer-name="5" style={{ transform: "rotateY(180deg)" }}>
                <div className="framer-mtcfsp-container" style={{ transform: "rotateY(-90deg)" }}>
                  <div
                    className="framer-DEoLC framer-1v5v8bp framer-v-qfqsdy"
                    data-framer-name="Video"
                    style={{ height: "100%", width: "100%" }}
                  >
                    <div className="framer-w4iq0s-container">
                      <Video src="/videos/csSi0luznGDx5DJ5kxNerHw948.mp4" />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollTransform>
          </div>
        </div>
        <div className="framer-1mdcn4p" data-framer-name="Trigger" id="images" />
      </div>
    </section>
  );
}
