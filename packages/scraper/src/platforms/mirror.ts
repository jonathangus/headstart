import puppeteer from 'puppeteer';

export const getDribbleContent = async () => {
  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: 'new',
  });

  // Open a new page
  const page = await browser.newPage();

  await page.goto('https://dribbble.com/almigor', {
    // waitUntil: 'domcontentloaded',
    waitUntil: 'networkidle0',
  });

  // Get page data
  const result = await page.evaluate(() => {
    const nameEl: any = document.querySelector('h1');
    const name = nameEl?.innerText;
    const descEl: any = document.querySelector('#masthead > h2');
    const description = descEl.innerText;
    let avatar = (document.querySelector('.profile-avatar') as any).src;

    let nodes = [];
    for (let item of Array.from(
      document.querySelectorAll('.shots-grid .shot-thumbnail')
    ).slice(0, 15)) {
      let img = (item as any).querySelector('img');
      let title = (item as any).querySelector('.shot-title');
      let link = (item as any).querySelector('.shot-thumbnail-link');

      if (img && title && link) {
        if (img.src.includes('cdn')) {
          nodes.push({
            title: title.innerText,
            src: img.src,
            link: link.href,
          });
        } else {
          console.log('bad cdn');
        }
      } else {
        console.log('missing stuff', {
          img,
          title,
          link,
        });
      }
    }
    return { name, description, nodes: nodes.slice(0, 3), avatar };
  });

  // Display the quotes
  await browser.close();

  return result;
};
