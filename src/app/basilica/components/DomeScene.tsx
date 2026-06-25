'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DomeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 1, 6);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffeebb, 0.4);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xD4A843, 3, 20);
    goldLight.position.set(3, 5, 3);
    scene.add(goldLight);

    const rimLight = new THREE.PointLight(0x8866aa, 1.5, 15);
    rimLight.position.set(-4, 2, -2);
    scene.add(rimLight);

    const topLight = new THREE.DirectionalLight(0xfff8e8, 1.2);
    topLight.position.set(0, 10, 5);
    scene.add(topLight);

    // Gold material
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xD4A843,
      metalness: 0.85,
      roughness: 0.18,
      envMapIntensity: 1.2,
    });

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xf5f0e8,
      metalness: 0.05,
      roughness: 0.55,
    });

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x1a1408,
      metalness: 0.1,
      roughness: 0.7,
    });

    const group = new THREE.Group();
    scene.add(group);

    // Base platform
    const platformGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.18, 32);
    const platform = new THREE.Mesh(platformGeo, whiteMat);
    platform.position.y = -1.5;
    group.add(platform);

    // Steps
    for (let i = 0; i < 3; i++) {
      const r = 2.1 - i * 0.35;
      const stepGeo = new THREE.CylinderGeometry(r, r + 0.1, 0.12, 32);
      const step = new THREE.Mesh(stepGeo, whiteMat);
      step.position.y = -1.38 + i * 0.12;
      group.add(step);
    }

    // Main body (nave)
    const bodyGeo = new THREE.BoxGeometry(2.2, 1.4, 1.6);
    const body = new THREE.Mesh(bodyGeo, whiteMat);
    body.position.y = -0.6;
    group.add(body);

    // Side colonnades
    for (let side = -1; side <= 1; side += 2) {
      for (let i = 0; i < 5; i++) {
        const colGeo = new THREE.CylinderGeometry(0.055, 0.07, 1.2, 12);
        const col = new THREE.Mesh(colGeo, whiteMat);
        col.position.set(side * 1.25, -0.3, -0.8 + i * 0.4);
        group.add(col);
        // Capital
        const capGeo = new THREE.BoxGeometry(0.16, 0.08, 0.16);
        const cap = new THREE.Mesh(capGeo, goldMat);
        cap.position.set(side * 1.25, 0.3, -0.8 + i * 0.4);
        group.add(cap);
      }
    }

    // Drum (base of dome)
    const drumGeo = new THREE.CylinderGeometry(0.75, 0.8, 0.5, 32);
    const drum = new THREE.Mesh(drumGeo, whiteMat);
    drum.position.y = 0.25;
    group.add(drum);

    // Dome (hemisphere)
    const domeGeo = new THREE.SphereGeometry(0.75, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    const dome = new THREE.Mesh(domeGeo, whiteMat);
    dome.position.y = 0.5;
    group.add(dome);

    // Dome ribs (gold lines)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const ribGeo = new THREE.TorusGeometry(0.75, 0.012, 6, 20, Math.PI / 2);
      const rib = new THREE.Mesh(ribGeo, goldMat);
      rib.position.y = 0.5;
      rib.rotation.y = angle;
      rib.rotation.x = Math.PI / 2;
      group.add(rib);
    }

    // Lantern tower
    const lanternGeo = new THREE.CylinderGeometry(0.13, 0.15, 0.4, 16);
    const lantern = new THREE.Mesh(lanternGeo, whiteMat);
    lantern.position.y = 1.25;
    group.add(lantern);

    // Cross
    const crossVGeo = new THREE.BoxGeometry(0.04, 0.45, 0.04);
    const crossHGeo = new THREE.BoxGeometry(0.25, 0.04, 0.04);
    const crossV = new THREE.Mesh(crossVGeo, goldMat);
    const crossH = new THREE.Mesh(crossHGeo, goldMat);
    crossV.position.y = 1.7;
    crossH.position.y = 1.82;
    group.add(crossV, crossH);

    // Bell towers (4 corners)
    const towerPositions = [[-1, -0.3], [1, -0.3], [-1, 0.3], [1, 0.3]];
    towerPositions.forEach(([x, z]) => {
      const towerGeo = new THREE.CylinderGeometry(0.2, 0.22, 1.4, 16);
      const tower = new THREE.Mesh(towerGeo, whiteMat);
      tower.position.set(x, -0.1, z as number);
      group.add(tower);
      // Tower cap (conical)
      const capGeo = new THREE.ConeGeometry(0.22, 0.5, 16);
      const cap = new THREE.Mesh(capGeo, goldMat);
      cap.position.set(x, 0.85, z as number);
      group.add(cap);
    });

    // Floating particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sizes[i] = Math.random() * 0.04 + 0.01;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xD4A843,
      size: 0.03,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Ground glow disc
    const glowGeo = new THREE.CircleGeometry(3, 64);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xD4A843,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -1.55;
    scene.add(glow);

    // Animation
    let frame = 0;
    const animate = () => {
      frame++;
      const t = frame * 0.005;

      group.rotation.y = t * 0.4;
      group.position.y = Math.sin(t * 0.7) * 0.06;

      goldLight.position.x = Math.sin(t) * 4;
      goldLight.position.z = Math.cos(t) * 4;

      particles.rotation.y = t * 0.08;
      particles.rotation.x = t * 0.03;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    let rafId = requestAnimationFrame(animate);

    // Resize handler
    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
