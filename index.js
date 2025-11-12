// pages/index.js
import { useEffect, useState, useRef } from "react";
import Head from "next/head";

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("Initializing...");
  const pollRef = useRef(null);

  const templates = [
    "Accessing module '%MODULE%'... %RESULT%",
    "Overwriting virtual file 0x%HEX%... %RESULT%",
    "Encrypting placeholder cookie... %RESULT%",
    "Spawning decoy process PID:%PID%... %RESULT%",
    "Injecting fake DLL into UI stream... %RESULT%",
    "Scanning memory segment %SEG%... %RESULT%",
    "Hijacking session token... %RESULT%",
    "Simulating lateral movement to module '%MODULE%'... %RESULT%",
  ];
  const modules = ["auth", "ui", "cache", "logger", "db-proxy", "metrics", "routes"];
  const results = ["OK", "FAIL", "TIMEOUT", "SIMULATED", "IGNORED", "DETECTED"];

  function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateLog() {
    let t = rand(templates);
    t = t.replace("%SEG%", `0x${randInt(1000, 9999).toString(16)}`);
    t = t.replace("%HEX%", `${randInt(100000, 999999).toString(16)}`);
    t = t.replace("%PID%", `${randInt(1000, 9999)}`);
    t = t.replace("%MODULE%", rand(modules));
    t = t.replace("%RESULT%", rand(results));
    return t;
  }

  function timestamp() {
    return new Date().toLocaleTimeString();
  }

  // Backend simulation (API call fake)
  async function fetchStatus() {
    // simula atraso de backend
    await new Promise(r => setTimeout(r, randInt(50, 200)));
    const newStatus = [
      "Scanning system...",
      "Overwriting temp files...",
      "Injecting fake malware...",
      "Hijacking UI streams...",
      "Encrypting placeholder logs...",
      "Loading modules...",
    ];
    return rand(newStatus);
  }

  useEffect(() => {
    // Polling automático
    pollRef.current = setInterval(async () => {
      const count = Math.random() < 0.6 ? 2 : Math.random() < 0.85 ? 3 : 5;
      const newLogs = Array.from({ length: count }, () => `${timestamp()} ${generateLog()}`);
      setLogs(prev => [...prev, ...newLogs].slice(-300)); // manter últimos 300 logs

      const s = await fetchStatus();
      setStatus(s);
    }, 400); // logs rápidos, estilo Salewin.exe

    return () => clearInterval(pollRef.current);
  }, []);

  return (
    <div style={styles.main}>
      <Head>
        <title>Hello World!!! — Salewin.exe Simulation</title>
      </Head>

      <h1 style={styles.title}>Hello World!!!</h1>
      <p style={styles.subtitle}>Simulação segura de Salewin.exe</p>

      <div style={styles.statusBar}>
        <span>Status: {status}</span>
      </div>

      <div style={styles.consoleWrap}>
        <div style={styles.console}>
          {logs.map((l, i) => (
            <div key={i} style={styles.logLine}>{l}</div>
          ))}
        </div>
      </div>

      {/* Overlay "infected" */}
      <div style={styles.overlay}>
        <div style={styles.overlayContent}>
          <div style={styles.pulse} />
          <h2 style={{ color: "#fff", margin: "8px 0" }}>SYSTEM INFECTED</h2>
          <p style={{ color: "#ffdddd", margin: 0 }}>Simulação ativa — tudo seguro!</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "'Courier New', monospace",
    position: "relative",
    background: "#0f1724",
    color: "#e6eef8",
  },
  title: { fontSize: "3rem", margin: 0 },
  subtitle: { color: "#bcd7ff", marginBottom: "0.5rem" },
  statusBar: {
    background: "#071028",
    padding: "6px 12px",
    borderRadius: 4,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#f5f5f5",
    border: "1px solid #123",
  },
  consoleWrap: { marginTop: "1rem", maxWidth: "100%", height: "70vh" },
  console: {
    background: "#071028",
    border: "1px solid #123",
    padding: "12px",
    height: "100%",
    overflowY: "scroll",
    borderRadius: 6,
    fontSize: 13,
    color: "#b8e0ff",
  },
  logLine: { padding: "1px 0" },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "linear-gradient(135deg, rgba(255,20,20,0.14), rgba(120,0,0,0.25))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  overlayContent: { textAlign: "center" },
  pulse: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,0,0,0.9), rgba(255,0,0,0.2))",
    filter: "blur(8px)",
    margin: "0 auto 12px",
    animation: "pulse 1.3s infinite",
  },
};
