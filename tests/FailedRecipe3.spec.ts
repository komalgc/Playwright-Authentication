import { test, expect, request } from '@playwright/test'

const loginpayload = { username: "buyerdev", password: "Treeboa@123" }

let token;
let orderid;

test.beforeAll('apilogin', async () => {

    const apicontext = await request.newContext();
    const loginResponse = await apicontext.post('https://bookcart.azurewebsites.net/api/login',
        {
            data: loginpayload
        })

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token)

    const orderresponse = await apicontext.get('https://bookcart.azurewebsites.net/api/Order/9961',
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }
    )

    expect(orderresponse.ok()).toBeTruthy();
    if (!orderresponse.ok()) {
        const errorText = await orderresponse.text();
        console.error("Failed to create order. Status:", orderresponse.status());
        console.error("Response body:", errorText);
    }
    const orderresponsejson = await orderresponse.json();
    console.log(orderresponsejson)

    orderid = orderresponsejson[0].orderId;
    console.log(orderid)

})
test('api test', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token)

    await page.goto('https://bookcart.azurewebsites.net/')
    await page.reload();

    console.log(await page.url());
    const storedToken = await page.evaluate(() => {
        return window.localStorage.getItem('token');
    });

    console.log("✅ Token in localStorage:", storedToken);
    await page.goto('https://bookcart.azurewebsites.net/myorders')
    const tokenInBrowser = await page.evaluate(() => localStorage.getItem('token'));
    await expect(tokenInBrowser).toBe(token);
    await page.waitForLoadState('networkidle');
    const orderID = await page.locator('tbody tr').first().locator('td').nth(1).textContent();
    console.log(orderID)
    expect(orderID).toContain(orderid);
})