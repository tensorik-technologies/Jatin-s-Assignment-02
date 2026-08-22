export const authors = {
  'ava-chen': {
    id: 'ava-chen',
    name: 'Ava Chen',
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: 'Frontend engineer and design systems lead. Writes about the craft of building durable interfaces.',
    social: { twitter: 'https://twitter.com', github: 'https://github.com' },
  },
  'marcus-diallo': {
    id: 'marcus-diallo',
    name: 'Marcus Diallo',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Machine learning researcher turned educator. Breaks down complex AI ideas into plain language.',
    social: { twitter: 'https://twitter.com', linkedin: 'https://linkedin.com' },
  },
  'priya-nair': {
    id: 'priya-nair',
    name: 'Priya Nair',
    avatar: 'https://i.pravatar.cc/150?img=32',
    bio: 'Data scientist working on climate models. Believes good charts are good storytelling.',
    social: { github: 'https://github.com' },
  },
  'noah-becker': {
    id: 'noah-becker',
    name: 'Noah Becker',
    avatar: 'https://i.pravatar.cc/150?img=8',
    bio: 'Backend engineer obsessed with distributed systems, coffee, and legible commit messages.',
    social: { github: 'https://github.com', twitter: 'https://twitter.com' },
  },
  'sofia-lindgren': {
    id: 'sofia-lindgren',
    name: 'Sofia Lindgren',
    avatar: 'https://i.pravatar.cc/150?img=45',
    bio: 'Product designer exploring the overlap between typography, motion, and trust.',
    social: { twitter: 'https://twitter.com' },
  },
  'jordan-blake': {
    id: 'jordan-blake',
    name: 'Jordan Blake',
    avatar: 'https://i.pravatar.cc/150?img=15',
    bio: 'Engineering manager writing about careers, mentorship, and the messy middle of tech leadership.',
    social: { linkedin: 'https://linkedin.com' },
  },
}

