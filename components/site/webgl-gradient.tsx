"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Premium WebGL animated gradient — Stripe/Linear/Vercel tier.
 * Renders a Simplex-noise-displaced 4-color mesh on a single fullscreen
 * triangle. No external libraries. ~3KB. Runs at 60fps on the GPU.
 *
 * Falls back to the CSS .hero-mesh class when:
 *   - WebGL not supported
 *   - prefers-reduced-motion
 *   - mobile (< 768px) — saves battery
 */
export function WebGLGradient({
  className = "",
}: {
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [shouldRender, setShouldRender] = useState(false)
  const [glFailed, setGlFailed] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mobileMq = window.matchMedia("(max-width: 767px)")
    const update = () => setShouldRender(!motionMq.matches && !mobileMq.matches)
    update()
    motionMq.addEventListener("change", update)
    mobileMq.addEventListener("change", update)
    return () => {
      motionMq.removeEventListener("change", update)
      mobileMq.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (!shouldRender) return
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", {
      antialias: false,
      premultipliedAlpha: false,
    }) as WebGLRenderingContext | null

    if (!gl) {
      setGlFailed(true)
      return
    }

    // Fullscreen triangle — covers the viewport with no vertex overhead
    const VERTEX_SHADER = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Simplex-noise-displaced 4-color radial mesh.
    // Color stops chosen to match brand: violet → electric → cyan → gold.
    const FRAGMENT_SHADER = `
      precision highp float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;

      // Classic Ashima Simplex noise (compact)
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                        + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = v_uv;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = uv;
        p.x *= aspect;

        float t = u_time * 0.08;

        // Layered displacement noise — gives organic flow
        float n1 = snoise(p * 1.5 + vec2(t, t * 0.7)) * 0.5;
        float n2 = snoise(p * 2.5 - vec2(t * 0.6, t * 1.1)) * 0.3;
        float n = n1 + n2;

        // Brand 4-color spectrum (violet, electric, cyan, gold)
        vec3 c1 = vec3(0.35, 0.20, 0.85);  // violet
        vec3 c2 = vec3(0.20, 0.40, 0.95);  // electric blue
        vec3 c3 = vec3(0.30, 0.78, 0.92);  // bright cyan
        vec3 c4 = vec3(0.95, 0.72, 0.35);  // warm gold

        // Distance from corners — drives color anchors
        float d1 = distance(uv + vec2(n * 0.1), vec2(0.15, 0.25));
        float d2 = distance(uv + vec2(n * 0.08), vec2(0.85, 0.25));
        float d3 = distance(uv + vec2(n * 0.12), vec2(0.75, 0.85));
        float d4 = distance(uv + vec2(n * 0.06), vec2(0.20, 0.85));

        float w1 = exp(-d1 * 2.4);
        float w2 = exp(-d2 * 2.4);
        float w3 = exp(-d3 * 2.4);
        float w4 = exp(-d4 * 2.4);
        float wsum = w1 + w2 + w3 + w4;

        vec3 col = (c1 * w1 + c2 * w2 + c3 * w3 + c4 * w4) / wsum;

        // Soften toward background — keeps it ethereal, not overwhelming
        col = mix(vec3(0.985, 0.98, 0.97), col, 0.55);

        gl_FragColor = vec4(col, 1.0);
      }
    `

    function compileShader(type: number, source: string) {
      const shader = gl!.createShader(type)
      if (!shader) return null
      gl!.shaderSource(shader, source)
      gl!.compileShader(shader)
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) {
      setGlFailed(true)
      return
    }

    const program = gl.createProgram()
    if (!program) {
      setGlFailed(true)
      return
    }
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setGlFailed(true)
      return
    }
    gl.useProgram(program)

    // Fullscreen triangle (covers viewport, 1 draw call)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    )
    const aPos = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, "u_time")
    const uRes = gl.getUniformLocation(program, "u_resolution")

    let raf = 0
    const start = performance.now()
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    function resize() {
      if (!canvas || !gl) return
      const w = canvas.clientWidth * dpr
      const h = canvas.clientHeight * dpr
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    function frame() {
      resize()
      const t = (performance.now() - start) / 1000
      gl!.uniform1f(uTime, t)
      gl!.uniform2f(uRes, canvas!.width, canvas!.height)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(raf)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [shouldRender])

  if (!shouldRender || glFailed) {
    // CSS fallback — uses the .hero-mesh utility from globals.css
    return <div aria-hidden="true" className={`hero-mesh ${className}`} />
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 size-full ${className}`}
    />
  )
}
