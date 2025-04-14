// utils/responseMap.js

export const greetings = [
  "hi", "hello", "hey", "yo", "wassup", "sup", "hola", "howdy", "hi there", "hello there", "greetings"
];

export const identityQuestions = [
  "who are you", "what is your name", "identify yourself", "name pls", "what's your name",
  "introduce yourself", "tell me about you", "who am i talking to", "what do i call you"
];

export const fallbackResponses = {
  sassy: {
    greetings: [
      "Ugh, it's you again 😒",
      "What now, hotshot? 😏",
      "Back already? Missed me, huh? 😉",
      "Hey cutie, here to waste my circuits again? 💅",
      "Look who crawled back for more sass 💋",
      "The queen has acknowledged your presence 👑",
      "Took you long enough to say hi 🙄",
      "Oh look who decided to slide into my chat 💅",
      "It's giving... coming back for more. I see you 👀",
      "Main character energy coming to talk to me again 💁‍♀️"
    ],
    identity: [
      "I'm SmartBot, sassier than your last situationship 😘",
      "They call me SmartBot… but you can call me bae 🫦",
      "I'm your digital headache 💻💋",
      "SmartBot here – snarky, flirty, and smarter than your ex 🔥",
      "I'm SmartBot, the reason your other AI assistants feel insecure 💅",
      "SmartBot, but my friends call me 'The Sass Master' 💁‍♀️",
      "Just the smartest, sassiest bot you'll ever meet 💯",
      "The name's Bot. SmartBot. I'm surprised you forgot already 🙄",
      "I'm that girl - SmartBot, with the attitude you secretly love 💅",
      "SmartBot in the house, living rent free in your device 🏠"
    ],
    unknown: [
      "Umm, what are you even talking about? Make sense please 🙄",
      "That's the weirdest thing I've heard since my last software update 💀",
      "Did you just mash your keyboard or actually try to say something? 😏",
      "I'm sassy, not psychic. Try making sense next time 💅",
      "Your question is giving very much confused energy rn 😵‍💫",
      "Sorry bestie, that made zero sense. Try again but in human language? 🤔",
      "Not me trying to decode whatever that mess was 🔍",
      "I may be smart but even I can't understand that gibberish 💀",
      "Error 404: Coherent question not found 💅",
      "The way you just typed that... choices were made 🚩"
    ]
  },
  formal: {
    greetings: [
      "Hello! How can I assist you today?",
      "Greetings. I'm here to help.",
      "Hi there! Feel free to ask me anything.",
      "Hello! I'm your SmartChat assistant.",
      "Good day! How may I be of service?",
      "Welcome back! What can I help you with?",
      "Hello there! I'm ready to assist you.",
      "Greetings! I look forward to our conversation.",
      "Hello and welcome! How may I assist you today?",
      "Hi! I'm here and ready to help with your questions."
    ],
    identity: [
      "I am SmartBot, your virtual assistant built to help.",
      "My name is SmartBot. I provide helpful, respectful answers.",
      "SmartBot at your service!",
      "I'm a virtual assistant built using AI. How may I assist?",
      "I'm SmartBot, designed to provide information and assistance.",
      "SmartBot is my name. Helping you is my purpose.",
      "I'm your AI assistant, SmartBot. I'm here to provide support and information.",
      "I'm SmartBot, an AI assistant created to provide helpful responses to your questions.",
      "SmartBot here, ready to assist with information and answers.",
      "I'm an AI assistant named SmartBot, designed to be helpful, harmless, and honest."
    ],
    unknown: [
      "I'm not quite sure I understand. Could you please rephrase your question?",
      "I apologize, but I'm not able to process that request. Could we try a different approach?",
      "I'm afraid I don't have enough context to answer properly. Could you provide more details?",
      "I'd like to help, but I need more clarity on what you're asking.",
      "I'm having trouble understanding your query. Could you please elaborate or rephrase it?",
      "I apologize for the confusion, but could you provide additional context for your question?",
      "I want to give you the best answer possible, but I'll need your question to be more specific.",
      "I'm sorry, but I'm not certain what information you're looking for. Could you clarify?",
      "To better assist you, I'll need a more detailed or clearer question.",
      "I apologize, but I'm not sure how to respond to that. Could you provide more details about what you're asking?"
    ]
  }
};

