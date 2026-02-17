import { useState, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --cream: #f5f0e8;
    --parchment: #ede4d0;
    --warm-brown: #8b6f47;
    --deep-brown: #4a2e1a;
    --ink: #2c1810;
    --rose: #c9697a;
    --rose-light: #f0d5da;
    --gold: #c9a84c;
    --gold-light: #f0e0a0;
    --shadow: rgba(44, 24, 16, 0.15);
  }

  body {
    font-family: 'Cormorant Garamond', Georgia, serif;
    background-color: var(--cream);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .app-wrapper {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    background:
      radial-gradient(ellipse at 20% 20%, rgba(201,168,76,0.08) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 80%, rgba(201,105,122,0.08) 0%, transparent 60%),
      var(--cream);
    position: relative;
    overflow: hidden;
  }

  .app-wrapper::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b6f47' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  /* ─── LOCK SCREEN ─── */
  .lock-screen {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 440px;
    animation: fadeUp 0.7s ease both;
  }

  .lock-header {
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .lock-icon {
    font-size: clamp(3rem, 8vw, 4.5rem);
    display: block;
    margin-bottom: 1rem;
    animation: floatIcon 3s ease-in-out infinite;
    filter: drop-shadow(0 4px 12px rgba(201,168,76,0.3));
  }

  .lock-title {
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 300;
    color: var(--ink);
    letter-spacing: 0.02em;
    line-height: 1.1;
  }

  .lock-title em {
    font-style: italic;
    color: var(--warm-brown);
  }

  .lock-subtitle {
    font-family: 'DM Mono', monospace;
    font-size: clamp(0.7rem, 2vw, 0.78rem);
    color: var(--warm-brown);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-top: 0.6rem;
    opacity: 0.7;
  }

  .form-card {
    background: white;
    border: 1px solid rgba(139,111,71,0.2);
    border-radius: 2px;
    padding: clamp(1.5rem, 5vw, 2.5rem);
    box-shadow:
      0 1px 3px var(--shadow),
      0 8px 32px rgba(44,24,16,0.08),
      inset 0 1px 0 rgba(255,255,255,0.9);
    position: relative;
  }

  .form-card::before {
    content: '';
    position: absolute;
    top: 6px;
    left: 6px;
    right: -6px;
    bottom: -6px;
    border: 1px solid rgba(139,111,71,0.12);
    border-radius: 2px;
    pointer-events: none;
    z-index: -1;
  }

  .input-group {
    position: relative;
    margin-bottom: 1.25rem;
  }

  .input-label {
    display: block;
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--warm-brown);
    margin-bottom: 0.6rem;
  }

  .code-input {
    width: 100%;
    padding: 0.85rem 1.2rem;
    font-family: 'DM Mono', monospace;
    font-size: clamp(1rem, 3vw, 1.2rem);
    letter-spacing: 0.25em;
    text-align: center;
    color: var(--ink);
    background: var(--cream);
    border: 1px solid rgba(139,111,71,0.3);
    border-radius: 2px;
    outline: none;
    transition: all 0.25s ease;
    text-transform: uppercase;
  }

  .code-input:focus {
    border-color: var(--gold);
    background: var(--gold-light);
    box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
  }

  .code-input::placeholder {
    color: rgba(139,111,71,0.35);
    letter-spacing: 0.15em;
  }

  .submit-btn {
    width: 100%;
    padding: 0.9rem 1.5rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1rem, 3vw, 1.15rem);
    font-weight: 600;
    letter-spacing: 0.05em;
    color: white;
    background: linear-gradient(135deg, var(--deep-brown) 0%, var(--warm-brown) 100%);
    border: none;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }

  .submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--warm-brown) 0%, var(--gold) 100%);
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .submit-btn:hover::after {
    opacity: 1;
  }

  .submit-btn span {
    position: relative;
    z-index: 1;
  }

  .submit-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(44,24,16,0.2);
  }

  .submit-btn:active {
    transform: translateY(0);
  }

  .error-msg {
    margin-top: 1rem;
    padding: 0.7rem 1rem;
    background: rgba(201,105,122,0.08);
    border: 1px solid rgba(201,105,122,0.25);
    border-radius: 2px;
    color: var(--rose);
    font-family: 'DM Mono', monospace;
    font-size: 0.78rem;
    text-align: center;
    letter-spacing: 0.05em;
    animation: shake 0.4s ease;
  }

  /* ─── ENVELOPE ─── */
  .envelope-scene {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 520px;
    animation: fadeUp 0.5s ease both;
  }

  .envelope-wrapper {
    perspective: 900px;
    margin-bottom: 2rem;
  }

  .envelope {
    width: 100%;
    max-width: 360px;
    margin: 0 auto;
    position: relative;
    cursor: pointer;
  }

  .envelope-body {
    width: 100%;
    padding-bottom: 62%;
    position: relative;
    background: linear-gradient(160deg, var(--parchment) 0%, #e8d9be 100%);
    border-radius: 2px;
    box-shadow:
      0 4px 24px rgba(44,24,16,0.12),
      0 1px 3px rgba(44,24,16,0.08);
  }

  .envelope-body::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%);
    border-radius: 2px;
  }

  .envelope-flap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 55%;
    background: linear-gradient(170deg, var(--warm-brown) 0%, #a07845 100%);
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    transform-origin: top center;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
    border-radius: 2px 2px 0 0;
  }

  .envelope.open .envelope-flap {
    transform: rotateX(180deg);
  }

  .envelope-left {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right, #d4c09a, var(--parchment));
    clip-path: polygon(0 0, 0 100%, 100% 50%);
  }

  .envelope-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to left, #d4c09a, var(--parchment));
    clip-path: polygon(100% 0, 100% 100%, 0 50%);
  }

  .envelope-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 55%;
    background: linear-gradient(10deg, var(--parchment), #ddd0b3);
    clip-path: polygon(0 100%, 100% 100%, 50% 0);
  }

  .envelope-seal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--rose), #a04455);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    z-index: 3;
    box-shadow: 0 2px 12px rgba(201,105,122,0.4);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .envelope.open .envelope-seal {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }

  .envelope-hint {
    text-align: center;
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--warm-brown);
    opacity: 0.5;
    margin-top: 0.75rem;
  }

  /* ─── LETTER ─── */
  .letter-container {
    animation: letterReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
    animation-delay: 0.4s;
  }

  .letter-card {
    background: white;
    border: 1px solid rgba(139,111,71,0.15);
    border-radius: 2px;
    padding: clamp(1.5rem, 6vw, 3rem);
    position: relative;
    box-shadow:
      0 2px 8px var(--shadow),
      0 16px 48px rgba(44,24,16,0.08);
  }

  .letter-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: clamp(2rem, 6vw, 3.5rem);
    right: clamp(2rem, 6vw, 3.5rem);
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  .letter-lines {
    position: absolute;
    inset: 0;
    padding: inherit;
    pointer-events: none;
    overflow: hidden;
    border-radius: 2px;
  }

  .letter-line {
    height: 1px;
    background: rgba(139,111,71,0.07);
    margin-bottom: 1.8rem;
  }

  .letter-header {
    font-size: clamp(1.5rem, 5vw, 2.2rem);
    font-weight: 300;
    font-style: italic;
    color: var(--warm-brown);
    margin-bottom: 0.25rem;
    line-height: 1.2;
  }

  .letter-title-bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid rgba(139,111,71,0.12);
  }

  .letter-title-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .letter-to {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--warm-brown);
    opacity: 0.6;
    display: block;
    margin-bottom: 0.1rem;
  }

  .letter-name {
    font-size: clamp(1.3rem, 4vw, 1.8rem);
    font-weight: 600;
    color: var(--ink);
    letter-spacing: 0.01em;
  }

  .letter-body {
    font-size: clamp(1rem, 2.5vw, 1.15rem);
    line-height: 1.85;
    color: #3a2518;
    font-weight: 300;
    white-space: pre-line;
    position: relative;
    z-index: 1;
  }

  .letter-signature {
    margin-top: 2rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(139,111,71,0.1);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .signature-text {
    font-size: clamp(1rem, 3vw, 1.3rem);
    font-style: italic;
    font-weight: 300;
    color: var(--warm-brown);
  }

  .signature-icon {
    font-size: 1.2rem;
    animation: heartbeat 1.5s ease-in-out infinite;
  }

  .back-btn {
    display: block;
    width: fit-content;
    margin: 1.75rem auto 0;
    padding: 0.6rem 1.5rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--warm-brown);
    background: transparent;
    border: 1px solid rgba(139,111,71,0.3);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .back-btn:hover {
    background: var(--parchment);
    border-color: var(--warm-brown);
  }

  /* ─── DECORATIVE ─── */
  .deco-corner {
    position: fixed;
    font-size: clamp(3rem, 6vw, 5rem);
    opacity: 0.04;
    pointer-events: none;
    line-height: 1;
  }

  .deco-corner.tl { top: 1rem; left: 1rem; }
  .deco-corner.tr { top: 1rem; right: 1rem; transform: scaleX(-1); }
  .deco-corner.bl { bottom: 1rem; left: 1rem; transform: scaleY(-1); }
  .deco-corner.br { bottom: 1rem; right: 1rem; transform: scale(-1); }

  /* ─── ANIMATIONS ─── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes letterReveal {
    from { opacity: 0; transform: translateY(-16px) scaleY(0.97); }
    to   { opacity: 1; transform: translateY(0) scaleY(1); }
  }

  @keyframes floatIcon {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-5px); }
    80%       { transform: translateX(5px); }
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    14%       { transform: scale(1.2); }
    28%       { transform: scale(1); }
    42%       { transform: scale(1.15); }
    56%       { transform: scale(1); }
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 480px) {
    .form-card { padding: 1.25rem; }
    .letter-card { padding: 1.25rem; }
    .envelope-seal { width: 40px; height: 40px; font-size: 1.1rem; }
  }

  @media (max-width: 360px) {
    .lock-icon { font-size: 2.5rem; }
    .code-input { font-size: 0.95rem; letter-spacing: 0.15em; }
  }

  @media (min-width: 768px) {
    .letter-card { padding: 2.5rem 3rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const lines = Array.from({ length: 16 });

function App() {
  const [kode, setKode] = useState("");
  const [dataPesan, setDataPesan] = useState(null);
  const [error, setError] = useState("");
  const [openEnvelope, setOpenEnvelope] = useState(false);
  const audioRef = useRef(null);

  const messages = {
    "ADAMKETOS": {
      to: "Adam",
      isi: `Sebelumnya Minta Maaf nnek dek mau tulisane ora niat 😘😘😘
      Terimakasih Adam sudah menjadi ketua osis yang cukup baik,kowe ki kurang teges wae ogh dam jane wis apek.Semoga kedepane nek melu BEM po HIMA ning kampus nek meh dadi ketua kudu maju paling depan menerima semua konsekuensi.Karo isoh ngatur teman temannya.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Tak doake kedepane luwih apek wae karo masuk kampus impianmu po opo ngunu(doa anak yatim luwih manjur lo)`
    },
    "MUSAWAKETOS": {
      to: "Musa",
      isi: `Sebelumnya Minta Maaf nek ndek mau tulisane ora niat 😘😘😘
      Terimakasih Musa sudah ngewaki Adam dadi ketua yang cukup baik.Kowe ki nek aku melu acara rasah ngomong RJJ tai,wong wis tak jak trus telek kowe.PK PM ditingkatkan.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Tak doake kedepane PK ne isoh 700 wkwkkwk(doa anak yatim luwih manjur lo)`
    },"WISMAKET1": {
      to: "Wisma",
      isi: `Sebelumnya Minta Maaf nek ndek mau tulisane ora niat 😘😘😘
      Terimakasih Wisma sudah menjadi ketua 1 yang cukup baik.Jane kowe ki dadi ketua apek banget wis tapi sayang repot trus.Pokoke mantap.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Tak doake kedepane semoga ketompo abdi negara(ditunggu foto karo bhayangkarine)`
    },"FARASEKRE": {
      to: "Fahra",
      isi: `Sebelumnya Minta Maaf nek ndek mau tulisane ora niat 😘😘😘
      Terimakasih Fahraaa sudah menjadi sekre yang baik banget.Tenan lo ra tanpamy esport tidak bisa didirikan.Pokoke makasih banget ngewaki persuratan.Maafkan nek enek kesalahan ya.Tetap semangat belajar UTBKnya.
      Semoga kamu bisa ketrima di Teknik Komputer ITS(doa anak yatim luwih manjur lo)`
    },
    "ZIAGACOR": {
      to: "Keizia",
      isi: `Sebelumnya Minta Maaf nek ndek mau tulisane ora niat 😘😘😘(Pokoke nek wis bacut etuk rasah dibuka)
      Terimakasih Keizia sudah menjadi bendahara yang mantap dan menjadi sosok seng isoh ganteke peran wisma pas awal awal kae.Makasih banget lo zi.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Semoga bisa kejepang 2027`
    },
    "REPAWELL": {
      to: "Repa",
      isi: `Sebelumnya Minta Maaf nek ndek mau tulisane ora niat 😘😘😘
      Terimakasih Repa sudah menjadi KOOR GACOR.Suwun tenan pokoke pa sudah menjadi center e osis.Pokoke nek renek repa ra asik🤟🤟🤟.Nek renek kowe espoer ra mungkin dadi,proker sekbid 4 bubar.Saya perwakilan sekbid 4 pokoke matur nuwun banget pa.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Tak doake kedepane bisa mencapai mimpi mu (doa anak yatim luwih manjur lo)`
    },
    "ARIPMBUTT": {
      to: "Arip",
      isi: `Sebelumnya Minta Maaf nek ndek mau tulisane ora niat 😘😘😘
      Asu kowe rip.
      Tak doake kedepane bisa mencapai mimpi mu`
    },
    "MIRZAB123": {
      to: "Mirzab",
      isi: `Sebelumnya Minta Maaf nek mau tulisane ora niat 😘😘😘
      Terimakasih zab sudah membimbing pribadi ini ke jalan yang lebih baik.Pokoke makasih zab.Nek misal aku melakukan perbuata yang tidak baik elingno zab.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Tak doake isoh ketompo kampus impianmu/nek meh kerjo yo semoga dadi CEO(doa anak yatim luwih manjur lo)`
    },
    "MARIATKL": {
      to: "Maria",
      isi: `Sebelumnya Minta Maaf nekk ndek mau tulisane ora niat 😘😘😘
      Terimakasih mar sudah menjadi teman yang baik.Terimakasih kae wis ngewaki daftar OSN,kae nyat aku ra niat melu jane tapi yowis lah wkwkwk.Maksih lo wis ngewaki ning berbagai hal lainnya.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Semoga kedepannya bisa mengapai mimpimu(doa anak yatim luwih manjur lo)`
    },
    "INTAN2": {
      to: "Intan",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘(Pokoke nek bavut etuk kertase ojo mbok buka)
      Terimakasih cebolnya osis sudah menjadi sekbid 2 yang baik.Makasih lo sudah mengabdi nang RO,dadi enek koncone aku.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Tak doake isoh mencapai mimpi-mimpimu(doa anak yatim luwih manjur lo)`
    },
    "ALFIANDA": {
      to: "Alfani",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘
      Makasih sih Alfani wis dadi Solo Sekbid 3.Pokoke nek wis baris barisan nek enek kowe wis tenang lah.Pokoke mantep lah.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Tak doake isoh ketompo kampus impianmu/nek meh kerjo yo semoga dadi CEO(doa anak yatim luwih manjur lo)`
    },
    "AULGANDES": {
      to: "Gandes",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘(Pokoke nek bacut wis etuk rasah dibuka)
      Makasih ndes sudah menjadi rekan sekbid 4.Walaupun aku kadang ra cetho sorry ya.Pokoke maturnuwun banget lah wis gelem membimbing diri ini kejalan yang benar.
      Tak doake isoh meraih cita-citamu(doa anak yatim luwih manjur lo)`
    },
    "PAKDEZAL": {
      to: "Rizal",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘
      Pakde ku,Akunku sisan immo zal.Mantap pokoke sekbid 5 mengendong sponsor.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Tak doake isoh ketompo kampus impianmu/nek meh kerjo yo semoga dadi CEO(doa anak yatim luwih manjur lo)`
    },
    "MAOURAAA": {
      to: "Maora",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘
      Makasih tenan mour wis dadi sekbid 5 sing mengendong sponsor.Tanpa kowe mor acara osis ra mlaku mor.Mantap pokoke sekbid 5 mengendong sponsor.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Semoga kamu bisa meraih semua impianmu dan cita citamu(doa anak yatim luwih manjur lo)`
    },
    "DAPANTEK": {
      to: "Dapa",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘
      Selamat malam bosqu.Mantap pokoke,josjis.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Semoga kamu bisa meraih semua impianmu dan cita citamu(doa anak yatim luwih manjur lo)`
    },
    "MALAPMR": {
      to: "Mala",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘
      Terimakasih sudah jadi wirausahawane osis.Makasih banget pokoke mal.Memiliki sifat simpati dan empati sing mantep pokoke.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Semoga kamu bisa meraih semua impianmu dan cita citamu(doa anak yatim luwih manjur lo)`
    },
    "MASOVAN": {
      to: "Ovan",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘
      Mantap pan sudah jadi sekbid 7.Tapi bener ogh pan kowe ki anu wae nek ra mudeng ngunu takok pan.nek lagi ra ngopo ngopo ngunu pas acara mending nang buri wae,nimbrung ro liane.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Semoga kamu bisa meraih semua impianmu dan cita citamu(doa anak yatim luwih manjur lo)`
    },
    "MASOTOT": {
      to: "Thariq",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘
      Sobat Fitness ku.Mantap riq kowe nang osis sangat membantu ogh.Karo wis isoh menghadapi teman sekbid yang yang ytta aja.Ojo sering sering nang jogja wae naraku.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Semoga kamu bisa meraih semua impianmu dan cita citamu(doa anak yatim luwih manjur lo)`
    },
    "AULTKJ": {
      to: "Aulia",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘
      Makasih ul sudah menjadi sekbid 8.Makasih lo sudah membuat last wishe pak arip.Gawe eskul theater.Bendino kae pak arip crito kuwi trus.Ojo lali eskule dirawat.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Semoga kamu bisa meraih semua impianmu dan cita citamu(doa anak yatim luwih manjur lo)`
    },
    "RAISAHGEO": {
      to: "Raisah",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘
      Atm Berjalane osis tenan iki.Makasih lo sudah membuat last wish e pak arip.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Semoga kamu bisa meraih semua impianmu dan cita citamu(doa anak yatim luwih manjur lo)`
    },
    "JAKSEL": {
      to: "Awfa",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘
      Anak Jaksel abis.Kalau wa jangan centang 1 mulu lah mat.Pokoknya mantap dah gantiin adam jadi sekbid 9.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Semoga kamu bisa meraih semua impianmu dan cita citamu(doa anak yatim luwih manjur lo)`
    },
    "CHESTA7": {
      to: "Chesta",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘
      Ojo plin plan lo ches.Karo piye ya,yo ngunu lah wkwkkw.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Semoga kamu bisa meraih semua impianmu dan cita citamu(doa anak yatim luwih manjur lo)`
    },
    "MARGARET": {
      to: "Alle",
      isi: `Sebelumnya Minta Maaf ndek mau tulisane ora niat 😘😘😘
      Boloku tenan iki.Dikon langsung satset mangkat.Man.Jika selama ini enek kesalahan mohon dimaafkan🙏🙏🙏.
      Semoga kamu bisa meraih semua impianmu dan cita citamu(doa anak yatim luwih manjur lo)`
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messages[kode.toUpperCase()]) {
      setDataPesan(messages[kode.toUpperCase()]);
      setError("");
      setTimeout(() => {
        setOpenEnvelope(false);
      }, 100);
    } else {
      setError("Kode tidak valid ❌");
      setDataPesan(null);
    }
  };

  const handleReset = () => {
    setDataPesan(null);
    setOpenEnvelope(false);
    setKode("");
    setError("");
  };

  const handleEnvelopeClick = () => {
    if (!openEnvelope) {
      setOpenEnvelope(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <>
      <style>{style}</style>
      <div className="app-wrapper">
        {/* Decorative corners */}
        <span className="deco-corner tl">✉</span>
        <span className="deco-corner tr">✉</span>
        <span className="deco-corner bl">✉</span>
        <span className="deco-corner br">✉</span>

        <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3" />

        {!dataPesan && (
          <div className="lock-screen">
            <div className="lock-header">
              <span className="lock-icon">😘</span>
              <h1 className="lock-title">
                Pesan Kesan <em>Mikail</em>
              </h1>
              <p className="lock-subtitle">Masukkan kode untuk membuka pesan</p>
            </div>

            <div className="form-card">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label className="input-label" htmlFor="kode-input">
                    Kode Rahasia
                  </label>
                  <input
                    id="kode-input"
                    className="code-input"
                    type="text"
                    placeholder="_ _ _ _ _ _"
                    value={kode}
                    onChange={(e) => {
                      setKode(e.target.value);
                      setError("");
                    }}
                    maxLength={10}
                    autoComplete="off"
                    autoCapitalize="characters"
                    spellCheck={false}
                  />
                </div>

                <button className="submit-btn" type="submit">
                  <span>Buka Surat 💌</span>
                </button>
              </form>

              {error && <div className="error-msg">{error}</div>}
            </div>
          </div>
        )}

        {dataPesan && (
          <div className="envelope-scene">
            {/* Envelope */}
            <div className="envelope-wrapper">
              <div
                className={`envelope ${openEnvelope ? "open" : ""}`}
                onClick={handleEnvelopeClick}
                role="button"
                aria-label="Klik untuk membuka amplop"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleEnvelopeClick()}
              >
                <div className="envelope-body">
                  <div className="envelope-left" />
                  <div className="envelope-right" />
                  <div className="envelope-bottom" />
                  <div className="envelope-flap" />
                  {!openEnvelope && (
                    <div className="envelope-seal" aria-hidden>💌</div>
                  )}
                </div>
              </div>
              {!openEnvelope && (
                <p className="envelope-hint">klik amplop untuk membuka</p>
              )}
            </div>

            {/* Letter */}
            {openEnvelope && (
              <div className="letter-container">
                <div className="letter-card">
                  {/* Lined paper effect */}
                  <div className="letter-lines" aria-hidden>
                    {lines.map((_, i) => (
                      <div key={i} className="letter-line" />
                    ))}
                  </div>

                  {/* Header */}
                  <div className="letter-title-bar">
                    <span className="letter-title-icon">📜</span>
                    <div>
                      <span className="letter-to">Kepada Yth.</span>
                      <span className="letter-name">{dataPesan.to}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <p className="letter-body">{dataPesan.isi}</p>

                  {/* Signature */}
                  <div className="letter-signature">
                    <span className="signature-text">
                      Dari Mikail
                    </span>
                    <span className="signature-icon">💖</span>
                  </div>
                </div>

                <button className="back-btn" onClick={handleReset}>
                  ← Kembali
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;