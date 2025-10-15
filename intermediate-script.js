// Simple responsive 20-question Irys quiz (local)
// Saves nothing, runs fully in the browser.

// Questions: simple, Irys / decentralized storage themed
const questions = [
  {
    q: "What blockchain network does Irys primarily integrate with for data uploads?",
    options: [
      "Bitcoin",
      "Ethereum",
      "Arweave",
      "Solana"
    ],
    a: 2
  },
  {
    q: "What is Irys mainly used for?",
    options: [
      "File sharing",
      "Decentralized permanent data storage",
      "Token exchange",
      "Smart contract deployment"
    ],
    a: 1
  },
  {
    q: "Which of the following best describes how Irys handles data payments?",
    options: [
      "Users pay a monthly subscription",
      "Pay-as-you-download ",
      "Yearly subscription model",
      "One-time upfront payment for permanence"
    ],
    a: 3
  },
  {
    q: "What protocol powers the permanent storage behind Irys?",
    options: [
      "Filecoin",
      "IPFS",
      "Arweave",
      "Storj"
    ],
    a: 2
  },
  {
    q: "What does 'pinning' usually mean in decentralized storage?",
    options: [
      "Hitting a button to favorite a file",
      "Keeping a file available on one or more nodes",
      "Deleting a file permanently",
      "Compressing a file"
    ],
    a: 1
  },
  {
    q: "What does the IrysUploader package simplify?",
    options: [
      "Uploading files and metadata",
      "Deploying tokens",
      "Managing RPC endpoints",
      "Creating smart contracts"
    ],
    a: 0
  },
  {
    q: "What programming language is most used for Irys integrations?",
    options: [
      "Java",
      "Python",
      "JavaScript",
      "C++"
    ],
    a: 2
  },
  {
    q: "What ensures the permanence of data uploaded through Irys?",
    options: [
      "Encrypted gateways",
      "Bundling and anchoring on Arweave",
      "Local caching",
      "Cloud redudancy"
    ],
    a: 1
  },
  {
    q: "Irys allows developers to store data without relying on:",
    options: [
      "Centralized APIs",
      "Arweave nodes",
      "Browser extensions",
      "Gateways"
    ],
    a: 0
  },
  {
    q: "What is one key advantage of using Irys for decentralized apps?",
    options: [
      "Slower uploads",
      "Temporary storage",
      "Verifiable permanence",
      "Manual verification"
    ],
    a: 2
  },
  {
    q: "Which layer does Irys operate as between users and Arweave?",
    options: [
      "Storage layer",
      "Compute layer",
      "Bundling layer",
      "Network layer"
    ],
    a: 2
  },
  {
    q: "How does Irys handle transaction fees for uploads?",
    options: [
      "Users pay gas fees manually each time",
      "Irys bundles and optimizes transactions",
      "Arweave sponsors all uploads",
      "Fees are optional"
    ],
    a: 1
  },
  {
    q: "Which of these is NOT a feature of Irys?",
    options: [
      "Permanent storage",
      "Fast upload speeds",
      "Centralized moderation",
      "Payment optimization"
    ],
    a: 2
  },
  {
    q: "Irys' core infrastructure ensures data is",
    options: [
      "Mutable",
      "Time-limited",
      "Traceable and permanent",
      "Stored on private servers"
    ],
    a: 2
  },
  {
    q: "Irys provides developers with APIs for:",
    options: [
      "Deploying DEXs",
      "Data uploads and retreival",
      "Token staking",
      "NFT minting"
    ],
    a: 1
  },
  {
    q: "What type of storage system best describes Arweave(and by extension Irys)?",
    options: [
      "Decentralized cloud storage",
      "Blockchain-based permanent storage",
      "Encrypted file locker",
      "Peer-to-peer cache system"
    ],a: 1
  },
  {
    q: "Which network feature allows Irys to make uploads faster and cheaper?",
    options: [
      "Layer 1 replication",
      "Off-chain indexing",
      "Sidechain rollups",
      "Bundled transactions"
    ],
    a: 3
  },
  {
    q: "Which of these features makes Irys different from typical cloud storage?",
    options: [
      "Nothing",
      "Immutable, permanent storage",
      "Centralized control",
      "Manual approval for uploads"
    ],
    a: 1
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
    q: "What makes data uploaded via Irys verifiable?",
    options: [
      "Centralized checksum",
      "User signatures",
      "Gateway hashing",
      "Cryptographic proofs"
    ],
    a: 3
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
        msg = "Flawless! You've mastered the Irys basics and beyond";
    }else if (percent >= 80) {
        msg = "Solid work! You really understand how Irys runs";
    }else if (percent >= 50) {
        msg = "Not bad! You have a decent understanding of Irys. 👍";
    }else if (percent >= 30) {
        msg = "Not bad, a bit more practice and you'll nail it";
    }else {
        msg = "You've got the basics, but review Irys once more";
    }

    message.textContent = msg;
}

    const text = "Not a beginner anymore, I see 👀";
        
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
