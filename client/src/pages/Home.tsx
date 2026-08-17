/**
 * VeilSnap — Editorial Redaction design system
 * Warm paper, ink-black structure, Veil Red signals, evidence-led visual hierarchy.
 */
import { useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Download,
  Eye,
  FileImage,
  FileText,
  Github,
  ImagePlus,
  Minus,
  MoveRight,
  Plus,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LOGO_URL = "/images/veilsnap-mark.png";
const HERO_URL = "/images/veilsnap-hero-editorial-desk.jpg";
const PROOF_URL = "/images/veilsnap-proof-composition.jpg";
const PRIVACY_URL = "/images/veilsnap-privacy-orbit.jpg";

type RedactionMode = "solid" | "blur";

type Redaction = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  mode: RedactionMode;
};

const INITIAL_REDACTION: Redaction = {
  id: 1,
  x: 43,
  y: 40,
  width: 31,
  height: 14,
  mode: "solid",
};

function createSafeSample(): string {
  const canvas = document.createElement("canvas");
  canvas.width = 1440;
  canvas.height = 880;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.fillStyle = "#F7F3EC";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#151514";
  ctx.fillRect(0, 0, canvas.width, 104);
  ctx.fillStyle = "#E3492D";
  ctx.fillRect(62, 39, 12, 28);
  ctx.fillStyle = "#F7F3EC";
  ctx.font = "600 25px monospace";
  ctx.fillText("INCIDENT 042 / EXPORT PREVIEW", 105, 63);
  ctx.fillStyle = "#DCE1E1";
  ctx.fillRect(62, 164, 1316, 1);
  ctx.fillStyle = "#2A2A27";
  ctx.font = "600 38px sans-serif";
  ctx.fillText("Support capture — fictional account", 64, 235);
  ctx.fillStyle = "#5D625F";
  ctx.font = "24px monospace";
  ctx.fillText("customer: alex.demo@example.test", 64, 307);
  ctx.fillText("reference: DEMO-7719", 64, 358);
  ctx.fillStyle = "#DCE1E1";
  ctx.fillRect(62, 415, 890, 168);
  ctx.fillStyle = "#9BA5A4";
  ctx.fillRect(88, 445, 540, 20);
  ctx.fillRect(88, 490, 752, 20);
  ctx.fillRect(88, 535, 416, 20);
  ctx.fillStyle = "#E3492D";
  ctx.fillRect(1032, 243, 250, 250);
  ctx.fillStyle = "#151514";
  ctx.font = "600 22px monospace";
  ctx.fillText("SAFE SAMPLE", 1063, 550);
  ctx.fillStyle = "#5D625F";
  ctx.fillText("nothing personal", 1063, 588);
  return canvas.toDataURL("image/png");
}

