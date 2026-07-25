import { useState } from "react";

const T = {
  paper: "#040712", // Very deep, rich space-navy background
  panel: "rgba(13, 20, 38, 0.45)", // Premium glassmorphic panel background
  panelLight: "rgba(22, 34, 64, 0.7)", // Highlight panels
  ink: "#F8FAFC", // Bright slate-50 text
  inkSoft: "#94A3B8", // Muted slate-400 text
  grey: "#475569", // Darker slate-600 grey
  line: "rgba(255, 255, 255, 0.05)", // Fine border lines
  gold: "#D9A036", // Warm metallic primary gold
  goldSoft: "#E9C37A", // Soft light gold accent
  teal: "#0F766E", // Deep teal-700
  coral: "#D95639", // Terracotta/coral-600
  green: "#059669", // Success emerald-600
  greenBright: "#10B981", // Glowing emerald-500
  navy: "#02040A", // Ultimate deep navy
  navyMid: "rgba(8, 12, 24, 0.8)", // Dark mid navy
  accentGlow: "rgba(217, 160, 54, 0.15)", // Soft gold glow
};

const fontHead = "'Archivo', sans-serif";
const fontBody = "'Inter', sans-serif";
const fontMono = "'IBM Plex Mono', monospace";

// ---------- Revenue model ----------
const LAUNCH_FEE = 4500;
const RETAINER = 1500;
const MARGIN_PER_CLIENT = 800; // retainer margin after ad spend + tools
const BUILD_MARGIN = 3200; // launch fee margin once templated

const STATS = [
  { big: "13%", label: "of Caribbean adults use generative AI — versus ~55% globally. The other 87% are the market.", color: T.gold, grad: "linear-gradient(135deg, #FFF 0%, #E9C37A 60%, #D9A036 100%)" },
  { big: "<2%", label: "of AI firms in Latin America & the Caribbean are Caribbean. Almost nobody is serving this locally.", color: T.coral, grad: "linear-gradient(135deg, #FFF 0%, #FFA896 60%, #D95639 100%)" },
  { big: "0", label: "local competitors offering landing page + ads + email + AI analytics as one package, one invoice.", color: T.greenBright, grad: "linear-gradient(135deg, #FFF 0%, #A7F3D0 60%, #10B981 100%)" },
];

const PIPELINE = [
  { 
    num: "01", 
    name: "Landing Page", 
    desc: "A conversion page for their promotion — car offer, destination special, product drop. Built from our template in days, not weeks.", 
    color: "#14B8A6",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    )
  },
  { 
    num: "02", 
    name: "Cart / Booking", 
    desc: "Buy, book, or reserve — Shopify Buy Button, Cal.com, or deposit links. Every order fires a webhook into our system.", 
    color: T.coral,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    )
  },
  { 
    num: "03", 
    name: "Email Automation", 
    desc: "Six emails that follow up by themselves: abandoned carts, test-drive reminders, review asks. Revenue while everyone sleeps.", 
    color: T.goldSoft,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8z"/>
        <path d="M22 9l-10 7L2 9"/>
      </svg>
    )
  },
  { 
    num: "04", 
    name: "AI Analytics", 
    desc: "A monthly Claude-generated report in plain English: who bought, which ad paid for itself, what to change. This is why they never cancel.", 
    color: T.greenBright,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        <path d="M22 7l-3-3-3 3M2 17l3 3 3-3"/>
      </svg>
    )
  },
];

const WHY_WE_WIN = [
  { h: "The tech is already built", p: "Landing templates, Shopify GraphQL, Supabase, email flows, AI reporting — we've shipped every piece for real clients. This is assembly, not invention." },
  { h: "Ads included = irresistible", p: "\"Your ad spend is on us\" is a pitch no local competitor makes. It's priced in — BDS $600/mo of the retainer goes to Meta/Google — and it closes deals." },
  { h: "Templated = compounding margin", p: "Client #1 takes two weeks. Client #5 takes three days. Same fee. The margin curve only goes up." },
  { h: "Warm pipeline from day one", p: "Existing web and ads clients are pre-qualified prospects. We demo on our own businesses before we ever cold pitch." },
];

