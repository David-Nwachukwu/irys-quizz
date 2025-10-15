// Simple responsive 20-question Irys quiz (local)
// Saves nothing, runs fully in the browser.

// Questions: simple, Irys / decentralized storage themed
const questions = [
  {
    q: "What core mechanism allows Irys to batch multiple uploads into a single on-chain transaction?",
    options: [
      "Rollups",
      "Bundling",
      "Sharding",
      "Hash chaining"
    ],
    a: 1
  },
  {
    q: "Which Arweave transaction field does Irys use to anchor bundled data?",
    options: [
      "data_root",
      "bundle_hash",
      "id",
      "owner"
    ],
    a: 0
  },
  {
    q: "What ensures the authencity of data uploaded through Irys?",
    options: [
      "Gateway timestamp",
      "Signature verification",
      "Hash compression",
      "Node replication"
    ],
    a: 1
  },
  {
    q: "When uploading with Irys, what cryptographic standard secures user signatures?",
    options: [
      "RSA",
      "ECDSA",
      "SHA-256",
      "Ed25519"
    ],
    a: 3
  },
  {
    q: "What major problem does Irys solve compared to direct Arweave uploads?",
    options: [
      "Speed and cost optimization",
      "Encryption management",
      "Token issuance",
      "Governance"
    ],
    a: 0
  },
  {
    q: "Which network tokens can users pay with on irys?",
    options: [
      "ETH, MATIC and SOL",
      "BTC, LTC, and DOGE",
      "AR only",
      "AVAX and NEAR"
    ],
    a: 0
  },
  {
    q: "Irys acts as a _____ between fast L2 uploads and Arweave permanence.",
    options: [
      "middleware bridge",
      "storage node",
      "replication layer",
      "bundling gateway"
    ],
    a: 3
  },
  {
    q: "Which layer abstracts transaction complexity for developers using Irys?",
    options: [
      "Smart Contract layer",
      "Compute layer",
      "Bundler layer",
      "Consensus layer"
    ],
    a: 2
  },
  {
    q: "In Irys architecture, what is the main purpose of a 'Bundler Node'?",
    options: [
      "To encrypt files before upload",
      "To aggregate multiple transactions efficiently",
      "To host private front-end uploads only",
      "To manage front-end uploads only"
    ],
    a: 1
  },
  {
    q: "What type of proof links an Irys upload to its permanent Arweave transaction?",
    options: [
      "Merkle proof",
      "Signature proof",
      "Anchor proof",
      "Receipt proof"
    ],
    a: 0
  },
  {
    q: "Which of these best describes Irys' payment abstraction feature?",
    options: [
      "It automates token swaps for AR payments",
      "It hides blockchain gas fees completely",
      "It allows users to pay in multiple tokens seamlessly",
      "It subsidizes all transactions"
    ],
    a: 2
  },
  {
    q: "What's the relationship between Irys' bundle ID and the Arweave transaction ID?",
    options: [
      "They're identical",
      "Bundle ID is embedded within the Arweave tracnsaction ID",
      "There's no relation",
      "Bundle ID maps to a parent transaction on Arweave"
    ],
    a: 3
  },
  {
    q: "Which function in Irys SDK handles file uploads",
    options: [
      "uploadFile()",
      "upload()",
      "sendData()",
      "pushToArweave()"
    ],
    a: 1
  },
  {
    q: "What's the main benefit of using Irys' bundling approach for developers?",
    options: [
      "Lower latency and batch efficiency",
      "On-chain governance",
      "Private storage options",
      "Token minting support"
    ],
    a: 0
  },
  {
    q: "How does Irys confirm a succesful upload?",
    options: [
      "By caching in localStorage",
      "By email notification",
      "Through a signed receipt containing the Arweave transaction ID",
      "Trough gateway polling only"
    ],
    a: 2
  },
  {
    q: "Which component of Irys allows integrations with frameworks like Next.js or React?",
    options: [
      "Irys SDK",
      "Irys CLI",
      "Irys Node Care",
      "Irys Bridge"
    ],a: 0
  },
  {
    q: "What distinguishes Irys from traditional storage gateways?",
    options: [
      "It operates as a permanent, verfifiable bundler",
      "It requires manual node setup",
      "It stores data off-chain",
      "It depends on cloud providers"
    ],
    a: 0
  },
  {
    q: "Which of the following would best describe Irys' architectural goal?",
    options: [
      "Provide centralized caching",
      "Replace Arweave's consensus",
      "Decouple upload logic from blockcahin complexity",
      "Limit access to developers only"
    ],
    a: 2
  },
  {
    q: "Bonus Question - what do we say in Irys?",
    options: [
      "gIrys",
      "gmIrys",
      "Hirys",
      "zk-Irys"
    ],
    a: 2
  },
  {
    q: "In the Irys ecosystem, what does 'Programmable data' enable?",
    options: [
      "Dynamic logic execution on stored data",
      "Encrypted file sharing",
      "Limited-time access",
      "Tokenized uploads"
    ],
    a: 0
  }
];

// state
let current = 0;
let score = 0;

const qNumEl = document.getElementById("qnum");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreArea = document.getElementById("score-area");
const quizArea = document.getElementById("quiz-area");
const scoreText = document.getElementById("score-text");
const retryBtn = document.getElementById("retry-btn");

function startQuiz(){
  current = 0;
  score = 0;
  qNumEl.textContent = current + 1;
  scoreArea.classList.add("hidden");
  quizArea.classList.remove("hidden");
  nextBtn.disabled = true;
  renderQuestion();
}

function renderQuestion(){
  const item = questions[current];
  questionEl.textContent = item.q;
  optionsEl.innerHTML = "";
  nextBtn.disabled = true;
  qNumEl.textContent = current + 1;

  item.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.type = "button";
    btn.textContent = opt;
    btn.dataset.index = idx;
    btn.addEventListener("click", () => selectOption(btn, idx));
    optionsEl.appendChild(btn);
  });
}

function selectOption(btn, idx){
  // disable all options after selection
  const item = questions[current];
  const optionButtons = optionsEl.querySelectorAll("button");
  optionButtons.forEach(b => b.disabled = true);

  const correctIdx = item.a;
  if (idx === correctIdx){
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    // reveal correct
    const correctBtn = [...optionButtons].find(b => Number(b.dataset.index) === correctIdx);
    if (correctBtn) correctBtn.classList.add("correct");
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current >= questions.length){
    showScore();
  } else {
    renderQuestion();
  }
});

function showScore(){
  quizArea.classList.add("hidden");
  scoreArea.classList.remove("hidden");
  scoreText.textContent = `${score} / ${questions.length}`;

  const message = document.getElementById("score-message");
  const percent = (score / questions.length) * 100;
  let msg = "";
    if (percent === 100) {
        msg = "Perfect score! You're an Irys master! 🌟";
    }else if (percent >= 80) {
        msg = "Impressive! You really know your Irys stuff! 🎉";
    }else if (percent >= 50) {
        msg = "Skill issues, try again";
    }else if (percent >= 30) {
        msg = "Keep trying! Brush up on your Irys knowledge. 📚";
    }else {
        msg = "Master level isn't easy 😅. Try again and aim higher";
    }

    message.textContent = msg;

    document.getElementById("typing-box").classList.add("hidden");
}   

    const text = "No turning back now, Master.";
        
        const box = document.getElementById("typing-box");
        let i = 0;

        function typeWritter() {
            if (i < text.length) {
                box.textContent += text.charAt(i);
                i++;
                setTimeout(typeWritter, 50);
            }
        }

    typeWritter();

startQuiz();
