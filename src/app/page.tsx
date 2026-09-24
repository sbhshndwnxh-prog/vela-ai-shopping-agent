"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, ImagePlus, LoaderCircle, MessageCircle, RotateCcw, ShieldCheck, Sparkles, Upload, X } from "@/components/icons";
import type { Product } from "@/lib/catalog";

type AgentResult = {
  mode: "demo" | "live" | "fallback";
  profile: { summary: string; signals: string[] };
  answer: string;
  picks: Product[];
  providerError?: string;
};

const steps = ["Photo", "Context", "Edit"];

export default function Home() {
  const [step, setStep] = useState(0);
  const [image, setImage] = useState("");
  const [occasion, setOccasion] = useState("Weekend city break");
  const [budget, setBudget] = useState("250");
  const [style, setStyle] = useState("Quiet, polished, effortless");
  const [result, setResult] = useState<AgentResult | null>(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function onImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) return alert("Please choose an image under 4 MB.");
    const reader = new FileReader();
    reader.onload = () => { setImage(String(reader.result)); setStep(1); };
    reader.readAsDataURL(file);
  }

  async function runAgent(followUp = "") {
    setLoading(true);
    try {
      const response = await fetch("/api/agent", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image, occasion, budget, style, question: followUp }) });
      const data = await response.json();
      setResult(data);
      setStep(2);
      setQuestion("");
    } finally { setLoading(false); }
  }

  function ask(event: FormEvent) {
    event.preventDefault();
    if (question.trim()) runAgent(question.trim());
  }

  function reset() {
    setStep(0); setImage(""); setResult(null); setQuestion("");
  }

  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Vela home">Vela<span>●</span></a>
        <div className="nav-links"><a href="#how">How it works</a><a href="#studio">Studio</a></div>
        <a className="nav-cta" href="#studio">Build my edit <ArrowRight size={16} /></a>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow"><Sparkles size={14} /> Personal shopping, made personal</div>
        <h1>Less searching.<br /><em>More knowing.</em></h1>
        <p className="hero-copy">Vela turns one photo and a few details into a thoughtful, shoppable edit—with a reason behind every pick.</p>
        <a className="primary-button" href="#studio">Meet your shopping agent <ArrowRight size={18} /></a>
        <div className="hero-note"><span><ShieldCheck size={15} /> Vela does not store your photo</span><span>Built for intentional buying</span></div>
        <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
      </section>

      <section className="principles" aria-label="Product principles">
        <p>See the signal</p><p>State the constraint</p><p>Understand every pick</p>
      </section>

      <section className="how" id="how">
        <div><span className="section-kicker">01 — THE APPROACH</span><h2>Not a feed.<br />A point of view.</h2></div>
        <div className="how-copy"><p>Most shopping tools give you more. Vela gives you clarity. It reads the visual signals you choose to share, listens to the context that matters, and builds a small edit you can actually use.</p><div className="metric"><strong>3</strong><span>inputs to a<br />considered edit</span></div></div>
      </section>

      <section className="studio-section" id="studio">
        <header className="studio-header"><div><span className="section-kicker">02 — VELA STUDIO</span><h2>Let’s build your edit.</h2></div><div className="stepper" aria-label={`Step ${step + 1} of 3`}>{steps.map((label, index) => <div className={index === step ? "active" : index < step ? "done" : ""} key={label}><span>{index < step ? <Check size={13} /> : index + 1}</span>{label}</div>)}</div></header>

        <div className="studio-card">
          {step === 0 && <div className="upload-step">
            <div className="step-copy"><span className="step-number">STEP 01</span><h3>Start with what you’re wearing.</h3><p>A mirror photo or outfit reference helps Vela understand your visible palette, proportions, silhouette and styling choices. It won’t infer sensitive personal traits.</p><button className="text-button" onClick={() => setStep(1)}>Continue without a photo <ArrowRight size={16} /></button></div>
            <button className="dropzone" onClick={() => inputRef.current?.click()}><input ref={inputRef} onChange={onImage} type="file" accept="image/jpeg,image/png,image/webp" hidden /><span className="upload-icon"><ImagePlus size={24} /></span><strong>Drop a look here</strong><small>or click to browse · JPG, PNG, WEBP · max 4 MB</small><span className="browse">Choose photo <Upload size={15} /></span></button>
          </div>}

          {step === 1 && <div className="context-step">
            <div className="image-preview">{image ? <><img src={image} alt="Your uploaded outfit reference" /><button onClick={() => setImage("")} aria-label="Remove uploaded photo"><X size={17} /></button></> : <div className="empty-photo"><ImagePlus size={28} /><span>No photo added</span><button onClick={() => inputRef.current?.click()}>Add one</button><input ref={inputRef} onChange={onImage} type="file" accept="image/jpeg,image/png,image/webp" hidden /></div>}<div className="privacy-badge"><ShieldCheck size={14} /> Not stored</div></div>
            <div className="context-form"><span className="step-number">STEP 02</span><h3>Give Vela the context.</h3><label>What are you dressing for?<input value={occasion} onChange={(e) => setOccasion(e.target.value)} /></label><div className="split-fields"><label>Total budget (USD)<span className="input-wrap"><b>$</b><input inputMode="numeric" value={budget} onChange={(e) => setBudget(e.target.value.replace(/\D/g, ""))} /></span></label><label>Style direction<input value={style} onChange={(e) => setStyle(e.target.value)} /></label></div><button className="primary-button form-submit" onClick={() => runAgent()} disabled={loading || !occasion || !budget}>{loading ? <><LoaderCircle className="spin" size={18} /> Building your edit</> : <>Build my edit <ArrowRight size={18} /></>}</button></div>
          </div>}

          {step === 2 && result && <div className="result-step">
            <aside className="profile-panel"><div className="profile-top"><span className="step-number">YOUR STYLE SIGNAL</span><span className={`mode ${result.mode}`}>{result.mode === "live" ? "Live AI" : result.mode === "fallback" ? "Demo fallback" : "Demo mode"}</span></div><h3>{result.profile.summary}</h3><div className="signal-list">{result.profile.signals.map((signal) => <span key={signal}>{signal}</span>)}</div><p className="agent-note"><Sparkles size={16} /> {result.answer}</p><button className="text-button" onClick={reset}><RotateCcw size={15} /> Start a new edit</button></aside>
            <div className="edit-panel"><div className="edit-title"><div><span className="step-number">YOUR EDIT</span><h3>Four pieces. Many ways forward.</h3></div><span className="total">${result.picks.reduce((sum, item) => sum + item.price, 0)} total</span></div><div className="product-grid">{result.picks.map((product, index) => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={product.name} /><span>0{index + 1}</span></div><div className="product-meta"><small>{product.brand} · {product.category}</small><h4>{product.name}</h4><strong>${product.price}</strong><details><summary>Why it works <ChevronDown size={15} /></summary><p>{product.reason}</p></details></div></article>)}</div><form className="follow-up" onSubmit={ask}><MessageCircle size={19} /><label htmlFor="follow-up">Refine this edit</label><input id="follow-up" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Make it more casual, swap the trousers…" /><button aria-label="Send follow-up" disabled={loading || !question.trim()}>{loading ? <LoaderCircle className="spin" size={18} /> : <ArrowRight size={18} />}</button></form></div>
          </div>}
        </div>
      </section>

      <footer><a className="brand" href="#top">Vela<span>●</span></a><p>A concept project for explainable, multimodal shopping.</p><a href="https://github.com/parsakhaz/open-ai-stylist" target="_blank" rel="noreferrer">Built from an open-source starting point ↗</a></footer>
    </main>
  );
}