const PLAN_30 = [
  { wk: "WEEK 1", items: ["Build the master landing template + tracking recipe", "Wire the cart/booking webhook flow in Make/n8n"] },
  { wk: "WEEK 2", items: ["Build the 3 email sequence templates in Brevo", "Stand up the dashboard + Claude report prompt"] },
  { wk: "WEEK 3", items: ["Go live on our own demo (Starlight / Island Tote)", "Produce the one-page offer + this pitch as a leave-behind"] },
  { wk: "WEEK 4", items: ["Pitch 5 warm prospects at founder pricing", "Close 2 → BDS $9,000 in launch fees + $3,000/mo recurring starts"] },
];

const CLIENT_NAMES = [
  { name: "Island Motors", type: "Car Dealership" },
  { name: "Sandy Ridge Villas", type: "Vacation Villa Rentals" },
  { name: "Nectar Botanical", type: "FMCG Brand" },
  { name: "Coral Reef Safaris", type: "Luxury Charter Tours" },
  { name: "West Coast Spa", type: "Wellness Center" },
  { name: "Bajan Bites", type: "Artisanal Foods" },
  { name: "Horizon Real Estate", type: "Property Agency" },
  { name: "Platinum Retail", type: "Luxury Boutique" },
  { name: "Arawak Home Decor", type: "Furniture Brand" },
  { name: "Tropix Festival", type: "Crop Over Experience" },
  { name: "Sugar Reef Resort", type: "Boutique Hotel" },
  { name: "Caribbean Cargo", type: "Logistics Hub" },
  { name: "Solar Barbados", type: "Energy Firm" },
  { name: "Sandy Bay Marina", type: "Yacht Charters" },
  { name: "Platinum Auto", type: "Luxury Vehicles" }
];

function money(n) {
  return "BDS $" + n.toLocaleString();
}

