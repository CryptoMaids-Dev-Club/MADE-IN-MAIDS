import { test, expect } from '@playwright/test'
import { TestHelpers, FEATURE_CARDS, type Language } from './utils/test-helpers'

test.describe('Top Page', () => {
  let helpers: TestHelpers

  test.beforeEach(async ({ page }) => {
    helpers = new TestHelpers(page)
  })

  test.describe('Basic Functionality', () => {
    test('should load the top page successfully', async ({ page }) => {
      await helpers.navigateToTopPage()
      await expect(page).toHaveTitle(/Made in Maids/)
    })

    test('should display all feature cards', async ({ page }) => {
      await helpers.navigateToTopPage()
      await helpers.verifyFeatureCards()
    })

    test('should display Recently Updated Profiles section', async ({ page }) => {
      await helpers.navigateToTopPage()
      await helpers.verifyRecentlyUpdatedProfilesSection()
    })
  })

  test.describe('Navigation', () => {
    test('should have correct href attributes for all feature cards', async ({ page }) => {
      await helpers.navigateToTopPage()
      
      for (const card of FEATURE_CARDS) {
        await helpers.verifyFeatureCardHref(card.title, `/en${card.href}`)
      }
    })

    test('should have clickable feature cards', async ({ page }) => {
      await helpers.navigateToTopPage()
      
      // Test a subset of cards for clickability
      const testCards = ['MARKET', 'STAKING']
      for (const cardTitle of testCards) {
        const cardLink = await helpers.getFeatureCardLink(cardTitle)
        await expect(cardLink).toBeVisible()
        await expect(cardLink).toBeEnabled()
      }
    })
  })

  test.describe('Internationalization', () => {
    const languages: Language[] = ['en', 'ja']

    for (const lang of languages) {
      test(`should load top page in ${lang.toUpperCase()}`, async ({ page }) => {
        await helpers.navigateToTopPage(lang)
        await helpers.verifyFeatureCards()
        await helpers.verifyPageUrl(`/${lang}/top`)
      })
    }

    test('should switch between languages', async ({ page }) => {
      await helpers.navigateToTopPage('en')
      await helpers.verifyPageUrl('/en/top')
      
      await page.goto('/ja/top')
      await helpers.waitForPageLoad()
      await helpers.verifyPageUrl('/ja/top')
      
      await page.goto('/en/top')
      await helpers.waitForPageLoad()
      await helpers.verifyPageUrl('/en/top')
    })
  })

  test.describe('Responsive Design', () => {
    const viewports = [
      { name: 'desktop', width: 1920, height: 1080, expectedClass: /lg:grid-cols-3/ },
      { name: 'tablet', width: 768, height: 1024, expectedClass: /md:grid-cols-2/ },
      { name: 'mobile', width: 375, height: 667, expectedClass: /grid/ },
    ]

    for (const viewport of viewports) {
      test(`should display correctly on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height })
        await helpers.navigateToTopPage()
        await helpers.verifyFeatureCards()
        
        if (viewport.name === 'mobile') {
          const cardCount = await helpers.getCardCount()
          expect(cardCount).toBeGreaterThan(0)
        } else {
          await helpers.verifyCardsGrid(viewport.expectedClass)
        }
      })
    }
  })

  test.describe('Loading States', () => {
    test('should handle loading states properly', async ({ page }) => {
      await helpers.navigateToTopPage()
      await helpers.waitForPageLoad()
      
      await helpers.verifyFeatureCards()
      await helpers.verifyRecentlyUpdatedProfilesSection()
    })

    test('should display content after loading', async ({ page }) => {
      await helpers.navigateToTopPage()
      
      // Verify that the loader has been replaced by the actual content
      const profilesSection = page.locator('text=Recently Updated Profiles')
      await expect(profilesSection).toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test('should have proper heading structure', async ({ page }) => {
      await helpers.navigateToTopPage()
      
      const profilesHeading = page.locator('h1:has-text("Recently Updated Profiles")')
      await expect(profilesHeading).toBeVisible()
    })

    test('should have clickable feature cards', async ({ page }) => {
      await helpers.navigateToTopPage()
      
      const marketCard = await helpers.getFeatureCardLink('MARKET')
      await expect(marketCard).toBeVisible()
      await expect(marketCard).toBeEnabled()
    })
  })
})