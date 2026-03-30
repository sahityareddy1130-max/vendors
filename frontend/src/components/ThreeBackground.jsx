import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 14);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0x8de4ff, 1.2, 50);
    mainLight.position.set(5, 5, 10);
    const fillLight = new THREE.PointLight(0xffc37a, 0.8, 50);
    fillLight.position.set(-5, -4, 6);
    scene.add(mainLight, fillLight);

    const torusKnotGeometry = new THREE.TorusKnotGeometry(1.5, 0.45, 220, 32);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x6bcdff,
      metalness: 0.4,
      roughness: 0.25,
      emissive: 0x091926,
      emissiveIntensity: 0.25,
    });
    const torusKnot = new THREE.Mesh(torusKnotGeometry, torusMaterial);

    const edgeGeometry = new THREE.EdgesGeometry(torusKnotGeometry);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
    });
    const wireframe = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    torusKnot.add(wireframe);

    const innerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 28, 28),
      new THREE.MeshBasicMaterial({
        color: 0x91bbff,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      })
    );
    torusKnot.add(innerSphere);

    scene.add(torusKnot);

    const starGeometry = new THREE.BufferGeometry();
    const starCount = 320;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30;
      positions[i + 1] = (Math.random() - 0.5) * 18;
      positions[i + 2] = (Math.random() - 0.5) * 30;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.25,
    });
    const stars = new THREE.Points(starGeometry, starsMaterial);
    scene.add(stars);

    const resizeRenderer = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const handleResize = () => resizeRenderer();
    window.addEventListener('resize', handleResize);

    let frameId;
    const animate = () => {
      torusKnot.rotation.x += 0.003;
      torusKnot.rotation.y += 0.004;
      stars.rotation.y += 0.0007;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId) cancelAnimationFrame(frameId);
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return <canvas id="canvas" ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />;
}

export default ThreeBackground;
