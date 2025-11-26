import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "../drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

async function seedLessons() {
  console.log("📚 Seeding comprehensive lesson content...");

  try {
    // BEGINNER PATH - Lessons 3-15
    const beginnerLessons = [
      // Lesson 3
      {
        pathId: 1,
        title: "Overcoming Approach Anxiety",
        slug: "overcoming-approach-anxiety",
        description: "Master the art of approaching with confidence by understanding and conquering your fears",
        content: `# Overcoming Approach Anxiety

## Learning Objectives
- Understand the biological basis of approach anxiety
- Learn progressive exposure techniques
- Master the 3-second rule
- Reframe rejection as feedback

## Core Concepts

### Understanding Fear Responses

Approach anxiety is a natural biological response. Your brain perceives social rejection as a threat to survival, triggering the fight-or-flight response. Understanding this helps you recognize that the fear is normal and manageable.

**Key Insight:** The fear you feel before approaching is worse than any actual rejection you'll experience.

### The 3-Second Rule

When you see someone you want to approach, you have 3 seconds to take action before your logical brain starts creating excuses. This rule forces you to act on instinct before overthinking.

**How it works:**
1. Spot someone interesting
2. Count "3, 2, 1"
3. Move toward them immediately
4. Open with anything (even "Hi")

### Progressive Exposure

Like exposure therapy for phobias, you gradually increase the difficulty of your approaches:

**Level 1:** Ask strangers for the time or directions
**Level 2:** Give genuine compliments to people (no agenda)
**Level 3:** Start brief conversations with service workers
**Level 4:** Approach in low-pressure environments (bookstores, coffee shops)
**Level 5:** Approach in higher-pressure environments (bars, clubs)

### Reframing Rejection

Rejection isn't personal—it's situational. She might have a boyfriend, be having a bad day, or simply not be in the mood to talk. None of this reflects on your value.

**Powerful reframe:** Every "no" brings you closer to a "yes." Professional salespeople celebrate rejections because they know it's a numbers game.

## Practical Examples

### Example 1: The Coffee Shop Approach
*Situation:* You see an attractive woman reading at a coffee shop.

**Anxious thought:** "She's busy, I'll bother her."

**Reframe:** "She's in public, which means she's open to social interaction. Worst case, she politely declines and I've practiced."

**Action:** Use the 3-second rule. Walk over immediately: "Hey, I know this is random, but I saw you reading and had to come say hi. I'm [name]."

### Example 2: The Street Approach
*Situation:* You pass an attractive woman on the street.

**Anxious thought:** "I'll look creepy if I stop her."

**Reframe:** "Confident, direct interest is attractive. I'm giving her a compliment and a chance to meet someone interesting."

**Action:** "Excuse me, I know this is forward, but I thought you were really cute and I'd regret it if I didn't say hi. I'm [name]."

## Exercises

### Exercise 1: Desensitization Challenge (Week 1)
- Day 1-2: Ask 5 strangers for the time
- Day 3-4: Ask 5 strangers for directions
- Day 5-6: Give 5 genuine compliments (to anyone)
- Day 7: Approach 3 people and start brief conversations

### Exercise 2: The 3-Second Rule Practice
Set a goal to use the 3-second rule 10 times this week. It doesn't matter if the approaches go well—the goal is to train your brain to act quickly.

### Exercise 3: Rejection Reframe Journal
After each approach (successful or not), write:
1. What happened
2. Your initial emotional response
3. A positive reframe of the situation
4. What you learned

## Common Mistakes

1. **Waiting for the "perfect moment"** - There is no perfect moment. The 3-second rule exists because waiting makes it worse.

2. **Taking rejection personally** - She doesn't know you. Her response is about her situation, not your value.

3. **Approaching with an agenda** - Focus on the process (approaching) not the outcome (getting her number). This reduces pressure.

4. **Negative self-talk** - "I'm not good enough" becomes a self-fulfilling prophecy. Replace it with "I'm learning and improving."

5. **Comparing yourself to others** - Your journey is unique. Focus on being better than you were yesterday.

## Key Takeaways

- Approach anxiety is biological and normal—everyone experiences it
- The 3-second rule prevents overthinking and builds momentum
- Progressive exposure gradually builds confidence
- Rejection is feedback, not a reflection of your worth
- Action cures fear—the more you approach, the easier it becomes

## Field Assignment

**This Week's Challenge:** Complete 10 approaches using the 3-second rule. Track each one in your field report:
- Where/when it happened
- What you said
- Her response
- How you felt before vs after
- One thing you learned

Remember: The goal is to approach, not to "succeed." Every approach is a win.`,
        order: 3,
        duration: 25,
        difficulty: "beginner",
        videoUrl: null,
        isPublished: true
      },
      
      // Lesson 4
      {
        pathId: 1,
        title: "Building Authentic Confidence",
        slug: "building-authentic-confidence",
        description: "Develop genuine self-confidence through inner game work and self-validation",
        content: `# Building Authentic Confidence

## Learning Objectives
- Understand the difference between inner and outer game
- Develop outcome independence
- Cultivate an abundance mentality
- Master self-validation techniques

## Core Concepts

### Inner Game vs Outer Game

**Outer Game:** The techniques, tactics, and behaviors you use (openers, routines, body language)

**Inner Game:** Your internal mindset, beliefs, and emotional state (confidence, self-worth, abundance)

**The Truth:** Outer game gets you in the door. Inner game keeps you there and makes everything else work naturally.

### Outcome Independence

Outcome independence means you're not attached to specific results. You approach because you want to, not because you need validation or a specific outcome.

**With outcome dependence:**
- You need her to like you to feel good
- Rejection devastates you
- You come across as needy
- You change yourself to please her

**With outcome independence:**
- You're curious about the interaction
- Rejection doesn't affect your mood
- You're naturally attractive because you're not needy
- You remain authentic

### Abundance Mentality

Scarcity thinking: "She's the only one. I can't mess this up."
Abundance thinking: "There are amazing women everywhere. This is just one opportunity."

**Abundance mentality creates:**
- Relaxed, confident energy
- Less pressure on each interaction
- Natural outcome independence
- Attractive "take it or leave it" vibe

### Self-Validation

External validation: Needing others' approval to feel good about yourself
Self-validation: Your self-worth comes from within

**Self-validation practices:**
- Acknowledge your own progress
- Celebrate small wins
- Define your own standards
- Stop seeking approval

## Practical Examples

### Example 1: The Job Interview Mindset
Imagine going into a job interview thinking "I NEED this job or I'm worthless" vs "I'm interviewing them as much as they're interviewing me."

The second mindset makes you more attractive because you're not desperate. The same applies to dating.

### Example 2: Abundance in Action
**Scarcity:** You meet an amazing woman. You text her constantly, always available, change your plans for her. She loses interest.

**Abundance:** You meet an amazing woman. You're genuinely interested but maintain your life, friends, and purpose. She's intrigued and pursues you.

### Example 3: Self-Validation Practice
After an approach that "failed":

**External validation seeking:** "She rejected me, so I must not be good enough."

**Self-validation:** "I approached confidently and authentically. That took courage. I'm proud of myself for taking action."

## Exercises

### Exercise 1: The Abundance Journal
Every day for 2 weeks, write down 3 positive interactions with women (any women—barista, coworker, stranger). This trains your brain to see opportunities everywhere.

### Exercise 2: Outcome Independence Practice
Go out with the goal of having 5 conversations with no agenda. Don't try to get numbers or dates. Just enjoy the interactions. Notice how this changes your energy.

### Exercise 3: Self-Validation Ritual
Every night, write down:
1. One thing you're proud of today
2. One way you showed courage
3. One thing you're grateful for about yourself

### Exercise 4: The Rejection Challenge
Actively seek out 5 rejections this week. Ask for things you think people will say no to (discounts, favors, etc.). This desensitizes you to "no" and often leads to surprising "yes" responses.

## Common Mistakes

1. **Faking confidence** - True confidence comes from self-acceptance, not pretending to be someone you're not.

2. **Confusing arrogance with confidence** - Confidence is quiet self-assurance. Arrogance is loud insecurity.

3. **Seeking validation through success** - If you only feel confident after successful approaches, you're still externally validated.

4. **Ignoring inner game** - No amount of techniques will compensate for deep insecurity.

5. **Comparing your beginning to others' middle** - Everyone starts somewhere. Focus on your own growth.

## Key Takeaways

- Inner game is the foundation of all attraction
- Outcome independence makes you naturally attractive
- Abundance mentality reduces pressure and neediness
- Self-validation is the ultimate form of confidence
- Confidence is built through action and self-acceptance

## Field Assignment

**This Week's Challenge:** 

1. **Abundance Exercise:** Smile and make eye contact with 20 women this week (no approaching required). Notice how many smile back. This proves abundance.

2. **Outcome Independence:** Have 3 conversations where you intentionally don't try to get a number, even if it's going well. Practice enjoying the interaction for its own sake.

3. **Self-Validation:** Start your daily journal using Exercise 3's format.

**Reflection Question:** What would change about your approach if you truly believed you were enough exactly as you are?`,
        order: 4,
        duration: 30,
        difficulty: "beginner",
        videoUrl: null,
        isPublished: true
      },

      // Lesson 5
      {
        pathId: 1,
        title: "Social Calibration Basics",
        slug: "social-calibration-basics",
        description: "Learn to read social situations and adjust your approach accordingly",
        content: `# Social Calibration Basics

## Learning Objectives
- Develop the ability to "read the room"
- Learn to match and adjust energy levels
- Recognize social hierarchies and dynamics
- Know when to engage vs observe

## Core Concepts

### What is Social Calibration?

Social calibration is the ability to read social cues and adjust your behavior to match the situation. It's the difference between being "that guy" who kills the vibe and being someone everyone wants around.

**Calibrated behavior:**
- Matches the energy of the environment
- Respects social dynamics
- Reads and responds to feedback
- Knows when to escalate or de-escalate

**Uncalibrated behavior:**
- Ignores social cues
- Pushes when she's pulling back
- Misreads the situation
- Creepy or try-hard energy

### Reading the Room

Before approaching or engaging, assess:

**Physical Environment:**
- Noise level (loud club vs quiet café)
- Crowding (packed vs spacious)
- Lighting (bright vs dim)
- Time of day/night

**Social Environment:**
- Group dynamics (who's with whom)
- Energy level (high-energy party vs relaxed gathering)
- Social proof (who's the center of attention)
- Obstacles (protective friends, boyfriends)

**Her State:**
- Open body language vs closed
- Making eye contact vs avoiding
- Engaged in conversation vs available
- Mood (happy, stressed, neutral)

### Energy Matching

Start by matching her energy level, then gradually lead it where you want it to go.

**If she's high-energy:** Match it with enthusiasm, then gradually bring it down to create intimacy

**If she's low-energy:** Start calm and conversational, then gradually bring it up to create excitement

**If she's neutral:** You set the tone—bring positive, confident energy

### Social Hierarchies

Every social setting has a hierarchy. Recognizing it helps you navigate effectively.

**High-value positions:**
- Center of attention
- Making others laugh
- Comfortable and relaxed
- Others seek their approval

**Lower-value positions:**
- Trying too hard
- Seeking approval
- Uncomfortable or awkward
- Ignored by the group

**Your goal:** Enter as a peer to high-value people, not as someone seeking approval.

## Practical Examples

### Example 1: The Quiet Bookstore
**Situation:** She's reading alone in a bookstore.

**Calibrated approach:**
- Speak softly (match environment)
- Use an indirect opener ("What are you reading?")
- Respect her space initially
- Watch for IOIs before sitting down

**Uncalibrated approach:**
- Loud, high-energy approach
- Immediately sit down uninvited
- Interrupt her reading aggressively
- Miss her "please leave" signals

### Example 2: The Loud Nightclub
**Situation:** She's dancing with friends in a packed club.

**Calibrated approach:**
- High energy, confident body language
- Non-verbal communication (eye contact, smile)
- Engage the whole group first
- Physical touch is expected (hand on shoulder to get attention)

**Uncalibrated approach:**
- Try to have a deep conversation (can't hear)
- Ignore her friends (they'll pull her away)
- Hover awkwardly without engaging
- Touch inappropriately without rapport

### Example 3: The Coffee Shop with Friends
**Situation:** She's having coffee with 2 female friends.

**Calibrated approach:**
- Acknowledge the whole group
- Win over the friends first
- Use time constraint ("I can only stay a minute")
- Get her number and leave (don't overstay)

**Uncalibrated approach:**
- Ignore her friends completely
- Try to isolate her immediately
- Overstay your welcome
- Make friends feel like obstacles

## Exercises

### Exercise 1: People-Watching Practice
Spend 30 minutes in 3 different venues this week (café, bar, park). For each:
- Identify the social hierarchy (who's high-value?)
- Note the energy level (1-10 scale)
- Observe group dynamics
- Identify who's approachable and why

### Exercise 2: Energy Matching Drill
Have 5 conversations this week where you consciously:
1. Start by matching their energy
2. Gradually lead it higher or lower
3. Notice if they follow your lead
4. Adjust if they don't

### Exercise 3: Calibration Feedback Loop
After each interaction, ask yourself:
- Did I match the environment's energy?
- Did I read her signals correctly?
- Did I adjust when I got feedback?
- What would I do differently?

## Common Mistakes

1. **One-size-fits-all approach** - What works in a club doesn't work in a library. Adjust your strategy.

2. **Ignoring feedback** - If she's giving IODs (indicators of disinterest), recalibrate or eject gracefully.

3. **Being too timid** - Calibration doesn't mean being passive. Sometimes the situation calls for bold action.

4. **Trying too hard** - Forcing humor, energy, or conversation when it's not landing. Read the room and adjust.

5. **Missing obvious signals** - She's looking at her phone, giving one-word answers, body turned away—these are clear IODs.

## Key Takeaways

- Social calibration is the ability to read and adjust to social situations
- Always assess the environment before engaging
- Match her energy first, then lead it where you want
- Recognize social hierarchies and position yourself accordingly
- Feedback is constant—pay attention and adjust

## Field Assignment

**This Week's Challenge:**

1. **Venue Assessment:** Visit 3 different types of venues (day venue, bar, social event). For each, write down:
   - Overall energy level
   - Social dynamics you observed
   - Best approach strategy for that environment

2. **Calibration Practice:** Have 5 approaches where you focus solely on calibration:
   - Match her energy initially
   - Watch for IOIs/IODs
   - Adjust your approach based on feedback
   - Note what worked and what didn't

3. **Feedback Awareness:** In every interaction, consciously look for 3 pieces of feedback (body language, tone, words) and adjust accordingly.

**Reflection Question:** Think of a time you were uncalibrated. What feedback did you miss? How would you handle it differently now?`,
        order: 5,
        duration: 25,
        difficulty: "beginner",
        videoUrl: null,
        isPublished: true
      }
    ];

    console.log("Inserting beginner lessons 3-5...");
    for (const lesson of beginnerLessons) {
      await db.insert(schema.lessons).values(lesson);
    }

    console.log("✅ Beginner path lessons 3-5 seeded successfully!");
    console.log("📝 Note: This is a sample of the comprehensive curriculum.");
    console.log("    Full implementation would include all 45 lessons.");

  } catch (error) {
    console.error("❌ Error seeding lessons:", error);
    throw error;
  }
}

seedLessons()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed:", error);
    process.exit(1);
  });
