import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Eye, RotateCw, Sparkles, Building } from 'lucide-react';

interface Building3DViewerProps {
  height?: string;
  className?: string;
}

export const Building3DViewer: React.FC<Building3DViewerProps> = ({ 
  height = 'h-72 sm:h-84',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [activeFloor, setActiveFloor] = useState<number>(4);
  const [autoRotate, setAutoRotate] = useState(true);

  // Store mutable refs for Three.js instance to avoid recreating canvas
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const floorMeshesRef = useRef<THREE.Mesh[]>([]);
  const groupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#f8fafc'); // Match slate-50

    // 2. Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(15, 12, 18);
    camera.lookAt(0, 3, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(20, 35, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const accentLight = new THREE.DirectionalLight(0x10b981, 0.6); // Emerald accent
    accentLight.position.set(-15, 10, -10);
    scene.add(accentLight);

    // 5. Ground / Podium
    const podiumGeo = new THREE.CylinderGeometry(8, 8.5, 0.4, 32);
    const podiumMat = new THREE.MeshStandardMaterial({ 
      color: 0xe2e8f0, 
      roughness: 0.8, 
      metalness: 0.1 
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.y = -0.2;
    podium.receiveShadow = true;
    scene.add(podium);

    // Grid helper on podium
    const grid = new THREE.GridHelper(15, 15, 0x10b981, 0xcbd5e1);
    grid.position.y = 0.01;
    scene.add(grid);

    // 6. Architectural Building Structure
    const buildingGroup = new THREE.Group();
    groupRef.current = buildingGroup;
    scene.add(buildingGroup);

    floorMeshesRef.current = [];
    const totalFloors = 7;
    const floorHeight = 1.0;
    const baseWidth = 5.2;

    for (let i = 0; i < totalFloors; i++) {
      const scale = 1 - (i * 0.06);
      const w = baseWidth * scale;
      const d = (baseWidth * 0.85) * scale;
      const floorGeo = new THREE.BoxGeometry(w, floorHeight * 0.9, d);
      
      const floorMat = new THREE.MeshStandardMaterial({
        color: i === 3 ? 0x059669 : 0x334155, // Floor 4 highlighted emerald, others slate-700
        roughness: 0.3,
        metalness: 0.2,
        wireframe: false,
        transparent: true,
        opacity: 0.92
      });

      const floorMesh = new THREE.Mesh(floorGeo, floorMat);
      floorMesh.position.y = (i * floorHeight) + (floorHeight * 0.5);
      floorMesh.castShadow = true;
      floorMesh.receiveShadow = true;
      
      // Glass balcony accents
      const balconyGeo = new THREE.BoxGeometry(w + 0.3, 0.2, d + 0.3);
      const balconyMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.1,
        metalness: 0.5
      });
      const balcony = new THREE.Mesh(balconyGeo, balconyMat);
      balcony.position.y = (i * floorHeight) + 0.05;
      buildingGroup.add(balcony);

      buildingGroup.add(floorMesh);
      floorMeshesRef.current.push(floorMesh);
    }

    // Top Architectural Crown / Spire
    const crownGeo = new THREE.ConeGeometry(0.8, 2.5, 4);
    const crownMat = new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.7, roughness: 0.2 });
    const crown = new THREE.Mesh(crownGeo, crownMat);
    crown.position.y = (totalFloors * floorHeight) + 1.25;
    crown.rotation.y = Math.PI / 4;
    buildingGroup.add(crown);

    // Mouse drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !groupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      groupRef.current.rotation.y += deltaX * 0.008;
      // Tilt camera slightly
      camera.position.y = Math.max(5, Math.min(22, camera.position.y - deltaY * 0.05));
      camera.lookAt(0, 3.5, 0);
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate && groupRef.current && !isDragging) {
        groupRef.current.rotation.y += 0.35 * delta;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update wireframe mode
  useEffect(() => {
    floorMeshesRef.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.wireframe = wireframeMode;
      }
    });
  }, [wireframeMode]);

  // Update highlighted floor
  useEffect(() => {
    floorMeshesRef.current.forEach((mesh, index) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat) {
        if (index + 1 === activeFloor) {
          mat.color.setHex(0x10b981); // Emerald Green
          mat.opacity = 1.0;
        } else {
          mat.color.setHex(0x334155); // Slate 700
          mat.opacity = 0.85;
        }
      }
    });
  }, [activeFloor]);

  return (
    <div className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xs ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef} 
        className={`w-full ${height} cursor-grab active:cursor-grabbing select-none`}
        title="جهت چرخش مدل ۳ بعدی، موس را بکشید یا لمس کنید"
      />

      {/* Modern Overlay Controls */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs text-[11px] font-bold text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>ماکت مهندسی ۳D</span>
        </div>
      </div>

      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
            autoRotate 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-xs' 
              : 'bg-white/90 border-slate-200 text-slate-600 hover:bg-white'
          }`}
          title={autoRotate ? 'توقف چرخش خودکار' : 'شروع چرخش خودکار'}
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        </button>

        <button
          onClick={() => setWireframeMode(!wireframeMode)}
          className={`px-2.5 py-1.5 rounded-full backdrop-blur-md border text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
            wireframeMode 
              ? 'bg-slate-900 border-slate-900 text-emerald-400 shadow-xs' 
              : 'bg-white/90 border-slate-200 text-slate-700 hover:bg-white'
          }`}
          title="نمایش سازه‌ای خطی (Wireframe)"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{wireframeMode ? 'سازه اسکلتی' : 'حالت بتنی'}</span>
        </button>
      </div>

      {/* Bottom Floor Selector Pill */}
      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm z-10">
        <div className="flex items-center gap-1.5 text-slate-700 text-xs font-bold">
          <Building className="w-4 h-4 text-emerald-600" />
          <span className="hidden xs:inline">انتخاب طبقه:</span>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5, 6, 7].map((floor) => (
            <button
              key={floor}
              onClick={() => setActiveFloor(floor)}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                activeFloor === floor
                  ? 'bg-emerald-600 text-white shadow-xs scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {floor}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