function downloadBlob(content: Blob, fileName: string) {
  const url = URL.createObjectURL(content);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export default function Home() {
  const [activeTool, setActiveTool] = useState<"image" | "text">("image");
  const [imageUrl, setImageUrl] = useState("");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [redactions, setRedactions] = useState<Redaction[]>([INITIAL_REDACTION]);
  const [selectedRedactionId, setSelectedRedactionId] = useState(1);
  const [textSource, setTextSource] = useState(
    "POST /v1/export\ncontact: alex.demo@example.test\ntoken: vs_demo_08W4r9V7Jp\nstatus: ready to share"
  );
  const [terms, setTerms] = useState("alex.demo@example.test, vs_demo_08W4r9V7Jp");
  const [status, setStatus] = useState("Ready for a careful review.");
  const fileInput = useRef<HTMLInputElement>(null);

  const selected = redactions.find((item) => item.id === selectedRedactionId) ?? redactions[0];
  const redactedText = useMemo(() => {
    return terms
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .reduce((result, term) => result.split(term).join("████████████"), textSource);
  }, [terms, textSource]);

  function applyImage(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setStatus("Choose a PNG, JPG, WebP, or another image file.");
      return;
    }
    if (imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
    setRedactions([{ ...INITIAL_REDACTION, id: Date.now() }]);
    setSelectedRedactionId(Date.now());
    setStatus("Image loaded locally. Add or refine your coverage areas.");
  }

  function loadSample() {
    if (imageUrl.startsWith("blob:")) URL.revokeObjectURL(imageUrl);
    const id = Date.now();
    setImageUrl(createSafeSample());
    setRedactions([{ ...INITIAL_REDACTION, id }]);
    setSelectedRedactionId(id);
    setStatus("Safe fictional sample loaded. Nothing personal is used.");
  }

  function addRedaction() {
    const id = Date.now();
    const next: Redaction = {
      id,
      x: 25 + ((redactions.length * 7) % 40),
      y: 20 + ((redactions.length * 9) % 45),
      width: 26,
      height: 12,
      mode: "solid",
    };
    setRedactions((items) => [...items, next]);
    setSelectedRedactionId(id);
    setStatus("A new solid cover was added. Adjust its position and size below.");
  }

  function updateSelected(key: keyof Omit<Redaction, "id">, value: number | RedactionMode) {
    if (!selected) return;
    setRedactions((items) =>
      items.map((item) => (item.id === selected.id ? { ...item, [key]: value } : item))
    );
  }

  function removeSelected() {
    if (!selected) return;
    const remaining = redactions.filter((item) => item.id !== selected.id);
    setRedactions(remaining);
    setSelectedRedactionId(remaining[0]?.id ?? 0);
    setStatus("The selected coverage area was removed.");
  }

  function exportImage() {
    if (!imageUrl || !imageSize.width || !imageSize.height) {
      setStatus("Load an image before exporting a redacted copy.");
      return;
    }
    const source = new Image();
    source.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = source.naturalWidth;
      canvas.height = source.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(source, 0, 0);
      redactions.forEach((box) => {
        const x = (box.x / 100) * canvas.width;
        const y = (box.y / 100) * canvas.height;
        const w = (box.width / 100) * canvas.width;
        const h = (box.height / 100) * canvas.height;
        if (box.mode === "solid") {
          ctx.fillStyle = "#171716";
          ctx.fillRect(x, y, w, h);
        } else {
          const scratch = document.createElement("canvas");
          scratch.width = Math.max(1, Math.round(w));
          scratch.height = Math.max(1, Math.round(h));
          const scratchCtx = scratch.getContext("2d");
          if (scratchCtx) {
            scratchCtx.filter = "blur(12px)";
            scratchCtx.drawImage(source, -x, -y);
            ctx.drawImage(scratch, x, y);
          }
        }
      });
      canvas.toBlob((blob) => {
        if (!blob) return;
        downloadBlob(blob, "veilsnap-redacted.png");
        setStatus("Redacted PNG exported to your device.");
      }, "image/png");
    };
    source.src = imageUrl;
  }

  function exportText() {
    downloadBlob(new Blob([redactedText], { type: "text/plain;charset=utf-8" }), "veilsnap-redacted.txt");
    setStatus("Redacted text exported to your device.");
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f3ec] text-[#151514]">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-[76px] lg:flex-col lg:items-center lg:justify-between lg:border-r lg:border-[#d9d4ca] lg:bg-[#f7f3ec]/95 lg:py-7 lg:backdrop-blur">
        <a href="#top" aria-label="VeilSnap home" className="group relative flex h-11 w-11 items-center justify-center overflow-hidden border border-[#151514] bg-[#f7f3ec]">
          <img src={LOGO_URL} alt="" className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-110" />
        </a>
        <div className="vertical-wordmark text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5c625d]">Local / No account</div>
        <a href="#privacy" className="flex h-10 w-10 items-center justify-center border border-[#d9d4ca] bg-white transition-colors hover:border-[#151514]" aria-label="Read privacy details">
          <ShieldCheck className="h-4 w-4" />
        </a>
      </div>

      <header id="top" className="relative z-30 border-b border-[#d9d4ca] bg-[#f7f3ec]/95 px-5 py-4 backdrop-blur lg:ml-[76px] lg:px-10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5">
          <a href="#top" className="flex items-center gap-3" aria-label="VeilSnap home">
            <img src={LOGO_URL} alt="" className="h-9 w-9 object-contain" />
            <span className="font-display text-2xl font-semibold tracking-tight">VeilSnap</span>
            <span className="hidden border-l border-[#d9d4ca] pl-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#5c625d] sm:inline">Local redaction desk</span>
          </a>
          <nav className="hidden items-center gap-6 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[#5c625d] md:flex" aria-label="Primary navigation">
            <a className="transition-colors hover:text-[#151514]" href="#desk">Desk</a>
            <a className="transition-colors hover:text-[#151514]" href="#how-it-works">Workflow</a>
            <a className="transition-colors hover:text-[#151514]" href="#privacy">Privacy</a>
          </nav>
          <Button asChild className="h-10 rounded-none bg-[#151514] px-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[#f7f3ec] hover:bg-[#e3492d]">
            <a href="#desk">Open desk <ArrowDownRight className="ml-2 h-3.5 w-3.5" /></a>
          </Button>
        </div>
      </header>

      <main className="lg:ml-[76px]">
        <section className="relative border-b border-[#d9d4ca] px-5 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-16">
          <div className="noise pointer-events-none absolute inset-0 opacity-[0.22]" />
          <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)] lg:items-end">
            <div className="max-w-3xl lg:pb-4">
              <div className="mb-8 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5c625d]">
                <span className="h-2 w-2 bg-[#e3492d]" /> Case 01 / Safe sharing
              </div>
              <h1 className="max-w-3xl font-display text-[clamp(3.6rem,8.1vw,8.8rem)] font-semibold leading-[0.83] tracking-[-0.075em] text-[#151514]">
                Share the <span className="relative inline-block"><span className="relative z-10">context.</span><span className="absolute inset-x-0 bottom-[0.08em] h-[0.17em] bg-[#e3492d]" /></span><br />Keep the secrets.
              </h1>
              <p className="mt-9 max-w-xl text-lg leading-8 text-[#4d514d] lg:text-xl">
                VeilSnap is the local screenshot and text redactor for hiding the details that should not travel with your story.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button asChild className="h-12 rounded-none bg-[#e3492d] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white hover:bg-[#151514]">
                  <a href="#desk">Start redacting <MoveRight className="ml-2 h-4 w-4" /></a>
                </Button>
                <a className="inline-flex h-12 items-center gap-2 border border-[#151514] px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors hover:bg-[#151514] hover:text-white" href="#privacy">
                  See the data boundary <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#d9d4ca] pt-5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#5c625d]">
                <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#e3492d]" /> Browser-only workflow</span>
                <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#e3492d]" /> No account required</span>
                <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#e3492d]" /> Export on your device</span>
              </div>
            </div>
            <div className="relative min-h-[390px] overflow-hidden border border-[#151514] bg-[#dde1df] shadow-[13px_13px_0_#151514] lg:min-h-[550px]">
              <img src={HERO_URL} alt="Abstract VeilSnap editorial dossier with redaction strips and paper texture." className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-[#151514] px-5 py-4 text-[#f7f3ec]">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#bfc4bf]">The redaction desk</p>
                  <p className="mt-1 font-display text-2xl">Context, reviewed.</p>
                </div>
                <ScanLine className="h-7 w-7 text-[#e3492d]" />
              </div>
              <div className="absolute right-5 top-5 bg-[#e3492d] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white">Local only</div>
            </div>
          </div>
        </section>

        <section id="desk" className="border-b border-[#151514] bg-[#151514] px-5 py-14 text-[#f7f3ec] lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-9 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e3492d]">The tool / 01</p>
                <h2 className="mt-3 font-display text-5xl font-semibold tracking-[-0.05em] md:text-7xl">The redaction desk.</h2>
              </div>
              <p className="max-w-sm border-l border-[#4a4a45] pl-4 text-sm leading-6 text-[#c9ccc7]">Your selected image or pasted text stays in this browser session. Export the result when you have reviewed every mark.</p>
            </div>

            <div className="grid overflow-hidden border border-[#4a4a45] xl:grid-cols-[260px_minmax(0,1fr)_270px]">
              <aside className="border-b border-[#4a4a45] bg-[#1e1e1c] p-5 xl:border-b-0 xl:border-r">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#989b97]">Material</p>
                <div className="mt-4 grid gap-2">
                  <button onClick={() => setActiveTool("image")} className={`flex items-center justify-between border px-3 py-3 text-left transition-colors ${activeTool === "image" ? "border-[#e3492d] bg-[#e3492d] text-white" : "border-[#4a4a45] text-[#f7f3ec] hover:border-[#f7f3ec]"}`}>
                    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em]"><FileImage className="h-4 w-4" /> Screenshot</span><ChevronRight className="h-4 w-4" />
                  </button>
                  <button onClick={() => setActiveTool("text")} className={`flex items-center justify-between border px-3 py-3 text-left transition-colors ${activeTool === "text" ? "border-[#e3492d] bg-[#e3492d] text-white" : "border-[#4a4a45] text-[#f7f3ec] hover:border-[#f7f3ec]"}`}>
                    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em]"><FileText className="h-4 w-4" /> Pasted text</span><ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-8 border-t border-[#4a4a45] pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#989b97]">Session note</p>
                  <p className="mt-3 text-sm leading-6 text-[#c9ccc7]">VeilSnap does not ask you to create an account for this local redaction workflow.</p>
                </div>
              </aside>

              <div className="min-w-0 bg-[#ece9e2] p-4 text-[#151514] sm:p-7">
                {activeTool === "image" ? (
                  <div>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5c625d]">Evidence image</p>
                        <p className="mt-1 font-display text-2xl">Mark what cannot be shared.</p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => fileInput.current?.click()} className="h-9 rounded-none bg-[#151514] px-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white hover:bg-[#e3492d]"><Upload className="mr-2 h-3.5 w-3.5" />Import</Button>
                        <Button onClick={loadSample} variant="outline" className="h-9 rounded-none border-[#151514] bg-transparent px-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#151514] hover:bg-white"><Sparkles className="mr-2 h-3.5 w-3.5" />Safe sample</Button>
                      </div>
                    </div>
                    <input ref={fileInput} onChange={(event) => applyImage(event.target.files?.[0])} accept="image/*" className="hidden" type="file" />
                    {imageUrl ? (
                      <div className="relative overflow-hidden border border-[#151514] bg-[#cfd4d1]">
                        <img onLoad={(event) => setImageSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })} src={imageUrl} alt="Selected screenshot for local redaction" className="block max-h-[520px] w-full object-contain" />
                        {redactions.map((box) => (
                          <button key={box.id} type="button" onClick={() => setSelectedRedactionId(box.id)} aria-label={`Select ${box.mode} redaction region`} style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.width}%`, height: `${box.height}%` }} className={`absolute cursor-pointer ${box.mode === "solid" ? "bg-[#171716]" : "backdrop-blur-md bg-white/15"} ${box.id === selectedRedactionId ? "outline outline-2 outline-[#e3492d] outline-offset-2" : ""}`} />
                        ))}
                        <div className="pointer-events-none absolute bottom-3 left-3 bg-[#f7f3ec] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[#151514]">Local preview / review every mark</div>
                      </div>
                    ) : (
                      <button onClick={() => fileInput.current?.click()} className="flex min-h-[340px] w-full flex-col items-center justify-center border border-dashed border-[#8b928c] bg-[#f7f3ec] p-8 text-center transition-colors hover:border-[#151514] hover:bg-white">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#151514] bg-[#e3492d] text-white"><ImagePlus className="h-6 w-6" /></span>
                        <span className="mt-5 font-display text-3xl">Bring a screenshot.</span>
                        <span className="mt-2 max-w-xs text-sm leading-6 text-[#5c625d]">Import from your device, or open a fictional safe sample to test the desk.</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5c625d]">Text cleanup</p>
                      <p className="mt-1 font-display text-2xl">Cover the terms that should not leave the room.</p>
                    </div>
                    <label className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5c625d]">Source text</label>
                    <textarea value={textSource} onChange={(event) => setTextSource(event.target.value)} className="mt-2 min-h-[180px] w-full resize-y border border-[#151514] bg-[#f7f3ec] p-4 font-mono text-sm leading-6 outline-none transition-shadow focus:shadow-[4px_4px_0_#e3492d]" />
                    <label className="mt-5 block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5c625d]">Terms to cover — comma separated</label>
                    <input value={terms} onChange={(event) => setTerms(event.target.value)} className="mt-2 w-full border border-[#151514] bg-[#f7f3ec] px-4 py-3 font-mono text-sm outline-none transition-shadow focus:shadow-[4px_4px_0_#e3492d]" />
                    <div className="mt-5 border border-[#151514] bg-[#151514] p-4 text-[#f7f3ec]">
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#b9c1bc]">Export preview</p>
                      <pre className="mt-3 whitespace-pre-wrap font-mono text-sm leading-6">{redactedText}</pre>
                    </div>
                  </div>
                )}
              </div>

              <aside className="border-t border-[#4a4a45] bg-[#1e1e1c] p-5 xl:border-l xl:border-t-0">
                {activeTool === "image" ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#989b97]">Coverage control</p>
                      <button onClick={addRedaction} className="inline-flex h-7 w-7 items-center justify-center border border-[#4a4a45] text-[#f7f3ec] hover:border-[#e3492d] hover:text-[#e3492d]" aria-label="Add redaction"><Plus className="h-4 w-4" /></button>
                    </div>
                    {selected ? (
                      <div className="mt-5 space-y-5">
                        <div className="grid grid-cols-2 gap-2">
                          {(["solid", "blur"] as RedactionMode[]).map((mode) => (
                            <button key={mode} onClick={() => updateSelected("mode", mode)} className={`border px-2 py-3 font-mono text-[10px] uppercase tracking-[0.1em] ${selected.mode === mode ? "border-[#e3492d] bg-[#e3492d] text-white" : "border-[#4a4a45] text-[#f7f3ec] hover:border-[#f7f3ec]"}`}>{mode}</button>
                          ))}
                        </div>
                        {([ ["X", "x"], ["Y", "y"], ["Width", "width"], ["Height", "height"] ] as const).map(([label, key]) => (
                          <label key={key} className="block">
                            <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[#b9c1bc]"><span>{label}</span><span>{Math.round(selected[key])}%</span></span>
                            <input type="range" min="0" max={key === "width" || key === "height" ? 60 : 90} value={selected[key]} onChange={(event) => updateSelected(key, Number(event.target.value))} className="veil-range mt-2 w-full" />
                          </label>
                        ))}
                        <button onClick={removeSelected} className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#b9c1bc] hover:text-[#e3492d]"><Trash2 className="h-3.5 w-3.5" /> Remove selected</button>
                      </div>
                    ) : <p className="mt-5 text-sm leading-6 text-[#c9ccc7]">Add a coverage area to begin reviewing your image.</p>}
                    <div className="mt-8 border-t border-[#4a4a45] pt-5">
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#989b97]">Review note</p>
                      <p className="mt-2 text-xs leading-5 text-[#c9ccc7]">Use a solid cover when information must not remain visible. Blur can preserve context but is not appropriate for every risk level.</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#989b97]">Text protocol</p>
                    <p className="mt-4 text-sm leading-6 text-[#c9ccc7]">Enter exact terms separated by commas. VeilSnap replaces all matching text in the preview and export.</p>
                    <div className="mt-8 border-t border-[#4a4a45] pt-5">
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#989b97]">Current terms</p>
                      <p className="mt-2 break-words font-mono text-xs leading-5 text-[#e3492d]">{terms || "No terms entered"}</p>
                    </div>
                  </div>
                )}
                <div className="mt-8 border-t border-[#4a4a45] pt-5">
                  <Button onClick={activeTool === "image" ? exportImage : exportText} className="h-11 w-full rounded-none bg-[#f7f3ec] font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#151514] hover:bg-[#e3492d] hover:text-white"><Download className="mr-2 h-4 w-4" />Export redacted {activeTool === "image" ? "PNG" : "text"}</Button>
                  <p aria-live="polite" className="mt-3 text-center font-mono text-[9px] leading-4 text-[#989b97]">{status}</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-b border-[#d9d4ca] px-5 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <div className="lg:sticky lg:top-10">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e3492d]">The workflow / 02</p>
                <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-6xl">Four deliberate moves. One cleaner share.</h2>
                <p className="mt-5 max-w-md text-base leading-7 text-[#5c625d]">A product should be easy to explain because it is easy to use. VeilSnap keeps the workflow visible from first file to final export.</p>
              </div>
              <div className="grid gap-px bg-[#d9d4ca] sm:grid-cols-2">
                {[
                  ["01", "Bring the evidence", "Import a screenshot from your device or load a fictional safe sample."],
                  ["02", "Cover what matters", "Add solid or blur coverage regions and adjust them in the control panel."],
                  ["03", "Review the boundary", "Select each mark and confirm the content underneath should not be shared."],
                  ["04", "Export the clean copy", "Download a redacted PNG or text file to your device when the review is complete."],
                ].map(([number, title, copy]) => (
                  <article key={number} className="min-h-[220px] bg-[#f7f3ec] p-6 transition-colors hover:bg-white">
                    <span className="font-mono text-[11px] font-semibold text-[#e3492d]">{number}</span>
                    <h3 className="mt-12 font-display text-3xl font-semibold tracking-[-0.04em]">{title}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-[#5c625d]">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-12 overflow-hidden border border-[#151514] shadow-[10px_10px_0_#e3492d]">
              <img src={PROOF_URL} alt="Abstract VeilSnap safe-sharing composition with black and red privacy masks over fictional content." className="aspect-[16/7] w-full object-cover" />
            </div>
          </div>
        </section>

        <section id="privacy" className="border-b border-[#d9d4ca] bg-[#dfe4e1] px-5 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative overflow-hidden border border-[#151514] bg-[#f7f3ec]">
              <img src={PRIVACY_URL} alt="Abstract local processing diagram with a document tile and a red boundary before a browser outline." className="aspect-[4/3] w-full object-cover" />
              <div className="absolute bottom-0 left-0 bg-[#151514] px-5 py-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[#f7f3ec]">Data boundary / release 0.1</div>
            </div>
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e3492d]">The boundary / 03</p>
              <h2 className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-6xl">Your evidence stays on this side of the line.</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#4d514d]">The core VeilSnap workflow runs in the browser: choose a file, add coverage, and export the result. It does not require an account for that task.</p>
              <div className="mt-8 divide-y divide-[#bfc7c1] border-y border-[#bfc7c1]">
                {[
                  ["What the tool does", "Lets you manually cover selected image regions or selected pasted terms, then exports the reviewed copy."],
                  ["What it does not do yet", "It does not automatically detect secrets, scan third-party files, or make legal or compliance decisions for you."],
                  ["A careful distinction", "Solid coverage is the conservative option for details that must not remain visible. Blur preserves context but may be unsuitable for sensitive content."],
                ].map(([title, copy]) => (
                  <div key={title} className="py-5">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-[#151514]">{title}</p>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-[#5c625d]">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#d9d4ca] px-5 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr]">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e3492d]">Plain answers / 04</p>
                <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.055em] md:text-6xl">No hazy privacy language.</h2>
              </div>
              <div className="border-t border-[#151514]">
                {[
                  ["Does VeilSnap upload my screenshot?", "The initial workflow uses your browser to display and export the image you choose. VeilSnap does not ask for an account for that workflow. Check this privacy panel again if a future release introduces an optional connected feature."],
                  ["Can I redact copied logs or code snippets?", "Yes. Paste text, list the exact terms you want to cover, review the generated preview, and export the cleaned text file."],
                  ["Is blur always safe for sensitive information?", "No. Blur is useful when you want to preserve a visual outline, but a solid mask is the conservative choice when content needs to be visibly concealed."],
                  ["Does VeilSnap remove image metadata?", "Not in this first release. The tool does not claim to strip metadata, so remove that separately if your workflow requires it."],
                ].map(([question, answer]) => (
                  <details key={question} className="group border-b border-[#d9d4ca] py-0">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-2xl font-semibold tracking-[-0.025em] marker:hidden sm:text-3xl">{question}<Plus className="h-5 w-5 shrink-0 text-[#e3492d] transition-transform group-open:rotate-45" /></summary>
                    <p className="max-w-2xl pb-6 text-sm leading-7 text-[#5c625d]">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#151514] px-5 py-10 text-[#f7f3ec] lg:ml-[76px] lg:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-10 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3"><img src={LOGO_URL} alt="" className="h-8 w-8 object-contain" /><span className="font-display text-3xl font-semibold">VeilSnap</span></div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#c9ccc7]">A local screenshot and text redactor for people who want to share the context, not the sensitive details.</p>
          </div>
          <div className="flex flex-wrap items-center gap-5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#c9ccc7]">
            <a href="#desk" className="hover:text-[#e3492d]">Open desk</a>
            <a href="#privacy" className="hover:text-[#e3492d]">Privacy boundary</a>
            <a href="https://github.com/veilsnap" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#e3492d]">Source <Github className="h-3.5 w-3.5" /></a>
            <span className="text-[#7d817d]">Release 0.1 / local workflow</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
