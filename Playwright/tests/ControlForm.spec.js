// Author: Wanissha Yeekaday
// Date modified: 11/03/2568
// Module: Control form flow 

import { test, expect } from '@playwright/test';

test('Create Assessment Form', async ({ page }) => {
    await page.goto('https://pramern.withyamroll.com/login');

    // Login
 
    await login(page, 'admin', '!Tt123456789');

    // Navigate to assessment management
    await page.getByRole('link', { name: 'จัดการแบบประเมิน' }).click();
    await page.getByRole('button', { name: 'สร้างแบบประเมิน' }).click();

    // Fill assessment details
    await page.locator('#form-title', { exact: true }).fill('แบบประเมินด้านความสามารถ');
    await page.getByPlaceholder('ชื่อส่วน').fill('ส่วนที่ 1 ศักยภาพ');
    await page.getByPlaceholder('คำอธิบายส่วน').fill('เกี่ยวกับความสามารถและศักยภาพ');

    // Enable a switch (if applicable)
    await page.getByLabel('ใช้ในการคำนวณผลคะแนน', { exact: false }).click();


    // Add a question
    await page.getByRole('button', { name: 'เพิ่มคำถาม' }).click();
    await page.locator('//button[@class="v-expansion-panel-title"]').click();

    await page.getByPlaceholder('คำถาม').fill('ความสามารถในการเขียนโปรแกรม');
    await page.getByRole('combobox').click(); 
    await page.waitForTimeout(500); 
    await page.getByText('หลายตัวเลือก', { exact: true }).first().click();

    // Add multiple-choice options
    await page.getByPlaceholder('ตัวเลือกที่').fill('มี');
    await page.getByRole('button', { name: 'เพิ่มตัวเลือก' }).click();
    await page.getByPlaceholder('ตัวเลือกที่ 2').fill('ไม่มี');

    // Add another question
    await page.getByRole('button', { name: 'เพิ่มคำถาม' }).click();
    await page.getByPlaceholder('คำถาม').fill('ความสามารถในการบริหารเวลา');
    await page.getByRole('combobox').click(); 
    await page.waitForTimeout(500); 
    await page.getByText('หลายตัวเลือก', { exact: true }).nth(1).click();


    // Add multiple-choice options
    await page.getByPlaceholder('ตัวเลือกที่ 1').fill('ดี');
    await page.getByRole('button', { name: 'เพิ่มตัวเลือก' }).click();
    await page.getByPlaceholder('ตัวเลือกที่ 2').fill('แย่');

    // Next step
    await page.getByRole('button', { name: 'ต่อไป' }).click();

    // Score calculation
    await page.getByRole('row', { name: '1 ส่วนที่ 1' }).getByPlaceholder('คะแนน').fill('5');
    await page.getByRole('button', { name: 'สูตรคำนวณ' }).click();
    await page.getByRole('button', { name: 'คะแนนทั้งหมด' }).click();
    await page.getByRole('button', { name: '÷' }).click();
    await page.getByRole('button', { name: 'คำถามทั้งหมด' }).click();

    // Save assessment draft
    await page.getByRole('button', { name: 'บันทึก', exact: true }).click();
    await page.getByPlaceholder('ค่าแสดง').fill('คะแนน');
    await page.getByRole('row', { name: 'คะแนน', exact: true }).getByPlaceholder('คะแนน').fill('5');
    await page.getByRole('button', { name: 'บันทึกแบบร่าง' }).click();

    // Verify successful form creation.
    await page.locator('div').filter({ hasText: 'บันทึกแบบร่างสำเร็จ' }).getByRole('button');

});
