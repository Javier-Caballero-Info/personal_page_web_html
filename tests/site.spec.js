// @ts-check
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const SOCIAL_LINKS = {
  GitHub: 'https://github.com/jayc13',
  LinkedIn: 'https://www.linkedin.com/in/caballerojavier13/',
  Medium: 'https://medium.com/@caballerojavier',
};

test.describe('home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has the expected title and metadata', async ({ page }) => {
    await expect(page).toHaveTitle('Javier Caballero · Software Developer in Test');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Software Developer in Test/);
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', /width=device-width/);
  });

  test('shows the name, role and lead', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Javier Caballero');
    await expect(page.locator('.role')).toHaveText('Software Developer in Test');
    await expect(page.locator('.lead')).toContainText('build quality into the way software gets made');
  });

  test('lists the three working principles', async ({ page }) => {
    const section = page.getByRole('region', { name: 'How I work' });
    await expect(section).toBeVisible();
    await expect(section.locator('dt')).toHaveText(['Quality by design', 'Traceability', 'Steady improvement']);
    await expect(section.locator('dd')).toHaveCount(3);
  });

  test('loads the profile picture', async ({ page }) => {
    const avatar = page.getByRole('img', { name: 'Portrait of Javier Caballero' });
    await expect(avatar).toBeVisible();
    const naturalWidth = await avatar.evaluate((img) => /** @type {HTMLImageElement} */ (img).naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test('links to the social profiles in a new tab', async ({ page }) => {
    const links = page.locator('.links a');
    await expect(links).toHaveCount(Object.keys(SOCIAL_LINKS).length);

    for (const [name, href] of Object.entries(SOCIAL_LINKS)) {
      const link = page.getByRole('link', { name });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', href);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /\bnoopener\b/);
      await expect(link).toHaveAttribute('rel', /\bme\b/);
    }
  });

  test('has no horizontal scroll', async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('has no console errors or failed requests', async ({ page }) => {
    const problems = [];
    page.on('console', (msg) => msg.type() === 'error' && problems.push(msg.text()));
    page.on('pageerror', (err) => problems.push(err.message));
    page.on('response', (res) => res.status() >= 400 && problems.push(`${res.status()} ${res.url()}`));
    await page.reload({ waitUntil: 'networkidle' });
    expect(problems).toEqual([]);
  });

  // Reduced motion skips the fade-in, so axe measures the final colors.
  test('has no detectable accessibility violations', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('has no accessibility violations in dark mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe('social links', () => {
  test.beforeEach(async ({ context }) => {
    // Stub the external sites so the tests do not depend on them being
    // reachable or on what they serve (LinkedIn, for one, redirects to a login).
    await context.route(/^https:\/\/(github\.com|www\.linkedin\.com|medium\.com)\//, (route) =>
      route.fulfill({ contentType: 'text/html', body: '<!DOCTYPE html><title>External site</title>' }),
    );
  });

  for (const [name, href] of Object.entries(SOCIAL_LINKS)) {
    test(`${name} opens in a new tab`, async ({ page, context }) => {
      await page.goto('/');
      const homeUrl = page.url();

      const [newTab] = await Promise.all([
        context.waitForEvent('page'),
        page.getByRole('link', { name }).click(),
      ]);
      await newTab.waitForLoadState();

      expect(newTab).not.toBe(page);
      expect(context.pages()).toHaveLength(2);
      await expect(newTab).toHaveURL(href);
      await expect(newTab).toHaveTitle('External site');
      // rel="noopener" keeps the new site from controlling this page.
      expect(await newTab.evaluate(() => window.opener)).toBeNull();
      // The site stays open in the original tab.
      expect(page.url()).toBe(homeUrl);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Javier Caballero');
    });
  }
});

test.describe('layout', () => {
  test('stacks the profile above the content on narrow screens', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const intro = await page.locator('.intro').boundingBox();
    const lead = await page.locator('.lead').boundingBox();
    expect(intro && lead && intro.y + intro.height <= lead.y).toBe(true);
  });

  test('places the profile beside the content on wide screens', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const profile = await page.locator('.profile').boundingBox();
    const content = await page.locator('.content').boundingBox();
    expect(profile && content && profile.x + profile.width <= content.x).toBe(true);
  });
});

test.describe('static files', () => {
  test('serves the favicons', async ({ request }) => {
    for (const path of ['/img/favicon.png', '/img/favicon.svg']) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
    }
  });

  test('robots.txt allows only the home page', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('Allow: /$');
    expect(body).toContain('Disallow: /');
  });
});
