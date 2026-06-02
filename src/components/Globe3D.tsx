'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const OPPORTUNITIES = [
  { lat: 40.7128, lng: -74.0060, city: 'New York', count: 342, color: '#00D4FF' },
  { lat: 51.5074, lng: -0.1278, city: 'London', count: 289, color: '#00D4FF' },
  { lat: 35.6762, lng: 139.6503, city: 'Tokyo', count: 256, color: '#6C63FF' },
  { lat: 48.8566, lng: 2.3522, city: 'Paris', count: 234, color: '#00D4FF' },
  { lat: 37.7749, lng: -122.4194, city: 'San Francisco', count: 312, color: '#FF6B6B' },
  { lat: 1.3521, lng: 103.8198, city: 'Singapore', count: 187, color: '#6C63FF' },
  { lat: 25.2048, lng: 55.2708, city: 'Dubai', count: 276, color: '#FF6B6B' },
  { lat: 19.0760, lng: 72.8777, city: 'Mumbai', count: 223, color: '#6C63FF' },
  { lat: 31.2304, lng: 121.4737, city: 'Shanghai', count: 298, color: '#00D4FF' },
  { lat: -33.8688, lng: 151.2093, city: 'Sydney', count: 198, color: '#6C63FF' },
  { lat: 52.5200, lng: 13.4050, city: 'Berlin', count: 167, color: '#00D4FF' },
  { lat: -23.5505, lng: -46.6333, city: 'São Paulo', count: 145, color: '#6C63FF' },
  { lat: 55.7558, lng: 37.6173, city: 'Moscow', count: 134, color: '#6C63FF' },
  { lat: 19.4326, lng: -99.1332, city: 'Mexico City', count: 156, color: '#6C63FF' },
  { lat: 30.0444, lng: 31.2357, city: 'Cairo', count: 143, color: '#6C63FF' },
  { lat: 43.6532, lng: -79.3832, city: 'Toronto', count: 178, color: '#00D4FF' },
  { lat: -26.2041, lng: 28.0473, city: 'Johannesburg', count: 112, color: '#6C63FF' },
  { lat: 59.9139, lng: 10.7522, city: 'Oslo', count: 98, color: '#00D4FF' },
  { lat: 22.3193, lng: 114.1694, city: 'Hong Kong', count: 243, color: '#FF6B6B' },
  { lat: 41.0082, lng: 28.9784, city: 'Istanbul', count: 189, color: '#6C63FF' },
]

const ARC_PAIRS = [
  [0, 4], [0, 1], [1, 3], [1, 10], [2, 8], [2, 9],
  [5, 7], [6, 7], [0, 6], [4, 5], [8, 18], [1, 17],
  [15, 0], [13, 4], [14, 6],
]

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  )
}

