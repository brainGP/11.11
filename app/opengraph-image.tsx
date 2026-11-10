import { ImageResponse } from 'next/og';

export const alt = 'Чамдаа зориулсан 11 бяцхан сюрприз — бидний 282 хоногийн дурсамжаас.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{
      width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(115deg, #fff9eb 0%, #f4ecd9 100%)', color: '#173f32',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{ position: 'absolute', right: -115, top: -180, width: 560, height: 560, borderRadius: 280, background: '#e4ead8', opacity: .7 }} />
      <div style={{ position: 'absolute', left: 620, bottom: -260, width: 540, height: 540, borderRadius: 270, background: '#e6d7b8', opacity: .32 }} />
      <div style={{ position: 'absolute', left: 62, top: 55, display: 'flex', alignItems: 'center', gap: 12, fontSize: 17, letterSpacing: 5, fontWeight: 700, color: '#6c7d68' }}>
        <span style={{ color: '#173f32' }}>11 · 11</span><span style={{ color: '#c2a768' }}>♡</span><span>PEPERO DAY</span>
      </div>
      <div style={{ position: 'absolute', left: 62, top: 145, width: 640, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 19, letterSpacing: 3, color: '#82917e', marginBottom: 18 }}>ХАЙРТАЙ ХҮНДЭЭ</div>
        <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Georgia, serif', fontSize: 63, lineHeight: 1.14, fontWeight: 600, letterSpacing: -2, color: '#173f32' }}>
          <span>Чамдаа зориулсан</span><span>11 бяцхан сюрприз.</span>
        </div>
        <div style={{ width: 85, height: 2, background: '#d4b879', marginTop: 27, marginBottom: 20 }} />
        <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Georgia, serif', fontSize: 25, lineHeight: 1.45, color: '#69796a' }}>
          <span>Бидний 282 хоногийн дурсамжаас.</span><span>Нэг хайрцаг дүүрэн хайр ♡</span>
        </div>
      </div>
      <div style={{ position: 'absolute', right: 108, top: 94, width: 324, height: 465, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(4deg)' }}>
        <div style={{ position: 'absolute', right: 7, top: 18, width: 64, height: 425, background: '#245f39', borderRadius: 4, transform: 'skewY(-5deg)' }} />
        <div style={{ position: 'absolute', left: 10, top: 0, width: 274, height: 445, borderRadius: 9, border: '2px solid #a6bc7d', background: 'linear-gradient(145deg, #579854 0%, #3d8148 60%, #347240 100%)', boxShadow: '12px 18px 28px #193c2929', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
          <div style={{ fontSize: 15, letterSpacing: 4, color: '#fff2cf', marginTop: 24 }}>LOTTE</div>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 42, fontWeight: 800, letterSpacing: 1, color: '#fffdf2', marginTop: 12, textShadow: '0 2px 2px #16432b70' }}>PEPERO</div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 30, fontStyle: 'italic', color: '#e6dca1', marginTop: 1 }}>almond</div>
          <div style={{ position: 'relative', width: 232, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 14 }}>
            <div style={{ position: 'absolute', left: 70, top: 12, width: 20, height: 196, borderRadius: 12, background: 'linear-gradient(90deg,#39251e,#75513a 45%,#39251e)', transform: 'rotate(31deg)', boxShadow: '2px 4px 5px #163e25a0' }} />
            <div style={{ position: 'absolute', left: 142, top: 8, width: 20, height: 196, borderRadius: 12, background: 'linear-gradient(90deg,#39251e,#76513a 45%,#39251e)', transform: 'rotate(31deg)', boxShadow: '2px 4px 5px #163e25a0' }} />
            <div style={{ position: 'absolute', left: 50, top: 39, width: 11, height: 11, borderRadius: 6, background: '#e3c88d', transform: 'rotate(31deg)' }} />
            <div style={{ position: 'absolute', left: 98, top: 80, width: 12, height: 9, borderRadius: 6, background: '#e3c88d', transform: 'rotate(-20deg)' }} />
            <div style={{ position: 'absolute', left: 145, top: 43, width: 12, height: 10, borderRadius: 6, background: '#e3c88d', transform: 'rotate(28deg)' }} />
            <div style={{ position: 'absolute', left: 182, top: 111, width: 12, height: 10, borderRadius: 6, background: '#e3c88d', transform: 'rotate(-25deg)' }} />
            <div style={{ position: 'absolute', left: 106, top: 153, width: 12, height: 9, borderRadius: 6, background: '#e3c88d', transform: 'rotate(22deg)' }} />
            <div style={{ position: 'absolute', left: 35, top: 145, width: 24, height: 13, borderRadius: 12, background: '#dfc28a', transform: 'rotate(-25deg)' }} />
            <div style={{ position: 'absolute', left: 174, top: 25, width: 24, height: 13, borderRadius: 12, background: '#dfc28a', transform: 'rotate(32deg)' }} />
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 18, display: 'flex', justifyContent: 'center', fontSize: 11, letterSpacing: 2, color: '#e8e8c9' }}>NO. 1 BRAND IN KOREA · 37 g</div>
        </div>
      </div>
      <div style={{ position: 'absolute', right: 456, top: 111, color: '#c5a96c', fontFamily: 'Georgia, serif', fontSize: 29 }}>♡</div>
      <div style={{ position: 'absolute', right: 464, bottom: 118, color: '#89a07b', fontFamily: 'Georgia, serif', fontSize: 24 }}>✦</div>
      <div style={{ position: 'absolute', left: 710, bottom: 65, color: '#c19d60', fontFamily: 'Georgia, serif', fontSize: 27 }}>♡</div>
    </div>,
    { ...size },
  );
}
