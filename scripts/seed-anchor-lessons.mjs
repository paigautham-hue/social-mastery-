import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "../drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

// Helper function to create template-based lesson content
function createTemplateLesson(title, topics, difficulty) {
  return `# ${title}

## Learning Objectives
- Understand the core principles of ${topics[0].toLowerCase()}
- Apply ${topics[1] || topics[0]} techniques in real-world situations
- Develop practical skills through targeted exercises
- Recognize and avoid common mistakes in this area

## Core Concepts

### Concept 1: ${topics[0]}

${topics[0]} is a fundamental aspect of social dynamics that requires both theoretical understanding and practical application. This concept builds on previous lessons and prepares you for more advanced techniques.

**Key Principles:**
- Start with awareness and observation
- Practice calibration and adjustment
- Build confidence through repetition
- Focus on authentic connection

### Concept 2: ${topics[1] || 'Practical Application'}

Understanding theory is important, but application is where real growth happens. This section focuses on taking the concepts and making them actionable in your daily interactions.

**Implementation Steps:**
1. Observe the situation and context
2. Apply the appropriate technique
3. Read feedback and adjust
4. Reflect on the outcome

### Concept 3: Integration

The most effective practitioners integrate multiple concepts seamlessly. This requires practice, self-awareness, and a commitment to continuous improvement.

## Practical Examples

### Example 1: Basic Application
**Situation:** You're in a social setting and want to apply this concept.

**Approach:** Start by observing the environment, then gradually implement the technique while monitoring feedback.

**Outcome:** With practice, this becomes natural and effortless.

### Example 2: Advanced Scenario
**Situation:** A more complex social dynamic requires nuanced application.

**Approach:** Combine multiple techniques while maintaining authenticity and calibration.

**Outcome:** Successful navigation of complex social situations.

## Exercises

### Exercise 1: Observation Practice
Spend time observing others who demonstrate mastery in this area. Note what works and what doesn't.

### Exercise 2: Controlled Practice
Practice in low-pressure environments before moving to more challenging situations.

### Exercise 3: Reflection Journal
After each practice session, write about what worked, what didn't, and what you'll do differently next time.

## Common Mistakes

1. **Rushing the process** - Take time to build skills gradually
2. **Ignoring feedback** - Pay attention to how others respond
3. **Being inauthentic** - Stay true to yourself while applying techniques
4. **Giving up too soon** - Mastery takes time and practice
5. **Not seeking guidance** - Learn from others who have succeeded

## Key Takeaways

- ${topics[0]} is essential for social success
- Practice and calibration are key to mastery
- Authenticity should never be compromised
- Continuous learning and improvement are necessary
- Integration with other skills creates synergy

## Field Assignment

**This Week's Challenge:**

Practice the concepts from this lesson in 5 different social situations. For each interaction:
1. Note the context and environment
2. Describe what you did
3. Record the response you received
4. Identify one thing to improve

Track your progress and celebrate small wins along the way.`;
}

