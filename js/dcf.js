// An interactive version of the DCF in assets/marathon-petroleum.pdf.
//
// Move either driver and the implied value per share moves with it. At the
// deck's own assumptions it returns the deck's own answer, which is the point:
// the reader can check the widget against the PDF linked directly above it.
//
// Updates are immediate rather than animated. A number that rolls while you
// drag a slider reads as a decoration; a number that tracks your thumb reads
// as a model. There is nothing here for prefers-reduced-motion to turn off.

import { marathon as m } from "../data/marathon-model.js";

// Enterprise value discounted at `wacc`, terminal value from an exit multiple
// on 2030E EBITDA, less net debt, over shares out.
export function valuePerShare(wacc, exit) {
  const discount = (n) => 1 / (1 + wacc) ** n;
  const pvFcff = m.fcff.reduce((sum, f, i) => sum + f * discount(i + 1), 0);
  const pvTerminal = m.terminalEbitda * exit * discount(m.fcff.length);
  return (pvFcff + pvTerminal - m.netDebt) / m.shares;
}

const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
const pct = (n) => (n * 100).toFixed(2) + "%";

export function dcfMarkup() {
  const { wacc, exit } = m.base;
  const w = m.waccRange;
  const x = m.exitRange;
  return `
    <div class="dcf" data-dcf>
      <p class="dcf-kicker mono faint">The model from the deck, live</p>

      <p class="dcf-readout">
        <span class="dcf-value" data-dcf-value>${money(valuePerShare(wacc, exit))}</span>
        <span class="dcf-delta mono" data-dcf-delta></span>
      </p>
      <p class="dcf-against mono faint">
        implied value per share &middot; MPC traded at $${m.marketPrice}, ${m.asOf}
      </p>

      <div class="dcf-controls">
        <label class="dcf-control">
          <span class="dcf-legend mono">WACC <span data-dcf-wacc-out>${pct(wacc)}</span></span>
          <input type="range" data-dcf-wacc
                 min="${w.min}" max="${w.max}" step="${w.step}" value="${wacc}"
                 aria-label="Weighted average cost of capital" />
        </label>

        <label class="dcf-control">
          <span class="dcf-legend mono">Exit EBITDA multiple <span data-dcf-exit-out>${exit.toFixed(1)}x</span></span>
          <input type="range" data-dcf-exit
                 min="${x.min}" max="${x.max}" step="${x.step}" value="${exit}"
                 aria-label="Exit EBITDA multiple" />
        </label>
      </div>

      <div class="dcf-cases mono">
        ${m.cases
          .map(
            (c) =>
              `<button type="button" data-dcf-case="${c.exit}">${c.label} <span class="faint">${money(c.published)}</span></button>`
          )
          .join("")}
      </div>

      <p class="dcf-note faint">
        Simplified from the deck: the five-year FCFF stream and 2030E EBITDA are
        fixed, and the two drivers above are live. Set to the deck&rsquo;s own
        assumptions, ${pct(m.base.wacc)} and ${m.base.exit}x, it returns the
        deck&rsquo;s ${money(m.cases.find((c) => c.label === "Base").published)}.
      </p>
    </div>
  `;
}

export function initDcf(root) {
  const el = root.querySelector("[data-dcf]");
  if (!el) return;

  const waccInput = el.querySelector("[data-dcf-wacc]");
  const exitInput = el.querySelector("[data-dcf-exit]");
  const valueOut = el.querySelector("[data-dcf-value]");
  const deltaOut = el.querySelector("[data-dcf-delta]");
  const waccOut = el.querySelector("[data-dcf-wacc-out]");
  const exitOut = el.querySelector("[data-dcf-exit-out]");

  const paint = () => {
    const wacc = Number(waccInput.value);
    const exit = Number(exitInput.value);
    const value = valuePerShare(wacc, exit);
    const upside = (value - m.marketPrice) / m.marketPrice;

    valueOut.textContent = money(value);
    waccOut.textContent = pct(wacc);
    exitOut.textContent = exit.toFixed(1) + "x";

    // Without these a screen reader announces the raw value: "0.079" for the
    // WACC slider, "7.3" for the multiple. Say what the number means.
    waccInput.setAttribute("aria-valuetext", `${(wacc * 100).toFixed(2)} percent`);
    exitInput.setAttribute("aria-valuetext", `${exit.toFixed(1)} times EBITDA`);

    deltaOut.textContent = (upside >= 0 ? "+" : "") + (upside * 100).toFixed(0) + "%";
    deltaOut.classList.toggle("is-up", upside >= 0);
    deltaOut.classList.toggle("is-down", upside < 0);

    // Fill the track to the left of the thumb, which no browser does natively
    // in a way that can be styled consistently.
    [waccInput, exitInput].forEach((input) => {
      const min = Number(input.min);
      const span = Number(input.max) - min;
      input.style.setProperty("--fill", ((Number(input.value) - min) / span) * 100 + "%");
    });
  };

  [waccInput, exitInput].forEach((input) => input.addEventListener("input", paint));

  el.querySelectorAll("[data-dcf-case]").forEach((button) => {
    button.addEventListener("click", () => {
      // The scenarios differ only by exit multiple at the deck's WACC, so a
      // case resets WACC too rather than mixing a dragged WACC into a
      // published number.
      waccInput.value = String(m.base.wacc);
      exitInput.value = button.dataset.dcfCase;
      paint();
    });
  });

  paint();
}
