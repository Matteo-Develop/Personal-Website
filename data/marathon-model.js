// The DCF behind the Marathon Petroleum pitch, taken from
// assets/marathon-petroleum.pdf — University of Kentucky 2026 Stock Pitch
// Competition, March 2026. Every figure here comes from that deck.
//
// Calibration. The deck prints its per-year figures to one decimal, and
// recomputing from those rounded values gives $234 a share rather than the
// $230 it concludes: the sum of the displayed present values is $32.11B
// against its own stated $31.3B. The FCFF stream and terminal EBITDA below
// are back-solved from the deck's stated subtotals ($31.3B PV of FCFFs,
// $68.1B PV of terminal value, $99.4B enterprise value), so the base case
// reproduces $230 exactly and the published bull and bear cases land within
// fifty cents of $287 and $142.
//
// This is deliberately the deck's model and not a live one. The price it is
// measured against is the price at the time of the pitch, not today's.

export const marathon = {
  asOf: "April 2026",
  marketPrice: 232, // MPC, at the time of the pitch

  netDebt: 31.5, // $B, 2025
  shares: 0.2952, // billions (equity value 67.9 ÷ 230)

  // $B, 2026E–2030E. The deck displays 7.2 / 7.8 / 8.1 / 8.5 / 8.8.
  fcff: [7.019, 7.604, 7.896, 8.286, 8.578],

  // $B, 2030E adjusted EBITDA. The deck displays 13.7.
  terminalEbitda: 13.644,

  // Deck assumptions, and the range each driver can be moved across.
  base: { wacc: 0.079, exit: 7.3 },
  waccRange: { min: 0.06, max: 0.1, step: 0.0005 },
  exitRange: { min: 3.5, max: 10, step: 0.1 },

  // The deck's three published scenarios. At the deck's WACC the exit
  // multiple alone reproduces all three, which is why it is a driver here
  // and the rest of the scenario assumptions are not.
  cases: [
    { label: "Bear", exit: 4.5, published: 142 },
    { label: "Base", exit: 7.3, published: 230 },
    { label: "Bull", exit: 9.1, published: 287 },
  ],
};
