'use client';
import Image from 'next/image';
import { useEffect } from 'react';

export default function AboutMakhana() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes spinLoop {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="about-makhana">
      <div className="container">
        {/* Rotating Image */}
        <div className="rotating-circle">
          <div className="inner-circle">
            <Image
              src="/assets/img/icon/rot.png"
              alt="Makhana Main"
              width={320}
              height={320}
              className="circle-image"
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="content-card">
          <h2>
            <span className="highlight">About </span>
            Makhana
          </h2>
          <p>
            Makhana is an extremely good source of proteins, vitamins, fiber and important minerals that, as part of a
            daily diet, offer many significant and proven health benefits to the whole family, including:
          </p>
          <ul>
            {[
              'Boosting our immune system',
              'Reducing the risk of heart disease',
              'Helping to reduce obesity',
              'Providing anti-aging properties',
              'Decreasing the risk of arthritis',
              'Managing blood pressure',
              'Supporting digestive health',
              'Being gluten-free and low-calorie',
              'Balancing blood sugar levels',
              'Improving energy and stamina',
            ].map((item, idx) => (
              <li key={idx}>
                <span className="bullet" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ✅ Responsive CSS */}
      <style jsx>{`
        .about-makhana {
          background-color: #fef0bd;
          background-image: url('/assets/img/banner/Brown.png');
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          max-width: 1200px;
          width: 100%;
        }

        .rotating-circle {
          width: 280px;
          height: 280px;
          border-radius: 50%;
          border: 10px solid #facc15;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: spinLoop 20s linear infinite;
          flex-shrink: 0;
        }

        .inner-circle {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          border: 10px solid #fdba74;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .circle-image {
          border-radius: 9999px;
          width: 100%;
          height: auto;
        }

        .content-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 600px;
        }

        .content-card h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
        }

        .highlight {
          color: #facc15;
        }

        .content-card p {
          font-size: 1rem;
          color: #374151;
          margin-bottom: 1.5rem;
        }

        .content-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .content-card li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .bullet {
          width: 12px;
          height: 12px;
          background-color: #facc15;
          border-radius: 9999px;
          margin-right: 0.75rem;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .content-card li span:last-child {
          font-size: 1rem;
          color: #1f2937;
        }

        /* ✅ Medium & Up: Two columns */
        @media (min-width: 768px) {
          .container {
            flex-direction: row;
            justify-content: space-between;
            gap: 3rem;
          }

          .rotating-circle {
            width: 420px;
            height: 420px;
            border-width: 14px;
          }

          .inner-circle {
            width: 400px;
            height: 400px;
            border-width: 14px;
          }
        }

        /* ✅ Large Screens */
        @media (min-width: 1024px) {
          .content-card {
            padding: 2.5rem;
          }

          .content-card h2 {
            font-size: 2.5rem;
          }

          .content-card p,
          .content-card li span:last-child {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </section>
  );
}
