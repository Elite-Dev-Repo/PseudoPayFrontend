import secure from "../assets/secure-login.svg";
import { BookOpenCheck, Rabbit, ShieldCheck } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <ShieldCheck />,
      title: "Secure Payments",
      description:
        "PseudoPay is a secure and reliable payment gateway that allows you to send and receive payments from anywhere in the world.",
    },
    {
      icon: <Rabbit />,
      title: "Fast Transactions",
      description:
        "PseudoPay is a secure and reliable payment gateway that allows you to send and receive payments from anywhere in the world.",
    },
    {
      icon: <BookOpenCheck />,
      title: "Easy to Use",
      description:
        "PseudoPay is a secure and reliable payment gateway that allows you to send and receive payments from anywhere in the world.",
    },
  ];

  return (
    <section className="min-h-screen w-screen py-12">
      <div className="cont flex items-center justify-center flex-col gap-6">
        <div className="w-full rounded-2xl flex flex-col md:flex-row items-center md:justify-around gap-6 py-6 md:py-10">
          <div className="flex-1 flex flex-col items-center md:items-start p-3 justify-center gap-5 text-center md:text-left">
            <h3 className="text-3xl sm:text-4xl font-bold">What is PseudoPay?</h3>
            <a href="#business">
              <button className="bg-primary text-white px-4 py-2 rounded-lg">
                Explore Features
              </button>
            </a>
          </div>
          <div className="flex-1">
            <p className="text-base sm:text-lg font-semibold p-3 text-center md:text-left">
              PseudoPay is a secure and reliable payment gateway <br className="hidden lg:block" /> that
              allows you to send and receive payments <br className="hidden lg:block" /> from anywhere in
              the world.
            </p>
          </div>
        </div>
        <div className="w-full rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative rounded-lg p-4 ${
                index === 0
                  ? "sm:col-span-2 bg-[#8b4be6]/30 text-foreground"
                  : "bg-primary text-white"
              } flex flex-col items-start justify-between gap-3 min-h-[180px] md:min-h-[40vh]`}
            >
              {index === 0 && (
                <img
                  src={secure}
                  alt=""
                  className="w-28 sm:w-32 md:w-40 absolute bottom-0 right-4 md:right-10"
                />
              )}

              <h3 className="text-xl md:text-2xl font-semibold flex items-center gap-3 md:gap-4">
                <span className="p-2 bg-white rounded-full text-primary shrink-0">
                  {feature.icon}
                </span>{" "}
                {feature.title}
              </h3>
              <p className={`text-sm md:text-md font-light ${index === 0 ? "w-full md:w-[70%]" : ""}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
