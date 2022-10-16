import { test, expect } from '@playwright/test';
const wait = (timeoutMS: number) => new Promise((res) => setTimeout(res, timeoutMS));

test('Fill Items', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  await page.locator('details:has-text("Message from Sergent Major")').getByPlaceholder('Your message...').click();

  await page
    .locator('details:has-text("Message from Sergent Major")')
    .getByPlaceholder('Your message...')
    .fill('hello');
  await page
    .locator('details:has-text("Message from Sergent Major")')
    .getByRole('button', { name: 'send message' })
    .click({
      clickCount: 1,
    });

  const countHello = await page.getByText('hello').count();
  expect(countHello).toEqual(1);

  await page.goto('http://localhost:8080/');

  await page
    .locator('details:has-text("Message from Sergent Major")')
    .getByPlaceholder('Your message...')
    .fill('hi again');

  await page
    .locator('details:has-text("Message from Sergent Major")')
    .getByRole('button', { name: 'send message' })
    .click({
      clickCount: 5,
    });
  const countHi = await page.getByText('hi again').count();
  expect(countHi).toEqual(5);
});

test('Reload Items', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  await page.locator('details:has-text("Message from Sergent Major")').getByPlaceholder('Your message...').click();

  await page
    .locator('details:has-text("Message from Sergent Major")')
    .getByPlaceholder('Your message...')
    .fill('hello');
  await page
    .locator('details:has-text("Message from Sergent Major")')
    .getByRole('button', { name: 'send message' })
    .click({
      clickCount: 20,
    });

  const countHello = await page.getByText('hello').count();
  expect(countHello).toEqual(20);

  await page.goto('http://localhost:8080/');

  const countHelloAgain = await page.getByText('hello').count();
  expect(countHelloAgain).toBeLessThanOrEqual(10);
});

test('Remove Items', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  await page.locator('details:has-text("Message from Sergent Major")').getByPlaceholder('Your message...').click();

  await page
    .locator('details:has-text("Message from Sergent Major")')
    .getByPlaceholder('Your message...')
    .fill('hello');
  await page
    .locator('details:has-text("Message from Sergent Major")')
    .getByRole('button', { name: 'send message' })
    .click({
      clickCount: 20,
    });

  await page.getByRole('button', { name: 'Erase all messages' }).click();
  const el = page.locator('#chatbox-00-AB-98-HD');
  const textList = await el.allInnerTexts();

  expect(textList.length).toBeLessThanOrEqual(10);
});