const anchorLessons = [
  // BEGINNER ANCHOR LESSONS
  {
    pathId: 1,
    title: "Opening Conversations Naturally",
    slug: "opening-conversations-naturally",
    description: "Master the art of starting conversations with direct, indirect, and situational openers",
    content: `# Opening Conversations Naturally

## Learning Objectives
- Master direct, indirect, and situational opening techniques
- Understand when to use each type of opener
- Develop natural conversation starters
- Overcome the fear of initiating contact

## Core Concepts

### Direct Openers

A direct opener is when you express your interest clearly and honestly from the start. This approach is bold, authentic, and often highly effective when delivered with confidence.

**Examples:**
- "Hi, I think you're really attractive and I'd regret not coming over to introduce myself. I'm [name]."
- "Excuse me, I know this is random, but I saw you and thought you were cute. Had to say hi."

**When to use:**
- When you have strong eye contact and she's shown interest
- In environments where directness is appreciated (daytime, coffee shops)
- When you want to stand out from indirect approaches

**Key principles:**
- Own your intent—don't apologize for your interest
- Smile and maintain confident body language
- Be prepared for any response (positive or negative)
- Follow up with genuine conversation, not a script

### Indirect Openers

Indirect openers start a conversation without immediately revealing romantic interest. They're lower pressure and work well in many social situations.

**Examples:**
- "Hey, quick question—my friend and I are debating something. Do guys or girls lie more in relationships?"
- "Excuse me, do you know if there's a good coffee shop around here?"
- "I love your style. Where do you usually shop?"

**When to use:**
- In group settings where direct might be too forward
- When you're still building confidence
- In environments where indirect is more socially calibrated (nightclubs, parties)

**Key principles:**
- Make it sound spontaneous, not rehearsed
- Use opinion openers to create engagement
- Transition naturally to normal conversation
- Don't stay indirect too long—show interest within 5-10 minutes

### Situational Openers

Situational openers reference something in the immediate environment. They're the most natural and least "gamey" of all openers.

**Examples:**
- At a bookstore: "What are you reading? I'm looking for something new."
- At a gym: "Do you know if this machine is free?"
- At a bar: "This place is packed tonight. Do you come here often?"

**When to use:**
- When there's an obvious shared context
- When you want to seem completely natural
- When other openers feel too forced

**Key principles:**
- Be observant of your surroundings
- Make genuine observations or ask real questions
- Transition smoothly into deeper conversation
- Don't overthink it—just be present

### False Time Constraints

A false time constraint is a statement that implies you can only talk briefly. This reduces pressure on both of you and makes her more likely to engage.

**Examples:**
- "I can only stay for a minute, but..."
- "My friends are waiting, but I had to come say hi..."
- "I'm actually on my way out, but..."

**Why it works:**
- Reduces her guard (you're not trying to monopolize her time)
- Creates scarcity (you're busy and valuable)
- Gives you an easy exit if it's not going well
- Often leads to her wanting you to stay longer

## Practical Examples

### Example 1: Coffee Shop (Situational)
**Situation:** She's working on a laptop at a coffee shop.

**Opener:** "Hey, sorry to interrupt. I'm trying to decide between the cold brew and the cappuccino. What would you recommend?"

**Follow-up:** After she responds, continue: "Thanks! By the way, I'm [name]. What are you working on? Looks intense."

**Why it works:** Natural, low-pressure, and transitions smoothly into conversation.

### Example 2: Street (Direct)
**Situation:** You pass an attractive woman on the street.

**Opener:** "Excuse me, I know this is random, but I saw you walking and thought you were really cute. I'm [name]."

**Follow-up:** If she's receptive: "I'm actually heading to grab coffee. Want to join me for 10 minutes?"

**Why it works:** Confident, honest, and shows you're not afraid to go for what you want.

### Example 3: Bar (Indirect)
**Situation:** She's with friends at a bar.

**Opener:** "Hey guys, quick question—my friend thinks pineapple on pizza is a crime. What do you think?"

**Follow-up:** After the group responds, focus on your target: "You seem like you have strong opinions. I like that. I'm [name]."

**Why it works:** Engages the whole group (disarms obstacles), then isolates your target naturally.

## Exercises

### Exercise 1: Opener Variety Challenge
This week, try each type of opener at least twice:
- 2 direct openers
- 2 indirect openers  
- 2 situational openers

Track which ones feel most natural to you and which get the best responses.

### Exercise 2: False Time Constraint Practice
In your next 5 approaches, use a false time constraint. Notice how it affects her response and your own anxiety level.

### Exercise 3: Situational Awareness Drill
Spend 30 minutes in a public place (coffee shop, bookstore, park) and write down 10 potential situational openers you could use. This trains your brain to spot opportunities.

## Common Mistakes

1. **Using the same opener repeatedly** - Vary your approach based on context and your natural style.

2. **Sounding scripted** - Memorized lines come across as inauthentic. Use frameworks, not scripts.

3. **Waiting for the "perfect" opener** - Any opener works if delivered with confidence. Just start talking.

4. **Staying indirect too long** - If you opened indirectly, show interest within 5-10 minutes or you'll be friend-zoned.

5. **Apologizing for approaching** - "Sorry to bother you" immediately lowers your value. Be unapologetic about your interest.

## Key Takeaways

- Direct openers are bold and authentic—use when you have strong eye contact
- Indirect openers are lower pressure—great for groups or building confidence
- Situational openers are the most natural—reference your shared environment
- False time constraints reduce pressure and create scarcity
- The best opener is the one you deliver with confidence

## Field Assignment

**This Week's Challenge:**

Complete 10 approaches using different opener types:
- 3 direct openers (daytime venues)
- 3 indirect openers (bars or social events)
- 4 situational openers (anywhere)

For each approach, record:
- Type of opener used
- Her initial response
- How long the conversation lasted
- What you learned

**Bonus:** Get at least 3 phone numbers this week by following up strong openers with genuine conversation.`,
    order: 6,
    duration: 30,
    difficulty: "beginner",
    videoUrl: null,
    isPublished: true
  },

  {
    pathId: 1,
    title: "Storytelling Basics",
    slug: "storytelling-basics",
    description: "Learn to tell engaging stories that demonstrate value and create emotional connection",
    content: `# Storytelling Basics

## Learning Objectives
- Understand the three-act story structure
- Learn to create emotional hooks in your stories
- Demonstrate higher value (DHV) through storytelling
- Master pacing and delivery techniques

## Core Concepts

### The Power of Stories

Stories are the most powerful communication tool humans have. They bypass logical resistance, create emotional connections, and make you memorable. In attraction, stories serve multiple purposes:

**Building attraction:** Stories that demonstrate your positive qualities (DHV stories)
**Creating comfort:** Vulnerable stories that show your human side
**Entertainment:** Funny or interesting stories that make interactions enjoyable
**Teaching:** Stories that subtly convey lessons or values

### Three-Act Story Structure

Every great story follows a basic structure. Master this and your stories will captivate.

**Act 1: Setup (25% of story)**
- Establish the scene and characters
- Create context so listeners understand the situation
- Hook them with an interesting opening

**Act 2: Conflict (50% of story)**
- Introduce the problem, challenge, or unexpected twist
- Build tension and keep them engaged
- This is where the story gets interesting

**Act 3: Resolution (25% of story)**
- Show how the situation resolved
- Include the lesson or punchline
- End on a high note that reinforces your point

**Example:**
- Setup: "Last year I was traveling through Thailand..."
- Conflict: "...when I got completely lost in Bangkok at 2 AM with a dead phone..."
- Resolution: "...ended up having the best night of my trip because I met this group of locals who took me to an underground jazz club."

### Emotional Hooks

Emotional hooks are elements that make people care about your story. Without them, you're just reciting facts.

**Types of emotional hooks:**
- **Curiosity:** "You won't believe what happened next..."
- **Relatability:** "Have you ever been in a situation where..."
- **Surprise:** Unexpected twists that subvert expectations
- **Humor:** Funny observations or situations
- **Tension:** Moments of danger, embarrassment, or high stakes

**How to create hooks:**
- Start with an intriguing statement: "I almost got arrested in Vegas..."
- Use vivid sensory details: "The room smelled like old leather and whiskey..."
- Create suspense: "I had no idea what I was walking into..."
- Show emotion: "I was terrified/excited/confused..."

### DHV (Demonstration of Higher Value) Through Stories

DHV stories subtly showcase your positive qualities without bragging. The key is to demonstrate value through the story itself, not by explicitly stating it.

**Qualities to demonstrate:**
- **Social proof:** You're liked by others
- **Leadership:** You take charge in situations
- **Protector of loved ones:** You care for friends/family
- **Willingness to emote:** You're not afraid to show emotion
- **Pre-selected by women:** Other women find you attractive

**Good DHV story:**
"Last weekend, my friend's car broke down on the highway at midnight. I drove an hour to pick him up, and we ended up having this deep conversation about life on the drive back. Turns out he was going through a rough breakup and really needed someone to talk to."

**What it demonstrates:** Loyalty, willingness to help, emotional intelligence, good friend

**Bad DHV (bragging):**
"I make six figures and drive a BMW. I'm also really good at my job."

**Why it's bad:** Explicit value statements come across as insecure and trying too hard.

### Pacing and Delivery

How you tell a story matters as much as the content.

**Pacing techniques:**
- **Slow down** for important or emotional moments
- **Speed up** during exciting or action-packed parts
- **Pause** before punchlines or reveals for dramatic effect
- **Vary your pace** to maintain interest

**Delivery tips:**
- **Use your hands** to illustrate points (but don't overdo it)
- **Make eye contact** with everyone in the group
- **Change your voice** for different characters or emotions
- **Show, don't tell:** "I was furious" vs "My hands were shaking and I could feel my face getting hot"
- **Use dialogue:** Recreate conversations to make stories vivid

## Practical Examples

### Example 1: DHV Story (Social Proof + Leadership)
"So last month, I'm at this rooftop party in the city, and the host—who I barely know—comes up to me panicking. Apparently, the DJ canceled last minute. I used to DJ in college, so I offered to throw something together. 

Within 20 minutes, I had my laptop hooked up and was reading the crowd. Started with some chill house music, then gradually brought the energy up. By midnight, the whole rooftop was packed and people were dancing.

The host came up afterward and was like, 'Dude, you saved my party.' Ended up meeting some really cool people that night, including this girl who's now one of my good friends."

**What it demonstrates:** Resourcefulness, social skills, ability to read a room, social proof

### Example 2: Vulnerability Story (Building Comfort)
"I'll be honest, I wasn't always confident with people. In high school, I was actually pretty shy. There was this girl I had a crush on for like two years, and I never said a word to her.

One day, senior year, I finally worked up the courage to talk to her. Turns out she thought I was stuck-up because I never talked to anyone! We ended up dating for a while.

That taught me that people aren't mind readers. If you want something, you have to go for it. Worst case, you get a 'no.' Best case, you get what you want."

**What it demonstrates:** Self-awareness, growth mindset, relatability, courage

### Example 3: Humorous Story (Entertainment)
"I tried cooking a fancy dinner for friends last week. I'm watching this YouTube chef make it look easy, right? So I'm following along, feeling like Gordon Ramsay.

Cut to an hour later: my kitchen looks like a crime scene, the smoke alarm is going off, and I'm frantically googling 'can you eat slightly burnt risotto?'

My friends show up, take one look, and we just order pizza. But hey, at least I tried!"

**What it demonstrates:** Self-deprecating humor, ability to laugh at yourself, relatability

## Exercises

### Exercise 1: Story Bank Creation
Write down 5-7 stories from your life that demonstrate different qualities:
1. A time you showed leadership
2. A time you helped someone
3. A funny/embarrassing moment
4. An adventure or travel story
5. A time you overcame a challenge

Practice telling each one using the three-act structure.

### Exercise 2: Emotional Hook Practice
Take a boring story ("I went to the grocery store") and add emotional hooks:
- Curiosity: "I went to the grocery store and ran into someone I never expected to see..."
- Humor: "I went to the grocery store and somehow ended up in an argument about avocados..."
- Surprise: "I went to the grocery store and left with a new business partner..."

### Exercise 3: Delivery Drill
Record yourself telling a story. Watch it back and note:
- Do you pause effectively?
- Is your pacing varied?
- Do you use gestures naturally?
- Does your voice convey emotion?

Adjust and record again.

## Common Mistakes

1. **Making stories too long** - Keep them under 2-3 minutes. If it's longer, it better be amazing.

2. **Including irrelevant details** - "So I was at this restaurant—actually it was a Tuesday, no wait, Wednesday—and I ordered the chicken, or maybe it was fish..." Cut the fluff.

3. **Explaining the point** - Let the story speak for itself. Don't say "So basically, I'm a good friend" at the end.

4. **Monotone delivery** - Vary your voice, pace, and energy. A great story told badly is boring.

5. **Bragging disguised as stories** - If your story is just about how awesome you are, it's not a DHV story, it's a turn-off.

## Key Takeaways

- Stories create emotional connections and make you memorable
- Use the three-act structure: Setup, Conflict, Resolution
- Emotional hooks keep people engaged (curiosity, humor, surprise)
- DHV stories demonstrate value without explicit bragging
- Delivery matters: vary pace, use pauses, show emotion

## Field Assignment

**This Week's Challenge:**

1. **Prepare your story bank:** Write out 5 stories using the three-act structure

2. **Practice delivery:** Tell each story to at least 2 different people and get feedback

3. **Field test:** Use at least 3 different stories in social interactions this week

4. **Reflection:** After each story, note:
   - Did people seem engaged?
   - Did they ask follow-up questions?
   - What could you improve?

**Bonus:** Create one "signature story" that you perfect through repetition. This becomes your go-to story that always lands well.`,
    order: 8,
    duration: 30,
    difficulty: "beginner",
    videoUrl: null,
    isPublished: true
  }
];

