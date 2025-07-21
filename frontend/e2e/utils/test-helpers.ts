import { Page, expect } from '@playwright/test'

export type Language = 'en' | 'ja'

export interface FeatureCard {
  title: string
  color: string
  href: string
}

export const FEATURE_CARDS: FeatureCard[] = [
  { title: 'MARKET', color: 'pink-500', href: '/market' },
  { title: 'STAKING', color: 'blue-400', href: '/staking' },
  { title: 'VOTING', color: 'orange-500', href: '/voting' },
  { title: 'RANKING', color: 'yellow-500', href: '/ranking' },
  { title: 'PREDICTION', color: 'green-500', href: '/prediction' },
  { title: 'Lottery', color: 'green-500', href: '/lottery' },
]

export class TestHelpers {
  constructor(private page: Page) {}

  async navigateToTopPage(lang: Language = 'en'): Promise<void> {
    await this.page.goto(`/${lang}/top`)
    // cSpell:ignore networkidle
    await this.page.waitForLoadState('networkidle')
  }

  async verifyFeatureCards(): Promise<void> {
    for (const card of FEATURE_CARDS) {
      const cardElement = this.page.locator(`text=${card.title}`).first()
      await expect(cardElement).toBeVisible()
    }
  }

  async getFeatureCardLink(cardTitle: string) {
    return this.page.getByRole('link').filter({ hasText: cardTitle }).first()
  }

  async clickFeatureCard(cardTitle: string): Promise<void> {
    const cardLink = await this.getFeatureCardLink(cardTitle)
    await expect(cardLink).toBeVisible()
    await cardLink.click()
    // cSpell:ignore networkidle
    await this.page.waitForLoadState('networkidle')
  }

  async verifyFeatureCardHref(cardTitle: string, expectedHref: string): Promise<void> {
    const cardLink = await this.getFeatureCardLink(cardTitle)
    await expect(cardLink).toHaveAttribute('href', expectedHref)
  }

  async verifyRecentlyUpdatedProfilesSection(): Promise<void> {
    const sectionTitle = this.page.locator('text=Recently Updated Profiles')
    await expect(sectionTitle).toBeVisible()
  }

  async waitForPageLoad(): Promise<void> {
    // cSpell:ignore networkidle
    await this.page.waitForLoadState('networkidle')
    await this.page.waitForSelector('[data-testid="loading"]', { state: 'hidden' }).catch(() => {
      // Loading selector not found, which is fine
    })
  }

  async verifyPageUrl(expectedPath: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expectedPath))
  }

  async switchLanguage(targetLang: Language): Promise<void> {
    await this.page.goto(`/${targetLang}/top`)
    await this.waitForPageLoad()
  }

  async verifyCardsGrid(expectedClass: RegExp): Promise<void> {
    const cardsGrid = this.page.locator('.mx-10.grid')
    await expect(cardsGrid).toHaveClass(expectedClass)
  }

  async getCardCount(): Promise<number> {
    const cards = this.page.locator('.mx-10.grid > a')
    return await cards.count()
  }
}