export const initialBlogs = [
  {
    id: 'blog-1',
    title: 'The Case for Boring Frontend Architecture',
    slug: 'the-case-for-boring-frontend-architecture',
    excerpt:
      'Novelty is expensive. Here is why the most maintainable frontends are the ones nobody brags about at a conference.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80',
    category: 'Web Development',
    author: authors['ava-chen'],
    tags: ['architecture', 'react', 'engineering'],
    publishedAt: '2026-06-02T09:00:00.000Z',
    featured: true,
    likes: 214,
    content: `
      <p>Every few months a new pattern promises to make frontend development delightful again. Most of them are genuinely clever. Almost none of them survive contact with a five-year-old codebase maintained by a rotating cast of engineers who have never met the original author.</p>
      <h2>What "boring" actually means</h2>
      <p>Boring does not mean lazy or outdated. It means <strong>predictable</strong>. A boring architecture is one where a new hire can open the repository, read the folder names, and correctly guess where a piece of logic lives before they've read a single line of documentation.</p>
      <ul>
        <li>Components do one thing and are named after what they render, not how they're implemented.</li>
        <li>State lives as close to where it's used as possible, and no closer.</li>
        <li>Side effects are isolated into a handful of predictable places: hooks, services, and nowhere else.</li>
      </ul>
      <h3>The hidden cost of cleverness</h3>
      <p>Clever code optimizes for the moment it was written. Boring code optimizes for the two years after that, when the person maintaining it is not you.</p>
      <blockquote>Every abstraction you add is a promise you're making to a stranger about how your code behaves.</blockquote>
      <p>That doesn't mean architecture should never evolve. It means each change should earn its complexity. Ask whether the new pattern reduces the number of places a bug can hide, or simply relocates it somewhere more fashionable.</p>
      <h2>A simple litmus test</h2>
      <p>Before introducing a new pattern, I ask three questions: does it reduce the number of files someone needs to open to understand a feature, does it reduce the number of ways to do the same thing, and can I explain it to a junior engineer in under two minutes. If the answer to any of these is no, it usually isn't worth it yet.</p>
      <p>None of this is about being conservative for its own sake. It's about respecting the person who inherits your code, because eventually, that person is you.</p>
    `,
  },
  {
    id: 'blog-2',
    title: 'What Large Language Models Actually Learn',
    slug: 'what-large-language-models-actually-learn',
    excerpt:
      'A plain-language tour through what happens inside a transformer, without the linear algebra hangover.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80',
    category: 'AI & Machine Learning',
    author: authors['marcus-diallo'],
    tags: ['ai', 'machine-learning', 'transformers'],
    publishedAt: '2026-06-10T09:00:00.000Z',
    featured: true,
    likes: 341,
    content: `
      <p>If you've ever tried to explain how a language model works to a curious friend, you know the conversation usually ends in one of two places: an oversimplified "it just predicts the next word" or a wall of matrix multiplication that scares everyone off. There is a middle path.</p>
      <h2>Prediction is the training signal, not the whole story</h2>
      <p>Yes, the model is trained to predict the next token. But predicting text well, across billions of examples, forces the model to build internal representations of grammar, facts, tone, and even rough approximations of reasoning steps. The objective is simple; what it takes to get good at that objective is not.</p>
      <h3>Attention, without the equations</h3>
      <p>Picture a room full of assistants, one per word in a sentence. Each assistant is allowed to glance at every other word and decide how much attention to pay to it before writing down their own updated understanding. Do this many times, in layers, and the model builds a rich, contextual picture of what each word means <em>in this particular sentence</em>, not in isolation.</p>
      <pre><code>tokens -> embeddings -> [attention -> feed-forward] x N -> next-token probabilities</code></pre>
      <h2>What it doesn't learn</h2>
      <ul>
        <li>It does not learn a persistent memory of your conversations unless a system is built around it to store one.</li>
        <li>It does not learn facts the way a database does — it compresses patterns, which is why it can be confidently wrong.</li>
        <li>It does not learn intent. It learns statistical association between intent-shaped text and outcome-shaped text.</li>
      </ul>
      <p>Understanding these boundaries matters more as these systems get folded into everyday tools. The magic isn't that the model "understands" the way we do. The magic is that next-token prediction, at sufficient scale, is a surprisingly good proxy for a lot of what we call understanding.</p>
    `,
  },
  {
    id: 'blog-3',
    title: 'Reading a Chart Like a Skeptic',
    slug: 'reading-a-chart-like-a-skeptic',
    excerpt:
      'Five questions to ask before you trust any chart, including the ones in this very article.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    category: 'Data Science',
    author: authors['priya-nair'],
    tags: ['data', 'visualization', 'statistics'],
    publishedAt: '2026-05-28T09:00:00.000Z',
    featured: true,
    likes: 178,
    content: `
      <p>Charts are persuasive precisely because they look objective. A well-designed chart can make a shaky argument feel like settled fact, and a poorly designed one can bury a genuinely important finding.</p>
      <h2>Five questions worth asking</h2>
      <ol>
        <li><strong>Where does the y-axis start?</strong> A truncated axis can turn a 2% change into something that looks like a cliff.</li>
        <li><strong>What's not on the chart?</strong> Missing categories, missing time ranges, and missing error bars all shape the story as much as what's included.</li>
        <li><strong>Is this correlation or causation?</strong> The chart itself usually can't tell you, only the methodology behind it can.</li>
        <li><strong>Who benefits from this framing?</strong> Not a reason to dismiss the data, but worth noting.</li>
        <li><strong>Would the story change with a different chart type?</strong> Try mentally redrawing a bar chart as a line, or a pie as a table.</li>
      </ol>
      <h3>A quick example</h3>
      <p>Two charts can show the exact same dataset and lead to opposite conclusions, depending on bucket size, color scale, or sort order. None of these choices are neutral, and none of them are inherently dishonest either — but they are choices, made by a person, for a reason.</p>
      <blockquote>The most dangerous charts aren't the ones that lie. They're the ones that are technically true and quietly misleading.</blockquote>
      <p>Being skeptical doesn't mean distrusting all data. It means treating every chart as an argument, and asking to see the evidence behind it before you repeat its conclusion.</p>
    `,
  },
  {
    id: 'blog-4',
    title: 'Idempotency Is the Feature You Forgot to Build',
    slug: 'idempotency-is-the-feature-you-forgot-to-build',
    excerpt:
      'Networks fail, retries happen, and duplicate requests are inevitable. Design for them from day one.',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&q=80',
    category: 'Programming',
    author: authors['noah-becker'],
    tags: ['backend', 'distributed-systems', 'reliability'],
    publishedAt: '2026-06-15T09:00:00.000Z',
    featured: false,
    likes: 156,
    content: `
      <p>Somewhere in your system, a client is going to send the same request twice. Maybe the user double-clicked a button. Maybe a mobile network dropped a response after the server had already processed the request. Either way, your API needs an opinion about what happens next.</p>
      <h2>The problem in one sentence</h2>
      <p>If "create order" runs twice, does the customer get charged twice?</p>
      <h3>A simple pattern: idempotency keys</h3>
      <p>The client generates a unique key per logical operation and sends it with the request. The server stores the result keyed by that identifier, and any repeat request with the same key returns the original result instead of re-executing the operation.</p>
      <pre><code>POST /orders
Idempotency-Key: 7f3d-91ab-44c2

if (seen(key)) return cachedResponse(key)
result = createOrder(payload)
store(key, result)
return result</code></pre>
      <ul>
        <li>Keys should be scoped per client and per operation, not global.</li>
        <li>Store enough of the response to replay it exactly, not just a success flag.</li>
        <li>Expire keys after a reasonable window rather than keeping them forever.</li>
      </ul>
      <p>This one pattern quietly prevents an entire category of production incidents: duplicate emails, duplicate charges, duplicate inventory deductions. It's not glamorous work, but it's the kind of reliability that customers notice only when it's missing.</p>
    `,
  },
  {
    id: 'blog-5',
    title: 'Designing Empty States That Don\'t Feel Empty',
    slug: 'designing-empty-states-that-dont-feel-empty',
    excerpt:
      'An empty screen is not a dead end. It is the first thing a new user actually reads carefully.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80',
    category: 'Design',
    author: authors['sofia-lindgren'],
    tags: ['ux', 'product-design', 'onboarding'],
    publishedAt: '2026-06-05T09:00:00.000Z',
    featured: false,
    likes: 132,
    content: `
      <p>Most interface states get generous design attention: the loading spinner, the success toast, the confirmation modal. The empty state is usually an afterthought, a gray box with the word "Nothing here yet" and maybe an icon someone found in a shared library.</p>
      <h2>Why it matters more than it looks</h2>
      <p>An empty state is often the very first real content a new user sees, before they've added any of their own data. It's not a dead end, it's an invitation. Treat it like onboarding copy, not like an error message.</p>
      <h3>Three things every empty state should do</h3>
      <ul>
        <li>Explain what would normally appear here, in plain language.</li>
        <li>Give exactly one clear next action, not three competing buttons.</li>
        <li>Match the tone of the product, not a generic placeholder voice.</li>
      </ul>
      <blockquote>An empty screen is a blank page, not a dead page. Give it something to say.</blockquote>
      <p>Small details compound. A search page that says "No articles found — try changing your search or category filter" respects the user's time far more than one that just says "No results." The difference costs a designer ten minutes and saves a user real frustration.</p>
    `,
  },
  {
    id: 'blog-6',
    title: 'The Ten-Minute Career Conversation Managers Skip',
    slug: 'the-ten-minute-career-conversation-managers-skip',
    excerpt:
      'Performance reviews are not career conversations. Here is the question that actually moves things forward.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80',
    category: 'Career',
    author: authors['jordan-blake'],
    tags: ['management', 'career-growth', 'mentorship'],
    publishedAt: '2026-05-20T09:00:00.000Z',
    featured: false,
    likes: 201,
    content: `
      <p>Most performance review templates ask about goals, ratings, and competencies. Almost none of them ask the one question that actually predicts whether someone stays engaged for the next year: "What kind of work makes you lose track of time?"</p>
      <h2>Ratings measure the past. This question points forward.</h2>
      <p>A rating tells someone how last quarter went. It rarely tells them what to do differently, and it almost never captures the difference between work someone tolerates and work that genuinely energizes them.</p>
      <h3>How to actually run the conversation</h3>
      <ol>
        <li>Ask the question directly, and then stay quiet. Most people need a moment to answer honestly.</li>
        <li>Follow up with "what would need to be true for you to do more of that?" instead of promising anything on the spot.</li>
        <li>Write it down, and revisit it in three months, not twelve.</li>
      </ol>
      <p>This isn't a replacement for structured feedback. It's a complement to it. Ratings tell someone where they stand. This question tells them where they might want to go, and that's the conversation people actually remember.</p>
    `,
  },
  {
    id: 'blog-7',
    title: 'CSS Grid Is Not Just for Grids',
    slug: 'css-grid-is-not-just-for-grids',
    excerpt:
      'The most underused layout tool on the web can replace a surprising number of your flexbox hacks.',
    image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=1200&q=80',
    category: 'Web Development',
    author: authors['ava-chen'],
    tags: ['css', 'layout', 'frontend'],
    publishedAt: '2026-06-18T09:00:00.000Z',
    featured: false,
    likes: 167,
    content: `
      <p>CSS Grid arrived with a naming problem. Its name promises rows and columns of uniform cells, so most people reach for it only when they're literally building a grid, and use flexbox for everything else. That's leaving a lot on the table.</p>
      <h2>Overlapping elements without absolute positioning</h2>
      <p>Grid lets you place multiple children in the same cell using <code>grid-area</code>, which means image captions, badge overlays, and layered hero text no longer require <code>position: absolute</code> and its usual stacking-context headaches.</p>
      <pre><code>.hero {
  display: grid;
}
.hero > * {
  grid-area: 1 / 1;
}</code></pre>
      <h3>Named lines make responsive code readable</h3>
      <p>Instead of memorizing column numbers, you can name grid lines and reference them directly, which makes a responsive redesign a matter of renaming a template rather than recalculating offsets.</p>
      <ul>
        <li>Use <code>subgrid</code> when nested components need to align to a parent's tracks.</li>
        <li>Use <code>minmax()</code> instead of fixed breakpoints for naturally responsive columns.</li>
        <li>Reach for flexbox for one-dimensional content like a toolbar; reach for grid the moment two dimensions matter.</li>
      </ul>
      <p>None of this makes flexbox obsolete. It just means grid deserves a seat at the table for far more layouts than "things that look like a spreadsheet."</p>
    `,
  },
  {
    id: 'blog-8',
    title: 'Fine-Tuning vs. Prompting: A Practical Decision Guide',
    slug: 'fine-tuning-vs-prompting-a-practical-decision-guide',
    excerpt:
      'Before you spend a week fine-tuning a model, ask whether a better prompt would have gotten you there in an afternoon.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80',
    category: 'AI & Machine Learning',
    author: authors['marcus-diallo'],
    tags: ['ai', 'llm', 'engineering'],
    publishedAt: '2026-06-08T09:00:00.000Z',
    featured: false,
    likes: 289,
    content: `
      <p>Fine-tuning feels like the "serious" option, so teams often reach for it before they've exhausted what a well-structured prompt can do. That ordering is usually backwards.</p>
      <h2>Start by asking what's actually failing</h2>
      <ul>
        <li>If the model doesn't know a fact, no amount of prompting or fine-tuning will reliably fix that — you need retrieval.</li>
        <li>If the model knows the answer but phrases it wrong, that's a prompting and examples problem.</li>
        <li>If the model needs to reliably follow a narrow, repeatable format across thousands of calls, that's where fine-tuning starts to pay for itself.</li>
      </ul>
      <h3>A rough rule of thumb</h3>
      <p>Prompting is cheap to iterate on and easy to reason about. Fine-tuning is expensive to iterate on, but can compress instructions that would otherwise eat your context window into the model's weights.</p>
      <blockquote>Fine-tune for consistency, not for knowledge.</blockquote>
      <p>In practice, most products get remarkably far with careful prompting, a few well-chosen examples, and a retrieval layer for facts. Save fine-tuning for the narrow set of cases where you've proven, with real data, that prompting alone plateaus.</p>
    `,
  },
  {
    id: 'blog-9',
    title: 'A Data Scientist\'s Guide to Saying "I Don\'t Know Yet"',
    slug: 'a-data-scientists-guide-to-saying-i-dont-know-yet',
    excerpt:
      'Uncertainty is not a weakness in an analysis. Presenting it clearly is a sign the analysis is trustworthy.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    category: 'Data Science',
    author: authors['priya-nair'],
    tags: ['data-science', 'statistics', 'communication'],
    publishedAt: '2026-05-30T09:00:00.000Z',
    featured: false,
    likes: 145,
    content: `
      <p>Stakeholders often ask for a single number: will this campaign work, how many users will churn, what's the forecast for next quarter. Giving them a single number without a confidence range isn't more helpful, it's just more confident-sounding.</p>
      <h2>Confidence intervals are a communication tool, not just a statistical one</h2>
      <p>"We expect between 8,000 and 12,000 signups, with 10,000 as our best estimate" gives a decision-maker something to actually plan around. "We expect 10,000 signups" gives them a number to be disappointed by.</p>
      <h3>Practical ways to show uncertainty without overwhelming people</h3>
      <ul>
        <li>Use ranges in headlines, not just in footnotes.</li>
        <li>Show a small number of scenarios instead of a dense probability distribution.</li>
        <li>Say explicitly what would change the estimate, not just what the estimate is.</li>
      </ul>
      <p>Saying "I don't know yet, but here's the range and here's what would narrow it" is a more useful sentence than any single confident-sounding number. It builds trust precisely because it's honest about the limits of the data.</p>
    `,
  },
  {
    id: 'blog-10',
    title: 'The Two-Minute Rule That Fixed My Backlog',
    slug: 'the-two-minute-rule-that-fixed-my-backlog',
    excerpt:
      'A tiny habit change that turned an unmanageable task list into something I actually trust again.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80',
    category: 'Productivity',
    author: authors['jordan-blake'],
    tags: ['productivity', 'habits', 'workflow'],
    publishedAt: '2026-06-12T09:00:00.000Z',
    featured: false,
    likes: 198,
    content: `
      <p>My task list used to be a graveyard. Things went in, almost nothing came out, and every week I'd scroll past the same fifteen items feeling slightly worse about myself.</p>
      <h2>The rule</h2>
      <p>If a task takes less than two minutes, do it immediately instead of writing it down. Everything else gets a home: a project, a specific day, or a "someday" list that gets reviewed weekly, not daily.</p>
      <h3>Why this actually worked, when other systems didn't</h3>
      <ul>
        <li>It removed the friction of deciding whether something was "worth" tracking.</li>
        <li>It shrank the backlog fast enough that reviewing it stopped feeling like punishment.</li>
        <li>It forced me to be honest about which tasks I was avoiding versus which ones just didn't matter.</li>
      </ul>
      <blockquote>A task list you're afraid to open isn't a system. It's a source of guilt with extra steps.</blockquote>
      <p>The two-minute rule isn't magic on its own. It's just small enough to actually stick, and sticking with something imperfect beats abandoning something elaborate every time.</p>
    `,
  },
  {
    id: 'blog-11',
    title: 'Type Systems Are Documentation That Can\'t Lie',
    slug: 'type-systems-are-documentation-that-cant-lie',
    excerpt:
      'Comments go stale. Types get checked on every build. That difference matters more than it sounds.',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200&q=80',
    category: 'Programming',
    author: authors['noah-becker'],
    tags: ['typescript', 'engineering', 'best-practices'],
    publishedAt: '2026-06-01T09:00:00.000Z',
    featured: false,
    likes: 176,
    content: `
      <p>A comment says what the author believed to be true at the moment they wrote it. A type is checked, mechanically, every single time the code compiles. One of these degrades over time. The other doesn't.</p>
      <h2>Types as a conversation with your future self</h2>
      <p>Reading a well-typed function signature should tell you almost everything you need to know before reading the implementation: what shape of data goes in, what shape comes out, and which cases are explicitly not handled.</p>
      <pre><code>function getUser(id: string): Promise&lt;User | null&gt;</code></pre>
      <p>That single line tells you the call is async, that a missing user is an expected outcome rather than an exception, and exactly what fields you can rely on afterward.</p>
      <h3>Where types stop being helpful</h3>
      <ul>
        <li>Over-engineered generic types that require a PhD to read are worse than no types at all.</li>
        <li>Typing implementation details that callers never see adds noise without adding safety.</li>
        <li><code>any</code> sprinkled everywhere is just a comment that pretends to be a promise.</li>
      </ul>
      <p>Good typing isn't about maximal strictness. It's about making the contract of your code visible to the next person, without them needing to trust your memory of how it works.</p>
    `,
  },
  {
    id: 'blog-12',
    title: 'What Makes a Portfolio Project Actually Stand Out',
    slug: 'what-makes-a-portfolio-project-actually-stand-out',
    excerpt:
      'Hiring managers see the same to-do app forty times a week. Here is what actually gets remembered.',
    image: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=1200&q=80',
    category: 'Career',
    author: authors['sofia-lindgren'],
    tags: ['career', 'portfolio', 'job-search'],
    publishedAt: '2026-06-20T09:00:00.000Z',
    featured: false,
    likes: 223,
    content: `
      <p>Nobody remembers your fourth to-do app. It's not that the project is badly built, it's that it doesn't tell a reviewer anything about how you think.</p>
      <h2>Show the decision, not just the result</h2>
      <p>A short paragraph next to your project that explains a real trade-off you made, and why, is worth more than another polished screenshot. "I chose optimistic UI updates here because the API's latency made the alternative feel sluggish" tells a reviewer more in one sentence than the entire rest of your README.</p>
      <h3>Three things worth including</h3>
      <ul>
        <li>One deliberate constraint you set for yourself, and why.</li>
        <li>One thing you'd do differently if you rebuilt it today.</li>
        <li>A note on what was genuinely hard, not just what was completed.</li>
      </ul>
      <blockquote>A portfolio project is a conversation starter, not a finished product review.</blockquote>
      <p>Reviewers aren't grading whether your app is production-ready. They're trying to guess what it would be like to work with you. Give them evidence of judgment, not just evidence of output.</p>
    `,
  },
]
