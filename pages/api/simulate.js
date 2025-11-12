// pages/api/simulate.js
// Returns harmless, generated fake log lines for the front-end simulation.
// This does NOT perform any operations aside from generating strings.

const templates = [
  "Scanning memory segment %SEG%... %RESULT%",
  "Dropping payload into virtual sandbox... %RESULT%",
  "Modifying UI stream... %RESULT%",
  "Encrypting placeholder cookie... %RESULT%",
  "Spawning decoy process PID:%PID%... %RESULT%",
  "Overriding theme settings... %RESULT%",
  "Simulating lateral movement to module '%MODULE%'... %RESULT%",
  "Generating fake keypress events... %RESULT%",
];

const modules = ["auth", "ui", "cache", "logger", "db-proxy", "metrics", "routes"];
const results = ["OK", "FAIL", "TIMEOUT", "SIMULATED", "IGNORED", "DETECTED"];

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function handler(req, res) {
  // Create up to 3 fake lines per poll
  const count = Math.random() < 0.6 ? 1 : Math.random() < 0.8 ? 2 : 3;
  const logs = [];
  for (let i = 0; i < count; i++) {
    let t = rand(templates);
    t = t.replace("%SEG%", `0x${randInt(1000, 9999).toString(16)}`);
    t = t.replace("%PID%", `${randInt(1000, 9999)}`);
    t = t.replace("%MODULE%", rand(modules));
    t = t.replace("%RESULT%", rand(results));
    logs.push(t);
  }

  // Return additional harmless "status" info for the demo
  res.status(200).json({
    logs,
    meta: {
      seed: Math.random().toString(36).slice(2, 9),
      mode: "safe-sim",
      note: "This API only provides cosmetic messages."
    }
  });
}
