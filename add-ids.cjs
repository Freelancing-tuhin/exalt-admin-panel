const fs = require('fs');
const path = require('path');

// Read the articles.json file
const articlesPath = path.join(__dirname, 'src', 'database', 'articles.json');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

// Add _id field to each article
articles.forEach((article, index) => {
  const id = `article_${String(index + 1).padStart(3, '0')}`;
  article._id = id;
  
  // Reorder fields to put _id first
  const reorderedArticle = {
    _id: article._id,
    title: article.title,
    month: article.month,
    section: article.section,
    context: article.context,
    exalt_take: article.exalt_take,
    questions_from_community: article.questions_from_community
  };
  
  // Copy the reordered article back
  Object.keys(article).forEach(key => delete article[key]);
  Object.assign(article, reorderedArticle);
});

// Write the updated articles back to the file
fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));

console.log(`Added _id fields to ${articles.length} articles`);
