/*!
Flag Animation
https://codepen.io/wakana-k/pen/wvNOqmX
Wakana Y.K.
*/
"use strict";

import * as THREE from "three";

import { OrbitControls as e } from "three/addons/controls/OrbitControls.js";

import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

import { ParametricGeometry as t } from "three/addons/geometries/ParametricGeometry.js";

import { ParametricGeometries as o } from "three/addons/geometries/ParametricGeometries.js";

!(function () {
  function s(e, t, o) {
    H.subVectors(t.position, e.position);
    const s = H.length();
    if (0 === s) return;
    const n = H.multiplyScalar(1 - o / s).multiplyScalar(0.5);
    e.position.add(n), t.position.sub(n);
  }
  function n() {
    (b.aspect = window.innerWidth / window.innerHeight),
      b.updateProjectionMatrix(),
      g.setSize(window.innerWidth, window.innerHeight);
  }
  function i(e) {
    requestAnimationFrame(i),
      (function (e) {
        T.set(100, 0, Math.sin(e / 1e3)), T.normalize(), T.multiplyScalar(300);
        const t = y.particles;
        if (a.enableWind) {
          let e;
          const o = new THREE.Vector3(),
            s = G.index,
            n = G.attributes.normal;
          for (let i = 0, a = s.count; i < a; i += 3)
            for (let a = 0; a < 3; a++)
              (e = s.getX(i + a)),
                o.fromBufferAttribute(n, e),
                R.copy(o).normalize().multiplyScalar(o.dot(T)),
                t[e].addForce(R);
        }
        for (let e = 0, o = t.length; e < o; e++) {
          const o = t[e];
          o.addForce(w), o.integrate(u);
        }
        const o = y.constraints,
          n = o.length;
        for (let e = 0; e < n; e++) {
          const t = o[e];
          s(t[0], t[1], t[2]);
        }
        for (let e = 0, o = m.length; e < o; e++) {
          let o = Math.round(m[e] * c + e);
          o > t.length && (o = t.length), o < 0 && (o = 0);
          const s = t[o];
          s.position.copy(s.original), s.previous.copy(s.original);
        }
      })(e),
      v.update(),
      (function () {
        const e = y.particles;
        for (let t = 0, o = e.length; t < o; t++) {
          const o = e[t].position;
          G.attributes.position.setXYZ(t, o.x, o.y, o.z);
        }
        (G.attributes.position.needsUpdate = !0),
          G.computeVertexNormals(),
          (A.rotation.z -= 0.001),
          g.render(S, b);
      })();
  }
  const a = {
      enableWind: !0
    },
    r = 0.97,
    l = 0.1,
    h = 25,
    c = 10,
    E =
      ((d = h * c),
      (p = 10 * h),
      function (e, t, o) {
        const s = (e - 0.5) * d,
          n = (t + 0.5) * p;
        o.set(s, n, 0);
      });
  var d, p;
  const w = new THREE.Vector3(0, -981 * 1.4, 0).multiplyScalar(l),
    u = 0.018 * 0.018;
  let m = [];
  const T = new THREE.Vector3(0, 0, 0),
    R = new THREE.Vector3(),
    H = new THREE.Vector3();
  class M {
    constructor(e, t, o, s) {
      (this.position = new THREE.Vector3()),
        (this.previous = new THREE.Vector3()),
        (this.original = new THREE.Vector3()),
        (this.a = new THREE.Vector3(0, 0, 0)),
        (this.mass = s),
        (this.invMass = 1 / s),
        (this.tmp = new THREE.Vector3()),
        (this.tmp2 = new THREE.Vector3()),
        E(e, t, this.position),
        E(e, t, this.previous),
        E(e, t, this.original);
    }
    addForce(e) {
      this.a.add(this.tmp2.copy(e).multiplyScalar(this.invMass));
    }
    integrate(e) {
      const t = this.tmp.subVectors(this.position, this.previous);
      t.multiplyScalar(r).add(this.position),
        t.add(this.a.multiplyScalar(e)),
        (this.tmp = this.previous),
        (this.previous = this.position),
        (this.position = t),
        this.a.set(0, 0, 0);
    }
  }
  const y = new (class {
    constructor(e = 10, t = 10) {
      function o(t, o) {
        return t + o * (e + 1);
      }
      (this.w = e), (this.h = t);
      const s = [],
        n = [];
      for (let o = 0; o <= t; o++)
        for (let n = 0; n <= e; n++) s.push(new M(n / e, o / t, 0, l));
      for (let i = 0; i < t; i++)
        for (let t = 0; t < e; t++)
          n.push([s[o(t, i)], s[o(t, i + 1)], h]),
            n.push([s[o(t, i)], s[o(t + 1, i)], h]);
      for (let i = e, a = 0; a < t; a++)
        n.push([s[o(i, a)], s[o(i, a + 1)], h]);
      for (let i = t, a = 0; a < e; a++)
        n.push([s[o(a, i)], s[o(a + 1, i)], h]);
      (this.particles = s), (this.constraints = n), (this.index = o);
    }
  })(c, 10);
  let f, b, S, g, v, G, x, z, C, P, V, B, A, F, L;
  m = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const U = new THREE.TextureLoader();
  U.load(
    "https://assets.codepen.io/6958575/internal/avatars/users/default.png",
    function (s) {
      ((F = s).anisotropy = 16),
        (F.colorSpace = THREE.SRGBColorSpace),
        U.load(
          "https://happy358.github.io/Images/textures/lunar_color.jpg",
          function (s) {
            ((L = s).anisotropy = 16),
              (function () {
                (f = document.createElement("div")),
                  document.body.appendChild(f),
                  ((S = new THREE.Scene()).background = new THREE.Color(
                    1118481
                  )),
                  (b = new THREE.PerspectiveCamera(
                    30,
                    window.innerWidth / window.innerHeight,
                    0.1,
                    80
                  )).position.set(0, 0.5, 5),
                  S.add(new THREE.AmbientLight("white"));
                const s = new THREE.DirectionalLight("white", 2);
                let i;
                (s.position.y = 2),
                  (s.position.z = 2),
                  (s.castShadow = !0),
                  (s.shadow.mapSize.width = 1024),
                  (s.shadow.mapSize.height = 1024),
                  S.add(s),
                  (P = new THREE.MeshPhongMaterial({
                    specular: "silver",
                    shininess: 100
                  })),
                  (G = new t(o.plane(y.w, y.h), 10, 10)).center(),
                  (z = new THREE.MeshLambertMaterial({
                    map: F,
                    side: THREE.DoubleSide
                  })),
                  (B = new THREE.Mesh(G, z)).position.set(0.39, 0.12, 0),
                  B.scale.set(0.0013, 0.0013, 0.0013),
                  (B.castShadow = !0),
                  S.add(B),
                  (x = new THREE.BoxGeometry(10, 700, 10)),
                  (z = new THREE.MeshLambertMaterial()),
                  ((C = new THREE.Mesh(x, z)).position.x = -125),
                  (C.position.y = 25),
                  (C.receiveShadow = !0),
                  (C.castShadow = !0),
                  B.add(C),
                  (x = new THREE.BoxGeometry(20, 10, 20)),
                  ((C = new THREE.Mesh(x, P)).position.y = -320),
                  (C.position.x = -125),
                  (C.receiveShadow = !0),
                  (C.castShadow = !0),
                  B.add(C),
                  (x = new THREE.SphereGeometry(3, 30, 30)),
                  (z = new THREE.MeshPhongMaterial({
                    color: "hsl(50,100%,87%)",
                    map: L,
                    bumpMap: L,
                    bumpScale: 20
                  })),
                  ((V = new THREE.Mesh(x, z)).position.y = -3.28),
                  (V.receiveShadow = !0),
                  (V.rotation.x = -Math.PI / 8),
                  S.add(V);
                let a,
                  r,
                  l = [];
                (z = new THREE.MeshLambertMaterial({})),
                  (l = []),
                  (x = new THREE.CapsuleGeometry(0.5, 0.7, 4, 10)).translate(
                    0,
                    0,
                    0
                  ),
                  l.push(x),
                  (x = new THREE.CapsuleGeometry(0.18, 0.5, 4, 10)).translate(
                    0.2,
                    -1,
                    0
                  ),
                  l.push(x),
                  (x = new THREE.CapsuleGeometry(0.18, 0.5, 4, 10)).translate(
                    -0.2,
                    -1,
                    0
                  ),
                  l.push(x),
                  (x = new THREE.SphereGeometry(0.5, 10, 10)).translate(
                    0,
                    1.2,
                    0
                  ),
                  l.push(x),
                  (x = new THREE.CapsuleGeometry(0.15, 0.5, 4, 8)).translate(
                    0.2,
                    1.8,
                    0
                  ),
                  l.push(x),
                  (x = new THREE.CapsuleGeometry(0.15, 0.5, 4, 8)).translate(
                    -0.2,
                    1.8,
                    0
                  ),
                  l.push(x),
                  (x = BufferGeometryUtils.mergeGeometries(l)),
                  (z = z.clone()).color.set("bisque"),
                  (i = new THREE.Mesh(x, z)),
                  (x = new THREE.SphereGeometry(0.15, 5, 5)).translate(
                    0,
                    -0.3,
                    -0.5
                  ),
                  (z = z.clone()).color.set("white");
                const h = new THREE.Mesh(x, z);
                (h.castShadow = !0),
                  i.add(h),
                  (x = new THREE.SphereGeometry(0.07, 10, 10)).translate(
                    0.18,
                    1.3,
                    0.4
                  ),
                  (z = z.clone()).color.set("black");
                const c = new THREE.Mesh(x, z);
                i.add(c), (x = x.clone()).translate(-0.36, 0, 0);
                const E = new THREE.Mesh(x, z);
                i.add(E);
                const d = new THREE.Shape();
                d.moveTo(25, 25),
                  d.bezierCurveTo(25, 25, 20, 0, 0, 0),
                  d.bezierCurveTo(-30, 0, -30, 35, -30, 35),
                  d.bezierCurveTo(-30, 55, -10, 77, 25, 95),
                  d.bezierCurveTo(60, 77, 80, 55, 80, 35),
                  d.bezierCurveTo(80, 35, 80, 0, 50, 0),
                  d.bezierCurveTo(35, 0, 25, 25, 25, 25),
                  (x = new THREE.ExtrudeGeometry(d, {
                    depth: 1,
                    bevelEnabled: !0,
                    bevelSegments: 5,
                    steps: 1,
                    bevelSize: 10,
                    bevelThickness: 10
                  })),
                  (z = z.clone()).color.set("red");
                const p = new THREE.Mesh(x, z);
                p.scale.set(0.003, 0.003, 0.003),
                  p.position.set(0.07, 0.35, 0.5),
                  p.rotateZ(Math.PI),
                  i.add(p),
                  (x = new THREE.SphereGeometry(1, 20, 20)).translate(
                    0,
                    1.6,
                    0
                  );
                let w = new THREE.MeshPhysicalMaterial({
                  color: "white",
                  specularColor: "black",
                  ior: 1,
                  transparent: !0,
                  transmission: 1,
                  roughness: 0,
                  metalness: 0,
                  thickness: 0.1,
                  side: THREE.DoubleSide
                });
                const u = new THREE.Mesh(x, w);
                i.add(u),
                  (x = new THREE.BoxGeometry(0.7, 0.8, 0.3)),
                  ((C = new THREE.Mesh(x, P)).position.y = 0.3),
                  (C.position.z = -0.5),
                  (C.receiveShadow = !0),
                  (C.castShadow = !0),
                  i.add(C),
                  (x = new THREE.CapsuleGeometry(0.15, 0.8, 4, 10)).translate(
                    0,
                    -0.4,
                    0
                  ),
                  (x.verticesNeedUpdate = !0),
                  (z = z.clone()).color.set("bisque"),
                  (a = new THREE.Mesh(x, z)).position.set(-0.4, 0.5, 0),
                  a.rotation.set(0, 0, -Math.PI / 8),
                  (a.castShadow = !0),
                  i.add(a),
                  (x = new THREE.CapsuleGeometry(0.15, 0.8, 4, 10)).translate(
                    0,
                    -0.4,
                    0
                  ),
                  (x.verticesNeedUpdate = !0),
                  (r = new THREE.Mesh(x, z)).position.set(0.25, 0.5, 0),
                  r.rotation.set(0, 0, Math.PI / 2),
                  (r.castShadow = !0),
                  i.add(r),
                  i.scale.set(0.2, 0.2, 0.2),
                  i.position.set(0, 0, 0),
                  (i.castShadow = !0),
                  S.add(i),
                  (z = new THREE.PointsMaterial({
                    color: "white",
                    size: 0.2,
                    sizeAttenuation: !0
                  }));
                let m,
                  T = new THREE.Color(),
                  R = [],
                  H = [],
                  M = new THREE.Vector3();
                x = new THREE.BufferGeometry();
                for (let e = 0; e < 5e3; e++) {
                  const e = Math.acos(THREE.MathUtils.randFloatSpread(2)),
                    t = THREE.MathUtils.randFloatSpread(360);
                  (M.x = 15 * Math.sin(e) * Math.cos(t)),
                    (M.y = 15 * Math.sin(e) * Math.sin(t)),
                    (M.z = 15 * Math.cos(e)),
                    (m =
                      0.5 *
                        Math.sqrt(
                          Math.sqrt(Math.random()) * Math.sqrt(Math.random())
                        ) +
                      0.5),
                    M.copy(M).multiplyScalar(m),
                    R.push(M.x, M.y, M.z),
                    T.setHSL(0.2, 1, THREE.MathUtils.randFloat(0.3, 0.9)),
                    H.push(T.r, T.g, T.b);
                }
                x.setAttribute(
                  "position",
                  new THREE.Float32BufferAttribute(R, 3)
                ),
                  x.setAttribute(
                    "color",
                    new THREE.Float32BufferAttribute(H, 3)
                  ),
                  (z.vertexColors = !0),
                  ((A = new THREE.Points(x, z)).rotation.x = -Math.PI / 20),
                  S.add(A),
                  (g = new THREE.WebGLRenderer({
                    antialias: !0
                  })).setPixelRatio(window.devicePixelRatio),
                  g.setSize(window.innerWidth, window.innerHeight),
                  (g.shadowMap.enabled = !0),
                  f.appendChild(g.domElement),
                  (v = new e(b, g.domElement)).target.set(0, 0.2, 0),
                  (v.autoRotate = !0),
                  (v.autoRotateSpeed = 1),
                  (v.enableDamping = !0),
                  (v.enablePan = !1),
                  (v.maxPolarAngle = 0.5 * Math.PI),
                  (v.minDistance = 1),
                  (v.maxDistance = 8),
                  v.update(),
                  window.addEventListener("resize", n);
              })(),
              i(0);
          }
        );
    }
  );
})();


