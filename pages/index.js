// pages/index.js
import { useEffect, useState, useRef } from "react";
import Head from "next/head";

export default function Home() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const logId = useRef(0);
  const pollRef = useRef(null);

  // start/stop the simulation
  useEffect(() => {
    if (running) {
      setLogs(prev => [...prev, timestamp() + " Simulation started..."]);
      // poll every 1s for new fake logs
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch("/api/simulate");
          if (!res.ok) return;
          const data = await res.json();
          if (Array.isArray(data.logs)) {
            setLogs(prev => {
              const next = prev.concat(
                data.logs.map(l => `${timestamp()} ${l}`)
              );
              // keep last 200 lines
              return next.slice(-200);
            });
          }
        } catch (e) {
          setLogs(prev => [...prev, timestamp() + " Error fetching logs"]);
        }
      }, 1000);
    } else {
      clearInterval(pollRef.current);
      setLogs(prev => [...prev, timestamp() + " Simulation stopped."]);
    }
    return () => clearInterval(pollRef.current);
  }, [running]);

  function timestamp() {
    return new Date().toLocaleTimeString();
  }

  function clearLogs() {
    setLogs([]);
  }

  return (
    <div>
      <Head>
        <title>Hello World !!! — Safe Virus Simulation</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <main style={styles.main}>
        <h1 style={styles.title}>Hello World!!!</h1>
        <p style={styles.subtitle}>A safe, cosmetic virus simulation (harmless)</p>

        <div style={styles.controls}>
          <button
            onClick={() => setRunning(r => !r)}
            style={{
              ...styles.button,
              background: running ? "#c0392b" : "#27ae60",
            }}
          >
            {running ? "Stop Simulation" : "Simulate Virus"}
          </button>
          <button onClick={clearLogs} style={styles.buttonSecondary}>
            Clear Logs
          </button>
        </div>

        <div style={styles.consoleWrap}>
          <div style={styles.console}>
            {logs.length === 0 && <div style={styles.placeholder}>Logs will appear here...</div>}
            {logs.map((l, i) => (
              <div key={i} style={styles.logLine}>
                {l}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.footer}>
          <small>
            This is a harmless simulation: no files are changed, no commands executed,
            and no external systems are contacted beyond this site's own API.
          </small>
        </div>
      </main>

      {/* Visual overlay when running */}
      <div
        style={{
          ...styles.overlay,
          opacity: running ? 0.9 : 0,
          pointerEvents: running ? "auto" : "none",
        }}
      >
        <div style={styles.overlayContent}>
          <div style={styles.pulse} />
          <h2 style={{ color: "#fff", margin: "8px 0" }}>SYSTEM INFECTED</h2>
          <p style={{ color: "#ffdddd", margin: 0 }}>Simulation active — no real damage</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    padding: "3rem",
    fontFamily: "'Inter', system-ui, sans-serif",
    position: "relative",
    background: "#0f1724",
    color: "#e6eef8",
  },
  title: {
    fontSize: "3rem",
    margin: 0,
  },
  subtitle: {
    color: "#bcd7ff",
  },
  controls: {
    marginTop: "1rem",
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  },
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: 6,
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  buttonSecondary: {
    padding: "10px 12px",
    border: "1px solid #335",
    borderRadius: 6,
    background: "transparent",
    color: "#dbeafe",
    cursor: "pointer",
    marginLeft: 8,
  },
  consoleWrap: {
    marginTop: "1.5rem",
    maxWidth: "900px",
  },
  console: {
    background: "#071028",
    border: "1px solid #123",
    padding: "12px",
    height: "360px",
    overflow: "auto",
    borderRadius: 6,
    fontFamily: "monospace",
    fontSize: 13,
    color: "#b8e0ff",
  },
  placeholder: { color: "#4b6b8a" },
  logLine: {
    padding: "1px 0",
  },
  footer: {
    marginTop: 12,
    color: "#8da4c6",
  },
  overlay: {
    transition: "opacity 300ms ease",
    position: "fixed",
    inset: 0,
    background: "linear-gradient(135deg, rgba(255,20,20,0.14), rgba(120,0,0,0.25))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  overlayContent: {
    textAlign: "center",
  },
  pulse: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,0,0,0.9), rgba(255,0,0,0.2))",
    filter: "blur(8px)",
    margin: "0 auto 12px",
    animation: "pulse 1.3s infinite",
  },
  "@keyframes": {
    pulse: {
      "0%": { transform: "scale(1)" },
      "50%": { transform: "scale(1.08)" },
      "100%": { transform: "scale(1)" }
    }
  }
};
