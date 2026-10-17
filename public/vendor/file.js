/**
 * File: a folder with three tabs. At rest the middle tab stands a little proud.
 * The pointer picks a tab; it lifts, and the others follow a beat later, out
 * from the one chosen. The read-out names the tab. The slider is that delay.
 */
const {
  Cam, fit, proj, facing, rings, prism, solid, put, tween, tset, tval, tdone,
  disposer, mk, pointer, reflect, register,
} = HL;

const TH = 12, LIFT = 26;
const REST = [0, 8, 0];
const TABS = [
  [78, 136],
  [146, 204],
  [214, 272],
];
const Y0 = 36, Y1 = 70;
const BX0 = 62, BY0 = 62, BX1 = 288, BY1 = 196, BH = 16;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value;

  const C = Cam(45, 0.5, 1.48);
  fit(C, [
    [BX0, BY0, 0], [BX1, BY1, 0], [BX0, Y0, 0], [BX1, Y0, LIFT + TH],
    [BX0, BY1, BH], [BX1, BY0, BH],
  ], 200, 168);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const [body, bodyIn] = rings(BX0, BY0, BX1, BY1, 10, 1.6);
  reflect(svg, g, P, front, body, 0, 16);

  const tabs = TABS.map(([x0, x1], i) => {
    const [ring, inner] = rings(x0, Y0, x1, Y1, 4, 1.1);
    const el = solid(g);
    if (i === 1) el.sil.classList.add("hi");
    return { ring, inner, el, z: tween(REST[i]), drawn: "" };
  });

  const base = solid(g);
  put(base, prism(P, front, body, bodyIn, 0, BH));

  function draw(i, lift) {
    const tab = tabs[i], key = lift.toFixed(2);
    if (tab.drawn === key) return;
    tab.drawn = key;
    put(tab.el, prism(P, front, tab.ring, tab.inner, lift, lift + TH));
  }

  const centres = tabs.map((tab, i) => {
    const [x0, x1] = TABS[i];
    return P((x0 + x1) / 2, (Y0 + Y1) / 2, REST[i] + TH);
  });

  function hit([x, y]) {
    let best = -1, dist = 64;
    centres.forEach(([cx, cy], i) => {
      const d = Math.hypot(x - cx, y - cy);
      if (d < dist) { dist = d; best = i; }
    });
    return best;
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    tabs.forEach((tab, i) => {
      draw(i, tval(tab.z, now));
      if (!tdone(tab.z, now)) moving = true;
    });
    return moving;
  });
  bag.add(B.unregister);

  let act = -1;
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    tabs.forEach((tab, i) => {
      tset(tab.z, a < 0 ? REST[i] : i === a ? LIFT : REST[i], now, Math.abs(i - from) * stag);
      tab.el.sil.classList.toggle("hi", a < 0 ? i === 1 : i === a);
    });
    read.textContent = a < 0 ? "rest" : "0" + (a + 1);
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  tabs.forEach((tab, i) => draw(i, REST[i]));

  return {
    set: (v) => { stag = v; },
    destroy: bag.dispose,
  };
}

hairline({
  name: "file",
  means: "A folder with three tabs. The one under the pointer lifts, and the others follow.",
  rules: [1, 2, 5, 8],
  range: [16, 46, 80],
  tour: [[195, 84], [266, 109], [337, 155], null],
  mount,
});
