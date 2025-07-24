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
    <section
      style={{
        backgroundColor: '#FEF0BD',
        backgroundImage: "url('/assets/img/banner/Brown.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          maxWidth: '1300px',
          width: '100%',
          gap: '3rem',
        }}
      >
        {/* Rotating Image */}
        <div
          style={{
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            border: '14px solid #FACC15',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'spinLoop 20s linear infinite',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              border: '14px solid #FDBA74',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src="/assets/img/icon/rot.png"
              alt="Makhana Main"
              width={320}
              height={320}
              style={{ borderRadius: '9999px' }}
            />
          </div>
        </div>

        {/* Content Card */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            padding: '2.5rem 2rem',
            maxWidth: '600px',
            flexGrow: 1,
          }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            <span style={{ color: '#FACC15' }}>About </span>
            <span style={{ color: '#000' }}>Makhana</span>
          </h2>
          <p style={{ color: '#374151', fontSize: '1rem', marginBottom: '1.5rem' }}>
            Makhana is an extremely good source of proteins, vitamins, fiber and important minerals that, as part of a
            daily diet, offer many significant and proven health benefits to the whole family, including:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
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
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem',
                }}
              >
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '9999px',
                    backgroundColor: '#FACC15',
                    marginRight: '0.75rem',
                    marginTop: '4px',
                    flexShrink: 0,
                  }}
                ></span>
                <span style={{ fontSize: '1rem', color: '#1F2937' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
