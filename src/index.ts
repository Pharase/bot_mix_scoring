import { chromium } from 'playwright';
import { clickAt } from './canvas/click.ts';
import { detectCurrentQuestion } from './canvas/detectQuestion.ts';
import { waitCanvasStable } from './canvas/waitCanvasStable.ts';

const ANSWERS = ['L','L','L','R','L','R'] as const;

const POS = {
  L: { x: 400, y: 600 },
  R: { x: 900, y: 600 },
  NEXT: { x: 700, y: 685 }
};

const templates = [
  'templates/q1.png',
  'templates/q2.png',
  'templates/q3.png',
  'templates/q4.png',
  'templates/q5.png',
  'templates/q6.png'
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://wordwall.net/play/103557/492/139');
  await page.getByRole('textbox', { name: 'Name...' }).fill('ฉันจะทำงานวันละ 8 นาที');
  await page.getByRole('button', { name: 'Start' }).click();

  await page.waitForSelector('canvas');

  // initial click
  await clickAt(page, 630, 411);

  let currentQ = await detectCurrentQuestion(page, templates);
  const times: number[] = [];

  while (currentQ !== null && currentQ < ANSWERS.length) {
    const answer = ANSWERS[currentQ];
    const pos = POS[answer];

    console.log(`\n▶ Q${currentQ + 1} answering: ${answer}`);

    const start = performance.now();

    // 1. answer
    await clickAt(page, pos.x, pos.y);

    // 2. wait animation / state
    await waitCanvasStable(page);

    // 3. next
    await clickAt(page, POS.NEXT.x, POS.NEXT.y);

    // 4. detect next question
    const nextQ = await detectCurrentQuestion(page, templates);

    const end = performance.now();
    const duration = Math.round(end - start);
    times.push(duration);

    console.log(`⏱ Q${currentQ + 1} time: ${duration} ms`);

    currentQ = nextQ;
  }

  // summary
  const total = times.reduce((a, b) => a + b, 0);
  const avg = Math.round(total / times.length);

  console.log('\n✅ All questions answered');
  console.log('----------------------------');
  times.forEach((t, i) =>
    console.log(`Q${i + 1}: ${t} ms`)
  );
  console.log('----------------------------');
  console.log(`Total time: ${total} ms`);
  console.log(`Average per question: ${avg} ms`);

  await page.pause();
})();