// Simple responsive 20-question Irys quiz (local)
// Saves nothing, runs fully in the browser.

// Questions: simple, Irys / decentralized storage themed
const questions = [
  {
    q: "What is Irys mainly used for?",
    options: [
      "Sending emails",
      "Permanent data storage",
      "Video streaming",
      "Text editing"
    ],
    a: 1
  },
  {
    q: "Which command-line tool lets you upload files to Irys?",
    options: [
      "IrysUploader",
      "IrysCLI",
      "Both a and b",
      "irysDeploy"
    ],
    a: 2
  },
  {
    q: "What does a CLI (command-line interface) let you do?",
    options: [
      "Only view websites",
      "Run commands to interact with services",
      "Replace your operating system",
      "Only view images"
    ],
    a: 1
  },
  {
    q: "What does Irys store permanently?",
    options: [
      "Temporary logs",
      "Tweets",
      "Any kind of file or data",
      "Only text files"
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
    q: "Is Irys a centralized or decentralized network?",
    options: [
      "Centralized",
      "Decentralized",
      "Private",
      "None of the above"
    ],
    a: 1
  },
  {
    q: "What does SDK stand for?",
    options: [
      "System Data Kit",
      "Software Development Kit",
      "Secure Data Keeper",
      "Source Download Kit"
    ],
    a: 1
  },
  {
    q: "What is a CID (content identifier)?",
    options: [
      "A user's password",
      "A cryptographic identifier for content",
      "A type of file format",
      "A cloud provider name"
    ],
    a: 1
  },
  {
    q: "What is the smallest unit of data called?",
    options: [
      "File",
      "Byte",
      "Block",
      "Packet"
    ],
    a: 1
  },
  {
    q: "Who owns the data you upload to Irys?",
    options: [
      "The Irys company",
      "The uploader (You)",
      "Random users",
      "Miners"
    ],
    a: 1
  },
  {
    q: "Why show the correct answer when a user picks wrong?",
    options: [
      "To help users learn",
      "To punish them",
      "To hide the right choice",
      "To slow the quiz"
    ],
    a: 0
  },
  {
    q: "What does CLI mean?",
    options: [
      "Command Line Interface",
      "Central Logic Integration",
      "Code Layout Instruction",
      "Core Log Input"
    ],
    a: 0
  },
  {
    q: "Why do developers use Irys?",
    options: [
      "To make memes",
      "To store data permanently on-chain",
      "To delete files easily",
      "To hide websites"
    ],
    a: 1
  },
  {
    q: "What does permanent data mean on Irys?",
    options: [
      "It deletes after 24 hours",
      "It changes daily",
      "It stays available forever",
      "It's stored only locally"
    ],
    a: 2
  },
  {
    q: "Which keyword means the same as 'store forever'?",
    options: [
      "Temporary",
      "Permanent",
      "Short-term",
      "Cache"
    ],
    a: 1
  },
  {
    q: "What is the benefit of uploading data once to Irys?",
    options: [
      "You can't access it again",
      "You never pay again for the same file",
      "It deletes automatically",
      "It's only visible to admins"
    ],a: 1
  },
  {
    q: "What network does Irys often connect with for transactions?",
    options: [
      "Bitcoin",
      "Ethereum",
      "Solana",
      "Dogecoin"
    ],
    a: 1
  },
  {
    q: "What should happen after the last question?",
    options: [
      "Nothing",
      "Show final score and offer retry",
      "Delete the quiz",
      "Open a new browser tab automatically"
    ],
    a: 1
  },
  {
    q: "What is a node in the Irys network?",
    options: [
      "A small storage unit that helps host data",
      "A website",
      "A phone app",
      "A payment link"
    ],
    a: 0
  },
  {
    q: "What makes Irys different from normal cloud storage?",
    options: [
      "It's temporary",
      "It's decentralized and permanent",
      "It needs internet every second",
      "It only works on Android"
    ],
    a: 1
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
        msg = "Excellent start! You've got the Irys basics down";
    }else if (percent >= 80) {
        msg = "Strong work! You're picking up Irys fast";
    }else if (percent >= 50) {
        msg = "Nice! You're learning the core of Irys";
    }else if (percent >= 30) {
        msg = "Decent effort, keep exploring how Irys works";
    }else {
        msg = "Tough start, but every expert begins here. Try again!";
    }

    message.textContent = msg;
}

    const text = "Hello, Welcome to Irys Quiz, How well do you know Irys?";
        
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
