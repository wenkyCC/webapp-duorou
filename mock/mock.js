module.exports = {
  rules: [{
    pattern: /\/api\/article.php/,
    respondwith: './article.json'
  },{
    pattern: /\/api\/homeList.php\?page=\d+&pageSize=5$/,
    respondwith: './articlenew.json'
  },{
    pattern: /\/api\/homeList.php\?page=\d+&pageSize=5$/,
    respondwith: './articlemore.json'
  }]
};