function buildGlobeTexture(): THREE.CanvasTexture {
  const W = 2048, H = 1024
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Ocean gradient
  const ocean = ctx.createLinearGradient(0, 0, 0, H)
  ocean.addColorStop(0, '#011428')
  ocean.addColorStop(0.5, '#01213d')
  ocean.addColorStop(1, '#011428')
  ctx.fillStyle = ocean
  ctx.fillRect(0, 0, W, H)

  // Ocean shimmer
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * W
    const y = Math.random() * H
    ctx.fillStyle = `rgba(0,80,180,${Math.random() * 0.12})`
    ctx.fillRect(x, y, Math.random() * 4 + 1, Math.random() * 2 + 1)
  }

  function xy(lon: number, lat: number): [number, number] {
    return [(lon + 180) / 360 * W, (90 - lat) / 180 * H]
  }

  function poly(pts: [number, number][], fill: string) {
    if (pts.length < 2) return
    ctx.beginPath()
    ctx.moveTo(...xy(pts[0][0], pts[0][1]))
    for (let i = 1; i < pts.length; i++) ctx.lineTo(...xy(pts[i][0], pts[i][1]))
    ctx.closePath()
    ctx.fillStyle = fill
    ctx.fill()
  }

  const landGrad = ctx.createLinearGradient(0, 0, 0, H)
  landGrad.addColorStop(0, '#1a4a2e')
  landGrad.addColorStop(0.5, '#1e5c37')
  landGrad.addColorStop(1, '#1a4a2e')

  // North America
  poly([[-168,71],[-140,71],[-130,55],[-125,50],[-120,34],[-117,32],[-95,26],[-83,30],[-80,25],[-83,10],[-77,8],[-75,0],[-52,-5],[-52,5],[-65,8],[-75,12],[-74,25],[-80,25],[-80,30],[-83,30],[-75,45],[-70,43],[-64,44],[-67,50],[-72,48],[-80,42],[-82,42],[-83,45],[-88,45],[-88,42],[-92,47],[-95,49],[-100,49],[-120,49],[-128,52],[-133,54],[-140,58],[-145,62],[-155,60],[-160,63],[-162,70],[-168,71]], '#1e5c37')

  // Greenland
  poly([[-55,80],[-30,83],[-18,80],[-18,73],[-25,68],[-45,62],[-55,68],[-60,76],[-55,80]], '#2a5c40')

  // South America
  poly([[-75,0],[-80,-2],[-80,-5],[-75,-10],[-72,-18],[-70,-20],[-68,-22],[-70,-30],[-72,-37],[-73,-42],[-75,-50],[-73,-53],[-65,-55],[-60,-55],[-55,-53],[-52,-45],[-52,-35],[-52,-25],[-48,-15],[-45,-5],[-35,-5],[-35,0],[-45,5],[-55,8],[-65,10],[-75,0]], '#1e5c37')

  // Europe
  poly([[-10,36],[0,43],[5,43],[10,44],[15,44],[20,40],[25,38],[28,41],[35,37],[36,42],[40,42],[45,42],[45,48],[40,50],[38,52],[35,55],[25,60],[22,62],[20,65],[15,70],[10,70],[5,62],[0,60],[-5,60],[-10,62],[-15,66],[-20,63],[-15,58],[-10,52],[-5,48],[-5,44],[-10,40],[-10,36]], '#1e5c37')

  // Africa
  poly([[-5,36],[3,37],[10,37],[25,32],[32,31],[38,25],[42,20],[44,15],[45,10],[42,5],[40,0],[38,-5],[38,-12],[35,-18],[35,-25],[30,-32],[25,-35],[18,-35],[12,-35],[15,-28],[15,-20],[12,-15],[10,-5],[9,5],[3,10],[0,12],[-5,15],[-10,20],[-17,25],[-17,30],[-10,35],[-5,36]], '#1e5c37')

  // Asia (simplified)
  poly([[25,38],[30,38],[35,37],[36,42],[40,42],[45,42],[55,38],[65,30],[67,25],[68,20],[80,15],[80,10],[78,8],[100,0],[105,5],[105,15],[110,20],[120,25],[125,30],[130,35],[135,40],[140,45],[145,50],[140,55],[140,60],[130,65],[120,70],[110,75],[90,75],[70,75],[60,70],[50,60],[45,57],[40,55],[35,52],[30,48],[25,45],[25,38]], '#1e5c37')

  // Indian subcontinent
  poly([[60,30],[65,25],[68,20],[80,15],[80,10],[78,8],[77,8],[72,8],[68,8],[62,18],[60,25],[60,30]], '#1a5030')

  // Southeast Asia / Indochina
  poly([[100,20],[105,20],[105,15],[110,20],[115,5],[110,1],[104,1],[100,5],[98,10],[100,20]], '#1e5c37')

  // Australia
  poly([[115,-22],[120,-20],[125,-15],[130,-12],[135,-12],[140,-15],[145,-18],[148,-20],[150,-25],[152,-28],[153,-30],[150,-35],[148,-38],[145,-38],[142,-38],[140,-36],[135,-35],[132,-32],[128,-30],[122,-28],[118,-25],[115,-22]], '#1e5c37')

  // Japan
  poly([[130,31],[135,33],[138,36],[141,41],[142,44],[140,45],[137,36],[133,33],[130,31]], '#1e5c37')

  // UK
  poly([[-5,50],[-3,56],[-5,58],[-3,60],[0,57],[2,52],[0,50],[-5,50]], '#1e5c37')

  // Grid lines
  ctx.strokeStyle = 'rgba(0,123,255,0.12)'
  ctx.lineWidth = 0.8
  for (let lat = -80; lat <= 80; lat += 20) {
    const [, y] = xy(0, lat)
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
  }
  for (let lon = -180; lon <= 180; lon += 20) {
    const [x] = xy(lon, 0)
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
  }

  // Equator highlight
  ctx.strokeStyle = 'rgba(0,212,255,0.2)'
  ctx.lineWidth = 1.2
  const [, eq] = xy(0, 0)
  ctx.beginPath(); ctx.moveTo(0, eq); ctx.lineTo(W, eq); ctx.stroke()

  return new THREE.CanvasTexture(canvas)
}

interface Props {
  compact?: boolean
}

