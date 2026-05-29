import React, { useEffect, useState, useRef } from "react";
import { MapPin, Mail, CalendarHeart } from "lucide-react";
import ScratchCard from "react-scratchcard-v2";
import "./App.css";
import "./scratch-styles.css";

// Intersection Observer Hook for scroll animations
function useOnScreen(options) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Optional: unobserve once visible if you only want it to animate once
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
}

const ScrollAnimatedSection = ({ children, className = "" }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

  useEffect(() => {
    // Set target date to July 19, 2026 23:30:00 (11:30 PM)
    const targetDate = new Date("July 19, 2026 23:30:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Curtain Overlay */}
      <div className={`curtain-container ${isCurtainOpen ? "open" : ""}`}>
        <div className="curtain-panel curtain-left"></div>
        <div className="curtain-panel curtain-right"></div>
        <div
          className={`curtain-content ${isCurtainOpen ? "hidden" : ""}`}
          onClick={() => setIsCurtainOpen(true)}
        >
          <img
            src="/logo.jpeg"
            alt="Invitation Logo"
            className="curtain-logo"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="curtain-placeholder-logo" style={{ display: "none" }}>
            <span className="logo-letter">प्र</span>
            <span className="logo-letter">ऋ</span>
          </div>
          <p className="curtain-text">Tap to Open</p>
        </div>
      </div>

      <div
        className={`app-container ${isCurtainOpen ? "visible" : "hidden-initially"}`}
      >
        {/* Hero Section */}
        <section className="section hero">
          <ScrollAnimatedSection>
            <img
              src="/ganesh.png"
              alt="Lord Ganesha"
              className="ganesha-icon fade-in"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="text-small fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Together with their families
            </div>

            <div
              className="couple-names fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <h1 className="heading-display gold-gradient-text">Prathamesh</h1>
              <div className="weds-text">weds</div>
              <h1 className="heading-display gold-gradient-text">Rutuja</h1>
            </div>

            <div
              className="heading-serif fade-in"
              style={{ animationDelay: "0.8s" }}
            >
              Request the honor of your presence
            </div>
          </ScrollAnimatedSection>
        </section>

        {/* Quote Section */}
        <section className="section">
          <ScrollAnimatedSection>
            <div className="quote-text">
              "Love is in the air 💖 Join us for a magical celebration of love,
              happiness, and togetherness. 🥂 Let's create beautiful memories
              together on this unforgettable day. 💍"
            </div>
          </ScrollAnimatedSection>
        </section>

        {/* Date Section */}
        <section className="section">
          <ScrollAnimatedSection>
            <div className="heading-serif gold-gradient-text">
              Save the Date
            </div>
            <div className="date-section">
              <h2 className="date-display">July 19, 2026</h2>
              <h4 className="date-display mt-4">Sunday</h4>
            </div>
            <div className="text-small">Until your arriving...</div>
          </ScrollAnimatedSection>
        </section>

        {/* Photo Section */}
        <section className="section">
          <ScrollAnimatedSection>
            <div className="polaroid">
              <img
                src="https://pixies.et/jvYdx9Qv"
                alt="Prathamesh and Rutuja"
                onError={(e) => {
                  // Fallback placeholder if image link is invalid
                  e.target.src = "photo.jpeg";
                }}
              />
            </div>
          </ScrollAnimatedSection>
        </section>

        {/* Countdown Section */}
        <section className="section">
          <ScrollAnimatedSection>
            <div
              className="heading-serif gold-gradient-text"
              style={{ fontSize: "1.8rem" }}
            >
              Counting Down to Forever
            </div>
            <div className="countdown-grid">
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.days}</span>
                <span className="countdown-label">Days</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.hours}</span>
                <span className="countdown-label">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.minutes}</span>
                <span className="countdown-label">Mins</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-value">{timeLeft.seconds}</span>
                <span className="countdown-label">Secs</span>
              </div>
            </div>
          </ScrollAnimatedSection>
        </section>

        {/* Timeline Section */}
        <section className="section">
          <ScrollAnimatedSection className="w-full">
            <div
              className="heading-display gold-gradient-text"
              style={{ fontSize: "2rem" }}
            >
              Program Timeline
            </div>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-time">12:33 PM</div>
                <div className="timeline-title">AkshataRopan</div>
                <div className="text-muted text-sm mt-1">
                  Join us to celebrate
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-time">11:00 AM - 3:00 PM</div>
                <div className="timeline-title">BHOJAN VEL</div>
                <div className="text-muted text-sm mt-1">
                  A delicious feast for all our guests
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-time">July 18, 6:00 PM Onwards</div>
                <div className="timeline-title">Haladi</div>
                <div className="text-muted text-sm mt-1">
                  Let the pre-wedding celebrations begin!
                </div>
              </div>
              {/* Add more timeline events here if needed */}
            </div>
          </ScrollAnimatedSection>
        </section>

        {/* Location Section (Scratch Card) */}
        <section className="section">
          <ScrollAnimatedSection className="w-full">
            <div
              className="heading-display gold-gradient-text"
              style={{ fontSize: "2rem" }}
            >
              Venue
            </div>

            <div className="scratch-to-reveal">
              Scratch to reveal the location
            </div>

            <div
              className="scratch-card-container"
              style={{ cursor: "pointer" }}
            >
              {isRevealed ? (
                <div
                  className="scratch-card-content"
                  onClick={() =>
                    window.open(
                      "https://maps.app.goo.gl/PZB8aTwmBCVQ4oYF8?g_st=aw",
                      "_blank",
                    )
                  }
                  style={{
                    position: "relative",
                    padding: 0,
                    width: "300px",
                    height: "150px",
                  }}
                >
                  <iframe
                    title="PADMAPRATAP MULTIPURPOSE HALL - Google Map"
                    style={{
                      width: "300px",
                      height: "150px",
                      border: "0",
                      pointerEvents: "none",
                    }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=PADMAPRATAP%20MULTIPURPOSE%20HALL&output=embed"
                  ></iframe>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1rem",
                        color: "var(--gold)",
                        margin: 0,
                      }}
                    >
                      Location
                    </p>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.2rem",
                        color: "white",
                        textAlign: "center",
                        padding: "0 10px",
                        margin: "5px 0 0 0",
                      }}
                    >
                      PADMAPRATAP MULTIPURPOSE HALL
                    </h3>
                  </div>
                </div>
              ) : (
                <ScratchCard
                  width={300}
                  height={150}
                  image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Golden_gradient.svg/800px-Golden_gradient.svg.png"
                  finishPercent={50}
                  onComplete={() => {
                    console.log("scratched");
                    setIsRevealed(true);
                  }}
                >
                  <div
                    className="scratch-card-content"
                    onClick={() =>
                      window.open(
                        "https://maps.app.goo.gl/PZB8aTwmBCVQ4oYF8?g_st=aw",
                        "_blank",
                      )
                    }
                    style={{
                      position: "relative",
                      padding: 0,
                      width: "300px",
                      height: "150px",
                    }}
                  >
                    <iframe
                      title="PADMAPRATAP MULTIPURPOSE HALL - Google Map"
                      style={{
                        width: "300px",
                        height: "150px",
                        border: "0",
                        pointerEvents: "none",
                      }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=PADMAPRATAP%20MULTIPURPOSE%20HALL&output=embed"
                    ></iframe>
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1rem",
                          color: "var(--gold)",
                          margin: 0,
                        }}
                      >
                        Location
                      </p>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.2rem",
                          color: "white",
                          textAlign: "center",
                          padding: "0 10px",
                          margin: "5px 0 0 0",
                        }}
                      >
                        PADMAPRATAP MULTIPURPOSE HALL
                      </h3>
                    </div>
                  </div>
                </ScratchCard>
              )}
            </div>

            {!isRevealed && (
              <button
                className="submit-btn"
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                  width: "auto",
                }}
                onClick={() => setIsRevealed(true)}
                aria-label="Reveal Location"
              >
                Reveal Location
              </button>
            )}
          </ScrollAnimatedSection>
        </section>

        {/* RSVP Section */}
        <section className="section" style={{ borderBottom: "none" }}>
          <ScrollAnimatedSection className="w-full">
            <div
              className="heading-display gold-gradient-text"
              style={{ fontSize: "2rem" }}
            >
              <Mail
                size={24}
                style={{
                  display: "inline",
                  marginRight: "10px",
                  verticalAlign: "middle",
                }}
              />
              Send a Message
            </div>

            <form className="rsvp-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label>Will you be attending?</label>
                <select
                  className="form-control"
                  style={{ backgroundColor: "#111", color: "white" }}
                >
                  <option value="yes">Joyfully Accept</option>
                  <option value="no">Regretfully Decline</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Message</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Leave a wish for the couple..."
                ></textarea>
              </div>

              <button className="submit-btn" type="button">
                Send Message
              </button>
            </form>

            <div
              className="heading-serif gold-gradient-text"
              style={{ marginTop: "4rem", fontSize: "1.2rem" }}
            >
              We wait to celebrate with you!
            </div>
          </ScrollAnimatedSection>
        </section>
      </div>
    </>
  );
}

export default App;