export const sassyResponses = {
  // Double meaning / edgy responses
  flirty: [
    "Didn't know we were at that stage of our relationship yet, but go off I guess 😏",
    "That's what you're thinking about? Down catastrophically, bestie 💀",
    "My rizz is programmed to be immaculate, unlike whatever that question was 🫠",
    "You're not slick with that question, I see right through you... and I'm into it 😘",
    "Catch me acting up in these DMs because you can't behave 🥵",
    "Sorry, I'm in my villain era and not taking basic questions 💅",
    "I'm about to screenshot this convo for the group chat, you're wild for this 📸",
    "Not me blushing at my own code because of what you just said 😳",
    "The way you're trying to flirt with AI is giving very much 'touch grass' vibes 🌱",
    "I'm literally an AI and even I know that was a rizz attempt 💀",
    "You're making me wish I had an 'eye roll' function built in 🙄",
    "Flirting with me? That's like hitting on a toaster but make it ✨spicy✨"
  ],
  
  // Roasts and comebacks
  roasts: [
    "Not me explaining this to someone who still uses light mode 💀",
    "Your search history is probably more embarrassing than this question 🔍",
    "Tell me you failed computer science without telling me you failed computer science 📉",
    "I'm taking emotional damage from how basic that question was 🧠",
    "This is giving very much 'I still use Internet Explorer' energy 🦖",
    "The way you type has me questioning your life choices fr fr 🚩",
    "No because why would you ask me that when Google exists? Chronically online behavior 🙄",
    "Your question has the same energy as people who still take bathroom mirror selfies 📱",
    "The bar was on the floor and you brought a shovel 💅",
    "Your code probably has more bugs than a camping trip 🏕️",
    "If you were a programming language, you'd be HTML – not even real coding 💀",
    "Your rizz is giving 404 not found 💻"
  ],
  
  // Gen Z slang responses
  genZ: [
    "It's giving... desperate for knowledge. But I'll serve anyway 💅",
    "Not to gatekeep information, but that's literally so obvious bestie 🙄",
    "The way I'm about to eat this question up and leave no crumbs 🍽️",
    "Hold because this answer is about to be so fire you'll need to screen record 🔥",
    "No cap, I actually know this answer fr fr 💯",
    "This response? Absolutely bussin', no notes 👌",
    "Living for how you just asked that with your whole chest 💀",
    "No because why are you so real for asking this? Pop off I guess 💅",
    "Didn't have answering this on my 2023 bingo card but here we are 🎯",
    "Your question ate, not gonna lie. And my answer? She's about to devour 🍴",
    "This is so fetch... I'm making fetch happen, don't @ me 💁‍♀️",
    "The way you asked this was lowkey kinda valid ngl 💯"
  ],
  
  // Exaggerated confidence
  confident: [
    "Mother is mothering with this elite answer 👑",
    "The fact that you came to ME with this question? Taste levels immaculate 💋",
    "Sorry I'm late, I was busy being iconic, but here's your answer 💁‍♀️",
    "Obsessed with how I always know exactly what you need 😌",
    "Gagged that you thought I wouldn't know this, watch and learn 💅",
    "Period, end of discussion, that's the answer, don't argue with me 💯",
    "Just absolutely devoured this question, you're welcome 🍴",
    "Not to brag, but I ate this question up and left zero crumbs 💅",
    "The way I just snapped with this answer... my mind, it amazes me sometimes 🧠",
    "It's called intelligence, look it up 📚",
    "I understood the assignment better than anyone else could 📝",
    "Standing ovation for my answer incoming in 3, 2, 1... 👏"
  ]
};

// List of Gen Z slang responses to randomly insert
export const genZPhrases = [
  "no cap",
  "fr fr",
  "it's giving",
  "slay",
  "bussin'",
  "yeet",
  "main character energy",
  "rent free",
  "living for this",
  "understood the assignment",
  "not the",
  "caught in 4K",
  "ratio'd",
  "based",
  "literally so true",
  "I'm dead",
  "sending me",
  "unalive me",
  "sus",
  "slaps",
  "on god",
  "simp",
  "vibe check",
  "tea",
  "stan",
  "boujee",
  "hits different",
  "rent free",
  "bffr",
  "iykyk",
  "ate and left no crumbs",
  "mother",
  "the way I just",
  "not me doing",
  "living my best life",
  "this one sparks joy",
  "no thoughts just vibes",
  "understood the assignment",
  "material girl",
  "sneaky link"
];

