import { ImageResponse } from 'next/og';

export const size = {
  width: 64,
  height: 64,
};

export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: -1,
            background: 'rgba(255,255,255,0.06)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
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
