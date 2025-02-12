async function login(page, username, password) {
  await page.goto('https://pramern.withyamroll.com/login');
  await page.getByLabel('บัญชีผู้ใช้ หรืออีเมล').fill(username);
  await page.getByLabel('รหัสผ่าน').fill(password);
  await page.getByLabel('จดจำฉัน').check();
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await page.waitForURL('https://pramern.withyamroll.com/assignments');
}

module.exports = { login };
