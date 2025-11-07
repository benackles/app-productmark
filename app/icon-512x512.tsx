import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 512,
  height: 512,
}
export const contentType = "image/png"

export default function Icon512() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 320,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#6366f1",
        borderRadius: "50px",
      }}
    >
      🧐
    </div>,
    {
      ...size,
    },
  )
}
