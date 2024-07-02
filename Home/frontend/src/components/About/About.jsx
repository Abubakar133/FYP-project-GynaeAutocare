import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between flex-col  lg:flex-row gap-[50px] lg:gap-[130px] xl:gap-0 ">
          {/* ========= about img ======== */}
          <div className="relative z-10 w-3/4 lg:w-1/2  xl:w-[770px] order-2 lg:order-1">
            <img src={aboutImg} alt="about_img" />
            <div className=" w-[200px] md:w-[300px] absolute bottom-4 right-[-30%]  md:right-[-7%]  lg:right-[22%] z-20">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>

          {/* =========== about content ============ */}
          <div className=" w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Proud to be one of the nations best</h2>
            <p className="text__para">
            At GynaeAutocare, we're thrilled to be recognized as one of the nation's top choices for women's healthcare. Our commitment to excellence and your well-being is what sets us apart. With a caring team and advanced practices, we're here to provide you with the very best in gynecological care. Thank you for choosing GynaeAutocare, where your health is our priority.
            </p>
            <p className="text__para mt-[30px]">
              Our best is something we strive for each day, caring for our
              patients—not looking back at what we accomplished but towards what
              we can do tomorrow. Providing the best.
            </p>
            <Link to="/">
              <button className="btn"></button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
