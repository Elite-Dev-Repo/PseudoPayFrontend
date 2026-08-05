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
    <section className="min-h-screen w-screen">
      <div className="cont flex items-center justify-around flex-col gap-5">
        <div className="w-full h-[40vh]  rounded-2xl flex items-center justify-center">
          <div className="flex-1 flex flex-col items-start ml-12 p-3 justify-center gap-5">
            <h3 className="text-4xl font-bold">What is PseudoPay?</h3>
            <button className="bg-primary text-white px-4 py-2 rounded-lg">
              Explore Features
            </button>
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold p-3 ">
              PseudoPay is a secure and reliable payment gateway <br /> that
              allows you to send and receive payments <br /> from anywhere in
              the world.
            </p>
          </div>
        </div>
        <div className="w-full h-[40vh] rounded-2xl grid grid-cols-4 items-center justify-center gap-3 text-white">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative flex-1 h-full rounded-lg p-4 ${index === 0 ? "col-span-2 bg-[#8b4be6]/30 text-foreground" : "col-span-1 bg-primary text-white"} flex flex-col items-start justify-between gap-3`}
            >
              {index === 0 && (
                <img
                  src={secure}
                  alt=""
                  className="w-40 h-40 absolute bottom-0 right-10"
                />
              )}

              <h3 className="text-2xl font-semibold flex items-center gap-4">
                <span className="p-2 bg-white rounded-full text-primary">
                  {feature.icon}
                </span>{" "}
                {feature.title}
              </h3>
              <p className={`text-md  font-light ${index === 0 && "w-[70%]"}`}>
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
