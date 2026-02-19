import { useNavigate } from "react-router";
import "../styles/NotFound.css";

const IconArrowLeft = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconBoard = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const IconHome = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

function NotFound() {
  const navigate = useNavigate();

  // Smart back: if there's a real previous page in history, go back.
  // Otherwise fall back to /dashboard to avoid landing on a blank page.
  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="nf-page">
      <div className="nf-bg" />

      {/* Floating orbs */}
      <div className="nf-orb nf-orb-1" />
      <div className="nf-orb nf-orb-2" />
      <div className="nf-orb nf-orb-3" />

      {/* ── Topbar ── */}
      <nav className="nf-nav">
        <div className="nf-nav-inner">
          <div className="nf-logo">
            <div className="logo-dots">
              <span className="dot blue" />
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
            <span className="logo-text">Zenith</span>
          </div>

          <div className="nf-breadcrumb">
            <span className="nf-crumb-link" onClick={() => navigate("/")}>
              Home
            </span>
            <span className="nf-sep">›</span>
            <span className="nf-crumb-active">404</span>
          </div>

          <button className="nf-back-btn" onClick={handleBack}>
            <IconArrowLeft />
            <span>Go Back</span>
          </button>
        </div>
      </nav>

      {/* ── Main card ── */}
      <main className="nf-main">
        <div className="nf-card">
          {/* Left — dark panel */}
          <div className="nf-left">
            <div className="nf-left-inner">
              {/* Big 404 */}
              <div className="nf-code-block">
                <span className="nf-404">404</span>
                <div className="nf-404-glow" />
              </div>

              {/* Status badge */}
              <div className="nf-badge">
                <span className="nf-badge-dot" />
                Page Not Found
              </div>

              <p className="nf-left-desc">
                The page you're looking for has been moved, deleted, or never
                existed.
              </p>

              {/* Divider */}
              <div className="nf-left-divider" />

              {/* Quick links */}
              <div className="nf-quick-label">Quick Links</div>
              <div className="nf-quick-links">
                <button
                  className="nf-quick-item"
                  onClick={() => navigate("/dashboard")}
                >
                  <div className="nf-quick-icon">
                    <IconHome />
                  </div>
                  <div className="nf-quick-text">
                    <span className="nf-quick-title">Dashboard</span>
                    <span className="nf-quick-sub">Back to overview</span>
                  </div>
                </button>
                <button
                  className="nf-quick-item"
                  onClick={() => navigate("/board")}
                >
                  <div className="nf-quick-icon">
                    <IconBoard />
                  </div>
                  <div className="nf-quick-text">
                    <span className="nf-quick-title">My Board</span>
                    <span className="nf-quick-sub">View your tasks</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right — white panel */}
          <div className="nf-right">
            {/* Illustration area */}
            <div className="nf-illustration">
              {/* Animated grid of task cards */}
              <div className="nf-grid">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`nf-tile ${i === 4 ? "nf-tile-missing" : ""}`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {i !== 4 && (
                      <>
                        <div className="nf-tile-bar nf-tile-bar-1" />
                        <div className="nf-tile-bar nf-tile-bar-2" />
                        <div
                          className="nf-tile-dot"
                          style={{
                            background: [
                              "#3b82f6",
                              "#10b981",
                              "#f97316",
                              "#6b7280",
                              "#3b82f6",
                              "#ef4444",
                              "#10b981",
                              "#3b82f6",
                            ][i],
                          }}
                        />
                      </>
                    )}
                    {i === 4 && <div className="nf-tile-question">?</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Text content */}
            <div className="nf-content">
              <div className="nf-page-label">Error 404</div>
              <h1 className="nf-title">
                Oops! This page
                <br />
                <span>doesn't exist</span>
              </h1>
              <p className="nf-subtitle">
                We couldn't find what you were looking for. The URL may be
                misspelled or the page may have been removed.
              </p>

              <div className="nf-actions">
                <button
                  className="nf-btn-primary"
                  onClick={() => navigate("/dashboard")}
                >
                  <IconHome />
                  <span>Go to Dashboard</span>
                </button>
                <button className="nf-btn-secondary" onClick={handleBack}>
                  <IconArrowLeft />
                  <span>Go Back</span>
                </button>
              </div>

              {/* Error code pill */}
              <div className="nf-error-meta">
                <span className="nf-error-code">ERR_PAGE_NOT_FOUND</span>
                <span className="nf-error-dot" />
                <span className="nf-error-hint">HTTP 404</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
