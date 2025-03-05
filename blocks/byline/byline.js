/**
 * Decorates the byline block.
 * @param {Element} block The byline block element
 */
export default async function decorate(block) {
  const byline = block.querySelector('.byline');
  if (!byline) return;

  // Get author image
  const authorImageDiv = byline.querySelector('.byline-author-image');
  const authorImage = authorImageDiv.querySelector('img');
  if (block.querySelector(':scope > div > div > picture')) {
    const picture = block.querySelector(':scope > div > div > picture');
    authorImage.src = picture.querySelector('img').src;
    authorImage.alt = picture.querySelector('img').alt || 'Author photo';
    picture.remove();
  } else {
    authorImageDiv.remove();
  }

  // Get author name
  const authorNameDiv = byline.querySelector('.byline-author-name');
  const nameContent = block.querySelector(':scope > div:nth-child(1) > div:nth-child(2)');
  if (nameContent) {
    authorNameDiv.textContent = nameContent.textContent.trim();
    nameContent.remove();
  }

  // Get author title
  const authorTitleDiv = byline.querySelector('.byline-author-title');
  const titleContent = block.querySelector(':scope > div:nth-child(1) > div:nth-child(3)');
  if (titleContent) {
    authorTitleDiv.textContent = titleContent.textContent.trim();
    titleContent.remove();
  }

  // Get date
  const dateDiv = byline.querySelector('.byline-date');
  const dateContent = block.querySelector(':scope > div:nth-child(2) > div:nth-child(1)');
  if (dateContent) {
    const date = new Date(dateContent.textContent.trim());
    dateDiv.textContent = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    dateContent.remove();
  }

  // Get reading time
  const readingTimeDiv = byline.querySelector('.byline-reading-time');
  const timeContent = block.querySelector(':scope > div:nth-child(2) > div:nth-child(2)');
  if (timeContent) {
    readingTimeDiv.textContent = `${timeContent.textContent.trim()} min read`;
    timeContent.remove();
  }

  // Clean up any empty divs
  block.querySelectorAll('div').forEach((div) => {
    if (!div.textContent.trim() && !div.querySelector('img')) {
      div.remove();
    }
  });
}
