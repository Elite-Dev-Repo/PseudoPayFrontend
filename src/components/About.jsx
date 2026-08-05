const About = () => {
  return (
    <section className="min-h-screen w-screen">
      <div className="cont flex items-center justify-around flex-col gap-5">
        <div className="w-full h-[50vh] bg-primary/10 rounded-2xl flex items-center justify-center">
          <div className="">
            <h3 className="text-2xl font-bold">What is PseudoPay?</h3>
            <button>Explore Features</button>
          </div>
          <div className="">
            <p className="text-lg font-semibold w-">
              PseudoPay is a payment gateway that allows you to send and receive
              payments from anywhere in the world. It is a secure and reliable
              payment gateway that allows you to send and receive payments from
              anywhere in the world.
            </p>
          </div>
        </div>
        <div className="w-full h-[50vh] bg-primary/10 rounded-2xl"></div>
      </div>
    </section>
  );
};

export default About;