// Create template lessons for remaining content
const templateLessons = [
  // Beginner templates
  { pathId: 1, title: "Active Listening & Engagement", slug: "active-listening-engagement", description: "Develop genuine curiosity and engagement through active listening techniques", topics: ["Active listening", "Reflective techniques", "Conversational threading"], order: 7, duration: 25, difficulty: "beginner" },
  { pathId: 1, title: "Handling Basic Tests", slug: "handling-basic-tests", description: "Recognize and pass compliance tests and basic shit tests with confidence", topics: ["Compliance tests", "Shit test responses", "Frame maintenance"], order: 9, duration: 25, difficulty: "beginner" },
  { pathId: 1, title: "Building Comfort & Rapport", slug: "building-comfort-rapport", description: "Create deep connection through comfort building and authentic rapport", topics: ["Comfort phase", "Common ground", "Trust-building"], order: 10, duration: 30, difficulty: "beginner" },
  { pathId: 1, title: "Introduction to Kino", slug: "introduction-to-kino", description: "Understand physical touch escalation and the touch ladder fundamentals", topics: ["Touch basics", "Touch ladder", "Reading receptiveness"], order: 11, duration: 25, difficulty: "beginner" },
  { pathId: 1, title: "Personal Space & Proximity", slug: "personal-space-proximity", description: "Master the art of closing distance while respecting boundaries", topics: ["Social distances", "Closing distance", "Respecting boundaries"], order: 12, duration: 20, difficulty: "beginner" },
  { pathId: 1, title: "Reading Interest Signals", slug: "reading-interest-signals", description: "Identify and respond to indicators of interest and disinterest", topics: ["IOIs identification", "IODs recognition", "Calibrating responses"], order: 13, duration: 25, difficulty: "beginner" },
  { pathId: 1, title: "First Date Fundamentals", slug: "first-date-fundamentals", description: "Plan and execute successful first dates with proper escalation", topics: ["Date planning", "Conversation topics", "Physical escalation"], order: 14, duration: 30, difficulty: "beginner" },
  { pathId: 1, title: "Beginner Path Capstone", slug: "beginner-path-capstone", description: "Integrate all beginner concepts and create your action plan", topics: ["Concept integration", "Action planning", "Next steps"], order: 15, duration: 35, difficulty: "beginner" },

  // Intermediate templates
  { pathId: 2, title: "Advanced Storytelling & DHV", slug: "advanced-storytelling-dhv", description: "Master nested loops, thread management, and strategic vulnerability", topics: ["Nested loops", "Thread management", "Strategic vulnerability"], order: 16, duration: 30, difficulty: "intermediate" },
  { pathId: 2, title: "Push-Pull Dynamics", slug: "push-pull-dynamics", description: "Create emotional waves and maintain attraction through push-pull", topics: ["Emotional waves", "Interest and challenge", "Maintaining tension"], order: 17, duration: 25, difficulty: "intermediate" },
  { pathId: 2, title: "Frame Control Mastery", slug: "frame-control-mastery", description: "Define, hold, and control frame in any social situation", topics: ["Frame definition", "Holding frame", "Reframing techniques"], order: 18, duration: 30, difficulty: "intermediate" },
  { pathId: 2, title: "Handling Advanced Shit Tests", slug: "handling-advanced-shit-tests", description: "Master agree and amplify, pressure flips, and amused mastery", topics: ["Agree and amplify", "Pressure flips", "Amused mastery"], order: 19, duration: 25, difficulty: "intermediate" },
  { pathId: 2, title: "Qualification & Investment", slug: "qualification-investment", description: "Make her qualify herself and build mutual investment", topics: ["Qualification techniques", "Mutual investment", "Setting standards"], order: 20, duration: 30, difficulty: "intermediate" },
  { pathId: 2, title: "Nightclub & Bar Game", slug: "nightclub-bar-game", description: "Navigate high-energy nightlife environments with confidence", topics: ["High-energy environments", "Group dynamics", "Logistics"], order: 21, duration: 30, difficulty: "intermediate" },
  { pathId: 2, title: "Daygame Mastery", slug: "daygame-mastery", description: "Master street approaches and daytime venue game", topics: ["Street approaches", "Coffee shop game", "Time-bridging"], order: 22, duration: 30, difficulty: "intermediate" },
  { pathId: 2, title: "Social Circle Game", slug: "social-circle-game", description: "Leverage social proof and build attractive social circles", topics: ["Social proof", "Building circles", "Dating within circles"], order: 23, duration: 25, difficulty: "intermediate" },
  { pathId: 2, title: "Online & App Game", slug: "online-app-game", description: "Optimize your online presence and convert matches to dates", topics: ["Profile optimization", "Opening messages", "Moving to in-person"], order: 24, duration: 30, difficulty: "intermediate" },
  { pathId: 2, title: "Work & Professional Settings", slug: "work-professional-settings", description: "Navigate professional boundaries and workplace attraction", topics: ["Professional boundaries", "Subtle escalation", "Risk management"], order: 25, duration: 25, difficulty: "intermediate" },
  { pathId: 2, title: "Understanding Female Psychology", slug: "understanding-female-psychology", description: "Deep dive into female attraction triggers and psychology", topics: ["Emotional processing", "Hypergamy", "What women want"], order: 26, duration: 30, difficulty: "intermediate" },
  { pathId: 2, title: "Reading Emotional States", slug: "reading-emotional-states", description: "Identify and lead emotional states for deeper connection", topics: ["Emotional cues", "Matching and leading", "Mood calibration"], order: 27, duration: 25, difficulty: "intermediate" },
  { pathId: 2, title: "Text Game Mastery", slug: "text-game-mastery", description: "Master texting fundamentals, timing, and creating anticipation", topics: ["Texting fundamentals", "Timing strategies", "Creating anticipation"], order: 28, duration: 30, difficulty: "intermediate" },
  { pathId: 2, title: "Phone Game & Voice", slug: "phone-game-voice", description: "Use voice tonality and phone calls to build attraction", topics: ["Voice tonality", "Phone strategies", "Building comfort"], order: 29, duration: 25, difficulty: "intermediate" },
  { pathId: 2, title: "Intermediate Path Capstone", slug: "intermediate-path-capstone", description: "Integrate intermediate concepts and develop your personalized strategy", topics: ["Integration exercises", "Personalized plan", "Advanced preview"], order: 30, duration: 35, difficulty: "intermediate" },

  // Advanced templates
  { pathId: 3, title: "Social Hierarchy & Status", slug: "social-hierarchy-status", description: "Understand and build genuine social value and status", topics: ["Social value", "Building status", "Alpha dynamics"], order: 31, duration: 30, difficulty: "advanced" },
  { pathId: 3, title: "Group Dynamics Mastery", slug: "group-dynamics-mastery", description: "Master mixed sets, obstacles, and group social dynamics", topics: ["Mixed sets", "Handling obstacles", "AMOG tactics"], order: 32, duration: 30, difficulty: "advanced" },
  { pathId: 3, title: "Advanced Kino Escalation", slug: "advanced-kino-escalation", description: "Master the DiCarlo Escalation Ladder and sexual tension", topics: ["DiCarlo Ladder", "Micro-responses", "Sexual tension"], order: 33, duration: 30, difficulty: "advanced" },
  { pathId: 3, title: "Seduction & Intimacy", slug: "seduction-intimacy", description: "Navigate the seduction phase with ethics and effectiveness", topics: ["Seduction phase", "Romantic moments", "Ethical escalation"], order: 34, duration: 30, difficulty: "advanced" },
  { pathId: 3, title: "Long-Term Attraction", slug: "long-term-attraction", description: "Maintain attraction in relationships and avoid common pitfalls", topics: ["Relationship attraction", "Avoiding beta slide", "Keeping mystery"], order: 35, duration: 30, difficulty: "advanced" },
  { pathId: 3, title: "Developing Your Unique Style", slug: "developing-unique-style", description: "Find your authentic voice and develop your personal style", topics: ["Authentic voice", "Personality archetypes", "Playing to strengths"], order: 36, duration: 25, difficulty: "advanced" },
  { pathId: 3, title: "Vocal Mastery & Presence", slug: "vocal-mastery-presence", description: "Master voice tonality, pacing, and commanding presence", topics: ["Voice tonality", "Pacing techniques", "Commanding attention"], order: 37, duration: 25, difficulty: "advanced" },
  { pathId: 3, title: "Leadership & Social Value", slug: "leadership-social-value", description: "Develop natural leadership and high social value", topics: ["Leadership qualities", "Decision-making", "Inspiring others"], order: 38, duration: 30, difficulty: "advanced" },
  { pathId: 3, title: "Emotional Mastery", slug: "emotional-mastery", description: "Master your emotions and create powerful states", topics: ["Managing emotions", "Staying centered", "Powerful states"], order: 39, duration: 25, difficulty: "advanced" },
  { pathId: 3, title: "Authentic Vulnerability", slug: "authentic-vulnerability", description: "Balance strength with openness for deep connection", topics: ["Strategic disclosure", "Deep connection", "True intimacy"], order: 40, duration: 30, difficulty: "advanced" },
  { pathId: 3, title: "Reading Micro-Expressions", slug: "reading-micro-expressions", description: "Master facial coding and detecting true emotions", topics: ["Facial coding", "Detecting deception", "Calibrating responses"], order: 41, duration: 25, difficulty: "advanced" },
  { pathId: 3, title: "Advanced Frame Battles", slug: "advanced-frame-battles", description: "Navigate complex frame dynamics and meta-frames", topics: ["Meta-frame concepts", "Frame grabs", "Win-win dynamics"], order: 42, duration: 30, difficulty: "advanced" },
  { pathId: 3, title: "Lifestyle Design", slug: "lifestyle-design", description: "Build an attractive life that creates passive attraction", topics: ["Attractive life", "Purpose and mission", "Passive attraction"], order: 43, duration: 30, difficulty: "advanced" },
  { pathId: 3, title: "Ethical Game & Boundaries", slug: "ethical-game-boundaries", description: "Practice ethical game with respect for boundaries and consent", topics: ["Consent and respect", "Genuine connections", "Long-term thinking"], order: 44, duration: 30, difficulty: "advanced" },
  { pathId: 3, title: "Advanced Path Capstone", slug: "advanced-path-capstone", description: "Complete your mastery journey and create your personal system", topics: ["Mastery assessment", "Personal system", "Continuous growth"], order: 45, duration: 40, difficulty: "advanced" }
];

async function seedAllLessons() {
  console.log("📚 Seeding comprehensive lesson content...");
  console.log("✨ Creating anchor lessons with full content...");

  try {
    // Insert anchor lessons
    for (const lesson of anchorLessons) {
      await db.insert(schema.lessons).values(lesson);
      console.log(`✅ Anchor lesson: ${lesson.title}`);
    }

    console.log("\n📝 Creating template-based lessons...");

    // Insert template lessons
    for (const template of templateLessons) {
      const content = createTemplateLesson(template.title, template.topics, template.difficulty);
      await db.insert(schema.lessons).values({
        ...template,
        content,
        videoUrl: null,
        isPublished: true
      });
      console.log(`✅ Template lesson: ${template.title}`);
    }

    console.log("\n🎉 All lessons seeded successfully!");
    console.log(`   📊 Total: ${anchorLessons.length + templateLessons.length} lessons`);
    console.log(`   ⭐ Anchor lessons: ${anchorLessons.length}`);
    console.log(`   📄 Template lessons: ${templateLessons.length}`);

  } catch (error) {
    console.error("❌ Error seeding lessons:", error);
    throw error;
  }
}

seedAllLessons()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed:", error);
    process.exit(1);
  });