export default function Globe3D({ compact = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<{ city: string; count: number; x: number; y: number } | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const W = container.clientWidth
    const H = container.clientHeight
    if (W === 0 || H === 0) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 1000)
    camera.position.set(0, 0, compact ? 3.2 : 3.0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Globe
    const globeGeo = new THREE.SphereGeometry(1, 72, 72)
    const globeMat = new THREE.MeshPhongMaterial({
      map: buildGlobeTexture(),
      specular: new THREE.Color(0x1144aa),
      shininess: 20,
    })
    const globe = new THREE.Mesh(globeGeo, globeMat)
    scene.add(globe)

    // Inner glow
    const innerGeo = new THREE.SphereGeometry(1.005, 72, 72)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x003388,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    })
    scene.add(new THREE.Mesh(innerGeo, innerMat))

    // Atmosphere layers
    for (const [r, op, col] of [[1.08, 0.10, 0x0066ff], [1.15, 0.05, 0x0044cc], [1.25, 0.02, 0x002299]] as [number, number, number][]) {
      const geo = new THREE.SphereGeometry(r, 48, 48)
      const mat = new THREE.MeshPhongMaterial({ color: col, transparent: true, opacity: op, side: THREE.BackSide })
      scene.add(new THREE.Mesh(geo, mat))
    }

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    const sun = new THREE.DirectionalLight(0xffffff, 1.4)
    sun.position.set(5, 3, 5)
    scene.add(sun)
    const back = new THREE.DirectionalLight(0x0044ff, 0.35)
    back.position.set(-5, -3, -5)
    scene.add(back)
    const top = new THREE.DirectionalLight(0x00aaff, 0.2)
    top.position.set(0, 10, 0)
    scene.add(top)

    // Data points group
    const pointsGroup = new THREE.Group()
    scene.add(pointsGroup)

    OPPORTUNITIES.forEach((opp) => {
      const pos = latLngToVec3(opp.lat, opp.lng, 1.025)
      const col = new THREE.Color(opp.color)

      const dotGeo = new THREE.SphereGeometry(0.014, 8, 8)
      const dotMat = new THREE.MeshBasicMaterial({ color: col })
      const dot = new THREE.Mesh(dotGeo, dotMat)
      dot.position.copy(pos)
      pointsGroup.add(dot)

      for (const [inner, outer, size] of [[0.020, 0.026, 1], [0.030, 0.038, 0.7]] as [number, number, number][]) {
        const ringGeo = new THREE.RingGeometry(inner, outer, 24)
        const ringMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: size, side: THREE.DoubleSide })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.position.copy(pos)
        ring.lookAt(new THREE.Vector3(0, 0, 0))
        pointsGroup.add(ring)
      }
    })

    // Arcs
    const arcGroup = new THREE.Group()
    scene.add(arcGroup)

    ARC_PAIRS.forEach(([i, j]) => {
      const a = latLngToVec3(OPPORTUNITIES[i].lat, OPPORTUNITIES[i].lng, 1.03)
      const b = latLngToVec3(OPPORTUNITIES[j].lat, OPPORTUNITIES[j].lng, 1.03)
      const pts: THREE.Vector3[] = []
      for (let t = 0; t <= 1; t += 0.02) {
        const mid = new THREE.Vector3().lerpVectors(a, b, t)
        mid.normalize().multiplyScalar(1.03 + Math.sin(t * Math.PI) * 0.28)
        pts.push(mid)
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      const mat = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.3 })
      arcGroup.add(new THREE.Line(geo, mat))
    })

    // Stars
    const starCount = 2000
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 80 + Math.random() * 120
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = r * Math.cos(phi)
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.18, transparent: true, opacity: 0.6 })
    scene.add(new THREE.Points(starGeo, starMat))

    // Interaction
    let isDragging = false
    let prevMouse = { x: 0, y: 0 }
    let rotVel = { x: 0, y: 0.004 }

    const onDown = (e: MouseEvent) => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY } }
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return
      rotVel = { x: (e.clientY - prevMouse.y) * 0.005, y: (e.clientX - prevMouse.x) * 0.005 }
      globe.rotation.x += rotVel.x; globe.rotation.y += rotVel.y
      pointsGroup.rotation.x += rotVel.x; pointsGroup.rotation.y += rotVel.y
      arcGroup.rotation.x += rotVel.x; arcGroup.rotation.y += rotVel.y
      prevMouse = { x: e.clientX, y: e.clientY }
    }
    const onUp = () => { isDragging = false }

    container.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)

    let animId: number
    let t = 0

    const animate = () => {
      animId = requestAnimationFrame(animate)
      t += 0.016

      if (!isDragging) {
        globe.rotation.y += 0.0035
        pointsGroup.rotation.y += 0.0035
        arcGroup.rotation.y += 0.0035
      }

      // Animate rings
      let ri = 0
      pointsGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
          const m = child.material as THREE.MeshBasicMaterial
          m.opacity = 0.35 + Math.sin(t * 2.5 + ri * 0.7) * 0.25
          const s = 1 + Math.sin(t * 2.5 + ri * 0.7) * 0.25
          child.scale.set(s, s, s)
          ri++
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    const onResize = () => {
      if (!container) return
      const w = container.clientWidth, h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      container.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [compact])

  return (
    <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" style={{ userSelect: 'none' }}>
      {tooltip && (
        <div
          className="absolute z-20 pointer-events-none px-3 py-2 rounded-lg text-xs font-medium"
          style={{ left: tooltip.x + 12, top: tooltip.y - 40, background: 'rgba(10,22,40,0.95)', border: '1px solid rgba(0,212,255,0.3)', backdropFilter: 'blur(12px)' }}
        >
          <div className="text-white">{tooltip.city}</div>
          <div style={{ color: '#00D4FF' }}>{tooltip.count} opportunities</div>
        </div>
      )}
    </div>
  )
}
