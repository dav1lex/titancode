import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0B0F1A 0%, #111827 55%, #0EA5E9 140%)',
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 144,
            height: 144,
            borderRadius: 34,
            border: '2px solid rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: -2,
            background: 'rgba(255,255,255,0.06)',
            boxShadow: '0 18px 50px rgba(0,0,0,0.35)',
          }}
        >
          T
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
