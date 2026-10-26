import Testimonials from "@/components/testimonials/Testimonials";

export default function TestimonialSection() {
  return (
    <section className="framer-1ffxqi0" data-framer-name="TESTIMONIAL ">
      <div className="framer-1xwafzj hidden-1ctwl6p" data-framer-name="Content">
        <div className="ssr-variant">
          <div className="framer-19i6nxv-container" data-cursor="default">
            <Testimonials direction="column" padding="10px 10px 20px 10px" />
          </div>
        </div>
      </div>
      <div className="framer-1qiooig hidden-1pbhxf" data-framer-name="Content">
        <div className="framer-79vv4j-container" data-cursor="no-photo">
          <Testimonials direction="row" padding="40px 16px 40px 16px" />
        </div>
      </div>
    </section>
  );
}