function Eyebrow({ children, color = T.gold }) {
  return (
    <div style={{ fontFamily: fontMono, fontSize: 11, letterSpacing: "0.18em", color, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
      <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
      {children}
    </div>
  );
}

export default function PartnerPitch() {
  const [clients, setClients] = useState(6);

  const mrr = clients * RETAINER;
  const arr = mrr * 12;
  const monthlyMargin = clients * MARGIN_PER_CLIENT;
  const yearOneLaunch = clients * LAUNCH_FEE;
  const yearOneBuildMargin = clients * BUILD_MARGIN;
  const yearOneTotal = yearOneLaunch + arr;
  const yearOneEstMargin = monthlyMargin * 12 + yearOneBuildMargin;

  // Split calculations
  const totalAdSpend = clients * 600;
  const totalToolCosts = clients * 100;
  const totalNetMargin = clients * 800;

  return (
    <div style={{ 
      fontFamily: fontBody, 
      background: T.paper,
      backgroundImage: `radial-gradient(circle at 20% 10%, rgba(217, 160, 54, 0.05) 0%, transparent 50%), 
                        radial-gradient(circle at 80% 90%, rgba(16, 185, 129, 0.05) 0%, transparent 50%), 
                        radial-gradient(circle at 50% 50%, rgba(217, 86, 57, 0.02) 0%, transparent 60%)`,
      minHeight: "100vh", 
      color: T.ink, 
      overflowX: "hidden" 
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        button, input { font-family: inherit; }
        button { cursor: pointer; }
        
        button:focus-visible, input:focus-visible { 
          outline: 2px solid ${T.gold}; 
          outline-offset: 2px; 
        }
        
        @keyframes rise { 
          from { opacity: 0; transform: translateY(18px); } 
          to { opacity: 1; transform: none; } 
        }
        
        .rise { animation: rise .6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .rise2 { animation: rise .6s cubic-bezier(0.16, 1, 0.3, 1) .1s both; }
        .rise3 { animation: rise .6s cubic-bezier(0.16, 1, 0.3, 1) .2s both; }
        
        /* Custom Input Range Styling */
        input[type=range] { 
          -webkit-appearance: none; 
          width: 100%; 
          height: 10px; 
          background: rgba(21, 31, 56, 0.8); 
          border-radius: 99px;
          border: 1px solid rgba(255,255,255,0.06);
          outline: none;
        }
        
        input[type=range]::-webkit-slider-thumb { 
          -webkit-appearance: none; 
          width: 26px; 
          height: 26px; 
          border-radius: 50%;
          background: linear-gradient(135deg, #FFF 0%, ${T.goldSoft} 40%, ${T.gold} 100%); 
          border: 2px solid ${T.navy}; 
          cursor: grab; 
          box-shadow: 0 0 15px rgba(217, 160, 54, 0.6);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        
        input[type=range]::-webkit-slider-thumb:active { 
          cursor: grabbing; 
          transform: scale(1.25);
          box-shadow: 0 0 20px rgba(217, 160, 54, 0.8);
        }
        
        input[type=range]::-moz-range-thumb { 
          width: 26px; 
          height: 26px; 
          border-radius: 50%;
          background: linear-gradient(135deg, #FFF 0%, ${T.goldSoft} 40%, ${T.gold} 100%); 
          border: 2px solid ${T.navy}; 
          cursor: grab; 
          box-shadow: 0 0 15px rgba(217, 160, 54, 0.6);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        
        input[type=range]::-moz-range-thumb:active { 
          cursor: grabbing; 
          transform: scale(1.25);
          box-shadow: 0 0 20px rgba(217, 160, 54, 0.8);
        }

        .hover-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-card:hover {
          transform: translateY(-5px);
          border-color: rgba(217, 160, 54, 0.3) !important;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 15px rgba(217, 160, 54, 0.05) !important;
        }

        .pipeline-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pipeline-card:hover {
          background: ${T.panelLight} !important;
          border-color: rgba(255, 255, 255, 0.08) !important;
          transform: translateY(-4px);
        }

        .client-node {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .client-node.active:hover {
          border-color: rgba(217, 160, 54, 0.4);
          background: rgba(217, 160, 54, 0.05);
          transform: translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) { 
          .rise, .rise2, .rise3 { animation: none; } 
          .hover-card, .pipeline-card, .client-node { transition: none; }
        }
      `}</style>

      {/* ---------- HERO SECTION WITH RADIAL GLOW ---------- */}
      <header style={{ 
        background: `linear-gradient(to bottom, ${T.navy}, transparent)`, 
        padding: "100px 24px 80px", 
        borderBottom: `1px solid ${T.line}`,
        position: "relative", 
        overflow: "hidden" 
      }}>
        {/* Abstract vector pattern */}
        <div style={{ 
          position: "absolute", 
          top: 0, 
          right: 0, 
          width: 500, 
          height: "100%", 
          background: `radial-gradient(circle at 70% 30%, rgba(217, 160, 54, 0.07) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          pointerEvents: "none",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 50%, transparent 100%)"
        }} />
        
        <div style={{ maxWidth: 1020, margin: "0 auto", position: "relative" }}>
          <div className="ambient-dot" style={{ position: "absolute", top: "10%", right: "15%", width: 4, height: 4, background: T.goldSoft, borderRadius: "50%", opacity: 0.3, boxShadow: `0 0 8px ${T.goldSoft}` }}></div>
          <div className="ambient-dot" style={{ position: "absolute", bottom: "25%", left: "30%", width: 6, height: 6, background: T.goldSoft, borderRadius: "50%", opacity: 0.2, boxShadow: `0 0 8px ${T.goldSoft}` }}></div>

          <Eyebrow color={T.goldSoft}>ZDMINC · Partner Brief · Confidential</Eyebrow>
          
          <h1 className="rise" style={{ 
            fontFamily: fontHead, 
            fontWeight: 900, 
            fontSize: "clamp(38px, 6.5vw, 72px)", 
            color: T.ink, 
            margin: "12px 0 0", 
            lineHeight: 1.02, 
            letterSpacing: "-0.03em" 
          }}>
            Every promotion in Barbados<br />
            <span style={{ 
              background: `linear-gradient(135deg, #FFF6E0 0%, ${T.goldSoft} 40%, ${T.gold} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 15px rgba(217, 160, 54, 0.1))"
            }}>needs this package.</span><br />
            Nobody else sells it.
          </h1>
          
          <p className="rise2" style={{ 
            color: T.inkSoft, 
            fontSize: 17, 
            maxWidth: 700, 
            lineHeight: 1.75, 
            marginTop: 28 
          }}>
            Car dealers pushing a new model. Villas filling the slow season. Brands dropping a product.
            They all run promotions — and they all cobble together a page here, some ads there, and no
            follow-up at all. <strong style={{ color: T.ink }}>Launch → Insight</strong> gives them the whole
            machine: landing page, checkout, automated email, social ads <em>with the spend included</em>,
            and an AI report that proves it worked. One fee. One retainer. One invoice.
          </p>
          
          {/* Key metrics cards in hero */}
          <div className="rise3" style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
            gap: 24, 
            marginTop: 48,
            position: "relative",
            zIndex: 1
          }}>
            <div className="hero-card" style={{ background: T.panel, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${T.line}`, padding: "24px 28px", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
              <div style={{ fontFamily: fontMono, fontSize: 11, color: T.inkSoft, letterSpacing: "0.12em" }}>ONE-TIME LAUNCH FEE</div>
              <div style={{ fontFamily: fontHead, fontWeight: 800, fontSize: 34, color: T.goldSoft, marginTop: 6 }}>{money(LAUNCH_FEE)}</div>
            </div>
            
            <div className="hero-card" style={{ background: T.panel, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${T.line}`, padding: "24px 28px", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
              <div style={{ fontFamily: fontMono, fontSize: 11, color: T.inkSoft, letterSpacing: "0.12em" }}>ALL-IN RETAINER</div>
              <div style={{ fontFamily: fontHead, fontWeight: 800, fontSize: 34, marginTop: 6, display: "inline-block", background: `linear-gradient(135deg, #A7F3D0 0%, ${T.greenBright} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {money(RETAINER)}<span style={{ fontSize: 14, fontWeight: 400, color: T.inkSoft, WebkitTextFillColor: "initial" }}>/mo</span>
              </div>
            </div>
            
            <div className="hero-card" style={{ background: T.panel, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${T.line}`, padding: "24px 28px", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
              <div style={{ fontFamily: fontMono, fontSize: 11, color: T.inkSoft, letterSpacing: "0.12em" }}>SIGNED → GO LIVE</div>
              <div style={{ fontFamily: fontHead, fontWeight: 800, fontSize: 34, color: T.ink, marginTop: 6 }}>14 Days</div>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- THE GAP ---------- */}
      <section style={{ maxWidth: 1020, margin: "0 auto", padding: "72px 24px 24px" }}>
        <Eyebrow color={T.coral}>Why now — the gap is embarrassing</Eyebrow>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 12 }}>
          {STATS.map((s, i) => (
            <div key={i} className="stat-card" style={{ 
              background: T.panel, 
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${T.line}`, 
              borderLeft: `3px solid ${s.color}`, 
              padding: "36px 28px",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
            }}>
              <div style={{ 
                fontFamily: fontHead, 
                fontWeight: 900, 
                fontSize: 54, 
                lineHeight: 1,
                background: s.grad,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>{s.big}</div>
              <p style={{ fontSize: 14, color: T.inkSoft, lineHeight: 1.65, margin: "18px 0 0" }}>{s.label}</p>
            </div>
          ))}
        </div>
        
        <p style={{ fontSize: 15, color: T.inkSoft, maxWidth: 740, lineHeight: 1.75, marginTop: 28 }}>
          Every study says the same thing: Caribbean businesses know AI and automation matter,
          but almost nobody local will <em>implement it for them</em>. That implementation gap is
          the business. We're not selling technology — we're selling a promotion that runs itself.
        </p>
      </section>

      {/* ---------- THE PRODUCT ---------- */}
      <section style={{ maxWidth: 1020, margin: "0 auto", padding: "72px 24px 24px" }}>
        <Eyebrow color="#14B8A6">What the client gets — the four-stage machine</Eyebrow>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {PIPELINE.map((p) => (
            <div key={p.num} className="pipeline-card" style={{ 
              background: T.panel, 
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${T.line}`, 
              padding: "32px 24px", 
              borderRadius: 12,
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)"
            }}>
              {/* Node highlight on top-right */}
              <div style={{ 
                position: "absolute", 
                top: 16, 
                right: 20, 
                fontFamily: fontMono, 
                fontSize: 11, 
                fontWeight: 600, 
                color: T.grey,
                letterSpacing: "0.1em"
              }}>
                {p.num}
              </div>
              
              <div style={{ 
                background: `${p.color}10`, 
                color: p.color, 
                width: 48, 
                height: 48, 
                borderRadius: 10, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                marginBottom: 24,
                boxShadow: `0 0 15px ${p.color}15`
              }}>
                {p.icon}
              </div>
              
              <div style={{ fontFamily: fontHead, fontWeight: 800, fontSize: 19, color: T.ink }}>{p.name}</div>
              <p style={{ fontSize: 13.5, color: T.inkSoft, lineHeight: 1.65, margin: "12px 0 0" }}>{p.desc}</p>
            </div>
          ))}
        </div>
        
        <div style={{ 
          marginTop: 32, 
          background: `linear-gradient(90deg, ${T.panel} 0%, rgba(217, 160, 54, 0.02) 100%)`, 
          borderLeft: `3px solid ${T.gold}`,
          borderTop: `1px solid ${T.line}`,
          borderBottom: `1px solid ${T.line}`,
          padding: "24px 28px", 
          borderRadius: "0 12px 12px 0",
          fontSize: 14.5, 
          color: T.inkSoft, 
          lineHeight: 1.75 
        }}>
          <strong style={{ color: T.goldSoft, fontFamily: fontMono, fontSize: 11, letterSpacing: "0.12em", display: "block", marginBottom: 6 }}>THE HOOK</strong>
          "Your social ad spend is on us." <span style={{ color: T.ink }}>BDS $600/month</span> of real Meta/Google spend is baked into the
          retainer. No local agency says this. It reframes the whole conversation from cost to value —
          and it's fully priced in.
        </div>
      </section>

      {/* ---------- THE INTERACTIVE MONEY ENGINE ---------- */}
      <section style={{ maxWidth: 1020, margin: "0 auto", padding: "72px 24px 24px" }}>
        <Eyebrow color={T.greenBright}>The money — interactive modeler</Eyebrow>
        
        <div className="modeler-box">
          <div className="modeler-header">
            <div>
              <h3 className="modeler-title">
                What does <span style={{ color: T.goldSoft }}>{clients} client{clients > 1 ? "s" : ""}</span> on retainer look like?
              </h3>
              <p style={{ fontSize: 14, color: T.inkSoft, margin: "4px 0 0" }}>Drag the slider to project scale and review the margin curve.</p>
            </div>
            <div style={{ fontFamily: fontMono, fontSize: 11, color: T.grey, letterSpacing: "0.12em" }}>
              YEAR-ONE INTERACTIVE ENGINE
            </div>
          </div>

          {/* Slider input */}
          <div className="slider-container">
            <div className="slider-header">
              <span style={{ fontFamily: fontMono, fontSize: 13, color: T.inkSoft }}>Capacity</span>
              <span style={{ fontFamily: fontMono, fontSize: 20, color: T.goldSoft, fontWeight: 600, textShadow: "0 0 12px rgba(233, 195, 122, 0.2)" }}>{clients} Active Clients</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              value={clients}
              onChange={(e) => setClients(Number(e.target.value))}
              aria-label="Number of clients"
            />
            <div style={{ display: "flex", justifySpaceBetween: "space-between", justifyContent: "space-between", fontFamily: fontMono, fontSize: 11, color: T.grey, marginTop: 10 }}>
              <span>1 Client</span>
              <span>8 Clients</span>
              <span>15 Clients</span>
            </div>
          </div>

          {/* DYNAMIC COST SPLIT BAR CHART */}
          <div className="chart-box">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <span style={{ fontFamily: fontMono, fontSize: 12, color: T.inkSoft, letterSpacing: "0.05em" }}>MONTHLY REVENUE SPLIT ({money(mrr)})</span>
              <span style={{ fontFamily: fontMono, fontSize: 12, color: T.greenBright, fontWeight: 600, textShadow: "0 0 8px rgba(16, 185, 129, 0.1)" }}>Net Profit Margin: {((totalNetMargin / mrr) * 100).toFixed(0)}%</span>
            </div>
            
            {/* The horizontal bar */}
            <div className="chart-bar">
              <div style={{ 
                width: `${(totalAdSpend / mrr) * 100}%`, 
                background: T.coral, 
                transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }} className="bar-segment">
                {money(totalAdSpend)} Ads
              </div>
              <div style={{ 
                width: `${(totalToolCosts / mrr) * 100}%`, 
                background: "rgba(22, 34, 64, 0.6)", 
                color: T.inkSoft,
                transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
              }} className="bar-segment">
                {money(totalToolCosts)} Tools
              </div>
              <div style={{ 
                width: `${(totalNetMargin / mrr) * 100}%`, 
                background: `linear-gradient(90deg, ${T.green} 0%, ${T.greenBright} 100%)`, 
                color: T.navy,
                transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                justifyContent: "flex-end"
              }} className="bar-segment">
                Net Margin: {money(totalNetMargin)}/mo
              </div>
            </div>
            
            {/* Legend */}
            <div style={{ display: "flex", gap: 24, marginTop: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.inkSoft }}>
                <span style={{ width: 10, height: 10, background: T.coral, borderRadius: 3, boxShadow: `0 0 6px ${T.coral}` }} />
                <span>Client Ad Spend (Meta/Google: {money(600)}/mo)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.inkSoft }}>
                <span style={{ width: 10, height: 10, background: "rgba(22, 34, 64, 0.9)", borderRadius: 3 }} />
                <span>Tool Costs (Brevo, n8n, OpenAI: {money(100)}/mo)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.inkSoft }}>
                <span style={{ width: 10, height: 10, background: T.greenBright, borderRadius: 3, boxShadow: `0 0 6px ${T.greenBright}` }} />
                <span>Net ZDMINC Recurring Margin ({money(800)}/mo)</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC PIPELINE CLIENT LIGHT-UP GRID */}
          <div style={{ marginBottom: 44 }}>
            <div style={{ fontFamily: fontMono, fontSize: 12, color: T.inkSoft, letterSpacing: "0.05em", marginBottom: 16 }}>
              PIPELINE ACQUISITION STACK
            </div>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", 
              gap: 14 
            }}>
              {CLIENT_NAMES.map((c, i) => {
                const isActive = i < clients;
                return (
                  <div 
                    key={i} 
                    className={`client-node ${isActive ? 'active' : ''}`} 
                    style={{ 
                      background: isActive ? "rgba(217, 160, 54, 0.03)" : "rgba(13, 20, 38, 0.2)",
                      borderColor: isActive ? "rgba(217, 160, 54, 0.22)" : "rgba(255, 255, 255, 0.05)",
                      borderStyle: isActive ? "solid" : "dashed",
                      borderRadius: 10,
                      padding: "14px 16px",
                      position: "relative",
                      opacity: isActive ? 1 : 0.25,
                      boxShadow: isActive ? "0 8px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)" : "none"
                    }}
                  >
                    <div style={{ 
                      fontFamily: fontMono, 
                      fontSize: 10, 
                      color: isActive ? T.goldSoft : T.grey, 
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                      letterSpacing: "0.05em"
                    }}>
                      <span>SLOT {String(i + 1).padStart(2, "0")}</span>
                      <span style={{ textShadow: isActive ? "0 0 8px rgba(233, 195, 122, 0.3)" : "none" }}>{isActive ? "CLOSED" : "VACANT"}</span>
                    </div>
                    <div style={{ 
                      fontFamily: fontHead, 
                      fontWeight: isActive ? 800 : 500, 
                      fontSize: 14.5, 
                      color: isActive ? T.ink : T.grey, 
                      marginTop: 8,
                      letterSpacing: "-0.015em"
                    }}>
                      {isActive ? c.name : "Pitch Pipeline"}
                    </div>
                    <div style={{ 
                      fontSize: 11, 
                      color: isActive ? T.goldSoft : T.grey, 
                      marginTop: 3 
                    }}>
                      {isActive ? c.type : "BDS $1,500/mo"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* REVENUE CARDS MATRIX */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 20 }}>
            <div style={{ background: T.navyMid, padding: "22px 24px", borderRadius: 10, borderLeft: `3px solid ${T.greenBright}`, border: "1px solid rgba(255,255,255,0.03)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}>
              <div style={{ fontFamily: fontMono, fontSize: 10, color: T.inkSoft, letterSpacing: "0.1em" }}>MONTHLY RECURRING REVENUE</div>
              <div style={{ fontFamily: fontMono, fontSize: 30, color: T.greenBright, fontWeight: 700, marginTop: 6, textShadow: "0 0 10px rgba(16, 185, 129, 0.1)" }}>{money(mrr)}</div>
            </div>
            
            <div style={{ background: T.navyMid, padding: "22px 24px", borderRadius: 10, borderLeft: `3px solid ${T.gold}`, border: "1px solid rgba(255,255,255,0.03)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}>
              <div style={{ fontFamily: fontMono, fontSize: 10, color: T.inkSoft, letterSpacing: "0.1em" }}>LAUNCH FEES (YEAR ONE)</div>
              <div style={{ fontFamily: fontMono, fontSize: 30, color: T.goldSoft, fontWeight: 700, marginTop: 6, textShadow: "0 0 10px rgba(233, 195, 122, 0.1)" }}>{money(yearOneLaunch)}</div>
            </div>
            
            <div style={{ background: T.navyMid, padding: "22px 24px", borderRadius: 10, borderLeft: `3px solid ${T.ink}`, border: "1px solid rgba(255,255,255,0.03)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)" }}>
              <div style={{ fontFamily: fontMono, fontSize: 10, color: T.inkSoft, letterSpacing: "0.1em" }}>TOTAL YEAR-ONE CONTRACT VALUE</div>
              <div style={{ fontFamily: fontMono, fontSize: 30, color: T.ink, fontWeight: 700, marginTop: 6 }}>{money(yearOneTotal)}</div>
            </div>
            
            <div style={{ 
              background: `linear-gradient(135deg, ${T.navyMid} 0%, rgba(16, 185, 129, 0.05) 100%)`, 
              padding: "22px 24px", 
              borderRadius: 10, 
              borderLeft: `3px solid ${T.greenBright}`,
              border: "1px solid rgba(255,255,255,0.03)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3), 0 0 15px rgba(16, 185, 129, 0.08)"
            }}>
              <div style={{ fontFamily: fontMono, fontSize: 10, color: T.greenBright, letterSpacing: "0.1em", fontWeight: 600 }}>EST. YEAR-ONE NET MARGIN</div>
              <div style={{ fontFamily: fontMono, fontSize: 30, color: T.greenBright, fontWeight: 700, marginTop: 6, textShadow: "0 0 12px rgba(16, 185, 129, 0.15)" }}>{money(yearOneEstMargin)}</div>
            </div>
          </div>

          <div style={{ 
            fontFamily: fontMono, 
            fontSize: 11.5, 
            color: T.inkSoft, 
            marginTop: 24, 
            lineHeight: 1.65, 
            paddingTop: 20, 
            borderTop: `1px solid ${T.line}` 
          }}>
            <span style={{ color: T.goldSoft }}>Note:</span> {money(LAUNCH_FEE)} launch fee yields {money(BUILD_MARGIN)} build margin. 
            {money(RETAINER)}/mo retainer yields {money(MARGIN_PER_CLIENT)} net recurring margin. Ads Boost upsells, additional landing template variants, and AI analytics reports add-ons are not included in projections.
          </div>
        </div>
      </section>

      {/* ---------- WHY WE WIN ---------- */}
      <section style={{ maxWidth: 1020, margin: "0 auto", padding: "72px 24px 24px" }}>
        <Eyebrow color={T.goldSoft}>Why ZDMINC wins this</Eyebrow>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {WHY_WE_WIN.map((w, i) => (
            <div key={i} className="hover-card" style={{ 
              background: T.panel, 
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${T.line}`, 
              borderRadius: 12,
              padding: "28px 24px", 
              display: "flex", 
              gap: 20,
              boxShadow: "0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)"
            }}>
              <div style={{ 
                fontFamily: fontHead, 
                fontWeight: 900, 
                fontSize: 32, 
                color: T.goldSoft, 
                lineHeight: 1,
                textShadow: "0 0 10px rgba(217, 160, 54, 0.2)"
              }}>{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h4 style={{ fontFamily: fontHead, fontWeight: 800, fontSize: 18, color: T.ink, margin: 0 }}>{w.h}</h4>
                <p style={{ fontSize: 13.5, color: T.inkSoft, lineHeight: 1.65, margin: "8px 0 0" }}>{w.p}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 30-DAY PLAN ---------- */}
      <section style={{ maxWidth: 1020, margin: "0 auto", padding: "72px 24px 80px" }}>
        <Eyebrow color={T.coral}>The first 30 days — from yes to revenue</Eyebrow>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", 
          gap: 1, 
          background: T.line,
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${T.line}`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
        }}>
          {PLAN_30.map((w, i) => {
            const isLast = i === 3;
            return (
              <div key={i} style={{ 
                background: isLast ? `radial-gradient(circle at 90% 10%, rgba(217, 160, 54, 0.05), transparent), rgba(16, 24, 48, 0.85)` : "rgba(13, 20, 38, 0.45)", 
                padding: "30px 24px 24px"
              }}>
                <div style={{ 
                  fontFamily: fontMono, 
                  fontSize: 11, 
                  letterSpacing: "0.14em", 
                  color: isLast ? T.goldSoft : T.grey,
                  fontWeight: 600,
                  textShadow: isLast ? "0 0 8px rgba(233, 195, 122, 0.2)" : "none"
                }}>{w.wk}</div>
                {w.items.map((it, j) => (
                  <p key={j} style={{ 
                    fontSize: 13.5, 
                    lineHeight: 1.65, 
                    color: isLast ? T.ink : T.inkSoft, 
                    margin: "14px 0 0" 
                  }}>
                    <span style={{ color: isLast ? T.greenBright : T.goldSoft, fontWeight: 700 }}>— </span>{it}
                  </p>
                ))}
              </div>
            );
          })}
        </div>

        {/* Closing Gold Banner Callout */}
        <div className="gold-banner">
          <div style={{ maxWidth: 640 }}>
            <h3 style={{ fontFamily: fontHead, fontWeight: 900, fontSize: 26, color: T.navy, margin: 0, letterSpacing: "-0.02em" }}>
              Two closes in month one pays for everything.
            </h3>
            <p style={{ fontSize: 15, color: "#4A3510", marginTop: 8, lineHeight: 1.6, fontWeight: 500 }}>
              {money(9000)} in launch fees + {money(3000)}/mo recurring starts — and every client after that is faster and cheaper to deliver.
            </p>
          </div>
          <button className="banner-btn">
            LET'S BUILD IT →
          </button>
        </div>
        
        <div style={{ fontFamily: fontMono, fontSize: 11, color: T.grey, marginTop: 28, textAlign: "center", letterSpacing: "0.05em" }}>
          ZDMINC · Launch → Insight · Partner brief 2026
        </div>
      </section>
    </div>
  );
}
