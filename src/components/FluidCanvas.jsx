import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FluidCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // --- Geometry & Custom Shader Material ---
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec2 u_mouse;
        varying vec2 vUv;

        // Optimized 2D Simplex Noise for organic morphing
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0) )
          + i.x + vec3(0.0, i1.x, 1.0) );
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
            dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 a0 = x - floor(x + 0.5);
          vec3 g = a0.xyxy * vec4(x12.xy, x12.zw);
          vec3 vecN = 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 r = g * vecN;
          return 130.0 * dot(m, r);
        }

        void main() {
          vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
          
          float t = u_time * 0.3;
          vec2 mouse = (u_mouse - 0.5) * 1.5;

          // Organic fluid noise distortion
          float n1 = snoise(uv * 1.8 - vec2(t * 0.4, t * 0.2));
          float n2 = snoise(uv * 2.2 + vec2(t * 0.3, -t * 0.5));
          
          // Outer fluid boundaries (blends purple blobs)
          float dist = length(uv - mouse * 0.4) - (0.45 + n1 * 0.08 + n2 * 0.04);

          // Ethereal organic gradients (Opticore violet-pink and gold palette)
          vec3 colorPurple = vec3(0.64, 0.54, 0.96); // #a48af5 violet
          vec3 colorPink = vec3(0.95, 0.45, 0.78);   // electric pink
          vec3 colorGold = vec3(0.79, 0.70, 0.54);   // #c9b28a gold

          // Shading gradients matching user theme
          vec3 fluidColor = mix(colorPurple, colorPink, uv.y + 0.5 + n1 * 0.3);
          fluidColor = mix(fluidColor, colorGold, uv.x + 0.5 - n2 * 0.2);

          // Render fill + glowing edges
          float fill = smoothstep(0.01, -0.2, dist);
          float glow = smoothstep(0.22, 0.0, abs(dist));
          
          vec3 finalColor = fluidColor * (fill * 0.7 + glow * 0.8);
          
          // Soft ambient background mesh blend
          finalColor += colorPurple * (glow * 0.15);

          float alpha = smoothstep(0.25, 0.0, dist) * 0.85;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // --- Animation loop ---
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // --- Interaction Listeners ---
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      
      // Interpolate values smoothly
      uniforms.u_mouse.value.x += (x - uniforms.u_mouse.value.x) * 0.08;
      uniforms.u_mouse.value.y += (y - uniforms.u_mouse.value.y) * 0.08;
    };

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        mixBlendMode: 'screen',
        opacity: 0.8,
      }}
    />
  );
}
