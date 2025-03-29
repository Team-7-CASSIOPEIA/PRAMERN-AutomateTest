const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');

test('Verify delete form in daft state', async ({ page }) => { 

    await login(page, 'admin', 'Adm!n123');

    await page.getByRole('link', { name: 'จัดการแบบประเมิน' }).click();

    await page.locator("tbody tr:nth-of-type(2) td:nth-of-type(3) button:nth-of-type(3) span:nth-of-type(3) i").click();

    await page.locator("button:has-text('ยืนยัน')").click();

    await expect(page.locator('text=ลบสำเร็จ')).toBeVisible();
})

test('Verify delete form in edit state', async ({ page }) => {
    await login(page, 'admin', 'Adm!n123');

    await page.getByRole('link', { name: 'จัดการแบบประเมิน' }).click();

    await page.locator("tbody tr:nth-of-type(3) td:nth-of-type(3) button:nth-of-type(3) span:nth-of-type(3) i").click();

    await page.locator("button:has-text('ยืนยัน')").click();

    await expect(page.locator('text=ลบสำเร็จ')).toBeVisible();
})

test('Verify delete form in active state', async ({ page }) => {
    await login(page, 'admin', 'Adm!n123');

    await page.getByRole('link', { name: 'จัดการแบบประเมิน' }).click();

    await page.locator("tbody tr:nth-of-type(1) td:nth-of-type(3) button:nth-of-type(3) span:nth-of-type(3) i").click();

    await page.locator("button:has-text('ยืนยัน')").click();

    await expect(page.locator('text=ลบสำเร็จ')).toBeVisible();
})

test('Verify delete form in waiting examine state', async ({ page }) => {
    await login(page, 'admin', 'Adm!n123');

    await page.getByRole('link', { name: 'จัดการแบบประเมิน' }).click();

    const button = page.locator("tbody tr:nth-of-type(4) td:nth-of-type(3) button:nth-of-type(3) span:nth-of-type(3) i");

    const isButtonDisabled = await button.isDisabled();

    await expect(isButtonDisabled).toBe(true);
});