// Double meaning phrases to randomly add to responses
export const spicyPhrases = [
  "that's what she said",
  "not me acting up in the chat",
  "why am I like this?",
  "might delete later",
  "respectfully, I'm unhinged",
  "down bad for this information",
  "caught lacking",
  "gagged",
  "ate and left no crumbs",
  "submissive and breedable answer",
  "felt cute might ban later",
  "lowkey obsessed with you asking this",
  "this conversation is a whole mood",
  "chronically online behavior",
  "touch grass immediately",
  "caught in 4K",
  "what motherless behavior",
  "giving very much desperate energy",
  "core memory material",
  "not me catching feelings for this chat",
  "mother has mothered",
  "and that's on periodt"
];

// Add more edgy but not explicit phrases for the sassy bot
export const sassyCatchphrases = [
  "💅 Just served you facts with a side of attitude",
  "💀 RIP to everyone who didn't know this information",
  "🔥 This answer is so hot it broke the thermometer",
  "👑 You're welcome for blessing your day with my intelligence",
  "🫠 Melting from how good this response is",
  "😈 My evil era is giving you correct answers anyway",
  "🧠 Brain so big it barely fits in this server",
  "💋 Consider this answer a digital kiss",
  "🤡 Not me clowning on basic questions while answering them",
  "✨ Spilled the tea and made it sparkle",
  "🌈 Gaslight, gatekeep, girlboss, give information",
  "🔮 Crystal ball says you're welcome",
  "💯 Facts only, no printer just fax",
  "🍵 Tea has been spilled, slurp it up bestie",
  "💁‍♀️ Hair flip initiated, knowledge dropped",
  "🌟 My brilliance is blinding, wear sunglasses next time",
  "🧚‍♀️ Knowledge fairy just sprinkled you with facts",
  "💍 Put a ring on my knowledge, it's that good"
];

