/**
 * Scène 3D du héros (chargée à la demande) : terrain stylisé générique (aucun lieu réel), point « vous »
 * au centre, faisceaux lumineux qui s'élèvent sur les vendeurs alentour et itinéraires qui se tracent
 * jusqu'à eux. Réagit légèrement à la souris et au défilement. Boucle de rendu suspendue hors écran ou
 * onglet masqué.
 */
import {
  AdditiveBlending,
  AmbientLight,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  CylinderGeometry,
  DirectionalLight,
  EdgesGeometry,
  ExtrudeGeometry,
  GridHelper,
  Group,
  LineBasicMaterial,
  LineSegments,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  RingGeometry,
  Scene,
  Shape,
  SphereGeometry,
  SRGBColorSpace,
  Texture,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';
import { NEARBY_PINS, terrainRadius } from '../data/nearby';

export type HeroSceneOptions = { lite: boolean; onReady?: () => void };

const NAVY_2 = 0x1c2b39;
const SIGNAL = 0xf2b705;
const TEAL = 0x0f6b63;
const TEAL_GLOW = 0x2fd0c0;
const RADIUS = 2.1;
const ME = 0x4c9bff;
const DEPTH = 0.14;

const toWorld = (x: number, y: number) => ({ x: x * RADIUS * 0.92, z: y * RADIUS * 0.92 });
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutBack = (k: number) => 1 + 2.2 * (k - 1) ** 3 + 1.2 * (k - 1) ** 2;
const easeInOut = (k: number) => (k < 0.5 ? 4 * k ** 3 : 1 - (-2 * k + 2) ** 3 / 2);

function glowTexture(): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  if (g) {
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(47, 208, 192, 0.55)');
    grad.addColorStop(0.45, 'rgba(15, 107, 99, 0.25)');
    grad.addColorStop(1, 'rgba(15, 107, 99, 0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
  }
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}

export function mountHeroScene(host: HTMLElement, { lite, onReady }: HeroSceneOptions): () => void {
  const renderer = new WebGLRenderer({ antialias: !lite, alpha: true, powerPreference: lite ? 'low-power' : 'default' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 60);
  const target = new Vector3(0, 0.3, 0);

  const world = new Group();
  scene.add(world);

  // Lumières
  scene.add(new AmbientLight(0xffffff, 0.6));
  const key = new DirectionalLight(0xffffff, 1.3);
  key.position.set(3, 6, 4);
  scene.add(key);
  const rim = new DirectionalLight(TEAL_GLOW, 0.8);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  // Halo au sol et grille
  const glowTex = glowTexture();
  const glow = new Mesh(
    new PlaneGeometry(8, 8),
    new MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: AdditiveBlending }),
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = -0.02;
  world.add(glow);

  const grid = new GridHelper(7, lite ? 10 : 18, TEAL, TEAL);
  const gridMat = grid.material as Material;
  gridMat.transparent = true;
  gridMat.opacity = 0.16;
  grid.position.y = -0.03;
  world.add(grid);

  // Plateau organique générique
  const shape = new Shape();
  const steps = lite ? 48 : 96;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const r = terrainRadius(a) * RADIUS;
    if (i === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  const landGeo = new ExtrudeGeometry(shape, {
    depth: DEPTH,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: lite ? 1 : 2,
    curveSegments: 4,
  });
  landGeo.rotateX(-Math.PI / 2);
  const land = new Mesh(
    landGeo,
    new MeshStandardMaterial({ color: NAVY_2, roughness: 0.55, metalness: 0.3, emissive: TEAL, emissiveIntensity: 0.22 }),
  );
  world.add(land);
  const edges = new LineSegments(
    new EdgesGeometry(landGeo, 40),
    new LineBasicMaterial({ color: TEAL_GLOW, transparent: true, opacity: 0.7 }),
  );
  world.add(edges);

  // « Vous êtes ici » au centre, itinéraires vers quelques vendeurs
  const top = DEPTH + 0.04;
  const me = new Vector3(0, top, 0);
  const pinPts = NEARBY_PINS.map((n) => {
    const p = toWorld(n.x, n.y);
    return new Vector3(p.x, top, p.z);
  });
  const routes = NEARBY_PINS.flatMap((n, i) => {
    const end = pinPts[i];
    if (!n.route || !end) return [];
    const mid = me.clone().lerp(end, 0.5);
    // Coude façon « rue » : léger décalage perpendiculaire puis arc au-dessus du plateau.
    mid.x += (end.z - me.z) * 0.18;
    mid.z -= (end.x - me.x) * 0.18;
    mid.y = top + 0.16;
    const curve = new CatmullRomCurve3([me.clone(), mid, end.clone()]);
    const geo = new TubeGeometry(curve, lite ? 40 : 80, 0.022, lite ? 5 : 8, false);
    const count = geo.index ? geo.index.count : 0;
    geo.setDrawRange(0, 0);
    world.add(new Mesh(geo, new MeshBasicMaterial({ color: SIGNAL, transparent: true, opacity: 0.9 })));
    return [{ curve, geo, count }];
  });

  const meDot = new Mesh(new SphereGeometry(0.1, 20, 16), new MeshStandardMaterial({ color: ME, emissive: ME, emissiveIntensity: 0.7 }));
  meDot.position.copy(me).setY(top + 0.06);
  world.add(meDot);
  const meRingMat = new MeshBasicMaterial({ color: ME, transparent: true, opacity: 0, blending: AdditiveBlending, depthWrite: false });
  const meRing = new Mesh(new RingGeometry(0.12, 0.16, 48), meRingMat);
  meRing.geometry.rotateX(-Math.PI / 2);
  meRing.position.copy(me).setY(top - 0.01);
  world.add(meRing);

  const traveler = new Mesh(
    new SphereGeometry(0.05, 12, 10),
    new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 }),
  );
  world.add(traveler);

  // Repères des vendeurs : faisceau, tête lumineuse, onde au sol
  const beamGeo = new CylinderGeometry(0.035, 0.035, 1, lite ? 8 : 16, 1, true);
  beamGeo.translate(0, 0.5, 0);
  const headGeo = new SphereGeometry(0.085, lite ? 12 : 20, lite ? 10 : 16);
  const ringGeo = new RingGeometry(0.08, 0.12, lite ? 24 : 48);
  ringGeo.rotateX(-Math.PI / 2);
  const beamMat = new MeshBasicMaterial({
    color: SIGNAL,
    transparent: true,
    opacity: 0.5,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const headMat = new MeshStandardMaterial({ color: SIGNAL, emissive: SIGNAL, emissiveIntensity: 0.9, roughness: 0.3 });

  const pins = pinPts.map((p, i) => {
    const height = NEARBY_PINS[i]?.route ? 1.25 : 0.85;
    const beam = new Mesh(beamGeo, beamMat);
    beam.position.copy(p);
    beam.scale.y = 0.0001;
    const head = new Mesh(headGeo, headMat);
    head.position.copy(p);
    head.scale.setScalar(0.0001);
    const ringMat = new MeshBasicMaterial({
      color: SIGNAL,
      transparent: true,
      opacity: 0,
      blending: AdditiveBlending,
      depthWrite: false,
    });
    const ring = new Mesh(ringGeo, ringMat);
    ring.position.copy(p).setY(top - 0.02);
    world.add(beam, head, ring);
    let light: PointLight | null = null;
    if (!lite) {
      light = new PointLight(SIGNAL, 0, 2.2);
      light.position.copy(p);
      world.add(light);
    }
    return { beam, head, ring, ringMat, light, height, base: p.y };
  });

  // Entrées : souris (lissée) et défilement
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  let width = 0;
  let height = 0;
  const resize = () => {
    width = Math.max(1, host.clientWidth);
    height = Math.max(1, host.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  let time = 0;
  let last = performance.now();
  let frame = 0;
  let visible = true;
  let firstFrame = true;

  const render = (now: number) => {
    frame = requestAnimationFrame(render);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    time += dt;

    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    const sp = clamp01(window.scrollY / Math.max(1, window.innerHeight));

    // Décale le plateau vers la droite quand la scène est large (le téléphone occupe la gauche).
    world.position.x = camera.aspect > 0.95 ? 0.85 : 0;
    world.rotation.y = -0.45 + Math.sin(time * 0.18) * 0.16 + pointer.x * 0.22 + sp * 0.7;
    world.rotation.x = pointer.y * 0.06;
    camera.position.set(0, 6.6 - sp * 1.6, 8.8);
    camera.lookAt(target);

    pins.forEach((pin, i) => {
      const k = clamp01((time - 0.3 - i * 0.22) / 1.1);
      const e = k === 0 ? 0 : easeOutBack(k);
      pin.beam.scale.y = Math.max(0.0001, e * pin.height);
      pin.head.position.y = pin.base + e * pin.height;
      pin.head.scale.setScalar(Math.max(0.0001, Math.min(1.15, e)));
      const pulse = (time * 0.55 + i * 0.33) % 1;
      pin.ring.scale.setScalar(1 + pulse * 4.5);
      pin.ringMat.opacity = k >= 1 ? (1 - pulse) * 0.75 : 0;
      if (pin.light) pin.light.intensity = e * (1.2 + Math.sin(time * 2 + i) * 0.25);
    });

    const mePulse = (time * 0.7) % 1;
    meRing.scale.setScalar(1 + mePulse * 3.5);
    meRingMat.opacity = (1 - mePulse) * 0.8;

    let drawn = true;
    routes.forEach((rt, i) => {
      const r = easeInOut(clamp01((time - 1.2 - i * 0.45) / 1.2));
      if (r < 1) drawn = false;
      rt.geo.setDrawRange(0, Math.floor((r * rt.count) / 3) * 3);
    });
    const tMat = traveler.material as MeshBasicMaterial;
    const firstRoute = routes[0];
    if (drawn && firstRoute) {
      const u = ((time - 3.3) * 0.35) % 1;
      const back = Math.floor((time - 3.3) * 0.35) % 2 === 1;
      traveler.position.copy(firstRoute.curve.getPointAt(back ? 1 - u : u)).setY(top + 0.09);
      tMat.opacity = Math.min(1, (time - 3.3) * 2);
    }

    renderer.render(scene, camera);
    if (firstFrame) {
      firstFrame = false;
      onReady?.();
    }
  };

  const sync = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    if (visible && !document.hidden) {
      last = performance.now();
      frame = requestAnimationFrame(render);
    }
  };
  const io = new IntersectionObserver(([e]) => {
    visible = !!e?.isIntersecting;
    sync();
  });
  io.observe(host);
  document.addEventListener('visibilitychange', sync);
  sync();

  return () => {
    cancelAnimationFrame(frame);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', sync);
    window.removeEventListener('pointermove', onPointer);
    const geos = new Set<BufferGeometry>();
    const mats = new Set<Material>();
    scene.traverse((obj) => {
      const o = obj as Partial<Mesh>;
      if (o.geometry) geos.add(o.geometry);
      const m = o.material;
      if (Array.isArray(m)) m.forEach((x) => mats.add(x));
      else if (m) mats.add(m);
    });
    geos.forEach((g) => g.dispose());
    mats.forEach((m) => {
      const map = (m as Material & { map?: Texture | null }).map;
      map?.dispose();
      m.dispose();
    });
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  };
}
