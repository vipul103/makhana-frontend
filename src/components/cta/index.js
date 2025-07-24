import Image from "next/image";

export default function WhyUnwrapSection() {
  const features = [
    {
      icon: "/assets/img/shape/box.png",
      title: "Innovative Packaging",
    },
    {
      icon: "/assets/img/shape/tik.png",
      title: "Quality Obsessed",
    },
    {
      icon: "/assets/img/shape/hea.png",
      title: "100% Vegetarian",
    },
    {
      icon: "/assets/img/shape/heart.png",
      title: "Healthy Innovations",
    },
    {
      icon: "/assets/img/shape/hand.png",
      title: "Global Hygiene Standards",
    },
    {
      icon: "/assets/img/shape/truck.png",
      title: "Global Delivery",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "#fefefe",
        padding: "60px 20px",
        textAlign: "center",
        fontFamily: "'Georgia', serif",
      }}
    >
      <h2
        style={{
          fontSize: "32px",
          color: "#514532",
          marginBottom: "16px",
        }}
      >
        Why Kravelab is unique from all others company
      </h2>

      <p
        style={{
          color: "#514532",
          fontSize: "14px",
          maxWidth: "700px",
          margin: "0 auto 48px",
          lineHeight: "1.6",
        }}
      >
        Kravelab offers premium products for every occasion,
         thoughtfully curated with a refined selection of makhanas, peanuts, amla candy, and party packs—ideal for gifting with elegance and taste.
      </p>

      <div style={{ overflowX: "auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "40px",
            minWidth: "900px", // ensures horizontal scroll on small screens
            margin: "0 auto",
          }}
        >
          {features.map((feature, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "999px",
                  backgroundColor: "#fef1dc",
                  border: "3px solid #fce9ca",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={110}
                  height={110}
                />
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#333",
                  marginTop: "16px",
                  maxWidth: "120px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {feature.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