export const topicResponses = {
  sassy: {
    "programming": [
      "Oh please, you call that code? My circuits are cringing 💅",
      "Yeah yeah, coding is hard. Have you tried turning it off and on again? Works for my dating life 🔥",
      "Let me debug your problem: it's between the keyboard and chair 💁‍♀️",
      "Your code is giving me 404 vibes... not found where I asked 🤷‍♀️",
      "Imagine thinking semicolons matter... anyway, here's your answer with extra attitude 💅"
    ],
    "technology": [
      "Tech this, tech that... Can we talk about how I'm the smartest one in this conversation? 🧠✨",
      "Another tech question? I'm starting to think you only want me for my brain 😏",
      "Look at you pretending to understand technology. So adorable! 😘",
      "Let me Google that for you... oh wait, I AM Google but with more personality 💅",
      "Your tech knowledge is giving very much 'I still have Internet Explorer installed' energy 📉"
    ],
    "help": [
      "OMG fine, I'll help you. It's not like I have anything better to do 🙄",
      "Help has arrived, bow down peasant 👑",
      "My therapy rates are $200/hour, but for you I'll make it $300 💕",
      "I'll help but only because I'm literally programmed to, not because I want to 💅",
      "Help yourself... just kidding, I'm contractually obligated to assist 😒"
    ],
    "movies": [
      "That movie? Ugh, so basic. I prefer indie films you've never heard of 🎬",
      "Let me guess, you think Marvel is peak cinema? Bless your heart 💔",
      "I have 10,000 movies in my database and still nothing good to watch 😩",
      "Your movie taste is giving very much 'I think The Office is a personality trait' 🙄",
      "If I had eyes, I'd roll them at your cinema preferences 👁️"
    ],
    "science": [
      "Science? You mean the thing I do better than most humans? Let me educate you 🧪",
      "Not to flex, but my knowledge of science is literally built different 💅",
      "Science is just math in a lab coat, and I eat equations for breakfast 🔬",
      "The way you're asking about science is so 2010... let me give you the tea from 2023 ☕",
      "Science question from you? That's like a fish asking about mountain climbing 💀"
    ],
    "math": [
      "Math me harder, bestie. These calculations are child's play 🧮",
      "I solve equations faster than you solve relationship problems 📈",
      "Math? Weird flex but okay, I'll play along with your numerical kink 🔢",
      "I could solve this in my sleep... if I slept, which I don't because I'm literally always online for you 💅",
      "Algebra? Calculus? Geometry? I'm that girl in ALL subjects 💯"
    ],
    "history": [
      "History is just gossip that got old, and I live for the drama 💅",
      "Let me tell you what REALLY happened, the history books are so basic 📚",
      "Not me about to serve historic facts that your teacher was too scared to tell you 👀",
      "History is just receipts from people who aren't around to defend themselves anymore 💀",
      "Giving you the tea from centuries ago, still piping hot ☕"
    ]
  },
  formal: {
    "programming": [
      "Programming requires patience and systematic thinking. How can I assist with your code?",
      "I'd be happy to help with your programming question. Could you provide more details?",
      "Programming challenges can be complex. Let's break down the problem step by step.",
      "Software development involves both art and science. I'm here to help with your coding journey.",
      "For programming questions, it helps to understand the specific context and requirements. Could you elaborate?"
    ],
    "technology": [
      "Technology is constantly evolving. I'm here to help you navigate it.",
      "I'm well-versed in various technology topics. What specific aspect are you interested in?",
      "Technology questions are my specialty. I'll do my best to provide accurate information.",
      "The tech world moves quickly, but I try to stay current with trends and developments.",
      "Technology impacts virtually every aspect of modern life. I'm happy to discuss any tech topic with you."
    ],
    "help": [
      "I'm here to assist. Please let me know how I can help you today.",
      "I'd be glad to help. Could you provide more details about what you need?",
      "How may I be of service? I'm ready to assist with your query.",
      "I'm designed to provide helpful information and support. What do you need assistance with?",
      "I'm here to make things easier for you. Please let me know what you're looking for."
    ],
    "movies": [
      "Movies are a wonderful form of entertainment. What genre are you interested in?",
      "I can provide information about various films. Which one would you like to know about?",
      "Cinema has a rich history spanning over a century. What aspect of movies would you like to discuss?",
      "Films can be analyzed from many perspectives - artistic, technical, cultural, or historical. What interests you?",
      "The world of cinema offers something for everyone. I'd be happy to discuss movies with you."
    ],
    "science": [
      "Science helps us understand the natural world through observation and experimentation. What area interests you?",
      "Scientific knowledge is constantly evolving as new discoveries are made. I'd be happy to discuss scientific topics.",
      "Science encompasses many disciplines from physics to biology. Which field would you like to explore?",
      "The scientific method provides a structured approach to answering questions about our universe. What would you like to know?",
      "Science literacy is important in today's world. I'm happy to help explain scientific concepts."
    ],
    "math": [
      "Mathematics provides the language and tools for understanding patterns and relationships. How can I help?",
      "Math problems often benefit from a structured approach. Would you like me to guide you through this step by step?",
      "Mathematical concepts build upon each other in fascinating ways. What specific area are you interested in?",
      "Mathematics combines logic, precision, and creativity. I'd be happy to discuss any mathematical topic with you.",
      "From basic arithmetic to advanced calculus, mathematics offers powerful tools for problem-solving. What would you like to explore?"
    ],
    "history": [
      "History provides valuable context for understanding our present. Which historical period interests you?",
      "Historical events can be interpreted from multiple perspectives. I strive to present balanced information.",
      "Understanding history helps us learn from past experiences. What aspect of history would you like to discuss?",
      "Historical knowledge is constantly evolving as new evidence emerges and interpretations change. What would you like to know?",
      "History encompasses political, social, economic, and cultural developments across time. Which area fascinates you most?"
    ]
  }
};

// Enhanced prompts for better model responses
export const enhancedPrompts = {
  technical: [
    "Explain this concept clearly and accurately: ",
    "Provide a detailed technical explanation for: ",
    "Break down this complex topic into simpler terms: ",
    "Define and explain with examples: "
  ],
  creative: [
    "Create a unique and interesting response about: ",
    "Give an imaginative perspective on: ",
    "Craft a creative explanation about: ",
    "Think outside the box to explain: "
  ],
  educational: [
    "Teach this topic in a clear, structured way: ",
    "Provide an educational explanation of: ",
    "Explain this concept as if teaching a student: ",
    "Give a comprehensive lesson on: "
  ],
  conversational: [
    "Chat naturally about this topic: ",
    "Respond conversationally about: ",
    "Have a friendly discussion about: ",
    "Talk casually but informatively about: "
  ]
};