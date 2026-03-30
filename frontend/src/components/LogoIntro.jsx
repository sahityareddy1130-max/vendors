import { useEffect, useRef } from 'react';

export default function LogoIntro({ onEnter }) {
  const mountRef = useRef();

  useEffect(() => {
    let THREE, OrbitControls;
    let renderer, scene, camera, controls, logoGroup, cyanMat, glowRingMaterial, glowRing2Material, rimLight, particles;
    let animationId;
    let time = 0, introPhase = 0;
    const introDuration = 2.5;


    async function loadThree() {
      THREE = await import('three');
      OrbitControls = (await import('three/examples/jsm/controls/OrbitControls')).OrbitControls;

      // Scene setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0a1a);

      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0, 8);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = false;

      // Lights
      const ambientLight = new THREE.AmbientLight(0x404060, 0.5);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
      mainLight.position.set(5, 5, 5);
      mainLight.castShadow = true;
      scene.add(mainLight);

      const backLight = new THREE.DirectionalLight(0x6644aa, 0.8);
      backLight.position.set(-3, 2, -5);
      scene.add(backLight);

      rimLight = new THREE.PointLight(0x00aaff, 1.5, 15);
      rimLight.position.set(0, 0, 5);
      scene.add(rimLight);

      const bottomLight = new THREE.PointLight(0x8855cc, 1, 10);
      bottomLight.position.set(0, -5, 2);
      scene.add(bottomLight);

      // Logo group
      logoGroup = new THREE.Group();
      scene.add(logoGroup);

      // Colors
      const purpleColor = 0x8B6AAE;
      const blueColor = 0x1A3A8A;
      const darkBlueColor = 0x0D2B6B;
      const cyanColor = 0x00BFFF;
      const whiteColor = 0xEEEEF5;

      // Materials
      const purpleMat = new THREE.MeshStandardMaterial({
        color: purpleColor,
        metalness: 0.3,
        roughness: 0.4,
        side: THREE.DoubleSide
      });

      const blueMat = new THREE.MeshStandardMaterial({
        color: blueColor,
        metalness: 0.5,
        roughness: 0.3,
        side: THREE.DoubleSide
      });

      const darkBlueMat = new THREE.MeshStandardMaterial({
        color: darkBlueColor,
        metalness: 0.5,
        roughness: 0.3,
        side: THREE.DoubleSide
      });

      cyanMat = new THREE.MeshStandardMaterial({
        color: cyanColor,
        metalness: 0.4,
        roughness: 0.2,
        emissive: cyanColor,
        emissiveIntensity: 0.3,
        side: THREE.DoubleSide
      });

      const whiteMat = new THREE.MeshStandardMaterial({
        color: whiteColor,
        metalness: 0.2,
        roughness: 0.5,
        side: THREE.DoubleSide
      });

      const edgeMat = new THREE.MeshStandardMaterial({
        color: 0x222244,
        metalness: 0.8,
        roughness: 0.2,
        side: THREE.DoubleSide
      });

      const depth = 0.35;
      const radius = 3;

      // Helper: create extruded shape from THREE.Shape
      function extrudeShape(shape, material, z = 0) {
        const extrudeSettings = {
          depth: depth,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelSegments: 3,
          curveSegments: 64
        };
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = z;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        return mesh;
      }

      // Create circular disc (base)
      function createCircleShape(r, segments = 128) {
        const shape = new THREE.Shape();
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (i === 0) shape.moveTo(x, y);
          else shape.lineTo(x, y);
        }
        return shape;
      }

      // Create a pie/wedge shape
      function createWedgeShape(innerR, outerR, startAngle, endAngle, segments = 64) {
        const shape = new THREE.Shape();
        // Outer arc
        for (let i = 0; i <= segments; i++) {
          const angle = startAngle + (i / segments) * (endAngle - startAngle);
          const x = Math.cos(angle) * outerR;
          const y = Math.sin(angle) * outerR;
          if (i === 0) shape.moveTo(x, y);
          else shape.lineTo(x, y);
        }
        // Inner arc (reverse)
        for (let i = segments; i >= 0; i--) {
          const angle = startAngle + (i / segments) * (endAngle - startAngle);
          const x = Math.cos(angle) * innerR;
          const y = Math.sin(angle) * innerR;
          shape.lineTo(x, y);
        }
        shape.closePath();
        return shape;
      }

      // Create spoke shape (rectangular arm)
      function createSpokeShape(angle, innerR, outerR, halfWidth) {
        const shape = new THREE.Shape();
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const perpX = -sin;
        const perpY = cos;

        const x1 = cos * innerR - perpX * halfWidth;
        const y1 = sin * innerR - perpY * halfWidth;
        const x2 = cos * outerR - perpX * halfWidth;
        const y2 = sin * outerR - perpY * halfWidth;
        const x3 = cos * outerR + perpX * halfWidth;
        const y3 = sin * outerR + perpY * halfWidth;
        const x4 = cos * innerR + perpX * halfWidth;
        const y4 = sin * innerR + perpY * halfWidth;

        shape.moveTo(x1, y1);
        shape.lineTo(x2, y2);
        shape.lineTo(x3, y3);
        shape.lineTo(x4, y4);
        shape.closePath();
        return shape;
      }

      // ---- Build the logo ----

      // 1. Purple wedge segments (5 wedges between the spokes)
      const numSpokes = 5;
      const spokeWidth = 0.42;
      const spokeInnerR = 0.72;
      const spokeOuterR = radius;

      // 5 spokes evenly spaced, with one pointing straight up
      const actualSpokeAngles = [];
      for (let i = 0; i < numSpokes; i++) {
        actualSpokeAngles.push(Math.PI / 2 + (i * 2 * Math.PI) / numSpokes);
      }

      // Purple wedges between spokes
      const wedgeGap = 0.18; // angular gap for the spoke width
      for (let i = 0; i < numSpokes; i++) {
        const startAngle = actualSpokeAngles[i] + wedgeGap;
        const endAngle = actualSpokeAngles[(i + 1) % numSpokes] - wedgeGap;
        let end = endAngle;
        if (end < startAngle) end += Math.PI * 2;
        const wedge = createWedgeShape(spokeInnerR + 0.35, radius - 0.05, startAngle, end, 48);
        const wedgeMesh = extrudeShape(wedge, purpleMat, -depth / 2);
        logoGroup.add(wedgeMesh);
      }

      // Blue spokes
      for (let i = 0; i < numSpokes; i++) {
        const spoke = createSpokeShape(actualSpokeAngles[i], spokeInnerR, spokeOuterR, spokeWidth / 2);
        const spokeMesh = extrudeShape(spoke, blueMat, -depth / 2 + 0.05);
        logoGroup.add(spokeMesh);
      }

      // Central ring (dark blue)
      const ringOuterR = 0.82;
      const ringInnerR = 0.55;
      const ringShape = createCircleShape(ringOuterR);
      const holePath = new THREE.Path();
      for (let i = 0; i <= 128; i++) {
        const angle = (i / 128) * Math.PI * 2;
        const x = Math.cos(angle) * ringInnerR;
        const y = Math.sin(angle) * ringInnerR;
        if (i === 0) holePath.moveTo(x, y);
        else holePath.lineTo(x, y);
      }
      ringShape.holes.push(holePath);
      const ringMesh = extrudeShape(ringShape, darkBlueMat, -depth / 2 + 0.1);
      logoGroup.add(ringMesh);

      // White fill inside ring
      const innerCircle = createCircleShape(ringInnerR - 0.02);
      const innerMesh = extrudeShape(innerCircle, whiteMat, -depth / 2 + 0.12);
      logoGroup.add(innerMesh);

      // Cyan star in center
      function createStarShape(outerR, innerR, points) {
        const shape = new THREE.Shape();
        for (let i = 0; i < points * 2; i++) {
          const angle = (i * Math.PI) / points - Math.PI / 2;
          const r = i % 2 === 0 ? outerR : innerR;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (i === 0) shape.moveTo(x, y);
          else shape.lineTo(x, y);
        }
        shape.closePath();
        return shape;
      }

      const starShape = createStarShape(0.38, 0.15, 5);
      const starMesh = extrudeShape(starShape, cyanMat, -depth / 2 + 0.15);
      logoGroup.add(starMesh);

      // Outer rim of the circle
      const outerRimShape = createCircleShape(radius + 0.05);
      const outerHole = new THREE.Path();
      for (let i = 0; i <= 128; i++) {
        const angle = (i / 128) * Math.PI * 2;
        const x = Math.cos(angle) * (radius - 0.02);
        const y = Math.sin(angle) * (radius - 0.02);
        if (i === 0) outerHole.moveTo(x, y);
        else outerHole.lineTo(x, y);
      }
      outerRimShape.holes.push(outerHole);
      const outerRimMesh = extrudeShape(outerRimShape, edgeMat, -depth / 2 - 0.02);
      logoGroup.add(outerRimMesh);

      // Particle system around the logo
      const particleCount = 800;
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleSizes = new Float32Array(particleCount);
      const particleColors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 4 + Math.random() * 6;
        particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = r * Math.cos(phi);
        particleSizes[i] = Math.random() * 3 + 1;

        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
          particleColors[i * 3] = 0.55; particleColors[i * 3 + 1] = 0.42; particleColors[i * 3 + 2] = 0.68;
        } else if (colorChoice < 0.66) {
          particleColors[i * 3] = 0.1; particleColors[i * 3 + 1] = 0.23; particleColors[i * 3 + 2] = 0.54;
        } else {
          particleColors[i * 3] = 0.0; particleColors[i * 3 + 1] = 0.75; particleColors[i * 3 + 2] = 1.0;
        }
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // Glow ring effect
      const glowRingGeometry = new THREE.RingGeometry(3.05, 3.3, 128);
      glowRingMaterial = new THREE.MeshBasicMaterial({
        color: 0x6644cc,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      const glowRing = new THREE.Mesh(glowRingGeometry, glowRingMaterial);
      glowRing.position.z = 0.2;
      logoGroup.add(glowRing);

      // Second glow ring
      const glowRing2Geometry = new THREE.RingGeometry(3.2, 3.6, 128);
      glowRing2Material = new THREE.MeshBasicMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      const glowRing2 = new THREE.Mesh(glowRing2Geometry, glowRing2Material);
      glowRing2.position.z = 0.3;
      logoGroup.add(glowRing2);

      // Animation state
      time = 0;
      introPhase = 0;

      // Animate
      function animate() {
        animationId = requestAnimationFrame(animate);
        time += 0.016;
        controls.update();

        // Intro animation
        if (introPhase < 1) {
          introPhase = Math.min(1, introPhase + 0.016 / introDuration);
          const ease = 1 - Math.pow(1 - introPhase, 3);
          logoGroup.scale.setScalar(ease);
          logoGroup.rotation.z = (1 - ease) * Math.PI * 2;
        }

        // Gentle floating rotation
        logoGroup.rotation.y = Math.sin(time * 0.3) * 0.15;
        logoGroup.rotation.x = Math.sin(time * 0.2) * 0.08;

        // Star glow pulse
        const pulse = 0.3 + Math.sin(time * 2) * 0.15;
        cyanMat.emissiveIntensity = pulse;

        // Glow ring animation
        glowRingMaterial.opacity = 0.1 + Math.sin(time * 1.5) * 0.05;
        glowRing2Material.opacity = 0.06 + Math.sin(time * 1.2 + 1) * 0.03;
        glowRing2.rotation.z = time * 0.1;

        // Particle rotation
        particles.rotation.y = time * 0.05;
        particles.rotation.x = time * 0.02;

        // Rim light movement
        rimLight.position.x = Math.sin(time * 0.5) * 3;
        rimLight.position.y = Math.cos(time * 0.5) * 3;

        renderer.render(scene, camera);
      }

      animate();

      // Resize handler
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }

    loadThree();

    return () => {
      // Clean up Three.js scene and animation
      if (renderer && renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950">
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
      <button
        className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-full shadow-lg hover:scale-105 transition-transform z-20"
        onClick={onEnter}
      >
        Enter
      </button>
    </div>
  );
}
