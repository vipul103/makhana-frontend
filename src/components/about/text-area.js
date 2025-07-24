

const TextArea = () => {
  return (
    <section className="about__text pt-115 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-4">
            <div
              className="about__text-wrapper wow fadeInUp"
              data-wow-delay=".3s"
              data-wow-duration="1s"
            >
              <h3 className="about__text-title">
                It started with a <br /> bang now we are here.
              </h3>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8">
            <div
              className="about__text wow fadeInUp"
              data-wow-delay=".6s"
              data-wow-duration="1s"
            >
              <p>
               Welcome to KraveLab — Where Cravings Meet Clean Eating!

Founded in 2025, KraveLab was born out of a simple idea: to make snacking delicious, guilt-free, and genuinely nourishing. In a world full of artificial ingredients and empty calories, we set out to create snacks that satisfy your cravings without compromising your health.

At KraveLab, we’re passionate about reimagining traditional snacking. Our range includes wholesome treats like crunchy makhana (foxnuts), stem chips, and other innovative, nutrient-rich alternatives that are roasted, never fried — and always crafted with clean, simple ingredients.
              </p>

              <p>
                Every product we create is a result of thoughtful sourcing, minimal processing, and a whole lot of love for your well-being. Whether you’re looking for an energy-boosting bite between meetings or a binge-worthy snack for your weekend chill, KraveLab has you covered — without the guilt.

Because we believe that healthy should never mean boring
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextArea;
